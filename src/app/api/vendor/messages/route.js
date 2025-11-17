import { connectMongoDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// GET: Fetch messages between vendor and a specific client/admin
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const vendorEmail = searchParams.get("vendorEmail");
    const userEmail = searchParams.get("userEmail");
    const limit = parseInt(searchParams.get("limit")) || 50;
    const offset = parseInt(searchParams.get("offset")) || 0;

    if (!vendorEmail || !userEmail) {
      return NextResponse.json(
        { error: "Vendor email and user email are required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();

    // Verify that the vendor exists
    const vendor = await db
      .collection("users")
      .findOne({ email: vendorEmail, userType: "Vendor" });

    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    // Verify that the user exists and is connected to the vendor
    const connection = await db.collection("vendorConnections").findOne({
      vendorEmail,
      userEmail,
    });

    if (!connection) {
      return NextResponse.json(
        { error: "User is not connected to this vendor" },
        { status: 403 }
      );
    }

    // Fetch messages between vendor and user
    const messages = await db
      .collection("messages")
      .find({
        $or: [
          { from: vendorEmail, to: userEmail },
          { from: userEmail, to: vendorEmail },
        ],
      })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .toArray();

    // Mark messages as read if they are from the user to the vendor
    await db.collection("messages").updateMany(
      {
        from: userEmail,
        to: vendorEmail,
        read: false,
      },
      {
        $set: { read: true },
      }
    );

    return NextResponse.json(
      messages.map((msg) => ({
        id: msg._id.toString(),
        from: msg.from,
        to: msg.to,
        content: msg.content,
        read: msg.read,
        createdAt: msg.createdAt,
      })),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

// POST: Send a message from vendor to client/admin
export async function POST(req) {
  try {
    const { vendorEmail, userEmail, content } = await req.json();

    if (!vendorEmail || !userEmail || !content) {
      return NextResponse.json(
        { error: "Vendor email, user email, and content are required" },
        { status: 400 }
      );
    }

    if (content.trim().length === 0) {
      return NextResponse.json(
        { error: "Message content cannot be empty" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();

    // Verify that the vendor exists
    const vendor = await db
      .collection("users")
      .findOne({ email: vendorEmail, userType: "Vendor" });

    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    // Verify that the user exists and is connected to the vendor
    const user = await db.collection("users").findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const connection = await db.collection("vendorConnections").findOne({
      vendorEmail,
      userEmail,
    });

    if (!connection) {
      return NextResponse.json(
        { error: "User is not connected to this vendor" },
        { status: 403 }
      );
    }

    // Create message
    const message = {
      from: vendorEmail,
      to: userEmail,
      content: content.trim(),
      read: false,
      createdAt: new Date(),
    };

    const result = await db.collection("messages").insertOne(message);

    return NextResponse.json(
      {
        id: result.insertedId.toString(),
        ...message,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
