import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

// ✅ GET: Fetch all company employees
export async function GET() {
  try {
    const db = await connectMongoDB();
    const companyEmployeesCollection = db.collection("CompanyEmployees");

    const employees = await companyEmployeesCollection.find({}).toArray();
    return NextResponse.json(employees, { status: 200 });
  } catch (error) {
    console.error("Error fetching company employees:", error);
    return NextResponse.json(
      { error: "Failed to fetch company employees" },
      { status: 500 }
    );
  }
}

// ✅ POST: Add a new company employee
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      department,
      position,
      salary,
      manager,
      joinDate,
    } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const companyEmployeesCollection = db.collection("CompanyEmployees");

    // Check if employee with this email already exists
    const existingEmployee = await companyEmployeesCollection.findOne({
      email,
    });
    if (existingEmployee) {
      return NextResponse.json(
        { error: "Employee with this email already exists" },
        { status: 400 }
      );
    }

    // Create new employee object
    const newEmployee = {
      name,
      email,
      phone: phone || "",
      department: department || "Not assigned",
      position: position || "Not assigned",
      salary: salary || 0,
      manager: manager || "Not assigned",
      joinDate: joinDate || new Date().toISOString().split("T")[0],
      status: "Active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert the new employee
    const result = await companyEmployeesCollection.insertOne(newEmployee);

    // Return the created employee with its ID
    const createdEmployee = {
      ...newEmployee,
      _id: result.insertedId,
    };

    return NextResponse.json(createdEmployee, { status: 201 });
  } catch (error) {
    console.error("Error adding employee:", error);
    return NextResponse.json(
      { error: "Failed to add employee" },
      { status: 500 }
    );
  }
}

// ✅ PUT: Update company employee performance or role
export async function PUT(req) {
  try {
    const body = await req.json(); // Ensure body is correctly parsed
    const { id, role, performance } = body;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid employee ID" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const companyEmployeesCollection = db.collection("CompanyEmployees");

    const result = await companyEmployeesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { role, performance } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "No updates made. Employee not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Employee updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating employee:", error);
    return NextResponse.json(
      { error: "Failed to update employee" },
      { status: 500 }
    );
  }
}

// ✅ DELETE: Remove a company employee (using query parameters)
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // Get ID from URL

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid employee ID" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const companyEmployeesCollection = db.collection("CompanyEmployees");

    const result = await companyEmployeesCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Employee deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting employee:", error);
    return NextResponse.json(
      { error: "Failed to delete employee" },
      { status: 500 }
    );
  }
}
