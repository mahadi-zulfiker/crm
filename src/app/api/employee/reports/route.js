import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";

// GET: Fetch reports data for the current employee
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const employeeId = searchParams.get("employeeId");
    const days = searchParams.get("days") || 30; // Default to 30 days
    const months = searchParams.get("months") || 12; // Default to 12 months

    if (!employeeId) {
      return NextResponse.json(
        { error: "Employee ID is required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const attendanceCollection = db.collection("attendance");
    const leaveCollection = db.collection("leaveRequests");
    const loanCollection = db.collection("loanRequests");

    // Get today's date and calculate date ranges
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - parseInt(days));
    
    const monthStartDate = new Date(today);
    monthStartDate.setMonth(today.getMonth() - parseInt(months));

    // Fetch attendance data for the last N days
    const attendanceRecords = await attendanceCollection.find({
      employeeId,
      date: { $gte: startDate.toISOString().split("T")[0] }
    }).toArray();

    // Calculate attendance statistics
    const presentDays = attendanceRecords.filter(record => record.status === "present").length;
    const absentDays = attendanceRecords.filter(record => record.status === "absent").length;
    const leaveDays = attendanceRecords.filter(record => record.status === "leave").length;
    const totalDays = attendanceRecords.length;
    const attendanceRate = totalDays > 0 ? Math.round(((presentDays + leaveDays) / totalDays) * 100) : 0;

    // Fetch leave data for the last N months
    const leaveRecords = await leaveCollection.find({
      employeeId,
      appliedDate: { $gte: monthStartDate.toISOString().split("T")[0] }
    }).toArray();

    // Calculate leave statistics
    const approvedLeaves = leaveRecords.filter(record => record.status === "approved").length;
    const pendingLeaves = leaveRecords.filter(record => record.status === "pending").length;
    const rejectedLeaves = leaveRecords.filter(record => record.status === "rejected").length;

    // Fetch loan data
    const loanRecords = await loanCollection.find({ employeeId }).toArray();

    // Calculate loan statistics
    const totalLoans = loanRecords.length;
    const approvedLoans = loanRecords.filter(record => record.status === "approved").length;
    const pendingLoans = loanRecords.filter(record => record.status === "pending").length;
    const rejectedLoans = loanRecords.filter(record => record.status === "rejected").length;
    const completedLoans = loanRecords.filter(record => record.status === "completed").length;
    const totalLoanAmount = loanRecords.reduce((sum, record) => sum + (record.amount || 0), 0);

    return NextResponse.json(
      {
        message: "Reports data fetched successfully",
        data: {
          attendance: {
            presentDays,
            absentDays,
            leaveDays,
            attendanceRate,
            records: attendanceRecords
          },
          leave: {
            approved: approvedLeaves,
            pending: pendingLeaves,
            rejected: rejectedLeaves,
            records: leaveRecords
          },
          loans: {
            total: totalLoans,
            approved: approvedLoans,
            pending: pendingLoans,
            rejected: rejectedLoans,
            completed: completedLoans,
            totalAmount: totalLoanAmount,
            records: loanRecords
          }
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching reports data:", error);
    return NextResponse.json(
      { error: "Failed to fetch reports data" },
      { status: 500 }
    );
  }
}