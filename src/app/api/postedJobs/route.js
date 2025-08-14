import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const db = await connectMongoDB();

    // Get email from query parameters
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    // Build query
    const query = email ? { email } : {};

    const jobs = await db.collection("jobs").find(query).toArray();

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
