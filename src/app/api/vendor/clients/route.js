import { connectMongoDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// GET: Fetch clients and admins connected to a vendor
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const vendorEmail = searchParams.get("vendorEmail");
    const type = searchParams.get("type") || "all";
    const search = searchParams.get("search") || "";

    if (!vendorEmail) {
      return NextResponse.json(
        { error: "Vendor email is required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();

    // Find vendor by email
    const vendor = await db
      .collection("users")
      .findOne({ email: vendorEmail, userType: "Vendor" });

    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    // Build query for connected clients and admins
    // First, get all connections for this vendor
    const connections = await db
      .collection("vendorConnections")
      .find({ vendorEmail })
      .toArray();

    // Extract user emails from connections
    const connectedUserEmails = connections.map((conn) => conn.userEmail);

    // Build query for connected users only
    const query = {
      email: { $in: connectedUserEmails },
    };

    // Add type filter if specified
    if (type !== "all") {
      query.userType = type.charAt(0).toUpperCase() + type.slice(1);
    }

    // Add search filter if specified
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { username: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    // Fetch connected clients and admins
    const users = await db
      .collection("users")
      .find(query)
      .sort({ name: 1 })
      .toArray();

    // Create a map of connections for easy lookup
    const connectionMap = {};
    connections.forEach((conn) => {
      connectionMap[conn.userEmail] = conn;
    });

    // Enhance user data with project information and connection notes
    const enhancedUsers = await Promise.all(
      users.map(async (user) => {
        // Count projects associated with this user and vendor
        const projectsCount = await db
          .collection("vendorProjects")
          .countDocuments({
            vendorEmail: vendorEmail,
            $or: [{ clientEmail: user.email }, { adminEmail: user.email }],
          });

        // Get last contact date (from latest project update)
        const lastProject = await db.collection("vendorProjects").findOne(
          {
            vendorEmail: vendorEmail,
            $or: [{ clientEmail: user.email }, { adminEmail: user.email }],
          },
          { sort: { updatedAt: -1 } }
        );

        return {
          id: user._id.toString(),
          name: user.name || user.username || user.email,
          email: user.email,
          company: user.company || "",
          phone: user.phone || "",
          type: user.userType?.toLowerCase() || "client",
          notes: connectionMap[user.email]?.notes || user.notes || "",
          projectsCount,
          lastContact: lastProject ? lastProject.updatedAt : null,
        };
      })
    );

    return NextResponse.json(enhancedUsers, { status: 200 });
  } catch (error) {
    console.error("Error fetching vendor clients:", error);
    return NextResponse.json(
      { error: "Failed to fetch clients and admins" },
      { status: 500 }
    );
  }
}

// POST: Add a new client/admin connection
export async function POST(req) {
  try {
    const { vendorEmail, name, email, company, phone, type, notes } =
      await req.json();

    if (!vendorEmail || !name || !email) {
      return NextResponse.json(
        { error: "Vendor email, name, and email are required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();

    // Find vendor by email
    const vendor = await db
      .collection("users")
      .findOne({ email: vendorEmail, userType: "Vendor" });

    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    // Check if user already exists
    let user = await db.collection("users").findOne({ email });

    if (!user) {
      // Create new user if they don't exist
      const newUser = {
        name,
        email,
        company: company || "",
        phone: phone || "",
        userType: type?.charAt(0).toUpperCase() + type?.slice(1) || "Client",
        notes: notes || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await db.collection("users").insertOne(newUser);
      user = { ...newUser, _id: result.insertedId };
    }

    // Create connection record
    const connection = {
      vendorEmail,
      userEmail: user.email,
      type: type || "client",
      notes: notes || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Check if connection already exists
    const existingConnection = await db
      .collection("vendorConnections")
      .findOne({
        vendorEmail,
        userEmail: user.email,
      });

    if (!existingConnection) {
      await db.collection("vendorConnections").insertOne(connection);
    }

    const clientData = {
      id: user._id.toString(),
      name: user.name || user.username || user.email,
      email: user.email,
      company: user.company || "",
      phone: user.phone || "",
      type: user.userType?.toLowerCase() || "client",
      notes: user.notes || "",
      projectsCount: 0,
      lastContact: null,
    };

    return NextResponse.json(
      { message: "Connection added successfully", client: clientData },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding client connection:", error);
    return NextResponse.json(
      { error: "Failed to add client connection" },
      { status: 500 }
    );
  }
}

// PUT: Update a client/admin connection
export async function PUT(req) {
  try {
    const { id, vendorEmail, ...updateData } = await req.json();

    if (!id || !ObjectId.isValid(id) || !vendorEmail) {
      return NextResponse.json(
        { error: "Valid user ID and vendor email are required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();

    // Find vendor by email
    const vendor = await db
      .collection("users")
      .findOne({ email: vendorEmail, userType: "Vendor" });

    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    // Update user data
    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update connection notes if provided
    if (updateData.notes !== undefined) {
      await db.collection("vendorConnections").updateOne(
        {
          vendorEmail,
          userEmail: (
            await db.collection("users").findOne({ _id: new ObjectId(id) })
          ).email,
        },
        {
          $set: {
            notes: updateData.notes,
            updatedAt: new Date(),
          },
        }
      );
    }

    return NextResponse.json(
      { message: "Connection updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating client connection:", error);
    return NextResponse.json(
      { error: "Failed to update client connection" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a client/admin connection
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const vendorEmail = searchParams.get("vendorEmail");

    if (!id || !ObjectId.isValid(id) || !vendorEmail) {
      return NextResponse.json(
        { error: "Valid user ID and vendor email are required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();

    // Find vendor by email
    const vendor = await db
      .collection("users")
      .findOne({ email: vendorEmail, userType: "Vendor" });

    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    // Get user email before deleting
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Remove connection record (but keep user in the system)
    await db.collection("vendorConnections").deleteOne({
      vendorEmail,
      userEmail: user.email,
    });

    return NextResponse.json(
      { message: "Connection removed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing client connection:", error);
    return NextResponse.json(
      { error: "Failed to remove client connection" },
      { status: 500 }
    );
  }
}
