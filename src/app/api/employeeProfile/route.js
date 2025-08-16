import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// GET Employee Profile
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const db = await connectMongoDB();
    const client = await db.collection("users").findOne({ email });

    if (!client) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(client);
  } catch (error) {
    console.error("Error fetching client profile:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// UPDATE Employee Profile
export async function PUT(req) {
  try {
    const body = await req.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json(
        { error: "Employee ID is required" },
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
    console.error("Error updating client profile:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
