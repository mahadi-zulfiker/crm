import { connectMongoDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// GET: Fetch project history for a vendor
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const vendorEmail = searchParams.get("vendorEmail");
    const year = searchParams.get("year") || "all";
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

    // Build query for completed projects
    const query = { vendorEmail, status: "Completed" };

    // Add year filter if specified
    if (year !== "all") {
      // Assuming projects have a year field or we extract it from createdAt
      query.year = year;
    }

    // Add search filter if specified
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { clientEmail: { $regex: search, $options: "i" } },
      ];
    }

    // Fetch completed projects for this vendor
    const projects = await db
      .collection("vendorProjects")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    // Convert ObjectId to string for JSON serialization and format data
    const formattedProjects = projects.map((project) => ({
      id: project._id.toString(),
      name: project.title || "Untitled Project",
      description: project.description || "",
      client: project.clientEmail || "Unknown Client",
      year: project.createdAt
        ? new Date(project.createdAt).getFullYear().toString()
        : "Unknown",
      duration: project.duration || "Unknown",
      technologies: project.technologies || [],
      budget: project.budget || 0,
      spent: project.spent || 0,
      completedAt: project.updatedAt || project.createdAt,
    }));

    return NextResponse.json(formattedProjects, { status: 200 });
  } catch (error) {
    console.error("Error fetching vendor project history:", error);
    return NextResponse.json(
      { error: "Failed to fetch project history" },
      { status: 500 }
    );
  }
}

// POST: Add a project to history
export async function POST(req) {
  try {
    const {
      vendorEmail,
      title,
      description,
      clientEmail,
      year,
      technologies,
      budget,
    } = await req.json();

    if (!vendorEmail || !title || !description || !clientEmail) {
      return NextResponse.json(
        {
          error:
            "Vendor email, title, description, and client email are required",
        },
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

    // Create new project history entry
    const newProject = {
      vendorEmail,
      title,
      description,
      clientEmail,
      year: year || new Date().getFullYear().toString(),
      technologies: technologies || [],
      budget: budget ? parseFloat(budget) : 0,
      status: "Completed",
      duration: "Unknown", // This would typically be calculated
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("vendorProjects").insertOne(newProject);

    const savedProject = {
      id: result.insertedId.toString(),
      name: newProject.title,
      description: newProject.description,
      client: newProject.clientEmail,
      year: newProject.year,
      duration: newProject.duration,
      technologies: newProject.technologies,
      budget: newProject.budget,
    };

    return NextResponse.json(
      {
        message: "Project added to history successfully",
        project: savedProject,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding project to history:", error);
    return NextResponse.json(
      { error: "Failed to add project to history" },
      { status: 500 }
    );
  }
}

// PUT: Update a project in history
export async function PUT(req) {
  try {
    const { id, vendorEmail, ...updateData } = await req.json();

    if (!id || !ObjectId.isValid(id) || !vendorEmail) {
      return NextResponse.json(
        { error: "Valid project ID and vendor email are required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();

    // Verify the project belongs to this vendor
    const project = await db
      .collection("vendorProjects")
      .findOne({ _id: new ObjectId(id), vendorEmail, status: "Completed" });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found or access denied" },
        { status: 404 }
      );
    }

    // Update project
    const result = await db.collection("vendorProjects").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
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

// DELETE: Remove a project from history
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const vendorEmail = searchParams.get("vendorEmail");

    if (!id || !ObjectId.isValid(id) || !vendorEmail) {
      return NextResponse.json(
        { error: "Valid project ID and vendor email are required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();

    // Verify the project belongs to this vendor
    const project = await db
      .collection("vendorProjects")
      .findOne({ _id: new ObjectId(id), vendorEmail, status: "Completed" });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found or access denied" },
        { status: 404 }
      );
    }

    // Delete project
    const result = await db
      .collection("vendorProjects")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Project removed from history successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to remove project from history" },
      { status: 500 }
    );
  }
}
