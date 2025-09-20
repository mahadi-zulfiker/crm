import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

// GET: Fetch all loan requests for admin dashboard
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const db = await connectMongoDB();
    const loanCollection = db.collection("loanRequests");

    let query = {};

    if (status) {
      query.status = status;
    }

    const loanRequests = await loanCollection.find(query).toArray();

    return NextResponse.json(
      {
        message: "Loan requests fetched successfully",
        data: loanRequests,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching loan requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch loan requests" },
      { status: 500 }
    );
  }
}

// PUT: Update loan request status (approve/reject) by admin
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, status, approvalDate } = body;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Valid loan request ID is required" },
        { status: 400 }
      );
    }

    if (!["approved", "rejected", "completed"].includes(status)) {
      return NextResponse.json(
        {
          error: "Status must be either 'approved', 'rejected', or 'completed'",
        },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const loanCollection = db.collection("loanRequests");

    const updateData = {
      status,
      updatedAt: new Date().toISOString(),
    };

    if (status === "approved" && approvalDate) {
      updateData.approvalDate = approvalDate;
    }

    if (status === "completed") {
      updateData.completedDate = new Date().toISOString().split("T")[0];
    }

    const result = await loanCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Loan request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: `Loan request ${status} successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating loan request:", error);
    return NextResponse.json(
      { error: "Failed to update loan request" },
      { status: 500 }
    );
  }
}
