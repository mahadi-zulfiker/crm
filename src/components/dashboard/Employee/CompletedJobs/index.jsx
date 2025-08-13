"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  DollarSign,
  Briefcase,
  Building2,
  MapPin,
} from "lucide-react";
import { useSession } from "next-auth/react";

function CompletedJobs() {
  const { data: session, status } = useSession();
  const [completedJobs, setCompletedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      const fetchRejectedJobs = async () => {
        try {
          const response = await fetch(
            `/api/applicationManagementEmployee?email=${session.user.email}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch applied jobs");
          }
          const data = await response.json();

          // Ensure correct data format
          if (Array.isArray(data.completedJobs)) {
            setCompletedJobs(data.completedJobs);
          } else {
            throw new Error("Unexpected response format");
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchRejectedJobs();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [session, status]);

  const getTotalEarnings = () => {
    return completedJobs.reduce((total, job) => {
      const salary = Number.parseFloat(job.salary) || 0;
      return total + salary;
    }, 0);
  };

  const getJobTypeBadge = (jobType) => {
    const typeConfig = {
      "Full-time": { className: "bg-green-100 text-green-800" },
      "Part-time": { className: "bg-blue-100 text-blue-800" },
      Contract: { className: "bg-purple-100 text-purple-800" },
      Freelance: { className: "bg-orange-100 text-orange-800" },
    };

    const config = typeConfig[jobType] || {
      className: "bg-gray-100 text-gray-800",
    };

    return <Badge className={config.className}>{jobType}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading completed jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 text-lg font-semibold">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            completedJobs Jobs
          </h1>
          <p className="text-gray-600 mt-1">
            Your successfully completed job assignments
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Total completedJobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {completedJobs.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Total Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${getTotalEarnings().toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Average Salary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              $
              {completedJobs.length > 0
                ? Math.round(
                    getTotalEarnings() / completedJobs.length
                  ).toLocaleString()
                : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* completedJobs Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle>completedJobs Jobs History</CardTitle>
          <CardDescription>
            All your successfully completed job assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {completedJobs.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No completed jobs found</p>
              <p className="text-gray-500 mt-2">
                Your completed jobs will appear here once you finish assignments
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Job Title
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Company
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Location
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Job Type
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Salary
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Payment
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {completedJobs.map((job) => (
                    <tr
                      key={job._id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">
                          {job.title}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{job.company}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{job.location}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {getJobTypeBadge(job.jobType)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-green-600">
                          ${Number.parseFloat(job.salary).toLocaleString()}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {job.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-green-600">
                          {job.payment || "Paid"}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default CompletedJobs;
