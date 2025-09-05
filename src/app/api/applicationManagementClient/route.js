import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

// GET all applications for a client
export async function GET(req) {
  try {
    const db = await connectMongoDB();

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const clientId = searchParams.get("clientId");

    // Build query
    let query = {};

    // If status is provided, filter by status
    if (status) {
      query.status = status;
    }

    // If clientId is provided, we would normally filter by clientId
    // but we need to join with jobs collection to get this information
    // For now, we'll return all applications and filter on the client side

    const applications = await db
      .collection("applications")
      .find(query)
      .toArray();

    // If clientId is provided, filter applications by jobs posted by this client
    if (clientId) {
      // Get jobs posted by this client
      const jobs = await db
        .collection("jobs")
        .find({
          // Assuming jobs have a clientId or postedBy field
          $or: [{ clientId: clientId }, { postedBy: clientId }],
        })
        .toArray();

      // Get job IDs
      const jobIds = jobs.map((job) => job._id.toString());

      // Filter applications by job IDs
      const filteredApplications = applications.filter((app) =>
        jobIds.includes(app.jobId)
      );

      return NextResponse.json({
        success: true,
        data: filteredApplications,
      });
    }

    return NextResponse.json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
