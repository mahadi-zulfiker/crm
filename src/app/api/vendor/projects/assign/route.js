import { connectMongoDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// POST: Assign employee to project
export async function POST(req) {
  try {
    const { projectId, employeeEmail, role } = await req.json();

    if (!projectId || !employeeEmail || !ObjectId.isValid(projectId)) {
      return NextResponse.json(
        { error: "Project ID and employee email are required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();

    // Verify employee exists
    const employee = await db
      .collection("users")
      .findOne({
        email: employeeEmail,
        userType: { $in: ["Employee", "User"] },
      });

    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      );
    }

    // Check if employee is already assigned to this project
    const project = await db.collection("vendorProjects").findOne({
      _id: new ObjectId(projectId),
      "assignedEmployees.email": employeeEmail,
    });

    if (project) {
      return NextResponse.json(
        { error: "Employee is already assigned to this project" },
        { status: 400 }
      );
    }

    // Assign employee to project
    const result = await db.collection("vendorProjects").updateOne(
      { _id: new ObjectId(projectId) },
      {
        $push: {
          assignedEmployees: {
            email: employeeEmail,
            name: employee.name || employee.username || employee.email,
            role: role || "Team Member",
            assignedAt: new Date(),
          },
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Employee assigned to project successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error assigning employee to project:", error);
    return NextResponse.json(
      { error: "Failed to assign employee to project" },
      { status: 500 }
    );
  }
}

// DELETE: Remove employee from project
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");
    const employeeEmail = searchParams.get("employeeEmail");

    if (!projectId || !employeeEmail || !ObjectId.isValid(projectId)) {
      return NextResponse.json(
        { error: "Project ID and employee email are required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();

    // Remove employee from project
    const result = await db.collection("vendorProjects").updateOne(
      { _id: new ObjectId(projectId) },
      {
        $pull: {
          assignedEmployees: { email: employeeEmail },
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Employee removed from project successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing employee from project:", error);
    return NextResponse.json(
      { error: "Failed to remove employee from project" },
      { status: 500 }
    );
  }
}
