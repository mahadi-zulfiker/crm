// Script to create messages collection with proper indexes
require("dotenv").config({ path: ".env.local" });
const { connectMongoDB } = require("../lib/mongodb.js");

async function createMessagesCollection() {
  try {
    const db = await connectMongoDB();

    // Create indexes for better query performance
    await db.collection("messages").createIndex({ from: 1, to: 1 });
    await db.collection("messages").createIndex({ createdAt: -1 });
    await db.collection("messages").createIndex({ read: 1 });

    console.log("Messages collection and indexes created successfully");
  } catch (error) {
    console.error("Error creating messages collection:", error);
  }
}

// Run the script
createMessagesCollection();
