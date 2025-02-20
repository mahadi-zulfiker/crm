import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Ensures fresh data on every request

export async function GET(req) {
  try {
    // Extract user email from query params
    const { email } = req.nextUrl.searchParams;
    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    // Connect to MongoDB
    const db = await connectMongoDB();
    const user = await db.collection("users").findOne({ email }, { projection: { password: 0 } });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
