import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

// GET: Fetch leave requests
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const employeeId = searchParams.get("employeeId");
    const status = searchParams.get("status");

    const db = await connectMongoDB();
    const leaveCollection = db.collection("leaveRequests");

    let query = {};

    if (employeeId) {
      query.employeeId = employeeId;
    }

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

// POST: Create a new leave request
export async function POST(req) {
  try {
    const body = await req.json();
    const { employeeId, type, startDate, endDate, reason } = body;

    if (!employeeId || !type || !startDate || !endDate || !reason) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const leaveCollection = db.collection("leaveRequests");

    const newLeaveRequest = {
      employeeId,
      type,
      startDate,
      endDate,
      reason,
      status: "pending", // pending, approved, rejected
      appliedDate: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await leaveCollection.insertOne(newLeaveRequest);

    return NextResponse.json(
      {
        message: "Leave request submitted successfully",
        data: { ...newLeaveRequest, _id: result.insertedId },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting leave request:", error);
    return NextResponse.json(
      { error: "Failed to submit leave request" },
      { status: 500 }
    );
  }
}

// PUT: Update leave request status (approve/reject)
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, status, rejectionReason } = body;

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

    // Prepare update object
    const updateData = {
      status,
      updatedAt: new Date().toISOString(),
    };

    // Add rejection reason if status is rejected
    if (status === "rejected" && rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }

    const result = await leaveCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: updateData,
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
