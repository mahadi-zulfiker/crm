import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../lib/mongodb";

// GET: Fetch employee statistics for admin dashboard
export async function GET() {
  try {
    const db = await connectMongoDB();
    const companyEmployeesCollection = db.collection("CompanyEmployees");
    const attendanceCollection = db.collection("attendance");

    // Get total company employees
    const totalEmployees = await companyEmployeesCollection.countDocuments({});

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Get company employees present today
    // First get all company employee IDs
    const companyEmployees = await companyEmployeesCollection
      .find({}, { projection: { _id: 1 } })
      .toArray();
    const companyEmployeeIds = companyEmployees.map((emp) =>
      emp._id.toString()
    );

    // Then get attendance records for these employees
    const presentToday = await attendanceCollection.countDocuments({
      date: today,
      status: "present",
      employeeId: { $in: companyEmployeeIds },
    });

    // Get company employees on leave today
    const onLeaveToday = await attendanceCollection.countDocuments({
      date: today,
      status: "leave",
      employeeId: { $in: companyEmployeeIds },
    });

    // Get company employees absent today (total employees - present - on leave)
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
