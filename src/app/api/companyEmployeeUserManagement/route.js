import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

// GET: Search users that can be added as company employees
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const searchTerm = searchParams.get("search") || "";

    const db = await connectMongoDB();
    const usersCollection = db.collection("users");
    const companyEmployeesCollection = db.collection("CompanyEmployees");

    // Find users that are not already company employees
    // We'll exclude users that already exist in CompanyEmployees collection
    const companyEmployeeEmails = await companyEmployeesCollection
      .find({}, { projection: { email: 1 } })
      .toArray();

    const existingEmails = companyEmployeeEmails.map((emp) => emp.email);

    // Search for users with Employee userType that are not already in CompanyEmployees
    const searchQuery = {
      userType: "Employee",
      email: { $nin: existingEmails },
      $or: [
        { firstName: { $regex: searchTerm, $options: "i" } },
        { lastName: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
      ],
    };

    const users = await usersCollection
      .find(searchQuery, { projection: { password: 0 } }) // Exclude password
      .limit(20)
      .toArray();

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error searching users:", error);
    return NextResponse.json(
      { error: "Failed to search users" },
      { status: 500 }
    );
  }
}

// POST: Add a user from users collection to company employees
export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, name, department, position } = body;

    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const db = await connectMongoDB();
    const usersCollection = db.collection("users");
    const companyEmployeesCollection = db.collection("CompanyEmployees");

    // Find the user
    const user = await usersCollection.findOne({
      _id: new ObjectId(userId),
      userType: "Employee",
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found or not an employee" },
        { status: 404 }
      );
    }

    // Check if employee with this email already exists in CompanyEmployees
    const existingEmployee = await companyEmployeesCollection.findOne({
      email: user.email,
    });

    if (existingEmployee) {
      return NextResponse.json(
        {
          error: "Employee with this email already exists in company employees",
        },
        { status: 400 }
      );
    }

    // Transform user to company employee format
    const newEmployee = {
      userId: user._id,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      name: name || `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      email: user.email,
      phone: user.phone || "",
      department: department || user.department || "Not assigned",
      position: position || user.position || "Not assigned",
      status: user.status || "Active",
      joinDate: user.joinDate || new Date().toISOString().split("T")[0],
      salary: user.salary || 0,
      manager: user.manager || "Not assigned",
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
    console.error("Error adding employee from user:", error);
    return NextResponse.json(
      { error: "Failed to add employee from user" },
      { status: 500 }
    );
  }
}
