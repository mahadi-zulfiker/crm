import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

// GET - Fetch all projects
export async function GET() {
  try {
    const db = await connectMongoDB();
    const projectsCollection = db.collection("projects");

    const projects = await projectsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(
      {
        success: true,
        data: projects,
        count: projects.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch projects",
      },
      { status: 500 }
    );
  }
}

// POST - Create new project
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      description,
      location,
      startDate,
      endDate,
      status,
      category,
      budget,
      client,
      teamSize,
      technologies,
      image,
    } = body;

    // Validate required fields
    if (!name || !description || !location || !startDate || !status) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Name, description, location, start date, and status are required",
        },
        { status: 400 }
      );
    }

    // Validate dates
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;

    if (end && end < start) {
      return NextResponse.json(
        {
          success: false,
          error: "End date cannot be before start date",
        },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const projectsCollection = db.collection("projects");

    const newProject = {
      name: name.trim(),
      description: description.trim(),
      location: location.trim(),
      startDate: start,
      endDate: end,
      status,
      category: category || "General",
      budget: budget || null,
      client: client || null,
      teamSize: teamSize || null,
      technologies: technologies || [],
      image: image || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await projectsCollection.insertOne(newProject);

    return NextResponse.json(
      {
        success: true,
        message: "Project created successfully",
        data: { ...newProject, _id: result.insertedId },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create project",
      },
      { status: 500 }
    );
  }
}

// PUT - Update project
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Valid project ID is required",
        },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const projectsCollection = db.collection("projects");

    const updateFields = {
      ...updateData,
      updatedAt: new Date(),
    };

    // Remove undefined fields
    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key] === undefined) {
        delete updateFields[key];
      }
    });

    const result = await projectsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Project not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Project updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update project",
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete project
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Valid project ID is required",
        },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const projectsCollection = db.collection("projects");

    const result = await projectsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Project not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Project deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete project",
      },
      { status: 500 }
    );
  }
}
