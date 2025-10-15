import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";

// GET: Fetch all dashboard data for admin in a single request
export async function GET() {
  try {
    const db = await connectMongoDB();

    // Get total company employees
    const totalEmployees = await db
      .collection("CompanyEmployees")
      .countDocuments({});

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Get company employees present today
    // First get all company employee IDs
    const companyEmployees = await db
      .collection("CompanyEmployees")
      .find({}, { projection: { _id: 1 } })
      .toArray();
    const companyEmployeeIds = companyEmployees.map((emp) =>
      emp._id.toString()
    );

    // Then get attendance records for these employees
    const presentToday = await db.collection("attendance").countDocuments({
      date: today,
      status: "present",
      employeeId: { $in: companyEmployeeIds },
    });

    // Get company employees on leave today
    const onLeaveToday = await db.collection("attendance").countDocuments({
      date: today,
      status: "leave",
      employeeId: { $in: companyEmployeeIds },
    });

    // Get company employees absent today (total employees - present - on leave)
    const absentToday = totalEmployees - presentToday - onLeaveToday;

    return NextResponse.json(
      {
        message: "Dashboard data fetched successfully",
        data: {
          totalEmployees,
          presentToday,
          absentToday,
          onLeaveToday,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
