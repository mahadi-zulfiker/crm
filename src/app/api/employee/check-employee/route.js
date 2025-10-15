import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";

// GET: Check if a user is a company employee by email
// Only users in the CompanyEmployees collection are authorized
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "User email is required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();

    // Check if user exists ONLY in CompanyEmployees collection by email
    // Do not check users collection to ensure only company employees can access
    const employee = await db.collection("CompanyEmployees").findOne({
      email: email,
    });

    if (employee) {
      return NextResponse.json({ isEmployee: true, employee }, { status: 200 });
    }

    // If not found in CompanyEmployees, user is not authorized
    return NextResponse.json(
      {
        isEmployee: false,
        message: "User is not in the CompanyEmployees collection",
      },
      { status: 403 }
    );
  } catch (error) {
    console.error("Error checking employee status:", error);
    return NextResponse.json(
      { error: "Failed to check employee status" },
      { status: 500 }
    );
  }
}
