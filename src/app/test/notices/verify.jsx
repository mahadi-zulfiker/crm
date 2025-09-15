"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function VerifyNotices() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addResult = (message, isSuccess = true) => {
    setResults((prev) => [
      ...prev,
      { message, isSuccess, timestamp: new Date().toLocaleTimeString() },
    ]);
  };

  const verifyNotices = async () => {
    setLoading(true);
    setResults([]);

    try {
      addResult("Starting verification tests...");

      // Test 1: Fetch notices
      addResult("1. Fetching notices...");
      const getResponse = await fetch("/api/notices");
      const getData = await getResponse.json();
      addResult(
        `GET response: ${getData.success ? "Success" : "Failed"} - ${
          getData.count || 0
        } notices found`
      );

      // Test 2: Create a notice
      addResult("2. Creating a test notice...");
      const postResponse = await fetch("/api/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Test Notice - Verification",
          content:
            "This is a test notice created for verification purposes at " +
            new Date().toISOString(),
          createdBy: "Verification Test",
          priority: "normal",
          audience: "all",
        }),
      });

      const postData = await postResponse.json();
      addResult(`POST response: ${postData.success ? "Success" : "Failed"}`);

      if (!postData.success) {
        throw new Error("Failed to create notice: " + postData.error);
      }

      const noticeId = postData.data._id;
      addResult(`Created notice with ID: ${noticeId}`);

      // Test 3: Update the notice
      addResult("3. Updating the notice...");
      const putResponse = await fetch("/api/notices", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: noticeId,
          title: "Updated Test Notice - Verification",
          content: "This notice has been updated for verification purposes",
        }),
      });

      const putData = await putResponse.json();
      addResult(`PUT response: ${putData.success ? "Success" : "Failed"}`);

      // Test 4: Delete the notice
      addResult("4. Deleting the notice...");
      const deleteResponse = await fetch("/api/notices", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: noticeId }),
      });

      const deleteData = await deleteResponse.json();
      addResult(
        `DELETE response: ${deleteData.success ? "Success" : "Failed"}`
      );

      addResult("All tests completed successfully!", true);
    } catch (error) {
      addResult(`Verification failed: ${error.message}`, false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Notices Functionality Verification
      </h1>

      <div className="mb-6">
        <Button onClick={verifyNotices} disabled={loading}>
          {loading ? "Running Tests..." : "Run Verification Tests"}
        </Button>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Test Results:</h2>
        {results.length === 0 ? (
          <p className="text-gray-500">
            Click "Run Verification Tests" to start testing
          </p>
        ) : (
          results.map((result, index) => (
            <div
              key={index}
              className={`p-3 rounded ${
                result.isSuccess
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <span className="font-mono text-sm">[{result.timestamp}]</span>{" "}
              {result.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
