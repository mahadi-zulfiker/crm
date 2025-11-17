"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  BarChartIcon,
  DollarSign,
  Calendar,
  User,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

export default function ProjectTracking() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [timeEntries, setTimeEntries] = useState([]);

  // Fetch projects data
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        // Check if user is logged in
        if (!session?.user?.email) {
          setLoading(false);
          return;
        }

        // Check if user is a vendor
        if (session?.user?.userType !== "Vendor") {
          setLoading(false);
          return;
        }

        // Fetch data from the API
        try {
          const response = await fetch(
            `/api/vendor/projects/tracking?vendorEmail=${session?.user?.email}`
          );
          const result = await response.json();

          if (!response.ok) {
            throw new Error(
              result.error || "Failed to fetch project tracking data"
            );
          }

          // Transform the data to match the component's expected structure
          const transformedProjects = result.projects.map((project) => ({
            ...project,
            progress:
              project.progress ||
              (project.budget > 0
                ? Math.round((project.spent / project.budget) * 100)
                : 0),
            assignedEmployees: project.assignedEmployees || [],
            timeEntries: project.timeEntries || [],
          }));

          setProjects(transformedProjects);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching projects:", error);
          toast({
            title: "Error",
            description: error.message || "Failed to fetch projects",
            variant: "destructive",
          });
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast({
          title: "Error",
          description: "Failed to fetch projects",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchProjects();
    } else {
      setLoading(false);
    }
  }, [session, toast]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "In Progress":
        return <Clock className="w-5 h-5 text-blue-500" />;
      case "On Hold":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-600 bg-green-100";
      case "In Progress":
        return "text-blue-600 bg-blue-100";
      case "On Hold":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getDaysUntilDeadline = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-teal-600 rounded-full animate-bounce"></div>
          <div
            className="w-4 h-4 bg-teal-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-4 h-4 bg-teal-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Project Tracking
        </h1>
        <p className="text-gray-600 mt-1">
          Monitor project progress, budget utilization, and team performance
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <BarChartIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Projects
                </p>
                <p className="text-2xl font-bold">{projects.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold">
                  {projects.filter((p) => p.status === "Completed").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold">
                  {projects.filter((p) => p.status === "In Progress").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-teal-100 rounded-full">
                <DollarSign className="w-6 h-6 text-teal-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold">
                  {formatCurrency(
                    projects.reduce((sum, project) => sum + project.spent, 0)
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="bg-white shadow-sm border-0">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <p className="text-sm text-gray-500">{project.client}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(project.status)}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Progress and Budget */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Budget</p>
                      <p className="font-medium">
                        {formatCurrency(project.budget)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Spent</p>
                      <p className="font-medium">
                        {formatCurrency(project.spent)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>
                      {getDaysUntilDeadline(project.deadline) > 0
                        ? `${getDaysUntilDeadline(project.deadline)} days left`
                        : "Deadline passed"}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Budget Utilization
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-teal-600 h-2 rounded-full"
                        style={{
                          width: `${(project.spent / project.budget) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {Math.round((project.spent / project.budget) * 100)}% of
                      budget used
                    </p>
                  </div>
                </div>

                {/* Team and Time Tracking */}
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Assigned Team</p>
                    <div className="flex flex-wrap gap-2">
                      {project.assignedEmployees.map((employee, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-xs"
                        >
                          <User className="w-3 h-3 mr-1" />
                          <span>{employee.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-2">
                      Recent Activity
                    </p>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {project.timeEntries.slice(0, 3).map((entry) => (
                        <div
                          key={entry.id}
                          className="flex justify-between text-sm p-2 bg-gray-50 rounded"
                        >
                          <div>
                            <p className="font-medium">{entry.employee}</p>
                            <p className="text-gray-500">{entry.task}</p>
                          </div>
                          <div className="text-right">
                            <p>{entry.hours} hrs</p>
                            <p className="text-gray-500">
                              {new Date(entry.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                      {project.timeEntries.length === 0 && (
                        <p className="text-gray-500 text-sm">
                          No recent activity
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
