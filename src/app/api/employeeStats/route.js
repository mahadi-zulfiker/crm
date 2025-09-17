import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../lib/mongodb";

// GET: Fetch employee statistics for admin dashboard
export async function GET() {
  try {
    const db = await connectMongoDB();
    const usersCollection = db.collection("users");
    const attendanceCollection = db.collection("attendance");

    // Get total employees
    const totalEmployees = await usersCollection.countDocuments({
      userType: "Employee",
    });

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Get employees present today
    const presentToday = await attendanceCollection.countDocuments({
      date: today,
      status: "present",
    });

    // Get employees on leave today
    const onLeaveToday = await attendanceCollection.countDocuments({
      date: today,
      status: "leave",
    });

    // Get employees absent today (total employees - present - on leave)
    const absentToday = totalEmployees - presentToday - onLeaveToday;

    return NextResponse.json(
      {
        totalEmployees,
        presentToday,
        absentToday,
        onLeaveToday,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching employee statistics:", error);
    return NextResponse.json(
      { error: "Failed to fetch employee statistics" },
      { status: 500 }
    );
  }
}
