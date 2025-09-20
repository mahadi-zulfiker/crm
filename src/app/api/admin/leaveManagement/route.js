import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

// GET: Fetch all leave requests for admin dashboard
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const db = await connectMongoDB();
    const leaveCollection = db.collection("leaveRequests");

    let query = {};

    if (status) {
      query.status = status;
    }

    const leaveRequests = await leaveCollection.find(query).toArray();

    return NextResponse.json(
      {
        message: "Leave requests fetched successfully",
        data: leaveRequests,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch leave requests" },
      { status: 500 }
    );
  }
}

// PUT: Update leave request status (approve/reject) by admin
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Valid leave request ID is required" },
        { status: 400 }
      );
    }

    if (!["approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { error: "Status must be either 'approved' or 'rejected'" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const leaveCollection = db.collection("leaveRequests");

    const result = await leaveCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status,
          updatedAt: new Date().toISOString(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Leave request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: `Leave request ${status} successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating leave request:", error);
    return NextResponse.json(
      { error: "Failed to update leave request" },
      { status: 500 }
    );
  }
}
