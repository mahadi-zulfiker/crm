import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET: Fetch all services data for vendor
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const db = await connectMongoDB();

    // Fetch vendor profile
    const vendor = await db
      .collection("users")
      .findOne({ email, userType: "Vendor" });

    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    // Fetch all services for this vendor
    const services = await db
      .collection("vendorServices")
      .find({ vendorEmail: email, type: "service" })
      .toArray();

    const packages = await db
      .collection("vendorServices")
      .find({ vendorEmail: email, type: "package" })
      .toArray();

    const pricingPlans = await db
      .collection("vendorServices")
      .find({ vendorEmail: email, type: "pricing" })
      .toArray();

    // Convert ObjectId to string for JSON serialization
    const serializeServices = (items) =>
      items.map((item) => ({
        ...item,
        _id: item._id.toString(),
        id: item._id.toString(),
      }));

    return NextResponse.json(
      {
        message: "Services data fetched successfully",
        data: {
          services: serializeServices(services),
          packages: serializeServices(packages),
          pricingPlans: serializeServices(pricingPlans),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching vendor services data:", error);
    return NextResponse.json(
      { error: "Failed to fetch services data" },
      { status: 500 }
    );
  }
}

// POST: Add a new service, package, or pricing plan
export async function POST(req) {
  try {
    const { email, service, type } = await req.json();

    if (!email || !service) {
      return NextResponse.json(
        { error: "Email and service data are required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();

    // Fetch vendor profile
    const vendor = await db
      .collection("users")
      .findOne({ email, userType: "Vendor" });

    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    // Add vendor email and type to the service
    const serviceToSave = {
      ...service,
      vendorEmail: email,
      type: type || "service",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Save the service to the database
    const result = await db
      .collection("vendorServices")
      .insertOne(serviceToSave);

    // Return the saved service with its ID
    const savedService = {
      ...serviceToSave,
      _id: result.insertedId.toString(),
      id: result.insertedId.toString(),
    };

    return NextResponse.json(
      {
        message: `${type || "Service"} added successfully`,
        service: savedService,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding service:", error);
    return NextResponse.json(
      { error: "Failed to add service" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing service, package, or pricing plan
export async function PUT(req) {
  try {
    const { email, service, type } = await req.json();

    if (!email || !service || !service.id) {
      return NextResponse.json(
        { error: "Email and service ID are required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();

    // Fetch vendor profile
    const vendor = await db
      .collection("users")
      .findOne({ email, userType: "Vendor" });

    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    // Update the service in the database
    const { id, ...serviceToUpdate } = service;
    const result = await db.collection("vendorServices").updateOne(
      { _id: new ObjectId(id), vendorEmail: email },
      {
        $set: {
          ...serviceToUpdate,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Return the updated service
    const updatedService = {
      ...serviceToUpdate,
      _id: id,
      id: id,
    };

    return NextResponse.json(
      {
        message: `${type || "Service"} updated successfully`,
        service: updatedService,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a service, package, or pricing plan
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const serviceId = searchParams.get("id");
    const type = searchParams.get("type");

    if (!email || !serviceId) {
      return NextResponse.json(
        { error: "Email and service ID are required" },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();

    // Fetch vendor profile
    const vendor = await db
      .collection("users")
      .findOne({ email, userType: "Vendor" });

    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    // Delete the service from the database
    const result = await db.collection("vendorServices").deleteOne({
      _id: new ObjectId(serviceId),
      vendorEmail: email,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: `${type || "Service"} deleted successfully`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
