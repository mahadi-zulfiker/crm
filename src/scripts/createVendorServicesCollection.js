// Script to create vendor services collection in MongoDB
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env.local" });

const { connectMongoDB } = require("../lib/mongodb.js");

async function createVendorServicesCollection() {
  try {
    const db = await connectMongoDB();

    // Create indexes for better query performance
    await db.collection("vendorServices").createIndex({ vendorEmail: 1 });
    await db.collection("vendorServices").createIndex({ type: 1 });
    await db.collection("vendorServices").createIndex({ status: 1 });
    await db.collection("vendorServices").createIndex({ name: 1 });

    console.log("Vendor services collection created with indexes");
  } catch (error) {
    console.error("Error creating vendor services collection:", error);
  }
}

// Run the script
createVendorServicesCollection()
  .then(() => {
    console.log("Script completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Script failed:", error);
    process.exit(1);
  });
