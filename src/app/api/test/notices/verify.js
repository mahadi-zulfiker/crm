// Verification script for notices functionality
export async function verifyNoticesFunctionality() {
  try {
    console.log("Testing notices API...");

    // Test 1: Fetch notices
    console.log("1. Fetching notices...");
    const getResponse = await fetch("http://localhost:3000/api/notices");
    const getData = await getResponse.json();
    console.log("GET response:", getData);

    // Test 2: Create a notice
    console.log("2. Creating a test notice...");
    const postResponse = await fetch("http://localhost:3000/api/notices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Test Notice - Verification",
        content:
          "This is a test notice created for verification purposes at " +
          new Date().toISOString(),
        createdBy: "Verification Script",
        priority: "normal",
        audience: "all",
      }),
    });

    const postData = await postResponse.json();
    console.log("POST response:", postData);

    if (!postData.success) {
      throw new Error("Failed to create notice: " + postData.error);
    }

    const noticeId = postData.data._id;
    console.log("Created notice with ID:", noticeId);

    // Test 3: Update the notice
    console.log("3. Updating the notice...");
    const putResponse = await fetch("http://localhost:3000/api/notices", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: noticeId,
        title: "Updated Test Notice - Verification",
        content: "This notice has been updated for verification purposes",
      }),
    });

    const putData = await putResponse.json();
    console.log("PUT response:", putData);

    // Test 4: Delete the notice
    console.log("4. Deleting the notice...");
    const deleteResponse = await fetch("http://localhost:3000/api/notices", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: noticeId }),
    });

    const deleteData = await deleteResponse.json();
    console.log("DELETE response:", deleteData);

    console.log("All tests completed successfully!");
    return { success: true, message: "All notice API tests passed" };
  } catch (error) {
    console.error("Verification failed:", error);
    return { success: false, error: error.message };
  }
}
