// Script to create vendorConnections collection with proper indexes
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { connectMongoDB } from "../lib/mongodb.js";

async function createVendorConnectionsCollection() {
  try {
    const db = await connectMongoDB();

    // Create indexes for better query performance
    await db.collection("vendorConnections").createIndex({ vendorEmail: 1 });
    await db.collection("vendorConnections").createIndex({ userEmail: 1 });
    await db
      .collection("vendorConnections")
      .createIndex({ vendorEmail: 1, userEmail: 1 }, { unique: true });
    await db.collection("vendorConnections").createIndex({ createdAt: 1 });

    console.log(
      "VendorConnections collection and indexes created successfully"
    );
  } catch (error) {
    console.error("Error creating vendorConnections collection:", error);
  }
}

// Run the script
createVendorConnectionsCollection();
