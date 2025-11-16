import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

// GET: Fetch attendance records for admin dashboard
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const department = searchParams.get("department");
    const status = searchParams.get("status");

    const db = await connectMongoDB();
    const attendanceCollection = db.collection("attendance");
    const companyEmployeesCollection = db.collection("CompanyEmployees");

    let query = {};

    if (date) {
      query.date = date;
    } else if (startDate && endDate) {
      query.date = { $gte: startDate, $lte: endDate };
    }

    if (status) {
      query.status = status;
    }

    // Fetch attendance records
    const attendanceRecords = await attendanceCollection.find(query).toArray();

    // Enrich attendance records with employee details
    const enrichedRecords = await Promise.all(
      attendanceRecords.map(async (record) => {
        // Ensure employeeId is properly formatted as ObjectId
        const employeeId = ObjectId.isValid(record.employeeId)
          ? new ObjectId(record.employeeId)
          : record.employeeId;

        const employee = await companyEmployeesCollection.findOne(
          { _id: employeeId },
          { projection: { name: 1, department: 1, email: 1 } }
        );
        return {
          ...record,
          employeeName: employee?.name || "Unknown Employee",
          employeeDepartment: employee?.department || "Not assigned",
          employeeEmail: employee?.email || "N/A",
        };
      })
    );

    // Filter by department if specified
    let filteredRecords = enrichedRecords;
    if (department && department !== "all") {
      filteredRecords = enrichedRecords.filter(
        (record) => record.employeeDepartment === department
      );
    }

    return NextResponse.json(
      {
        message: "Attendance records fetched successfully",
        data: filteredRecords,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    return NextResponse.json(
      { error: "Failed to fetch attendance records: " + error.message },
      { status: 500 }
    );
  }
}
