import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";

// GET: Fetch all dashboard data for vendor in a single request
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const db = await connectMongoDB();

    // Fetch vendor profile
    // Looking for users with userType: "Vendor" instead of role: "vendor"
    const vendor = await db
      .collection("users")
      .findOne({ email, userType: "Vendor" });

    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    // Fetch jobs data
    const jobsData = await db
      .collection("jobs")
      .find({ vendor: vendor.username || vendor.name || vendor.email })
      .toArray();

    // Calculate stats
    const activeProjects = jobsData.filter(
      (job) => job.status !== "Completed"
    ).length;
    const completedProjects = jobsData.filter(
      (job) => job.status === "Completed"
    ).length;

    // Calculate revenue
    const totalRevenue = completedProjects * 5000; // Assuming $5000 per completed project

    // Client feedback (mock implementation)
    const clientFeedback = activeProjects > 0 ? 4.5 : 4.8;

    // Recent jobs (limit to 5)
    const recentJobs = jobsData.slice(0, 5).map((job) => ({
      id: job._id,
      title: job.title,
      status: job.status,
      category: job.category,
      priority: job.priority,
      createdAt: job.createdAt,
      location: job.location,
      salary: job.salary,
      applications: job.applications?.length || 0,
    }));

    // Process timeline data from jobs
    const timelineData = processTimelineData(jobsData);

    // Calculate performance metrics
    const completionRate =
      jobsData.length > 0
        ? Math.round((completedProjects / jobsData.length) * 100)
        : 0;
    const onTimeDelivery =
      jobsData.length > 0
        ? Math.round((completedProjects / jobsData.length) * 92)
        : 92;
    const responseTime = "2 hours"; // Mock data

    return NextResponse.json(
      {
        message: "Dashboard data fetched successfully",
        data: {
          stats: {
            totalServices: jobsData.length,
            activeProjects,
            totalRevenue,
            clientFeedback,
            completionRate,
            onTimeDelivery,
          },
          recentJobs,
          timelineData,
          vendor: {
            name: vendor.username || vendor.name,
            email: vendor.email,
            contactInfo: vendor.contactInfo,
            manpowerCount: vendor.manpowerCount,
            hasManpower: vendor.hasManpower,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching vendor dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}

// Process timeline data from jobs
const processTimelineData = (jobs) => {
  // Group jobs by month
  const monthlyData = {};

  jobs.forEach((job) => {
    if (job.createdAt) {
      const date = new Date(job.createdAt);
      const monthYear = `${date.toLocaleString("default", {
        month: "short",
      })} ${date.getFullYear()}`;

      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = { jobsPosted: 0, jobsCompleted: 0 };
      }

      monthlyData[monthYear].jobsPosted += 1;
      if (job.status === "Completed") {
        monthlyData[monthYear].jobsCompleted += 1;
      }
    }
  });

  // Convert to array format for chart
  return Object.entries(monthlyData).map(([name, data]) => ({
    name,
    jobsPosted: data.jobsPosted,
    jobsCompleted: data.jobsCompleted,
  }));
};
