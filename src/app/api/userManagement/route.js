import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const db = await connectMongoDB();
    const usersCollection = db.collection("users");

    // Fetch all users except admins with proper projection
    const users = await usersCollection
      .find(
        { userType: { $ne: "Admin", $ne: "admin" } },
        {
          projection: {
            password: 0, // Exclude password from response
          },
        }
      )
      .toArray();

    return NextResponse.json(
      {
        success: true,
        data: users,
        count: users.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch users",
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { username, email, userType, fullName, phone } = await req.json();

    if (!username || !email || !userType) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: username, email, userType",
        },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const usersCollection = db.collection("users");

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "User with this email already exists",
        },
        { status: 400 }
      );
    }

    const newUser = {
      username,
      email,
      userType,
      fullName: fullName || username,
      phone: phone || "",
      job: "Not Assigned",
      personalInfo: {
        username,
        email,
      },
      createdAt: new Date().toISOString(),
    };

    const result = await usersCollection.insertOne(newUser);

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        data: {
          _id: result.insertedId,
          ...newUser,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create user",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid user ID",
        },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const usersCollection = db.collection("users");

    const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete user",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, job, status, userType } = body;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid user ID",
        },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const usersCollection = db.collection("users");

    const updateData = {};
    if (job !== undefined) updateData.job = job;
    if (status !== undefined) updateData.status = status;
    if (userType !== undefined) updateData.userType = userType;

    updateData.updatedAt = new Date().toISOString();

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update user",
      },
      { status: 500 }
    );
  }
}
