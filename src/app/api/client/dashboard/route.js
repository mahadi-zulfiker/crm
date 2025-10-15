import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";

// GET: Fetch all dashboard data for client in a single request
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const db = await connectMongoDB();

    // Fetch posted jobs
    const jobsArray = await db
      .collection("jobs")
      .find({ postedBy: email })
      .toArray();

    // Fetch payment history
    const paymentHistoryData = await db
      .collection("payments")
      .find({ clientEmail: email })
      .toArray();

    // Process stats
    const activeJobs = jobsArray.filter(
      (job) => job.status === "Active"
    ).length;

    const totalApplications = jobsArray.length;
    const hiredCandidates = jobsArray.filter(
      (candidate) => candidate.status === "hired"
    );
    const shortlistedCandidates = jobsArray.filter(
      (candidate) =>
        candidate.status === "shortlisted" || candidate.status === "hired"
    );
    const completedCandidates = jobsArray.filter(
      (candidate) =>
        candidate.taskStatus === "completed" ||
        candidate.taskStatus === "Completed"
    );

    const totalSpent = paymentHistoryData.reduce(
      (sum, payment) => sum + (payment.payment || payment.amount || 0),
      0
    );

    const averageRating =
      hiredCandidates.length > 0
        ? (
            hiredCandidates.reduce(
              (sum, candidate) => sum + (candidate.rating || 4.5),
              0
            ) / hiredCandidates.length
          ).toFixed(1)
        : 0;

    // Process recent jobs (limit to 5)
    const recentJobs = jobsArray.slice(0, 5).map((job) => ({
      id: job._id,
      title: job.title || "Untitled Job",
      location: job.location || "Remote",
      type: job.jobType || "Full-time",
      applications: jobsArray.filter((candidate) => candidate.jobId === job._id)
        .length,
      status: job.status || "Draft",
      postedDate: job.createdAt || job.postedDate,
      salary: job.salary || "Not specified",
    }));

    // Process recent applications (limit to 5)
    const recentApplications = jobsArray.slice(0, 5).map((candidate) => ({
      id: candidate._id,
      candidateName: candidate.fullName || "Unknown Candidate",
      jobTitle: candidate.position || "Unknown Position",
      appliedDate: candidate.appliedAt,
      status: candidate.status || "applied",
      experience: candidate.experience || "N/A",
      avatar: candidate.profileImage || "/placeholder.svg?height=40&width=40",
    }));

    return NextResponse.json(
      {
        message: "Dashboard data fetched successfully",
        data: {
          stats: {
            activeJobs,
            totalApplications,
            shortlistedCandidates: shortlistedCandidates.length,
            totalSpent,
            completedJobs: completedCandidates.length,
            hiredCandidates: hiredCandidates.length,
            averageRating: Number.parseFloat(averageRating),
          },
          recentJobs,
          recentApplications,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching client dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
