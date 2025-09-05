import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";

// Get all job applications for a specific employee with enhanced status categorization
export async function GET(req) {
  try {
    const db = await connectMongoDB();
    const { searchParams } = new URL(req.url);
    const employeeEmail = searchParams.get("email");

    if (!employeeEmail) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Fetch all applications for the employee
    const allApplications = await db
      .collection("applications")
      .find({ email: employeeEmail })
      .toArray();

    // Categorize applications by status with enhanced logic
    const appliedJobs = allApplications.filter(
      (app) => app.status === "applied" || app.status === "interview-scheduled"
    );

    const approvedJobs = allApplications.filter(
      (app) => app.status === "Approved" || app.status === "approved"
    );

    const rejectedJobs = allApplications.filter(
      (app) => app.status === "Rejected" || app.status === "rejected"
    );

    const completedJobs = allApplications.filter(
      (app) =>
        app.statusJob === "Completed" ||
        app.statusJob === "completed" ||
        app.status === "Completed" ||
        app.status === "completed"
    );

    // Additional categories for better tracking
    const interviewScheduled = allApplications.filter(
      (app) => app.status === "interview-scheduled"
    );

    const pendingReview = allApplications.filter(
      (app) =>
        app.status === "Pending" ||
        app.status === "pending" ||
        app.status === "shortlisted"
    );

    return NextResponse.json({
      allApplications,
      appliedJobs,
      approvedJobs,
      rejectedJobs,
      completedJobs,
      interviewScheduled,
      pendingReview,
    });
  } catch (error) {
    console.error("Error fetching employee applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
