// Simple test to verify notices functionality
export async function testNoticesAPI() {
  try {
    // Test creating a notice
    const createResponse = await fetch("/api/notices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Test Notice",
        content: "This is a test notice",
        createdBy: "Test Admin",
        priority: "normal",
        audience: "all",
      }),
    });

    const createData = await createResponse.json();
    console.log("Create notice result:", createData);

    // Test fetching notices
    const fetchResponse = await fetch("/api/notices");
    const fetchData = await fetchResponse.json();
    console.log("Fetch notices result:", fetchData);

    return { success: true, createData, fetchData };
  } catch (error) {
    console.error("Test failed:", error);
    return { success: false, error: error.message };
  }
}
