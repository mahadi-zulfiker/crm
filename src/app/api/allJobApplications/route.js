import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";

export async function GET(req) {
  try {
    const db = await connectMongoDB();
    const { searchParams } = new URL(req.url);
    const employeeEmail = searchParams.get("email");

    if (!employeeEmail) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Fetch all applications for the employee
    const applications = await db
      .collection("applications")
      .find({ email: employeeEmail })
      .toArray();

    return NextResponse.json(applications, { status: 200 });
  } catch (error) {
    console.error("Error fetching all job applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch job applications" },
      { status: 500 }
    );
  }
}
