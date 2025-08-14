"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Save,
  Eye,
  Briefcase,
  FileText,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function JobDetailsClient() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InnerJobDetailsClient />
    </Suspense>
  );
}

function InnerJobDetailsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "",
    category: "",
    salary: "",
    description: "",
    requirements: "",
    benefits: "",
    deadline: "",
    status: "",
    workType: "",
    experienceLevel: "",
    urgency: "Normal",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${jobId}`);
        const res = await fetch(`/api/applicationManagementClient/${jobId}`);
        if (response.ok && res.ok) {
          const jobData = await response.json();
          const applicationData = await res.json();
          setJob(jobData);
          setApplications(applicationData.data || []); // Ensure data is an array
          setFormData({
            title: jobData.title || "",
            company: jobData.company || "",
            location: jobData.location || "",
            jobType: jobData.jobType || "",
            category: jobData.category || "",
            salary: jobData.salary ? String(jobData.salary) : "",
            description: jobData.description || "",
            requirements: jobData.requirements || "",
            benefits: jobData.benefits || "",
            deadline: jobData.deadline || "",
            status: jobData.status || "",
            workType: jobData.workType || "",
            experienceLevel: jobData.experienceLevel || "",
            urgency: jobData.urgency || "Normal",
          });
        } else {
          console.error("Failed to fetch job or applications");
        }
      } catch (error) {
        console.error("Error fetching job or applications:", error);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJob();
      console.log("fetching job", jobId);
    }
  }, [jobId]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Job title is required";
    if (!formData.company.trim())
      newErrors.company = "Company name is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.jobType) newErrors.jobType = "Job type is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    // Ensure salary is treated as a string and validate
    if (!String(formData.salary).trim())
      newErrors.salary = "Salary is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.requirements.trim())
      newErrors.requirements = "Requirements are required";
    if (!formData.deadline) newErrors.deadline = "Deadline is required";
    if (!formData.status) newErrors.status = "Status is required";

    // Validate deadline is in the future
    if (formData.deadline) {
      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (deadlineDate < today) {
        newErrors.deadline = "Deadline must be in the future";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          _id: jobId,
          email: session?.user?.email,
        }),
      });

      if (response.ok) {
        setSuccessMessage("Job updated successfully!");
        setTimeout(() => {
          router.push("/dashboard/client/postedJobs");
        }, 2000);
      } else {
        console.error("Failed to update job");
      }
    } catch (error) {
      console.error("Error updating job:", error);
    } finally {
      setSaving(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-orange-100 text-orange-800";
      case "Expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-teal-600" />
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-lg font-medium text-gray-900 mb-2">
          Job Not Found
        </h2>
        <p className="text-gray-600 mb-4">
          The job you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/dashboard/client/posted-jobs">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Posted Jobs
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Job</h1>
          <p className="text-gray-600 mt-1">
            Update job details and requirements
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={`${getStatusColor(formData.status)} font-semibold`}>
            {formData.status}
          </Badge>
          <Link href={`/dashboard/client/allCandidates?jobId=${jobId}`}>
            <Button
              variant="outline"
              className="text-teal-600 hover:bg-teal-50 bg-transparent"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Candidates
            </Button>
          </Link>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              <p className="font-medium">{successMessage}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Job Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {applications.length || 0}
              </p>
              <p className="text-sm text-gray-600">Applications</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {applications.views || 0}
              </p>
              <p className="text-sm text-gray-600">Views</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {applications.filter((app) => app.status === "shortlisted")
                  .length || 0}
              </p>
              <p className="text-sm text-gray-600">Shortlisted</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-teal-600">
                {job.hired || 0}
              </p>
              <p className="text-sm text-gray-600">Hired</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title" className="text-gray-700 font-medium">
                  Job Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className={`mt-1 ${errors.title ? "border-red-500" : ""}`}
                  placeholder="e.g. Senior Frontend Developer"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <Label htmlFor="company" className="text-gray-700 font-medium">
                  Company Name *
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className={`mt-1 ${errors.company ? "border-red-500" : ""}`}
                  placeholder="e.g. TechCorp Inc."
                />
                {errors.company && (
                  <p className="text-red-500 text-sm mt-1">{errors.company}</p>
                )}
              </div>

              <div>
                <Label htmlFor="location" className="text-gray-700 font-medium">
                  Location *
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className={`mt-1 ${errors.location ? "border-red-500" : ""}`}
                  placeholder="e.g. New York, NY or Remote"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>

              <div>
                <Label htmlFor="category" className="text-gray-700 font-medium">
                  Category *
                </Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className={`mt-1 ${errors.category ? "border-red-500" : ""}`}
                  placeholder="e.g. Engineering, Design, Marketing"
                />
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Details */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="jobType" className="text-gray-700 font-medium">
                  Job Type *
                </Label>
                <Select
                  value={formData.jobType}
                  onValueChange={(value) => handleInputChange("jobType", value)}
                >
                  <SelectTrigger
                    className={`mt-1 ${errors.jobType ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
                {errors.jobType && (
                  <p className="text-red-500 text-sm mt-1">{errors.jobType}</p>
                )}
              </div>

              <div>
                <Label htmlFor="workType" className="text-gray-700 font-medium">
                  Work Type
                </Label>
                <Select
                  value={formData.workType}
                  onValueChange={(value) =>
                    handleInputChange("workType", value)
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select work type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="On-site">On-site</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="experienceLevel"
                  className="text-gray-700 font-medium"
                >
                  Experience Level
                </Label>
                <Select
                  value={formData.experienceLevel}
                  onValueChange={(value) =>
                    handleInputChange("experienceLevel", value)
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Entry-level">Entry-level</SelectItem>
                    <SelectItem value="Mid-level">Mid-level</SelectItem>
                    <SelectItem value="Senior">Senior</SelectItem>
                    <SelectItem value="Lead">Lead</SelectItem>
                    <SelectItem value="Executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="salary" className="text-gray-700 font-medium">
                  Salary *
                </Label>
                <Input
                  id="salary"
                  value={formData.salary}
                  onChange={(e) => handleInputChange("salary", e.target.value)}
                  className={`mt-1 ${errors.salary ? "border-red-500" : ""}`}
                  placeholder="e.g. 80000 or 80000-120000"
                />
                {errors.salary && (
                  <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
                )}
              </div>

              <div>
                <Label htmlFor="deadline" className="text-gray-700 font-medium">
                  Application Deadline *
                </Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) =>
                    handleInputChange("deadline", e.target.value)
                  }
                  className={`mt-1 ${errors.deadline ? "border-red-500" : ""}`}
                  min={new Date().toISOString().split("T")[0]}
                />
                {errors.deadline && (
                  <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>
                )}
              </div>

              <div>
                <Label htmlFor="status" className="text-gray-700 font-medium">
                  Status *
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger
                    className={`mt-1 ${errors.status ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Paused">Paused</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="urgency" className="text-gray-700 font-medium">
                Urgency Level
              </Label>
              <Select
                value={formData.urgency}
                onValueChange={(value) => handleInputChange("urgency", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Job Description */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <Label
                htmlFor="description"
                className="text-gray-700 font-medium"
              >
                Job Description *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className={`mt-1 min-h-[120px] ${
                  errors.description ? "border-red-500" : ""
                }`}
                placeholder="Describe the role, responsibilities, and what the candidate will be doing..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="requirements"
                className="text-gray-700 font-medium"
              >
                Requirements *
              </Label>
              <Textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) =>
                  handleInputChange("requirements", e.target.value)
                }
                className={`mt-1 min-h-[120px] ${
                  errors.requirements ? "border-red-500" : ""
                }`}
                placeholder="List the required skills, experience, education, and qualifications..."
              />
              {errors.requirements && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.requirements}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="benefits" className="text-gray-700 font-medium">
                Benefits & Perks
              </Label>
              <Textarea
                id="benefits"
                value={formData.benefits}
                onChange={(e) => handleInputChange("benefits", e.target.value)}
                className="mt-1 min-h-[100px]"
                placeholder="Describe the benefits, perks, and what makes this opportunity attractive..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Link href="/dashboard/client/posted-jobs">
            <Button
              variant="outline"
              className="text-gray-600 hover:bg-gray-100 bg-transparent"
            >
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={saving}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
