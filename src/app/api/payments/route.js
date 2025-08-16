import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// Create a new payment
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      candidateId,
      jobId,
      amount,
      description,
      paymentMethod,
      taskCompletion,
      clientEmail,
    } = body;

    if (!candidateId || !jobId || !amount || !clientEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();

    // Verify the candidate exists and is hired
    const candidate = await db.collection("applications").findOne({
      _id: new ObjectId(candidateId),
      jobId: jobId,
      status: "hired",
    });

    if (!candidate) {
      return NextResponse.json(
        { error: "Hired candidate not found" },
        { status: 404 }
      );
    }

    // Create payment record
    const paymentData = {
      candidateId: candidateId,
      candidateEmail: candidate.email,
      candidateName: candidate.fullName,
      jobId: jobId,
      clientEmail: clientEmail,
      amount: Number.parseFloat(amount),
      description: description || "Payment for completed work",
      paymentMethod: paymentMethod || "bank_transfer",
      status: "completed", // In a real app, this would be "pending" until processed
      transactionId: `TXN_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const paymentResult = await db
      .collection("payments")
      .insertOne(paymentData);

    // Update candidate's task status and payment info
    const updateData = {
      taskStatus: taskCompletion,
      lastPaymentDate: new Date(),
      updatedAt: new Date(),
    };

    // Calculate total payments for this candidate
    const allPayments = await db
      .collection("payments")
      .find({ candidateId: candidateId })
      .toArray();
    const totalPayments =
      allPayments.reduce((sum, p) => sum + p.amount, 0) + paymentData.amount;

    updateData.totalPayments = totalPayments;
    updateData.paymentStatus = "paid";

    await db
      .collection("applications")
      .updateOne({ _id: new ObjectId(candidateId) }, { $set: updateData });

    return NextResponse.json({
      success: true,
      message: "Payment processed successfully",
      data: {
        paymentId: paymentResult.insertedId,
        transactionId: paymentData.transactionId,
        amount: paymentData.amount,
        totalPayments: totalPayments,
      },
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get payment history
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const candidateId = searchParams.get("candidateId");
    const jobId = searchParams.get("jobId");
    const clientEmail = searchParams.get("clientEmail");

    if (!candidateId && !jobId && !clientEmail) {
      return NextResponse.json(
        { error: "At least one filter parameter is required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const query = {};

    if (candidateId) {
      query.candidateId = candidateId;
    }
    if (jobId) {
      query.jobId = jobId;
    }
    if (clientEmail) {
      query.clientEmail = clientEmail;
    }

    const payments = await db
      .collection("payments")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    const totalAmount = payments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

    return NextResponse.json({
      success: true,
      data: payments,
      totalAmount: totalAmount,
      count: payments.length,
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
