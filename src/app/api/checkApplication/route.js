import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

// GET: Check if user has already applied for a job
export async function GET(req) {
  try {
    const db = await connectMongoDB();

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("jobId");
    const email = searchParams.get("email");

    if (!jobId || !email) {
      return NextResponse.json(
        { success: false, error: "Job ID and email are required" },
        { status: 400 }
      );
    }

    // Check if application exists
    const application = await db.collection("applications").findOne({
      jobId: jobId,
      email: email,
    });

    return NextResponse.json({
      success: true,
      applied: !!application,
      application: application || null,
    });
  } catch (error) {
    console.error("Check Application Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
