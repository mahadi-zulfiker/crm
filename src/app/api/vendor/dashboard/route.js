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
    const vendor = await db.collection("users").findOne({ email });

    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    // Fetch jobs data
    const jobsData = await db.collection("jobs").find({}).toArray();

    // Filter jobs for this vendor
    const vendorJobs = jobsData.filter((job) => job.vendor === vendor.username);

    // Calculate stats
    const activeProjects = vendorJobs.filter(
      (job) => job.status !== "Completed"
    ).length;
    const completedProjects = vendorJobs.filter(
      (job) => job.status === "Completed"
    ).length;

    // Calculate revenue (mock implementation)
    const totalRevenue = completedProjects * 5000; // Assuming $5000 per completed project

    // Client feedback (mock implementation)
    const clientFeedback = activeProjects > 0 ? 4.5 : 4.8;

    // Recent jobs (limit to 5)
    const recentJobs = vendorJobs.slice(0, 5).map((job) => ({
      id: job._id,
      title: job.title,
      status: job.status,
      category: job.category,
      priority: job.priority,
      createdAt: job.createdAt,
    }));

    return NextResponse.json(
      {
        message: "Dashboard data fetched successfully",
        data: {
          stats: {
            totalServices: vendorJobs.length,
            activeProjects,
            totalRevenue,
            clientFeedback,
          },
          recentJobs,
          vendor: {
            name: vendor.username,
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
