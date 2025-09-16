"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Save,
  Eye,
  Calendar,
  MapPin,
  Building2,
  DollarSign,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function CreateJobPage() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "",
    category: "",
    description: "",
    salary: "",
    jobReference: "",
    vacancy: "",
    featured: false,
    vendor: "",
    deadline: "",
    workType: "",
    salaryMin: "",
    salaryMax: "",
    currency: "USD",
    requirements: "",
    responsibilities: "",
    benefits: "",
    applicationDeadline: "",
    experienceLevel: "",
    educationLevel: "",
    skills: "",
    department: "",
    isRemote: false,
    isUrgent: false,
    contactEmail: "",
    contactPhone: "",
    email: session?.user?.email || "",
    clientName: session?.user?.name || "",
  });

  const handleInputChange = (field, value) => {
    setJobData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      "title",
      "company",
      "location",
      "jobType",
      "category",
      "description",
      "jobReference",
      "vacancy",
    ];
    for (const field of requiredFields) {
      if (!jobData[field]) {
        toast({
          title: "Validation Error",
          description: `Please fill out the ${field} field.`,
          variant: "destructive",
        });
        return false;
      }
    }
    if (
      isNaN(parseInt(jobData.vacancy, 10)) ||
      parseInt(jobData.vacancy, 10) < 1
    ) {
      toast({
        title: "Validation Error",
        description: "Vacancy must be a positive number.",
        variant: "destructive",
      });
      return false;
    }
    if (jobData.salary && isNaN(Number(jobData.salary))) {
      toast({
        title: "Validation Error",
        description: "Salary must be a valid number.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (status = "draft") => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/createJob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...jobData,
          status,
          postedAt: new Date().toISOString(),
          rating: 0,
          payment: "0",
          salary: jobData.salary ? Number(jobData.salary) : null,
          vacancy: parseInt(jobData.vacancy, 10),
          salaryMin: jobData.salaryMin ? Number(jobData.salaryMin) : "",
          salaryMax: jobData.salaryMax ? Number(jobData.salaryMax) : "",
        }),
      });

      const result = await response.json();
      if (response.ok) {
        toast({
          title:
            status === "published"
              ? "Job Posted Successfully!"
              : "Job Saved as Draft!",
          description:
            status === "published"
              ? "Your job posting is now live."
              : "You can publish it later.",
        });
        window.location.href = "/dashboard/client/postedJobs";
      } else {
        throw new Error(result.message || "Failed to save job");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.message || "Failed to save job posting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const JobPreview = () => (
    <Card className="w-full mx-auto">
      <CardHeader className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-t-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start gap-4">
          <div>
            <CardTitle className="text-xl md:text-2xl mb-2">
              {jobData.title || "Job Title"}
            </CardTitle>
            <div className="flex flex-wrap items-center gap-3 text-teal-100 text-sm">
              <div className="flex items-center gap-1">
                <Building2 className="w-3 h-3 md:w-4 md:h-4" />
                {jobData.company || "Company Name"}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                {jobData.location || "Location"}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                {jobData.jobType || "Job Type"}
              </div>
            </div>
          </div>
          <div className="text-right">
            {jobData.featured && (
              <Badge className="bg-yellow-500 text-yellow-900 text-xs mb-2">
                Featured
              </Badge>
            )}
            <div className="text-teal-100 text-sm">
              <div className="flex items-center gap-1">
                <DollarSign className="w-3 h-3 md:w-4 md:h-4" />
                {jobData.salary
                  ? `${jobData.currency} ${jobData.salary}/month`
                  : jobData.salaryMin && jobData.salaryMax
                  ? `${jobData.currency} ${jobData.salaryMin} - ${jobData.salaryMax}/month`
                  : "Salary not specified"}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          <div className="space-y-4 md:space-y-6">
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
                Job Description
              </h3>
              <p className="text-gray-700 text-sm md:text-base whitespace-pre-wrap">
                {jobData.description || "Job description will appear here..."}
              </p>
            </div>

            {jobData.responsibilities && (
              <div>
                <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
                  Key Responsibilities
                </h3>
                <p className="text-gray-700 text-sm md:text-base whitespace-pre-wrap">
                  {jobData.responsibilities}
                </p>
              </div>
            )}

            {jobData.requirements && (
              <div>
                <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
                  Requirements
                </h3>
                <p className="text-gray-700 text-sm md:text-base whitespace-pre-wrap">
                  {jobData.requirements}
                </p>
              </div>
            )}

            {jobData.benefits && (
              <div>
                <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
                  Benefits & Perks
                </h3>
                <p className="text-gray-700 text-sm md:text-base whitespace-pre-wrap">
                  {jobData.benefits}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-3 md:space-y-4">
            <Card className="rounded-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-base md:text-lg">
                  Job Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 md:space-y-3">
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">
                    {jobData.category || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-gray-600">Job Reference:</span>
                  <span className="font-medium">
                    {jobData.jobReference || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-gray-600">Vacancies:</span>
                  <span className="font-medium flex items-center gap-1">
                    <Users className="w-3 h-3 md:w-4 md:h-4" />
                    {jobData.vacancy || "1"}
                  </span>
                </div>
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-gray-600">Experience Level:</span>
                  <span className="font-medium">
                    {jobData.experienceLevel || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-gray-600">Work Type:</span>
                  <span className="font-medium">
                    {jobData.workType || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-gray-600">Deadline:</span>
                  <span className="font-medium">
                    {jobData.deadline || "N/A"}
                  </span>
                </div>
                {jobData.vendor && (
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-gray-600">Vendor:</span>
                    <span className="font-medium">{jobData.vendor}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {jobData.skills && (
              <Card className="rounded-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base md:text-lg">
                    Required Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {jobData.skills.split(",").map((skill, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs py-0.5 px-1.5"
                      >
                        {skill.trim()}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="rounded-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-base md:text-lg">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 md:space-y-2">
                {jobData.contactEmail && (
                  <div className="text-xs md:text-sm">
                    <span className="text-gray-600">Email: </span>
                    <span className="font-medium">{jobData.contactEmail}</span>
                  </div>
                )}
                {jobData.contactPhone && (
                  <div className="text-xs md:text-sm">
                    <span className="text-gray-600">Phone: </span>
                    <span className="font-medium">{jobData.contactPhone}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Button className="w-full bg-teal-600 hover:bg-teal-700 h-9 text-sm">
              Apply for this Job
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (showPreview) {
    return (
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setShowPreview(false)}
            size="sm"
            className="h-8 text-xs"
          >
            <ArrowLeft className="w-3 h-3 mr-1 md:mr-2 md:w-4 md:h-4" />
            <span className="hidden xs:inline">Back to Edit</span>
          </Button>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-gray-900">
              Job Preview
            </h1>
            <p className="text-gray-600 mt-1 text-xs md:text-sm">
              This is how your job posting will appear to candidates.
            </p>
          </div>
        </div>
        <JobPreview />
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button
            onClick={() => handleSubmit("Pending")}
            className="bg-teal-600 hover:bg-teal-700 h-9 text-xs md:text-sm"
            disabled={isSubmitting}
          >
            <Save className="w-3 h-3 mr-1 md:mr-2 md:w-4 md:h-4" />
            {isSubmitting ? "Publishing..." : "Publish Job"}
          </Button>
          <Button
            onClick={() => handleSubmit("draft")}
            variant="outline"
            className="h-9 text-xs md:text-sm"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save as Draft"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <Link href="/dashboard/client/postedJobs">
          <Button variant="outline" size="sm" className="h-8 text-xs">
            <ArrowLeft className="w-3 h-3 mr-1 md:mr-2 md:w-4 md:h-4" />
            <span className="hidden xs:inline">Back to Jobs</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-lg md:text-xl font-bold text-gray-900">
            Post New Job
          </h1>
          <p className="text-gray-600 mt-1 text-xs md:text-sm">
            Create a new job posting to attract the best candidates.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6">
        <div className="space-y-4 md:space-y-6">
          <Card className="rounded-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg">
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-xs md:text-sm">
                    Job Title *
                  </Label>
                  <Input
                    id="title"
                    value={jobData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="e.g. Senior Frontend Developer"
                    required
                    className="h-9 text-xs md:text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-xs md:text-sm">
                    Company Name *
                  </Label>
                  <Input
                    id="company"
                    value={jobData.company}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value)
                    }
                    placeholder="Your company name"
                    required
                    className="h-9 text-xs md:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-xs md:text-sm">
                    Location *
                  </Label>
                  <Input
                    id="location"
                    value={jobData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    placeholder="e.g. New York, NY or Remote"
                    required
                    className="h-9 text-xs md:text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-xs md:text-sm">
                    Category *
                  </Label>
                  <Select
                    value={jobData.category}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                    required
                  >
                    <SelectTrigger className="h-9 text-xs md:text-sm">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="Technology"
                        className="text-xs md:text-sm"
                      >
                        Technology
                      </SelectItem>
                      <SelectItem
                        value="Marketing"
                        className="text-xs md:text-sm"
                      >
                        Marketing
                      </SelectItem>
                      <SelectItem value="Sales" className="text-xs md:text-sm">
                        Sales
                      </SelectItem>
                      <SelectItem
                        value="Customer Support"
                        className="text-xs md:text-sm"
                      >
                        Customer Support
                      </SelectItem>
                      <SelectItem value="Design" className="text-xs md:text-sm">
                        Design
                      </SelectItem>
                      <SelectItem
                        value="Finance"
                        className="text-xs md:text-sm"
                      >
                        Finance
                      </SelectItem>
                      <SelectItem
                        value="Human Resources"
                        className="text-xs md:text-sm"
                      >
                        Human Resources
                      </SelectItem>
                      <SelectItem
                        value="Operations"
                        className="text-xs md:text-sm"
                      >
                        Operations
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jobType" className="text-xs md:text-sm">
                    Job Type *
                  </Label>
                  <Select
                    value={jobData.jobType}
                    onValueChange={(value) =>
                      handleInputChange("jobType", value)
                    }
                    required
                  >
                    <SelectTrigger className="h-9 text-xs md:text-sm">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="Full-time"
                        className="text-xs md:text-sm"
                      >
                        Full-time
                      </SelectItem>
                      <SelectItem
                        value="Part-time"
                        className="text-xs md:text-sm"
                      >
                        Part-time
                      </SelectItem>
                      <SelectItem
                        value="Contract"
                        className="text-xs md:text-sm"
                      >
                        Contract
                      </SelectItem>
                      <SelectItem
                        value="Internship"
                        className="text-xs md:text-sm"
                      >
                        Internship
                      </SelectItem>
                      <SelectItem
                        value="Freelance"
                        className="text-xs md:text-sm"
                      >
                        Freelance
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workType" className="text-xs md:text-sm">
                    Work Type
                  </Label>
                  <Select
                    value={jobData.workType}
                    onValueChange={(value) =>
                      handleInputChange("workType", value)
                    }
                  >
                    <SelectTrigger className="h-9 text-xs md:text-sm">
                      <SelectValue placeholder="Select work type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="On-site"
                        className="text-xs md:text-sm"
                      >
                        On-site
                      </SelectItem>
                      <SelectItem value="Remote" className="text-xs md:text-sm">
                        Remote
                      </SelectItem>
                      <SelectItem value="Hybrid" className="text-xs md:text-sm">
                        Hybrid
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vacancy" className="text-xs md:text-sm">
                    Number of Vacancies *
                  </Label>
                  <Input
                    id="vacancy"
                    type="number"
                    value={jobData.vacancy}
                    onChange={(e) =>
                      handleInputChange("vacancy", e.target.value)
                    }
                    placeholder="1"
                    min="1"
                    required
                    className="h-9 text-xs md:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salary" className="text-xs md:text-sm">
                    Salary (Monthly)
                  </Label>
                  <Input
                    id="salary"
                    type="number"
                    value={jobData.salary}
                    onChange={(e) =>
                      handleInputChange("salary", e.target.value)
                    }
                    placeholder="5000"
                    className="h-9 text-xs md:text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salaryMin" className="text-xs md:text-sm">
                    Salary Range Min
                  </Label>
                  <Input
                    id="salaryMin"
                    type="number"
                    value={jobData.salaryMin}
                    onChange={(e) =>
                      handleInputChange("salaryMin", e.target.value)
                    }
                    placeholder="4000"
                    className="h-9 text-xs md:text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salaryMax" className="text-xs md:text-sm">
                    Salary Range Max
                  </Label>
                  <Input
                    id="salaryMax"
                    type="number"
                    value={jobData.salaryMax}
                    onChange={(e) =>
                      handleInputChange("salaryMax", e.target.value)
                    }
                    placeholder="6000"
                    className="h-9 text-xs md:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency" className="text-xs md:text-sm">
                    Currency
                  </Label>
                  <Select
                    value={jobData.currency}
                    onValueChange={(value) =>
                      handleInputChange("currency", value)
                    }
                  >
                    <SelectTrigger className="h-9 text-xs md:text-sm">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD" className="text-xs md:text-sm">
                        USD
                      </SelectItem>
                      <SelectItem value="EUR" className="text-xs md:text-sm">
                        EUR
                      </SelectItem>
                      <SelectItem value="GBP" className="text-xs md:text-sm">
                        GBP
                      </SelectItem>
                      <SelectItem value="INR" className="text-xs md:text-sm">
                        INR
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobReference" className="text-xs md:text-sm">
                    Job Reference *
                  </Label>
                  <Input
                    id="jobReference"
                    value={jobData.jobReference}
                    onChange={(e) =>
                      handleInputChange("jobReference", e.target.value)
                    }
                    placeholder="REF-001"
                    required
                    className="h-9 text-xs md:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vendor" className="text-xs md:text-sm">
                    Vendor/Recruiter
                  </Label>
                  <Input
                    id="vendor"
                    value={jobData.vendor}
                    onChange={(e) =>
                      handleInputChange("vendor", e.target.value)
                    }
                    placeholder="Vendor name"
                    className="h-9 text-xs md:text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline" className="text-xs md:text-sm">
                    Application Deadline
                  </Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={jobData.deadline}
                    onChange={(e) =>
                      handleInputChange("deadline", e.target.value)
                    }
                    className="h-9 text-xs md:text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg">
                Job Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description" className="text-xs md:text-sm">
                  Job Description *
                </Label>
                <Textarea
                  id="description"
                  value={jobData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Describe the role, company culture, and what makes this opportunity unique..."
                  rows={4}
                  required
                  className="text-xs md:text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="responsibilities"
                  className="text-xs md:text-sm"
                >
                  Key Responsibilities
                </Label>
                <Textarea
                  id="responsibilities"
                  value={jobData.responsibilities}
                  onChange={(e) =>
                    handleInputChange("responsibilities", e.target.value)
                  }
                  placeholder="List the main responsibilities and duties..."
                  rows={4}
                  className="text-xs md:text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements" className="text-xs md:text-sm">
                  Requirements
                </Label>
                <Textarea
                  id="requirements"
                  value={jobData.requirements}
                  onChange={(e) =>
                    handleInputChange("requirements", e.target.value)
                  }
                  placeholder="List the required qualifications, skills, and experience..."
                  rows={4}
                  className="text-xs md:text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="benefits" className="text-xs md:text-sm">
                  Benefits & Perks
                </Label>
                <Textarea
                  id="benefits"
                  value={jobData.benefits}
                  onChange={(e) =>
                    handleInputChange("benefits", e.target.value)
                  }
                  placeholder="Health insurance, flexible hours, remote work options..."
                  rows={3}
                  className="text-xs md:text-sm"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg">
                Candidate Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="experienceLevel"
                    className="text-xs md:text-sm"
                  >
                    Experience Level
                  </Label>
                  <Select
                    value={jobData.experienceLevel}
                    onValueChange={(value) =>
                      handleInputChange("experienceLevel", value)
                    }
                  >
                    <SelectTrigger className="h-9 text-xs md:text-sm">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="Entry Level"
                        className="text-xs md:text-sm"
                      >
                        Entry Level (0-2 years)
                      </SelectItem>
                      <SelectItem
                        value="Mid Level"
                        className="text-xs md:text-sm"
                      >
                        Mid Level (2-5 years)
                      </SelectItem>
                      <SelectItem
                        value="Senior Level"
                        className="text-xs md:text-sm"
                      >
                        Senior Level (5-10 years)
                      </SelectItem>
                      <SelectItem
                        value="Lead/Principal"
                        className="text-xs md:text-sm"
                      >
                        Lead/Principal (10+ years)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="educationLevel"
                    className="text-xs md:text-sm"
                  >
                    Education Level
                  </Label>
                  <Select
                    value={jobData.educationLevel}
                    onValueChange={(value) =>
                      handleInputChange("educationLevel", value)
                    }
                  >
                    <SelectTrigger className="h-9 text-xs md:text-sm">
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="High School"
                        className="text-xs md:text-sm"
                      >
                        High School
                      </SelectItem>
                      <SelectItem
                        value="Associate Degree"
                        className="text-xs md:text-sm"
                      >
                        Associate Degree
                      </SelectItem>
                      <SelectItem
                        value="Bachelor's Degree"
                        className="text-xs md:text-sm"
                      >
                        Bachelor's Degree
                      </SelectItem>
                      <SelectItem
                        value="Master's Degree"
                        className="text-xs md:text-sm"
                      >
                        Master's Degree
                      </SelectItem>
                      <SelectItem value="PhD" className="text-xs md:text-sm">
                        PhD
                      </SelectItem>
                      <SelectItem
                        value="No Requirement"
                        className="text-xs md:text-sm"
                      >
                        No Requirement
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills" className="text-xs md:text-sm">
                  Required Skills
                </Label>
                <Input
                  id="skills"
                  value={jobData.skills}
                  onChange={(e) => handleInputChange("skills", e.target.value)}
                  placeholder="React, Node.js, TypeScript, AWS (comma separated)"
                  className="h-9 text-xs md:text-sm"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg">
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail" className="text-xs md:text-sm">
                    Contact Email
                  </Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={jobData.contactEmail}
                    onChange={(e) =>
                      handleInputChange("contactEmail", e.target.value)
                    }
                    placeholder="hr@company.com"
                    className="h-9 text-xs md:text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone" className="text-xs md:text-sm">
                    Contact Phone
                  </Label>
                  <Input
                    id="contactPhone"
                    value={jobData.contactPhone}
                    onChange={(e) =>
                      handleInputChange("contactPhone", e.target.value)
                    }
                    placeholder="+1 (555) 123-4567"
                    className="h-9 text-xs md:text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 md:space-y-6">
          <Card className="rounded-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg">
                Job Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="featured" className="text-xs md:text-sm">
                    Featured Job
                  </Label>
                  <p className="text-xs text-gray-600">
                    Highlight this job posting
                  </p>
                </div>
                <Switch
                  id="featured"
                  checked={jobData.featured}
                  onCheckedChange={(checked) =>
                    handleInputChange("featured", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="isRemote" className="text-xs md:text-sm">
                    Remote Position
                  </Label>
                  <p className="text-xs text-gray-600">Allow remote work</p>
                </div>
                <Switch
                  id="isRemote"
                  checked={jobData.isRemote}
                  onCheckedChange={(checked) =>
                    handleInputChange("isRemote", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="isUrgent" className="text-xs md:text-sm">
                    Urgent Hiring
                  </Label>
                  <p className="text-xs text-gray-600">Mark as urgent</p>
                </div>
                <Switch
                  id="isUrgent"
                  checked={jobData.isUrgent}
                  onCheckedChange={(checked) =>
                    handleInputChange("isUrgent", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 md:space-y-3">
              <Button
                onClick={() => setShowPreview(true)}
                variant="outline"
                className="w-full h-9 text-xs md:text-sm"
                disabled={isSubmitting}
              >
                <Eye className="w-3 h-3 mr-1 md:mr-2 md:w-4 md:h-4" />
                Preview Job
              </Button>
              <Button
                onClick={() => handleSubmit("Pending")}
                className="w-full bg-teal-600 hover:bg-teal-700 h-9 text-xs md:text-sm"
                disabled={isSubmitting}
              >
                <Save className="w-3 h-3 mr-1 md:mr-2 md:w-4 md:h-4" />
                {isSubmitting ? "Publishing..." : "Publish Job"}
              </Button>
              <Button
                onClick={() => handleSubmit("draft")}
                variant="outline"
                className="w-full h-9 text-xs md:text-sm"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save as Draft"}
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg">
                Tips for Better Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-xs md:text-sm text-gray-600 space-y-1">
                <li>• Use clear, specific job titles</li>
                <li>• Include salary range to attract more candidates</li>
                <li>• Highlight unique benefits and company culture</li>
                <li>• Be specific about required skills and experience</li>
                <li>• Set realistic application deadlines</li>
                <li>• Use the preview feature before publishing</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
