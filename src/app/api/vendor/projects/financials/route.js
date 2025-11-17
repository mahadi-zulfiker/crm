import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

// GET: Fetch financial data for a vendor's projects
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const vendorEmail = searchParams.get("vendorEmail");
    const timeRange = searchParams.get("timeRange") || "monthly";

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

    // Calculate financial metrics
    let totalRevenue = 0;
    let totalExpenses = 0;
    const projectStatusCounts = {};

    // Initialize monthly data structure
    const monthlyData = [];
    const projectBreakdown = {};

    // Process projects to calculate financials
    projects.forEach((project) => {
      // Add to total revenue (budget)
      totalRevenue += project.budget || 0;

      // Add to total expenses (spent)
      totalExpenses += project.spent || 0;

      // Count projects by status
      projectStatusCounts[project.status] =
        (projectStatusCounts[project.status] || 0) + 1;

      // Categorize projects for breakdown
      const category = project.category || "Other";
      projectBreakdown[category] = {
        value: (projectBreakdown[category]?.value || 0) + (project.budget || 0),
        count: (projectBreakdown[category]?.count || 0) + 1,
      };
    });

    // Calculate net profit
    const netProfit = totalRevenue - totalExpenses;
    const profitMargin =
      totalRevenue > 0 ? Math.round((netProfit / totalRevenue) * 100) : 0;

    // Calculate monthly data (simplified for this example)
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentMonthIndex = new Date().getMonth();

    for (let i = 4; i >= 0; i--) {
      const monthIndex = (currentMonthIndex - i + 12) % 12;
      const month = months[monthIndex];

      // Filter projects for this month (simplified)
      const monthProjects = projects.filter((project) => {
        if (!project.createdAt) return false;
        const projectMonth = new Date(project.createdAt).getMonth();
        return projectMonth === monthIndex;
      });

      const revenue = monthProjects.reduce(
        (sum, project) => sum + (project.budget || 0),
        0
      );
      const expenses = monthProjects.reduce(
        (sum, project) => sum + (project.spent || 0),
        0
      );
      const profit = revenue - expenses;

      monthlyData.push({ month, revenue, expenses, profit });
    }

    // Format project breakdown for frontend
    const formattedBreakdown = Object.entries(projectBreakdown).map(
      ([category, data]) => ({
        category,
        value: data.value,
        percentage:
          totalRevenue > 0 ? Math.round((data.value / totalRevenue) * 100) : 0,
      })
    );

    // Calculate additional metrics
    const projectsCompleted = projectStatusCounts["Completed"] || 0;
    const avgProjectValue =
      projects.length > 0 ? Math.round(totalRevenue / projects.length) : 0;

    // Mock recent transactions (in a real implementation, this would come from a transactions collection)
    const recentTransactions = [
      {
        id: "1",
        type: "Project Payment",
        description: "Web Development",
        amount: 15000,
        date: "2024-05-15",
        status: "credit",
      },
      {
        id: "2",
        type: "Software License",
        description: "Annual Subscription",
        amount: 2500,
        date: "2024-05-10",
        status: "debit",
      },
      {
        id: "3",
        type: "Project Payment",
        description: "Mobile App",
        amount: 12000,
        date: "2024-05-05",
        status: "credit",
      },
    ];

    return NextResponse.json(
      {
        totalRevenue,
        totalExpenses,
        netProfit,
        profitMargin,
        projectsCompleted,
        avgProjectValue,
        monthlyData,
        projectBreakdown: formattedBreakdown,
        recentTransactions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching vendor financial data:", error);
    return NextResponse.json(
      { error: "Failed to fetch financial data" },
      { status: 500 }
    );
  }
}
