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
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl mb-2">
              {jobData.title || "Job Title"}
            </CardTitle>
            <div className="flex items-center gap-4 text-teal-100">
              <div className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                {jobData.company || "Company Name"}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {jobData.location || "Location"}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {jobData.jobType || "Job Type"}
              </div>
            </div>
          </div>
          <div className="text-right">
            {jobData.featured && (
              <Badge className="bg-yellow-500 text-yellow-900 mb-2">
                Featured
              </Badge>
            )}
            <div className="text-teal-100">
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
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
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Job Description</h3>
              <p className="text-gray-700 whitespace-pre-wrap">
                {jobData.description || "Job description will appear here..."}
              </p>
            </div>

            {jobData.responsibilities && (
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Key Responsibilities
                </h3>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {jobData.responsibilities}
                </p>
              </div>
            )}

            {jobData.requirements && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {jobData.requirements}
                </p>
              </div>
            )}

            {jobData.benefits && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Benefits & Perks</h3>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {jobData.benefits}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">
                    {jobData.category || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Job Reference:</span>
                  <span className="font-medium">
                    {jobData.jobReference || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vacancies:</span>
                  <span className="font-medium flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {jobData.vacancy || "1"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience Level:</span>
                  <span className="font-medium">
                    {jobData.experienceLevel || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Work Type:</span>
                  <span className="font-medium">
                    {jobData.workType || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deadline:</span>
                  <span className="font-medium">
                    {jobData.deadline || "N/A"}
                  </span>
                </div>
                {jobData.vendor && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vendor:</span>
                    <span className="font-medium">{jobData.vendor}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {jobData.skills && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Required Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {jobData.skills.split(",").map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill.trim()}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {jobData.contactEmail && (
                  <div className="text-sm">
                    <span className="text-gray-600">Email: </span>
                    <span className="font-medium">{jobData.contactEmail}</span>
                  </div>
                )}
                {jobData.contactPhone && (
                  <div className="text-sm">
                    <span className="text-gray-600">Phone: </span>
                    <span className="font-medium">{jobData.contactPhone}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Button className="w-full bg-teal-600 hover:bg-teal-700">
              Apply for this Job
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (showPreview) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setShowPreview(false)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Edit
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Preview</h1>
            <p className="text-gray-600 mt-1">
              This is how your job posting will appear to candidates.
            </p>
          </div>
        </div>
        <JobPreview />
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => handleSubmit("published")}
            className="bg-teal-600 hover:bg-teal-700"
            disabled={isSubmitting}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? "Publishing..." : "Publish Job"}
          </Button>
          <Button
            onClick={() => handleSubmit("draft")}
            variant="outline"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save as Draft"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/client/postedJobs">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Post New Job</h1>
          <p className="text-gray-600 mt-1">
            Create a new job posting to attract the best candidates.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={jobData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="e.g. Senior Frontend Developer"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name *</Label>
                  <Input
                    id="company"
                    value={jobData.company}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value)
                    }
                    placeholder="Your company name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={jobData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    placeholder="e.g. New York, NY or Remote"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={jobData.category}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Customer Support">
                        Customer Support
                      </SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Human Resources">
                        Human Resources
                      </SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jobType">Job Type *</Label>
                  <Select
                    value={jobData.jobType}
                    onValueChange={(value) =>
                      handleInputChange("jobType", value)
                    }
                    required
                  >
                    <SelectTrigger>
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workType">Work Type</Label>
                  <Select
                    value={jobData.workType}
                    onValueChange={(value) =>
                      handleInputChange("workType", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select work type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="On-site">On-site</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vacancy">Number of Vacancies *</Label>
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
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary (Monthly)</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={jobData.salary}
                    onChange={(e) =>
                      handleInputChange("salary", e.target.value)
                    }
                    placeholder="5000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salaryMin">Salary Range Min</Label>
                  <Input
                    id="salaryMin"
                    type="number"
                    value={jobData.salaryMin}
                    onChange={(e) =>
                      handleInputChange("salaryMin", e.target.value)
                    }
                    placeholder="4000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salaryMax">Salary Range Max</Label>
                  <Input
                    id="salaryMax"
                    type="number"
                    value={jobData.salaryMax}
                    onChange={(e) =>
                      handleInputChange("salaryMax", e.target.value)
                    }
                    placeholder="6000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={jobData.currency}
                    onValueChange={(value) =>
                      handleInputChange("currency", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="INR">INR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobReference">Job Reference *</Label>
                  <Input
                    id="jobReference"
                    value={jobData.jobReference}
                    onChange={(e) =>
                      handleInputChange("jobReference", e.target.value)
                    }
                    placeholder="REF-001"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vendor">Vendor/Recruiter</Label>
                  <Input
                    id="vendor"
                    value={jobData.vendor}
                    onChange={(e) =>
                      handleInputChange("vendor", e.target.value)
                    }
                    placeholder="Vendor name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Application Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={jobData.deadline}
                    onChange={(e) =>
                      handleInputChange("deadline", e.target.value)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  value={jobData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Describe the role, company culture, and what makes this opportunity unique..."
                  rows={6}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsibilities">Key Responsibilities</Label>
                <Textarea
                  id="responsibilities"
                  value={jobData.responsibilities}
                  onChange={(e) =>
                    handleInputChange("responsibilities", e.target.value)
                  }
                  placeholder="List the main responsibilities and duties..."
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  value={jobData.requirements}
                  onChange={(e) =>
                    handleInputChange("requirements", e.target.value)
                  }
                  placeholder="List the required qualifications, skills, and experience..."
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="benefits">Benefits & Perks</Label>
                <Textarea
                  id="benefits"
                  value={jobData.benefits}
                  onChange={(e) =>
                    handleInputChange("benefits", e.target.value)
                  }
                  placeholder="Health insurance, flexible hours, remote work options..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Candidate Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experienceLevel">Experience Level</Label>
                  <Select
                    value={jobData.experienceLevel}
                    onValueChange={(value) =>
                      handleInputChange("experienceLevel", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Entry Level">
                        Entry Level (0-2 years)
                      </SelectItem>
                      <SelectItem value="Mid Level">
                        Mid Level (2-5 years)
                      </SelectItem>
                      <SelectItem value="Senior Level">
                        Senior Level (5-10 years)
                      </SelectItem>
                      <SelectItem value="Lead/Principal">
                        Lead/Principal (10+ years)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="educationLevel">Education Level</Label>
                  <Select
                    value={jobData.educationLevel}
                    onValueChange={(value) =>
                      handleInputChange("educationLevel", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High School">High School</SelectItem>
                      <SelectItem value="Associate Degree">
                        Associate Degree
                      </SelectItem>
                      <SelectItem value="Bachelor's Degree">
                        Bachelor's Degree
                      </SelectItem>
                      <SelectItem value="Master's Degree">
                        Master's Degree
                      </SelectItem>
                      <SelectItem value="PhD">PhD</SelectItem>
                      <SelectItem value="No Requirement">
                        No Requirement
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Required Skills</Label>
                <Input
                  id="skills"
                  value={jobData.skills}
                  onChange={(e) => handleInputChange("skills", e.target.value)}
                  placeholder="React, Node.js, TypeScript, AWS (comma separated)"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={jobData.contactEmail}
                    onChange={(e) =>
                      handleInputChange("contactEmail", e.target.value)
                    }
                    placeholder="hr@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={jobData.contactPhone}
                    onChange={(e) =>
                      handleInputChange("contactPhone", e.target.value)
                    }
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="featured">Featured Job</Label>
                  <p className="text-sm text-gray-600">
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
                  <Label htmlFor="isRemote">Remote Position</Label>
                  <p className="text-sm text-gray-600">Allow remote work</p>
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
                  <Label htmlFor="isUrgent">Urgent Hiring</Label>
                  <p className="text-sm text-gray-600">Mark as urgent</p>
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

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => setShowPreview(true)}
                variant="outline"
                className="w-full"
                disabled={isSubmitting}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview Job
              </Button>
              <Button
                onClick={() => handleSubmit("published")}
                className="w-full bg-teal-600 hover:bg-teal-700"
                disabled={isSubmitting}
              >
                <Save className="w-4 h-4 mr-2" />
                {isSubmitting ? "Publishing..." : "Publish Job"}
              </Button>
              <Button
                onClick={() => handleSubmit("draft")}
                variant="outline"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save as Draft"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips for Better Results</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
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
