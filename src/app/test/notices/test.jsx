"use client";

import { useEffect } from "react";

export default function TestNotices() {
  useEffect(() => {
    const testNotices = async () => {
      try {
        // Test creating a notice
        const createResponse = await fetch("/api/notices", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: "Test Notice",
            content:
              "This is a test notice created at " + new Date().toISOString(),
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
      } catch (error) {
        console.error("Test failed:", error);
      }
    };

    testNotices();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Notices Test Page</h1>
      <p>Check the browser console for test results.</p>
    </div>
  );
}
