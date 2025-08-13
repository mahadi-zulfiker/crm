import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// GET User Profile
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const db = await connectMongoDB();
    const User = await db.collection("users").findOne({ email });

    if (!User) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(User);
  } catch (error) {
    console.error("Error fetching User profile:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// UPDATE User Profile
export async function PUT(req) {
  try {
    const body = await req.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const result = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(_id) }, { $set: updateData });

    if (!result.modifiedCount) {
      return NextResponse.json(
        { error: "No changes made or update failed" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Profile updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating User profile:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
