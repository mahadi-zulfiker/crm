import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";

// GET: Fetch attendance records for the current employee
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const employeeId = searchParams.get("employeeId");
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    if (!employeeId) {
      return NextResponse.json(
        { error: "Employee ID is required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const attendanceCollection = db.collection("attendance");
    const leaveCollection = db.collection("leaveRequests");

    // Build query for employee's attendance records
    let query = { employeeId };

    // Filter by month/year if provided
    let startDate, endDate;
    if (month && year) {
      startDate = `${year}-${month.padStart(2, "0")}-01`;
      endDate = new Date(year, month, 0).toISOString().split("T")[0]; // Last day of month
      query.date = { $gte: startDate, $lte: endDate };
    }

    const attendanceRecords = await attendanceCollection.find(query).toArray();

    // Get leave requests for the same period
    let leaveQuery = { employeeId, status: "approved" };
    if (startDate && endDate) {
      leaveQuery.$or = [
        { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
        { startDate: { $gte: startDate, $lte: endDate } },
        { endDate: { $gte: startDate, $lte: endDate } },
      ];
    }

    const leaveRequests = await leaveCollection.find(leaveQuery).toArray();

    // Add leave information to attendance records
    const enrichedRecords = attendanceRecords.map((record) => {
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

    // Sort by date descending
    const sortedRecords = enrichedRecords.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    return NextResponse.json(
      {
        message: "Attendance records fetched successfully",
        data: sortedRecords,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    return NextResponse.json(
      { error: "Failed to fetch attendance records" },
      { status: 500 }
    );
  }
}
