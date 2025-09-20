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
    // First try to find in CompanyEmployees collection
    let employee = await db.collection("CompanyEmployees").findOne({ email });

    // If not found, try in users collection (for backward compatibility)
    if (!employee) {
      employee = await db.collection("users").findOne({ email });
    }

    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(employee);
  } catch (error) {
    console.error("Error fetching employee profile:", error);
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
    // Update in CompanyEmployees collection
    let result = await db
      .collection("CompanyEmployees")
      .updateOne({ _id: new ObjectId(_id) }, { $set: updateData });

    // If not found, also update in users collection (for backward compatibility)
    if (result.modifiedCount === 0) {
      result = await db
        .collection("users")
        .updateOne({ _id: new ObjectId(_id) }, { $set: updateData });
    }

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
    console.error("Error updating employee profile:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
