import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";

// GET: Fetch employee statistics by department for admin dashboard
export async function GET() {
  try {
    const db = await connectMongoDB();
    const companyEmployeesCollection = db.collection("CompanyEmployees");
    const attendanceCollection = db.collection("attendance");

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Get all company employees grouped by department
    const employees = await companyEmployeesCollection.find({}).toArray();

    // Group employees by department
    const employeesByDepartment = {};
    employees.forEach((employee) => {
      const department = employee.department || "Not assigned";
      if (!employeesByDepartment[department]) {
        employeesByDepartment[department] = [];
      }
      employeesByDepartment[department].push(employee);
    });

    // Get attendance data for today
    const attendanceRecords = await attendanceCollection
      .find({ date: today })
      .toArray();

    // Create a map of employeeId to attendance status
    const attendanceMap = {};
    attendanceRecords.forEach((record) => {
      attendanceMap[record.employeeId] = record.status;
    });

    // Calculate statistics for each department
    const employeeStats = Object.keys(employeesByDepartment).map(
      (department) => {
        const employeesInDept = employeesByDepartment[department];
        const total = employeesInDept.length;

        let present = 0;
        let absent = 0;
        let leave = 0;

        employeesInDept.forEach((employee) => {
          const status = attendanceMap[employee._id.toString()] || "absent";
          switch (status) {
            case "present":
              present++;
              break;
            case "leave":
              leave++;
              break;
            default:
              absent++;
              break;
          }
        });

        return {
          department,
          total,
          present,
          absent,
          leave,
        };
      }
    );

    return NextResponse.json(
      {
        message: "Employee statistics fetched successfully",
        data: employeeStats,
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
