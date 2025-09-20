import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";

// GET: Fetch loan statistics for admin dashboard
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const months = searchParams.get("months") || 1; // Default to current month

    const db = await connectMongoDB();
    const loanCollection = db.collection("loanRequests");

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - parseInt(months));

    // Format dates as YYYY-MM-DD
    const formatDate = (date) => date.toISOString().split("T")[0];

    // Fetch loan requests for the date range
    const loanRequests = await loanCollection
      .find({
        appliedDate: {
          $gte: formatDate(startDate),
          $lte: formatDate(endDate),
        },
      })
      .toArray();

    // Group by loan type
    const loansByType = {};
    let totalLoans = 0;
    let approvedLoans = 0;
    let pendingLoans = 0;
    let rejectedLoans = 0;
    let completedLoans = 0;
    let totalAmount = 0;
    let approvedAmount = 0;
    let outstandingAmount = 0;

    loanRequests.forEach((loan) => {
      const type = loan.type || "Other Loan";
      if (!loansByType[type]) {
        loansByType[type] = {
          count: 0,
          totalAmount: 0,
        };
      }

      loansByType[type].count++;
      loansByType[type].totalAmount += loan.amount || 0;

      totalLoans++;
      totalAmount += loan.amount || 0;

      switch (loan.status) {
        case "approved":
          approvedLoans++;
          approvedAmount += loan.amount || 0;
          outstandingAmount += loan.amount || 0;
          break;
        case "pending":
          pendingLoans++;
          break;
        case "rejected":
          rejectedLoans++;
          break;
        case "completed":
          completedLoans++;
          break;
      }
    });

    // Convert to array format
    const loanStats = Object.keys(loansByType).map((type) => ({
      type,
      count: loansByType[type].count,
      totalAmount: loansByType[type].totalAmount,
    }));

    return NextResponse.json(
      {
        message: "Loan statistics fetched successfully",
        data: {
          loanStats,
          summary: {
            totalLoans,
            approvedLoans,
            pendingLoans,
            rejectedLoans,
            completedLoans,
            totalAmount,
            approvedAmount,
            outstandingAmount,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching loan statistics:", error);
    return NextResponse.json(
      { error: "Failed to fetch loan statistics" },
      { status: 500 }
    );
  }
}
