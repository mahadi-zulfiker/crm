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
