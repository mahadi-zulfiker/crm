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

    // Build query for employee's attendance records
    let query = { employeeId };

    // Filter by month/year if provided
    if (month && year) {
      const startDate = `${year}-${month.padStart(2, '0')}-01`;
      const endDate = new Date(year, month, 0).toISOString().split('T')[0]; // Last day of month
      query.date = { $gte: startDate, $lte: endDate };
    }

    const attendanceRecords = await attendanceCollection.find(query).toArray();

    // Sort by date descending
    const sortedRecords = attendanceRecords.sort(
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