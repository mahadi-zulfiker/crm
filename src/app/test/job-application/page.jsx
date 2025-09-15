"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestJobApplication() {
  const [jobId, setJobId] = useState("68c853ed65400831b968665a");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (jobId) {
      router.push(`/singleJob/${jobId}/apply`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-center text-gray-900">
            Test Job Application
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="jobId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Job ID
              </label>
              <Input
                type="text"
                id="jobId"
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
                placeholder="Enter job ID"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              />
            </div>
            <Button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-white shadow-lg transition duration-300 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800"
            >
              Go to Application Page
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h2 className="font-semibold text-blue-800 mb-2">
              Test Instructions:
            </h2>
            <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
              <li>
                Enter a valid job ID to test the enhanced job application page
              </li>
              <li>
                If you've already applied with your email, you'll see an
                "Already Applied" message
              </li>
              <li>Otherwise, you'll see the application form</li>
              <li className="font-medium">
                Make sure you're logged in to test this feature
              </li>
            </ul>
            <p className="mt-3 text-sm text-blue-700">
              The page now checks if you've already applied for a job and shows
              a success message if you have. This prevents duplicate
              applications and provides a better user experience.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
