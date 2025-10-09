"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CompanyManagementLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEmployee, setIsEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkEmployeeStatus = async () => {
      if (status === "loading") return;

      if (!session) {
        router.push("/signIn");
        return;
      }

      try {
        // Check if user is an employee by email
        const response = await fetch(
          `/api/employee/check-employee?email=${session.user.email}`
        );

        const data = await response.json();

        if (data.isEmployee) {
          setIsEmployee(true);
        } else {
          setIsEmployee(false);
        }
      } catch (error) {
        console.error("Error checking employee status:", error);
        setIsEmployee(false);
      } finally {
        setLoading(false);
      }
    };

    checkEmployeeStatus();
  }, [session, status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isEmployee) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Unauthorized Access
          </h1>
          <p className="text-gray-700 mb-6">
            You must be a company employee to access these pages.
          </p>
          <button
            onClick={() => router.push("/dashboard/employee")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
