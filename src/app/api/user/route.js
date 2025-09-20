import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PUT(req) {
  try {
    const { email, status, userType, ...rest } = await req.json();

    if (!email || !status) {
      return NextResponse.json(
        { success: false, message: "Email and status are required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Merge updated fields dynamically (handles both employee & vendor)
    const updateFields = { status: "approved", ...rest };
    if (userType) {
      updateFields.userType = userType;
    }

    const result = await db
      .collection("users")
      .updateOne({ email }, { $set: updateFields });

    // If this is an employee, also update CompanyEmployees collection
    if (userType === "Employee") {
      const companyEmployeesCollection = db.collection("CompanyEmployees");
      // Check if employee already exists in CompanyEmployees collection
      const companyEmployee = await companyEmployeesCollection.findOne({
        email,
      });

      if (companyEmployee) {
        // Update existing company employee
        await companyEmployeesCollection.updateOne(
          { email },
          { $set: updateFields }
        );
      } else {
        // Create new company employee record
        const newCompanyEmployee = {
          ...user,
          ...updateFields,
          userId: user._id,
          department: "Not assigned",
          position: "Not assigned",
          status: "Active",
          joinDate: new Date().toISOString().split("T")[0],
          salary: 0,
          manager: "Not assigned",
        };
        await companyEmployeesCollection.insertOne(newCompanyEmployee);
      }
    }

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Data unchanged" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "User approved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
