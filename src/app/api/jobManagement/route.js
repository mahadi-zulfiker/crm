import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

// GET: Fetch all jobs with enhanced data
export async function GET() {
  try {
    const db = await connectMongoDB();
    const jobsCollection = db.collection("jobs");

    // Fetch jobs with additional aggregation for better data
    const jobs = await jobsCollection
      .aggregate([
        {
          $addFields: {
            createdAt: { $ifNull: ["$createdAt", new Date()] },
            updatedAt: { $ifNull: ["$updatedAt", new Date()] },
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ])
      .toArray();

    return NextResponse.json(
      {
        success: true,
        data: jobs,
        total: jobs.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch jobs",
      },
      { status: 500 }
    );
  }
}

// POST: Add a new job with enhanced validation
export async function POST(req) {
  try {
    const { title, description, company, location, salary, jobType, category } =
      await req.json();

    if (!title || !description) {
      return NextResponse.json(
        {
          success: false,
          error: "Title and description are required",
        },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const jobsCollection = db.collection("jobs");

    const newJob = {
      title,
      description,
      company: company || "Not Specified",
      location: location || "Not Specified",
      salary: salary || "Not Specified",
      jobType: jobType || "Full-time",
      category: category || "General",
      status: "Pending",
      vendor: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await jobsCollection.insertOne(newJob);

    return NextResponse.json(
      {
        success: true,
        data: { _id: result.insertedId, ...newJob },
        message: "Job created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create job",
      },
      { status: 500 }
    );
  }
}

// PUT: Update job with enhanced functionality
export async function PUT(req) {
  try {
    const {
      id,
      status,
      vendor,
      title,
      description,
      company,
      location,
      salary,
    } = await req.json();

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid job ID",
        },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const jobsCollection = db.collection("jobs");

    const updateFields = { updatedAt: new Date() };

    if (status) updateFields.status = status;
    if (vendor !== undefined) updateFields.vendor = vendor;
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (company) updateFields.company = company;
    if (location) updateFields.location = location;
    if (salary) updateFields.salary = salary;

    const result = await jobsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Job not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Job updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update job",
      },
      { status: 500 }
    );
  }
}

// DELETE: Remove a job with validation
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid job ID",
        },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const jobsCollection = db.collection("jobs");

    const result = await jobsCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Job not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Job deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete job",
      },
      { status: 500 }
    );
  }
}
