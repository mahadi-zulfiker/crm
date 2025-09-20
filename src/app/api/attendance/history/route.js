import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../lib/mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const employeeId = searchParams.get("employeeId");

    const db = await connectMongoDB();
    const attendanceCollection = db.collection("attendance");

    let query = {};
    if (employeeId) {
      query.employeeId = employeeId;
    }

    const attendanceRecords = await attendanceCollection.find(query).toArray();

    // Sort by date descending
    const sortedRecords = attendanceRecords.sort(
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
