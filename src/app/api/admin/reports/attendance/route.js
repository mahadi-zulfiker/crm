import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";

// GET: Fetch attendance reports for admin dashboard
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const days = searchParams.get("days") || 7; // Default to last 7 days

    const db = await connectMongoDB();
    const attendanceCollection = db.collection("attendance");

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    // Format dates as YYYY-MM-DD
    const formatDate = (date) => date.toISOString().split("T")[0];

    // Fetch attendance data for the date range
    const attendanceRecords = await attendanceCollection
      .find({
        date: {
          $gte: formatDate(startDate),
          $lte: formatDate(endDate),
        },
      })
      .toArray();

    // Group by date and calculate stats
    const attendanceByDate = {};
    const dates = [];

    // Initialize date array
    for (let i = 0; i < parseInt(days); i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = formatDate(date);
      dates.push(dateStr);
      attendanceByDate[dateStr] = { present: 0, absent: 0, leave: 0 };
    }

    // Populate with actual data
    attendanceRecords.forEach((record) => {
      if (attendanceByDate[record.date]) {
        switch (record.status) {
          case "present":
            attendanceByDate[record.date].present++;
            break;
          case "absent":
            attendanceByDate[record.date].absent++;
            break;
          case "leave":
            attendanceByDate[record.date].leave++;
            break;
        }
      }
    });

    // Convert to array format
    const attendanceData = dates
      .map((date) => ({
        date,
        present: attendanceByDate[date].present,
        absent: attendanceByDate[date].absent,
        leave: attendanceByDate[date].leave,
      }))
      .reverse(); // Show oldest first

    return NextResponse.json(
      {
        message: "Attendance reports fetched successfully",
        data: attendanceData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching attendance reports:", error);
    return NextResponse.json(
      { error: "Failed to fetch attendance reports" },
      { status: 500 }
    );
  }
}
