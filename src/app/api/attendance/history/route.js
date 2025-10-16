import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const employeeId = searchParams.get("employeeId");

    const db = await connectMongoDB();
    const attendanceCollection = db.collection("attendance");
    const leaveCollection = db.collection("leaveRequests");

    let query = {};
    if (employeeId) {
      query.employeeId = employeeId;
    }

    const attendanceRecords = await attendanceCollection.find(query).toArray();

    // Enrich with leave information
    let enrichedRecords = attendanceRecords;
    if (employeeId) {
      // Get all approved leave requests for this employee
      const leaveRequests = await leaveCollection
        .find({
          employeeId,
          status: "approved",
        })
        .toArray();

      // Add leave information to attendance records
      enrichedRecords = attendanceRecords.map((record) => {
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

    // Sort by date descending
    const sortedRecords = enrichedRecords.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    return NextResponse.json({
      success: true,
      data: sortedRecords,
    });
  } catch (error) {
    console.error("Error fetching attendance history:", error);
    return NextResponse.json(
      { error: "Failed to fetch attendance history" },
      { status: 500 }
    );
  }
}
