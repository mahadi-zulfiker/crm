import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// Handle GET request (Fetch all blogs)
export async function GET() {
  try {
    const db = await connectMongoDB();
    const blogs = await db
      .collection("blogs")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(
      {
        success: true,
        data: blogs,
        count: blogs.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blogs",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Handle POST request (Create a new blog)
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      title,
      author,
      category,
      content,
      image,
      date_published,
      tags,
      excerpt,
    } = body;

    // Validate required fields
    if (!title || !author || !category || !content || !date_published) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, author, category, content, and date are required!",
        },
        { status: 400 }
      );
    }

    // Validate date format
    const parsedDate = new Date(date_published);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid date format!",
        },
        { status: 400 }
      );
    }

    // Generate excerpt if not provided
    const blogExcerpt = excerpt || content.substring(0, 150) + "...";

    const db = await connectMongoDB();
    const result = await db.collection("blogs").insertOne({
      title,
      author,
      category,
      content,
      image: image || null,
      excerpt: blogExcerpt,
      tags: tags || [],
      date_published: parsedDate,
      status: "published",
      views: 0,
      likes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Blog posted successfully!",
        data: {
          blogId: result.insertedId,
          title,
          author,
          category,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error posting blog:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create blog",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Handle PUT request (Update a blog)
export async function PUT(req) {
  try {
    const body = await req.json();
    const {
      id,
      title,
      author,
      category,
      content,
      image,
      date_published,
      tags,
      excerpt,
    } = body;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid blog ID is required!",
        },
        { status: 400 }
      );
    }

    const updateData = {
      updatedAt: new Date(),
    };

    if (title) updateData.title = title;
    if (author) updateData.author = author;
    if (category) updateData.category = category;
    if (content) updateData.content = content;
    if (image !== undefined) updateData.image = image;
    if (date_published) updateData.date_published = new Date(date_published);
    if (tags) updateData.tags = tags;
    if (excerpt) updateData.excerpt = excerpt;

    const db = await connectMongoDB();
    const result = await db
      .collection("blogs")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found!",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Blog updated successfully!",
        data: { id, ...updateData },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update blog",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Handle DELETE request (Delete a blog)
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid blog ID is required!",
        },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();
    const result = await db
      .collection("blogs")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found!",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Blog deleted successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete blog",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
