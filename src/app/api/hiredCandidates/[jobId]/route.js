import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  try {
    const { jobId } = params;
    console.log("Job ID in hired candidates route:", jobId);

    if (!jobId) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();

    // Find all applications with "hired" status for this job
    const hiredCandidates = await db
      .collection("applications")
      .find({
        jobId: jobId,
        status: "hired",
      })
      .toArray();

    // Enrich candidate data with additional information
    const enrichedCandidates = await Promise.all(
      hiredCandidates.map(async (candidate) => {
        // Get user details
        const userDetails = await db
          .collection("users")
          .findOne({ email: candidate.email });

        // Get payment history
        const payments = await db
          .collection("payments")
          .find({ candidateId: candidate._id.toString() })
          .toArray();

        const totalPayments = payments.reduce(
          (sum, payment) => sum + payment.amount,
          0
        );

        return {
          ...candidate,
          // User details
          location: userDetails?.location || "N/A",
          experience: userDetails?.experience || "N/A",
          skills: userDetails?.skills || [],
          rating: userDetails?.rating || 4.5,

          // Hiring details
          hiredAt: candidate.hiredAt || candidate.updatedAt,
          startDate: candidate.startDate || null,
          offeredSalary: candidate.offeredSalary || 0,
          department: candidate.department || "General",

          // Task and payment status
          taskStatus: candidate.taskStatus || "in_progress",
          paymentStatus: totalPayments > 0 ? "paid" : "pending",
          totalPayments: totalPayments,

          // Additional fields
          lastPaymentDate:
            payments.length > 0
              ? payments[payments.length - 1].createdAt
              : null,
          paymentHistory: payments,
        };
      })
    );

    console.log("enrichedCandidates:", enrichedCandidates);

    return NextResponse.json({
      success: true,
      data: enrichedCandidates,
      count: enrichedCandidates.length,
    });
  } catch (error) {
    console.error("Error fetching hired candidates:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update hired candidate details
export async function PUT(request, { params }) {
  try {
    const { jobId } = params;
    const body = await request.json();
    const { candidateId, ...updateData } = body;

    if (!jobId || !candidateId) {
      return NextResponse.json(
        { error: "Job ID and Candidate ID are required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();

    const result = await db.collection("applications").updateOne(
      {
        _id: new ObjectId(candidateId),
        jobId: jobId,
        status: "hired",
      },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      }
    );

    if (!result.modifiedCount) {
      return NextResponse.json(
        { error: "Candidate not found or no changes made" },
        { status: 404 }
      );
    }

    const updatedCandidate = await db
      .collection("applications")
      .findOne({ _id: new ObjectId(candidateId) });

    return NextResponse.json({
      success: true,
      message: "Candidate updated successfully",
      data: updatedCandidate,
    });
  } catch (error) {
    console.error("Error updating hired candidate:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
