import { connectMongoDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// GET applications for a specific job
export async function GET(req, { params }) {
  try {
    const { jobId } = params;

    if (!ObjectId.isValid(jobId)) {
      return NextResponse.json(
        { success: false, error: "Invalid Job ID" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const applications = await db
      .collection("applications")
      .find({ jobId })
      .toArray();

    return NextResponse.json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { jobId } = params;
    console.log("Deleting applications for job:", jobId);

    if (!ObjectId.isValid(jobId)) {
      return NextResponse.json(
        { success: false, error: "Invalid Job ID" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    await db.collection("jobs").deleteOne({ _id: new ObjectId(jobId) });

    return NextResponse.json({
      success: true,
      deletedCount: result.deletedCount,
      message: `Deleted ${result.deletedCount} applications for Job ID ${jobId}`,
    });
  } catch (error) {
    console.error("Error deleting applications:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
