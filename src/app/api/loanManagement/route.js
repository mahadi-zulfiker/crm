import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

// GET: Fetch loan requests
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const employeeId = searchParams.get("employeeId");
    const status = searchParams.get("status");

    const db = await connectMongoDB();
    const loanCollection = db.collection("loanRequests");

    let query = {};

    if (employeeId) {
      query.employeeId = employeeId;
    }

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

// POST: Create a new loan request
export async function POST(req) {
  try {
    const body = await req.json();
    const { employeeId, type, amount, purpose, repaymentMonths } = body;

    if (!employeeId || !type || !amount || !purpose || !repaymentMonths) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const loanCollection = db.collection("loanRequests");

    const newLoanRequest = {
      employeeId,
      type,
      amount: parseFloat(amount),
      purpose,
      repaymentMonths: parseInt(repaymentMonths),
      status: "pending", // pending, approved, rejected, completed
      appliedDate: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Calculate monthly installment (simple calculation with 5% annual interest)
    const annualInterestRate = 0.05;
    const monthlyInterestRate = annualInterestRate / 12;
    const monthlyPayment =
      (newLoanRequest.amount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -newLoanRequest.repaymentMonths));
    newLoanRequest.monthlyInstallment = parseFloat(monthlyPayment.toFixed(2));

    const result = await loanCollection.insertOne(newLoanRequest);

    return NextResponse.json(
      {
        message: "Loan request submitted successfully",
        data: { ...newLoanRequest, _id: result.insertedId },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting loan request:", error);
    return NextResponse.json(
      { error: "Failed to submit loan request" },
      { status: 500 }
    );
  }
}

// PUT: Update loan request status (approve/reject)
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
        { error: "Status must be either 'approved', 'rejected', or 'completed'" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const loanCollection = db.collection("loanRequests");

    const updateData = { 
      status,
      updatedAt: new Date().toISOString()
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