import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";

export async function GET(req) {
  try {
    const db = await connectMongoDB();
    const jobsCollection = db.collection("jobs");

    // Fetch jobs with various completed statuses
    const completedJobs = await jobsCollection
      .find({
        $or: [
          { status: "Completed" },
          { statusJob: "Completed" },
          { status: "Finished" },
          { statusJob: "Finished" },
        ],
      })
      .toArray();

    // Also fetch from applications collection for completed applications
    const applicationsCollection = db.collection("applications");
    const completedApplications = await applicationsCollection
      .find({
        $or: [
          { status: "Completed" },
          { statusJob: "Completed" },
          { status: "Finished" },
          { statusJob: "Finished" },
        ],
      })
      .toArray();

    // Combine both arrays
    const allCompletedJobs = [...completedJobs, ...completedApplications];

    return NextResponse.json(allCompletedJobs, { status: 200 });
  } catch (error) {
    console.error("Error fetching job history:", error);
    return NextResponse.json(
      { error: "Failed to fetch job history" },
      { status: 500 }
    );
  }
}
