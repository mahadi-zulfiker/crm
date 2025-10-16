import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";

// GET: Fetch employee profile information by email
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const db = await connectMongoDB();

    // Fetch employee profile from CompanyEmployees collection
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

    // Return employee profile data
    return NextResponse.json(
      {
        message: "Employee profile fetched successfully",
        data: {
          name: employee.name,
          email: employee.email,
          joinDate:
            employee.joinDate ||
            employee.createdAt ||
            new Date().toISOString().split("T")[0],
          confirmationDate:
            employee.confirmationDate ||
            new Date(
              new Date(employee.joinDate || employee.createdAt).setMonth(
                new Date(employee.joinDate || employee.createdAt).getMonth() + 3
              )
            )
              .toISOString()
              .split("T")[0],
          workStartTime: employee.workStartTime || "08:00 AM",
          workEndTime: employee.workEndTime || "05:00 PM",
          department: employee.department || "Not assigned",
          position: employee.position || "Not assigned",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching employee profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch employee profile" },
      { status: 500 }
    );
  }
}
