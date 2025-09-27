import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";

// GET: Fetch all dashboard data for employee in a single request
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const db = await connectMongoDB();

    // Fetch employee profile
    let employee = await db.collection("CompanyEmployees").findOne({ email });

    // If not found, try in users collection (for backward compatibility)
    if (!employee) {
      employee = await db.collection("users").findOne({ email });
    }

    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      );
    }

    // Fetch applications data
    const applications = await db
      .collection("applications")
      .find({ email })
      .sort({ appliedAt: -1 })
      .toArray();

    // Fetch all jobs (for saved jobs calculation)
    const jobs = await db.collection("jobs").find({}).toArray();

    // Process stats
    const applicationsSent = applications.length || 0;
    const savedJobs =
      jobs.filter((job) => job.savedBy?.includes(email)).length || 0;

    const interviewScheduled =
      applications.filter((app) => app.status === "interview-scheduled")
        .length || 0;

    // Process recent jobs (limit to 3)
    const recentApplications = applications.slice(0, 3);

    // Process skills data (limit to 4)
    const skills = employee.skills?.slice(0, 4) || [];

    // Process application timeline data
    const timelineData = processTimelineData(applications);

    return NextResponse.json(
      {
        message: "Dashboard data fetched successfully",
        data: {
          stats: {
            applicationsSent,
            profileViews: employee.profileViews || 0,
            savedJobs,
            interviewInvites: interviewScheduled,
          },
          recentJobs: recentApplications,
          skills,
          timelineData,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching employee dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}

// Process timeline data from applications
const processTimelineData = (applications) => {
  // Group applications by month
  const monthlyData = {};

  applications.forEach((app) => {
    if (app.appliedAt) {
      const date = new Date(app.appliedAt);
      const monthYear = `${date.toLocaleString("default", {
        month: "short",
      })} ${date.getFullYear()}`;

      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = { applications: 0, interviews: 0 };
      }

      monthlyData[monthYear].applications += 1;
      if (
        app.status === "interview-scheduled" ||
        app.status === "shortlisted"
      ) {
        monthlyData[monthYear].interviews += 1;
      }
    }
  });

  // Convert to array format for chart
  return Object.entries(monthlyData).map(([name, data]) => ({
    name,
    applications: data.applications,
    interviews: data.interviews,
  }));
};
