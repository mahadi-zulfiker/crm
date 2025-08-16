import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET Admin Profile
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const db = await connectMongoDB();
    const admin = await db.collection("users").findOne(
      { email },
      { projection: { password: 0 } } // Exclude password from response
    );

    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: admin });
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// UPDATE Admin Profile
export async function PUT(req) {
  try {
    const { _id, username, fullName, phone, department, bio } =
      await req.json();

    if (!_id) {
      return NextResponse.json(
        { error: "Admin ID is required" },
        { status: 400 }
      );
    }

    const updateData = {};
    if (username) updateData.username = username;
    if (fullName) updateData.fullName = fullName;
    if (phone) updateData.phone = phone;
    if (department) updateData.department = department;
    if (bio) updateData.bio = bio;
    updateData.updatedAt = new Date();

    const db = await connectMongoDB();
    const updatedAdmin = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(_id) }, { $set: updateData });

    if (!updatedAdmin.modifiedCount) {
      return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating admin profile:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
