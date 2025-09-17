import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

// POST: Mark employee attendance for the day
export async function POST(req) {
  try {
    const { employeeId, status, date } = await req.json();

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
      // Update existing attendance record
      const result = await attendanceCollection.updateOne(
        { _id: existingAttendance._id },
        { $set: { status, updatedAt: new Date().toISOString() } }
      );
      return NextResponse.json(
        { message: "Attendance updated successfully", data: result },
        { status: 200 }
      );
    } else {
      // Create new attendance record
      const newAttendance = {
        employeeId,
        date: attendanceDate,
        status, // present, absent, leave
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const result = await attendanceCollection.insertOne(newAttendance);
      return NextResponse.json(
        { message: "Attendance marked successfully", data: result },
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

    return NextResponse.json(
      {
        message: "Attendance records fetched successfully",
        data: attendanceRecords,
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
