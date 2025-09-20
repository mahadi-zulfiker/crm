import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";

// GET: Fetch leave statistics for admin dashboard
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const months = searchParams.get("months") || 1; // Default to current month

    const db = await connectMongoDB();
    const leaveCollection = db.collection("leaveRequests");

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - parseInt(months));

    // Format dates as YYYY-MM-DD
    const formatDate = (date) => date.toISOString().split("T")[0];

    // Fetch leave requests for the date range
    const leaveRequests = await leaveCollection
      .find({
        appliedDate: {
          $gte: formatDate(startDate),
          $lte: formatDate(endDate),
        },
      })
      .toArray();

    // Group by leave type
    const leaveByType = {};
    let totalRequests = 0;
    let approvedRequests = 0;
    let pendingRequests = 0;
    let rejectedRequests = 0;

    leaveRequests.forEach((request) => {
      const type = request.type || "Other";
      if (!leaveByType[type]) {
        leaveByType[type] = 0;
      }
      leaveByType[type]++;

      totalRequests++;
      switch (request.status) {
        case "approved":
          approvedRequests++;
          break;
        case "pending":
          pendingRequests++;
          break;
        case "rejected":
          rejectedRequests++;
          break;
      }
    });

    // Convert to array format
    const leaveStats = Object.keys(leaveByType).map((type) => ({
      type,
      count: leaveByType[type],
    }));

    return NextResponse.json(
      {
        message: "Leave statistics fetched successfully",
        data: {
          leaveStats,
          summary: {
            totalRequests,
            approvedRequests,
            pendingRequests,
            rejectedRequests,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching leave statistics:", error);
    return NextResponse.json(
      { error: "Failed to fetch leave statistics" },
      { status: 500 }
    );
  }
}
