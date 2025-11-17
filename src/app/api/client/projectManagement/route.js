import { connectMongoDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// GET: Fetch all projects for a specific client
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const clientEmail = searchParams.get("clientEmail");
    const status = searchParams.get("status");

    if (!clientEmail) {
      return NextResponse.json({ error: "Client email is required" }, { status: 400 });
    }

    const db = await connectMongoDB();
    
    // Build query
    const query = { clientEmail };
    if (status && status !== "all") {
      query.status = status;
    }

    // Fetch projects
    const projects = await db
      .collection("vendorProjects")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    // Convert ObjectId to string for JSON serialization
    const serializedProjects = projects.map(project => ({
      ...project,
      _id: project._id.toString(),
      id: project._id.toString(),
    }));

    return NextResponse.json(serializedProjects, { status: 200 });
  } catch (error) {
    console.error("Error fetching client projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST: Create a new project for client
export async function POST(req) {
  try {
    const { clientEmail, title, description, vendorEmail, budget, deadline } = await req.json();

    if (!clientEmail || !title || !description || !vendorEmail || !budget) {
      return NextResponse.json(
        { error: "Client email, title, description, vendor email, and budget are required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    
    // Verify vendor exists
    const vendor = await db
      .collection("users")
      .findOne({ email: vendorEmail, userType: "Vendor" });

    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    // Verify client exists
    const client = await db
      .collection("users")
      .findOne({ email: clientEmail });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Create new project
    const newProject = {
      title,
      description,
      vendorEmail,
      clientEmail,
      budget: parseFloat(budget),
      deadline: deadline ? new Date(deadline) : null,
      status: "Pending",
      assignedEmployees: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db
      .collection("vendorProjects")
      .insertOne(newProject);

    const savedProject = {
      ...newProject,
      _id: result.insertedId.toString(),
      id: result.insertedId.toString(),
    };

    return NextResponse.json(
      { message: "Project created successfully", project: savedProject },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

// PUT: Update a project
export async function PUT(req) {
  try {
    const { id, clientEmail, ...updateData } = await req.json();

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Valid project ID is required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();

    // Verify the project belongs to this client
    const project = await db
      .collection("vendorProjects")
      .findOne({ _id: new ObjectId(id), clientEmail });

    if (!project) {
      return NextResponse.json({ error: "Project not found or access denied" }, { status: 404 });
    }

    // Update project
    const result = await db
      .collection("vendorProjects")
      .updateOne(
        { _id: new ObjectId(id) },
        { 
          $set: { 
            ...updateData, 
            updatedAt: new Date() 
          } 
        }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Project updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a project
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const clientEmail = searchParams.get("clientEmail");

    if (!id || !ObjectId.isValid(id) || !clientEmail) {
      return NextResponse.json(
        { error: "Valid project ID and client email are required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();

    // Verify the project belongs to this client
    const project = await db
      .collection("vendorProjects")
      .findOne({ _id: new ObjectId(id), clientEmail });

    if (!project) {
      return NextResponse.json({ error: "Project not found or access denied" }, { status: 404 });
    }

    // Delete project
    const result = await db
      .collection("vendorProjects")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}