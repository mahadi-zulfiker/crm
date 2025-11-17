import { connectMongoDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// GET: Fetch project tracking data for a vendor
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const vendorEmail = searchParams.get("vendorEmail");

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

    // Fetch all projects for this vendor
    const projects = await db
      .collection("vendorProjects")
      .find({ vendorEmail })
      .sort({ createdAt: -1 })
      .toArray();

    // Calculate summary statistics
    const totalProjects = projects.length;
    const completedProjects = projects.filter(
      (p) => p.status === "Completed"
    ).length;
    const inProgressProjects = projects.filter(
      (p) => p.status === "In Progress"
    ).length;
    const totalRevenue = projects.reduce(
      (sum, project) => sum + (project.spent || 0),
      0
    );

    // Calculate budget utilization for each project
    const projectsWithUtilization = projects.map((project) => {
      const budgetUtilization =
        project.budget > 0
          ? Math.round(((project.spent || 0) / project.budget) * 100)
          : 0;

      return {
        ...project,
        _id: project._id.toString(),
        id: project._id.toString(),
        budgetUtilization,
        timeEntries: project.timeEntries || [],
      };
    });

    // Get recent time entries across all projects
    const allTimeEntries = projectsWithUtilization
      .flatMap((project) => project.timeEntries || [])
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);

    return NextResponse.json(
      {
        summary: {
          totalProjects,
          completedProjects,
          inProgressProjects,
          totalRevenue,
        },
        projects: projectsWithUtilization,
        recentActivity: allTimeEntries,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching project tracking data:", error);
    return NextResponse.json(
      { error: "Failed to fetch project tracking data" },
      { status: 500 }
    );
  }
}

// POST: Add time entry to a project
export async function POST(req) {
  try {
    const { projectId, employeeEmail, hours, task, date } = await req.json();

    if (!projectId || !employeeEmail || !hours || !task || !date) {
      return NextResponse.json(
        {
          error:
            "Project ID, employee email, hours, task, and date are required",
        },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();

    // Verify employee exists
    const employee = await db
      .collection("users")
      .findOne({ email: employeeEmail });

    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      );
    }

    // Create time entry
    const timeEntry = {
      employeeEmail,
      employeeName: employee.name || employee.username || employee.email,
      hours: parseFloat(hours),
      task,
      date: new Date(date),
      createdAt: new Date(),
    };

    // Add time entry to project
    const result = await db.collection("vendorProjects").updateOne(
      { _id: new ObjectId(projectId) },
      {
        $push: { timeEntries: timeEntry },
        $inc: { totalHours: parseFloat(hours) },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Time entry added successfully", timeEntry },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding time entry:", error);
    return NextResponse.json(
      { error: "Failed to add time entry" },
      { status: 500 }
    );
  }
}
