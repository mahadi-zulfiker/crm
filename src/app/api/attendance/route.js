import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

// Helper function to determine attendance status based on check-in time
function determineAttendanceStatus(checkInTime, workStartTime = "09:00") {
  if (!checkInTime) return "absent";

  // Convert times to minutes for comparison
  const [checkInHours, checkInMinutes] = checkInTime.split(":").map(Number);
  const [workStartHours, workStartMinutes] = workStartTime
    .split(":")
    .map(Number);

  const checkInTotalMinutes = checkInHours * 60 + checkInMinutes;
  const workStartTotalMinutes = workStartHours * 60 + workStartMinutes;

  // If check-in time is before or equal to work start time, mark as present
  if (checkInTotalMinutes <= workStartTotalMinutes) {
    return "present";
  }
  // If check-in time is after work start time, mark as late
  else {
    return "late";
  }
}

// POST: Mark employee attendance for the day
export async function POST(req) {
  try {
    const { employeeId, status, date, action, employeeName, workStartTime } =
      await req.json();

    if (!employeeId || !status) {
      return NextResponse.json(
        { error: "Employee ID and status are required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const attendanceCollection = db.collection("attendance");

    // Use today's date if not provided
    const attendanceDate = date || new Date().toISOString().split("T")[0];

    // Check if attendance already exists for this employee on this date
    const existingAttendance = await attendanceCollection.findOne({
      employeeId,
      date: attendanceDate,
    });

    if (existingAttendance) {
      // Handle check-in/check-out actions
      if (action === "checkin") {
        const checkInTime = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

        // Determine status based on check-in time
        const determinedStatus = determineAttendanceStatus(
          checkInTime,
          workStartTime
        );

        // Update existing attendance record with check-in time and status
        const updateFields = {
          status: determinedStatus,
          checkIn: checkInTime,
          updatedAt: new Date().toISOString(),
        };

        // Add employee name if provided and not already set
        if (employeeName && !existingAttendance.employeeName) {
          updateFields.employeeName = employeeName;
        }

        const result = await attendanceCollection.updateOne(
          { _id: existingAttendance._id },
          { $set: updateFields }
        );
        return NextResponse.json(
          {
            message: `Check-in recorded successfully as ${determinedStatus}`,
            data: result,
            status: determinedStatus,
          },
          { status: 200 }
        );
      } else if (action === "checkout") {
        // Update existing attendance record with check-out time
        const result = await attendanceCollection.updateOne(
          { _id: existingAttendance._id },
          {
            $set: {
              checkOut: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }),
              updatedAt: new Date().toISOString(),
            },
          }
        );
        return NextResponse.json(
          { message: "Check-out recorded successfully", data: result },
          { status: 200 }
        );
      } else {
        // Update existing attendance record (for status changes)
        const updateFields = {
          status,
          updatedAt: new Date().toISOString(),
        };

        // Add employee name if provided and not already set
        if (employeeName && !existingAttendance.employeeName) {
          updateFields.employeeName = employeeName;
        }

        const result = await attendanceCollection.updateOne(
          { _id: existingAttendance._id },
          { $set: updateFields }
        );
        return NextResponse.json(
          { message: "Attendance updated successfully", data: result },
          { status: 200 }
        );
      }
    } else {
      // Create new attendance record
      const newAttendance = {
        employeeId,
        date: attendanceDate,
        status, // present, absent, leave
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Add employee name if provided
      if (employeeName) {
        newAttendance.employeeName = employeeName;
      }

      // Add check-in time if this is a check-in action
      if (action === "checkin") {
        const checkInTime = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

        // Determine status based on check-in time
        const determinedStatus = determineAttendanceStatus(
          checkInTime,
          workStartTime
        );
        newAttendance.status = determinedStatus;
        newAttendance.checkIn = checkInTime;
      }

      const result = await attendanceCollection.insertOne(newAttendance);
      return NextResponse.json(
        {
          message: `Attendance marked successfully as ${newAttendance.status}`,
          data: result,
          status: newAttendance.status,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error marking attendance:", error);
    return NextResponse.json(
      { error: "Failed to mark attendance" },
      { status: 500 }
    );
  }
}

// GET: Fetch attendance records
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const employeeId = searchParams.get("employeeId");
    const date = searchParams.get("date");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const db = await connectMongoDB();
    const attendanceCollection = db.collection("attendance");
    const leaveCollection = db.collection("leaveRequests");
    const companyEmployeesCollection = db.collection("CompanyEmployees");

    let query = {};

    if (employeeId) {
      query.employeeId = employeeId;
    }

    if (date) {
      query.date = date;
    } else if (startDate && endDate) {
      query.date = { $gte: startDate, $lte: endDate };
    }

    const attendanceRecords = await attendanceCollection.find(query).toArray();

    // Enrich records with employee names if not already present
    const enrichedWithNames = await Promise.all(
      attendanceRecords.map(async (record) => {
        // If employeeName is not already set, fetch it from CompanyEmployees collection
        if (!record.employeeName && record.employeeId) {
          try {
            const employee = await companyEmployeesCollection.findOne(
              { _id: record.employeeId },
              { projection: { name: 1 } }
            );
            if (employee && employee.name) {
              return { ...record, employeeName: employee.name };
            }
          } catch (error) {
            console.error("Error fetching employee name:", error);
          }
        }
        return record;
      })
    );

    // Enrich with leave information
    let enrichedRecords = enrichedWithNames;
    if (employeeId) {
      // Get approved leave requests for this employee
      let leaveQuery = { employeeId, status: "approved" };

      // If we have a date range, filter leaves by that range
      if (date) {
        leaveQuery.startDate = { $lte: date };
        leaveQuery.endDate = { $gte: date };
      } else if (startDate && endDate) {
        leaveQuery.$or = [
          { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
          { startDate: { $gte: startDate, $lte: endDate } },
          { endDate: { $gte: startDate, $lte: endDate } },
        ];
      }

      const leaveRequests = await leaveCollection.find(leaveQuery).toArray();

      // Add leave information to attendance records
      enrichedRecords = enrichedWithNames.map((record) => {
        // Check if this date falls within any approved leave period
        const isOnLeave = leaveRequests.some((leave) => {
          return record.date >= leave.startDate && record.date <= leave.endDate;
        });

        return {
          ...record,
          isOnLeave: isOnLeave,
          leaveDetails: isOnLeave
            ? leaveRequests.find(
                (leave) =>
                  record.date >= leave.startDate && record.date <= leave.endDate
              )
            : null,
        };
      });
    }

    return NextResponse.json(
      {
        message: "Attendance records fetched successfully",
        data: enrichedRecords,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return NextResponse.json(
      { error: "Failed to fetch attendance records" },
      { status: 500 }
    );
  }
}
