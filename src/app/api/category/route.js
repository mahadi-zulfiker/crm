import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// GET: Fetch all job categories
export async function GET() {
  try {
    const db = await connectMongoDB();
    const categories = await db
      .collection("jobCategories")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch categories",
      },
      { status: 500 }
    );
  }
}

// POST: Create a new job category
export async function POST(req) {
  try {
    const body = await req.json();
    const { categoryName, description, department, priorityLevel, isActive } =
      body;

    if (!categoryName?.trim()) {
      return NextResponse.json(
        { error: "Category name is required." },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const result = await db.collection("jobCategories").insertOne({
      categoryName,
      description: description?.trim() || "",
      department: department?.trim() || "",
      priorityLevel: priorityLevel?.trim() || "",
      isActive: Boolean(isActive),
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Category created successfully!", data: result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category." },
      { status: 500 }
    );
  }
}

// PUT: Update a job category
export async function PUT(req) {
  try {
    const {
      id,
      categoryName,
      description,
      department,
      priorityLevel,
      isActive,
    } = await req.json();

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Valid category ID is required",
        },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const categoriesCollection = db.collection("jobCategories");

    const updateFields = {
      updatedAt: new Date(),
    };

    if (categoryName) updateFields.categoryName = categoryName.trim();
    if (description) updateFields.description = description.trim();
    if (department) updateFields.department = department.trim();
    if (priorityLevel) updateFields.priorityLevel = priorityLevel.trim();
    if (isActive !== undefined) updateFields.isActive = Boolean(isActive);

    const result = await categoriesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Category not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Category updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update category",
      },
      { status: 500 }
    );
  }
}

// DELETE: Remove a job category
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Valid category ID is required",
        },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const categoriesCollection = db.collection("jobCategories");

    const result = await categoriesCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Category not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Category deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete category",
      },
      { status: 500 }
    );
  }
}
