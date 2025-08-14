import { connectMongoDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { jobId } = params;

    if (!ObjectId.isValid(jobId)) {
      return NextResponse.json({ error: "Invalid Job ID" }, { status: 400 });
    }

    const db = await connectMongoDB();
    const job = await db
      .collection("jobs")
      .findOne({ _id: new ObjectId(jobId) });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job, { status: 200 });
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PUT /api/jobs/[jobId]
export async function PUT(req, { params }) {
  try {
    const { jobId } = params;
    let body = await req.json();

    if (!ObjectId.isValid(jobId)) {
      return NextResponse.json({ error: "Invalid Job ID" }, { status: 400 });
    }

    // Remove _id if present
    delete body._id;

    const db = await connectMongoDB();
    const result = await db
      .collection("jobs")
      .updateOne(
        { _id: new ObjectId(jobId) },
        { $set: { ...body, updatedAt: new Date() } }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Job updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
