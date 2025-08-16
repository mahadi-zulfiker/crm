import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// ================== GET Client Profile ==================
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const userId = searchParams.get("userId");

    if (!email && !userId) {
      return NextResponse.json(
        { error: "Email or userId is required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const query = email ? { email } : { _id: new ObjectId(userId) };

    const user = await db.collection("users").findOne(query);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...user,
      userType: user.userType || "client",
    });
  } catch (error) {
    console.error("Error fetching client profile:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ================== UPDATE Client Profile ==================
export async function PUT(req) {
  try {
    const body = await req.json();
    const { _id, email, userId, ...updateData } = body;

    if (!_id && !email && !userId) {
      return NextResponse.json(
        { error: "Employee ID, email, or userId is required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const query = _id
      ? { _id: new ObjectId(_id) }
      : email
      ? { email }
      : { _id: new ObjectId(userId) };

    const result = await db
      .collection("users")
      .updateOne(query, { $set: { ...updateData, lastUpdate: new Date() } });

    if (!result.modifiedCount) {
      return NextResponse.json(
        { error: "No changes made or update failed" },
        { status: 400 }
      );
    }

    const updatedUser = await db.collection("users").findOne(query);

    return NextResponse.json({
      message: "Profile updated successfully",
      profile: updatedUser,
    });
  } catch (error) {
    console.error("Error updating client profile:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
