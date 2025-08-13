import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Get all job applications for a specific employee categorized by status
export async function GET(req) {
  try {
    const db = await connectMongoDB();
    const applicationsCollection = db.collection("applications");

    const { searchParams } = new URL(req.url);
    const employeeEmail = searchParams.get("email");

    if (!employeeEmail) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Fetch all applications for the employee
    const allApplications = await applicationsCollection
      .find({ email: employeeEmail })
      .toArray();

    // Categorize applications by status
    const appliedJobs = allApplications.filter(
      (app) => app.status === "applied"
    );
    const approvedJobs = allApplications.filter(
      (app) => app.status === "Approved"
    );
    const rejectedJobs = allApplications.filter(
      (app) => app.status === "Rejected"
    );
    const completedJobs = allApplications.filter(
      (app) => app.statusJob === "Completed"
    );

    return NextResponse.json({
      allApplications,
      appliedJobs,
      approvedJobs,
      rejectedJobs,
      completedJobs,
    });
  } catch (error) {
    console.error("Error fetching employee jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

// Apply for a job
export async function POST(req) {
  try {
    const db = await connectMongoDB();
    const applicationsCollection = db.collection("applications");
    const { fullName, email, phone, resume, coverLetter, jobId } =
      await req.json();

    // Check if the employee has already applied for this job
    const existingApplication = await applicationsCollection.findOne({
      email,
      jobId,
    });
    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied for this job" },
        { status: 400 }
      );
    }

    // Create a new job application
    const newApplication = {
      fullName,
      email,
      phone,
      resume,
      coverLetter,
      jobId,
      appliedAt: new Date(),
      status: "Pending",
      statusJob: "In Progress",
    };

    await applicationsCollection.insertOne(newApplication);

    return NextResponse.json({ message: "Application submitted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to apply for job" },
      { status: 500 }
    );
  }
}
