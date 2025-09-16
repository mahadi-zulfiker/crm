import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

// GET - Fetch all notices
export async function GET() {
  try {
    const db = await connectMongoDB();
    const noticesCollection = db.collection("notices");

    const notices = await noticesCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(
      {
        success: true,
        data: notices,
        count: notices.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching notices:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch notices",
      },
      { status: 500 }
    );
  }
}

// POST - Create new notice (Admin only)
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      title,
      content,
      createdBy,
      priority,
      audience, // 'all', 'client', 'employee', 'vendor', 'admin'
    } = body;

    // Validate required fields
    if (!title || !content || !createdBy) {
      return NextResponse.json(
        {
          success: false,
          error: "Title, content, and creator are required",
        },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const noticesCollection = db.collection("notices");

    const newNotice = {
      title,
      content,
      createdBy,
      priority: priority || "normal",
      audience: audience || "all",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await noticesCollection.insertOne(newNotice);

    return NextResponse.json(
      {
        success: true,
        message: "Notice created successfully",
        data: {
          _id: result.insertedId,
          ...newNotice,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating notice:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create notice",
      },
      { status: 500 }
    );
  }
}

// PUT - Update notice (Admin only)
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, title, content, priority, audience } = body;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Valid notice ID is required",
        },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const noticesCollection = db.collection("notices");

    const updateFields = {
      updatedAt: new Date(),
    };

    if (title) updateFields.title = title;
    if (content) updateFields.content = content;
    if (priority) updateFields.priority = priority;
    if (audience) updateFields.audience = audience;

    const result = await noticesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Notice not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Notice updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating notice:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update notice",
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete notice (Admin only)
export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Valid notice ID is required",
        },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const noticesCollection = db.collection("notices");

    const result = await noticesCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Notice not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Notice deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting notice:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete notice",
      },
      { status: 500 }
    );
  }
}
