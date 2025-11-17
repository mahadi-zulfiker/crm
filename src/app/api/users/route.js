import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

// GET: Fetch users by type
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    const db = await connectMongoDB();

    // Build query
    const query = {};
    if (type) {
      query.userType = type;
    }

    // Fetch users
    const users = await db
      .collection("users")
      .find(query)
      .project({ email: 1, name: 1, userType: 1 })
      .sort({ name: 1 })
      .toArray();

    // Convert ObjectId to string for JSON serialization
    const serializedUsers = users.map(user => ({
      ...user,
      _id: user._id.toString(),
    }));

    return NextResponse.json(serializedUsers, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}