import { connectMongoDB } from "../lib/mongodb";

async function migrateCompanyEmployees() {
  try {
    const db = await connectMongoDB();

    // Get all users with userType "Employee"
    const usersCollection = db.collection("users");
    const companyEmployees = await usersCollection
      .find({ userType: "Employee" })
      .toArray();

    console.log(
      `Found ${companyEmployees.length} company employees to migrate`
    );

    if (companyEmployees.length > 0) {
      // Insert them into the CompanyEmployees collection
      const companyEmployeesCollection = db.collection("CompanyEmployees");

      // Transform the data to match the new structure
      const transformedEmployees = companyEmployees.map((employee) => ({
        ...employee,
        userId: employee._id,
        department: employee.department || "Not assigned",
        position: employee.position || "Not assigned",
        status: employee.status || "Active",
        joinDate: employee.joinDate || new Date().toISOString().split("T")[0],
        salary: employee.salary || 0,
        manager: employee.manager || "Not assigned",
        workStartTime: employee.workStartTime || "09:00", // Default work start time
        workEndTime: employee.workEndTime || "17:00", // Default work end time
      }));

      // Insert the transformed employees
      const result = await companyEmployeesCollection.insertMany(
        transformedEmployees
      );
      console.log(
        `Successfully migrated ${result.insertedCount} company employees`
      );
    } else {
      console.log("No company employees found to migrate");
    }

    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Error during migration:", error);
  }
}

// Run the migration
migrateCompanyEmployees();
