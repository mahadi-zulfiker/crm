"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/Separator";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Star,
  Download,
  MessageCircle,
  Globe,
  Loader2,
  Eye,
  Share2,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  CheckCircle,
  ExternalLink,
  Linkedin,
  Github,
  Twitter,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Head from "next/head";

export default function ViewEmployeeProfile() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InnerViewEmployeeProfile />
    </Suspense>
  );
}

function InnerViewEmployeeProfile() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const employeeEmail = searchParams.get("email");

  const fetchEmployeeData = useCallback(async (email) => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email provided.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `/api/employeeProfile?email=${encodeURIComponent(email)}`
      );
      const data = response.data;

      // Normalize projects to ensure technologiesUsed is an array
      const normalizedProjects = (data.projects || []).map((project) => ({
        ...project,
        technologiesUsed: Array.isArray(project.technologiesUsed)
          ? project.technologiesUsed
          : typeof project.technologiesUsed === "string"
          ? project.technologiesUsed.split(",").map((tech) => tech.trim())
          : [],
      }));

      // Initialize arrays and nested objects
      const initializedData = {
        ...data,
        education: data.education || [],
        workExperience: data.workExperience || [],
        skills: data.skills || [],
        projects: normalizedProjects,
        certifications: data.certifications || [],
        languages: data.languages || [],
        personalInfo: {
          ...data.personalInfo,
          contact: data.personalInfo?.contact || {},
          location: data.personalInfo?.location || {},
          links: data.personalInfo?.links || {},
        },
      };

      setEmployee(initializedData);
      setError(null);
    } catch (error) {
      console.error("Error fetching employee data:", error);
      if (error.response?.status === 404) {
        setError("Employee profile not found.");
      } else if (error.response?.status === 500) {
        setError("Server error. Please try again later.");
      } else {
        setError("Failed to load employee profile.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetchEmployeeData(employeeEmail || session.user.email);
    }
  }, [status, session, employeeEmail, fetchEmployeeData]);

  const getSkillLevel = (level) => {
    const levels = {
      beginner: {
        color: "bg-orange-100 text-orange-800 border-orange-200",
        label: "Beginner",
      },
      intermediate: {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        label: "Intermediate",
      },
      advanced: {
        color: "bg-green-100 text-green-800 border-green-200",
        label: "Advanced",
      },
      expert: {
        color: "bg-purple-100 text-purple-800 border-purple-200",
        label: "Expert",
      },
    };
    return levels[level?.toLowerCase()] || levels.intermediate;
  };

  const renderStars = (rating) => {
    const numRating = Number(rating) || 0;
    return (
      <div
        className="flex items-center gap-1"
        aria-label={`Rating: ${numRating.toFixed(1)} out of 5`}
      >
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < numRating
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }`}
            aria-hidden="true"
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">
          ({numRating.toFixed(1)})
        </span>
      </div>
    );
  };

  const getSocialIcon = (platform) => {
    const icons = {
      linkedin: Linkedin,
      github: Github,
      twitter: Twitter,
      website: Globe,
    };
    return icons[platform?.toLowerCase()] || Globe;
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2
            className="h-8 w-8 animate-spin text-teal-600"
            aria-label="Loading"
          />
          <p className="text-gray-600 text-lg">Loading employee profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ExternalLink className="w-8 h-8 text-red-600" aria-hidden="true" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Error Loading Profile
          </h2>
          <p className="text-gray-600 max-w-md">{error}</p>
        </div>
        <Button onClick={() => router.back()} variant="outline" size="lg">
          <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
          Go Back
        </Button>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-400" aria-hidden="true" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Employee Not Found
          </h2>
          <p className="text-gray-600 max-w-md">
            The requested profile could not be found or may have been removed.
          </p>
        </div>
        <Button onClick={() => router.back()} variant="outline" size="lg">
          <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{`${
          employee.personalInfo?.firstName || employee.name || "Employee"
        }'s Profile`}</title>
        <meta
          name="description"
          content={
            employee.personalInfo?.summary ||
            "View the professional profile of an employee."
          }
        />
        <meta
          property="og:title"
          content={`${
            employee.personalInfo?.firstName || employee.name || "Employee"
          }'s Profile`}
        />
        <meta
          property="og:description"
          content={
            employee.personalInfo?.summary ||
            "View the professional profile of an employee."
          }
        />
        <meta
          property="og:image"
          content={employee.personalInfo?.profilePicture || "/placeholder.svg"}
        />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="text-gray-600 hover:bg-gray-100 shrink-0"
                aria-label="Go back"
              >
                <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
                  Employee Profile
                </h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  Detailed information about{" "}
                  {employee.personalInfo?.firstName ||
                    employee.name ||
                    "Employee"}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Button
                variant="outline"
                size="sm"
                className="text-gray-600 hover:bg-gray-100 bg-white flex-1 sm:flex-none"
                aria-label="Share profile"
              >
                <Share2 className="w-4 h-4 mr-2" aria-hidden="true" />
                <span className="hidden sm:inline">Share</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-gray-600 hover:bg-gray-100 bg-white flex-1 sm:flex-none"
                aria-label="Download CV"
              >
                <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                <span className="hidden sm:inline">Download CV</span>
              </Button>
              <Button
                size="sm"
                className="bg-teal-600 hover:bg-teal-700 text-white flex-1 sm:flex-none"
                asChild
                aria-label="Contact employee"
              >
                <a
                  href={`mailto:${
                    employee.personalInfo?.contact?.email ||
                    employee.email ||
                    ""
                  }`}
                >
                  <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                  <span className="hidden sm:inline">Contact</span>
                </a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Profile Info */}
            <div className="xl:col-span-1 space-y-6">
              {/* Basic Info Card */}
              <Card className="shadow-sm border-0 bg-white">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="relative inline-block">
                      <Avatar className="w-24 h-24 sm:w-28 sm:h-28 mx-auto ring-4 ring-teal-50">
                        <AvatarImage
                          src={
                            employee.personalInfo?.profilePicture ||
                            "/placeholder.svg?height=200&width=200"
                          }
                          alt={`${
                            employee.personalInfo?.firstName ||
                            employee.name ||
                            "Employee"
                          }'s profile picture`}
                          className="object-cover"
                        />
                        <AvatarFallback className=" text-2xl bg-teal-100 text-teal-700 font-semibold">
                          {(
                            employee.personalInfo?.firstName ||
                            employee.name ||
                            "U"
                          )
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                        {`${employee.personalInfo?.firstName || ""} ${
                          employee.personalInfo?.lastName || ""
                        }`.trim() ||
                          employee.name ||
                          "Unknown"}
                      </h2>
                      <p className="text-base sm:text-lg text-teal-600 font-medium">
                        {employee.personalInfo?.jobTitle ||
                          employee.title ||
                          "Professional"}
                      </p>
                      {employee.rating && renderStars(employee.rating)}
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                      <Badge className="bg-green-100 text-green-800 border border-green-200 px-3 py-1">
                        <CheckCircle
                          className="w-3 h-3 mr-1"
                          aria-hidden="true"
                        />
                        {employee.availability || "Available"}
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 border border-blue-200 px-3 py-1">
                        <TrendingUp
                          className="w-3 h-3 mr-1"
                          aria-hidden="true"
                        />
                        {employee.personalInfo?.yearsOfExperience ||
                          employee.experience ||
                          0}{" "}
                        years
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="shadow-sm border-0 bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                    <Mail
                      className="w-5 h-5 mr-2 text-teal-600"
                      aria-hidden="true"
                    />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail
                      className="w-5 h-5 text-gray-500 mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-600 font-medium">Email</p>
                      <p className="font-medium text-gray-900 break-words">
                        {employee.personalInfo?.contact?.email ||
                          employee.email ||
                          "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone
                      className="w-5 h-5 text-gray-500 mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-600 font-medium">Phone</p>
                      <p className="font-medium text-gray-900">
                        {employee.personalInfo?.contact?.phone ||
                          employee.phone ||
                          "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin
                      className="w-5 h-5 text-gray-500 mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-600 font-medium">
                        Location
                      </p>
                      <p className="font-medium text-gray-900">
                        {employee.personalInfo?.location?.city &&
                        employee.personalInfo?.location?.country
                          ? `${employee.personalInfo.location.city}, ${employee.personalInfo.location.country}`
                          : employee.location || "Not specified"}
                      </p>
                    </div>
                  </div>

                  {employee.personalInfo?.links &&
                    Object.keys(employee.personalInfo.links).length > 0 && (
                      <>
                        <Separator className="my-4" />
                        <div className="space-y-3">
                          <p className="text-sm font-medium text-gray-900">
                            Social Links
                          </p>
                          {Object.entries(employee.personalInfo.links).map(
                            ([platform, url]) => {
                              if (!url) return null;
                              const IconComponent = getSocialIcon(platform);
                              return (
                                <div
                                  key={platform}
                                  className="flex items-center gap-3"
                                >
                                  <IconComponent
                                    className="w-4 h-4 text-gray-500"
                                    aria-hidden="true"
                                  />
                                  <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-teal-600 hover:text-teal-700 font-medium text-sm break-words"
                                    aria-label={`${platform} profile`}
                                  >
                                    {platform.charAt(0).toUpperCase() +
                                      platform.slice(1)}
                                  </a>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </>
                    )}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="shadow-sm border-0 bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                    <TrendingUp
                      className="w-5 h-5 mr-2 text-teal-600"
                      aria-hidden="true"
                    />
                    Performance Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-gray-900">
                        {employee.projectsCompleted || 0}
                      </p>
                      <p className="text-xs text-gray-600">Projects</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">
                        {employee.successRate || 0}%
                      </p>
                      <p className="text-xs text-gray-600">Success Rate</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Response Time
                      </span>
                      <span className="font-semibold text-gray-900 text-sm">
                        {employee.responseTime || "Not specified"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Hourly Rate</span>
                      <span className="font-semibold text-teal-600 text-sm flex items-center">
                        <DollarSign className="w-3 h-3" aria-hidden="true" />
                        {employee.hourlyRate
                          ? `${employee.hourlyRate}/hr`
                          : "Not specified"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Detailed Info */}
            <div className="xl:col-span-2 space-y-6">
              {/* About Section */}
              <Card className="shadow-sm border-0 bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    About
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    {employee.personalInfo?.summary ||
                      employee.about ||
                      "No description available."}
                  </p>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card className="shadow-sm border-0 bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Skills & Expertise
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {employee.skills?.length ? (
                      employee.skills.map((skill, index) => {
                        const skillLevel = getSkillLevel(skill.proficiency);
                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                          >
                            <span className="font-medium text-gray-900 text-sm">
                              {skill.skillName}
                            </span>
                            <Badge
                              className={`${skillLevel.color} text-xs font-medium border`}
                            >
                              {skillLevel.label}
                            </Badge>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-gray-500 col-span-2 text-center py-8">
                        No skills listed.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Work Experience */}
              <Card className="shadow-sm border-0 bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Work Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {employee.workExperience?.length ? (
                    employee.workExperience.map((exp, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                            <Briefcase
                              className="w-5 h-5 text-teal-600"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-base">
                            {exp.jobTitle}
                          </h3>
                          <p className="text-teal-600 font-medium text-sm">
                            {exp.companyName}
                          </p>
                          <div className="flex items-center gap-2 mt-1 mb-2">
                            <Calendar
                              className="w-4 h-4 text-gray-400"
                              aria-hidden="true"
                            />
                            <p className="text-sm text-gray-600">
                              {exp.startDate && exp.endDate
                                ? `${exp.startDate} - ${exp.endDate}`
                                : "Duration not specified"}
                            </p>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {exp.description || "No description provided."}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      No work experience listed.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Education */}
              <Card className="shadow-sm border-0 bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {employee.education?.length ? (
                    employee.education.map((edu, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <GraduationCap
                              className="w-5 h-5 text-blue-600"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-base">
                            {edu.degree}
                          </h3>
                          <p className="text-blue-600 font-medium text-sm">
                            {edu.institution}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar
                              className="w-4 h-4 text-gray-400"
                              aria-hidden="true"
                            />
                            <p className="text-sm text-gray-600">
                              {edu.graduationYear || "Year not specified"}
                            </p>
                          </div>
                          {edu.gpa && (
                            <p className="text-sm text-gray-700 mt-1">
                              GPA: {edu.gpa}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      No education information listed.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Certifications */}
              {employee.certifications?.length ? (
                <Card className="shadow-sm border-0 bg-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {employee.certifications.map((cert, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border"
                        >
                          <Award
                            className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0"
                            aria-hidden="true"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 text-sm">
                              {cert.certificationName}
                            </p>
                            <p className="text-sm text-gray-600">
                              {cert.issuingOrganization}
                            </p>
                            {cert.dateObtained && (
                              <p className="text-xs text-gray-500 mt-1">
                                {cert.dateObtained}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : null}

              {/* Projects/Portfolio */}
              {employee.projects?.length ? (
                <Card className="shadow-sm border-0 bg-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      Projects & Portfolio
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {employee.projects.map((project, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                      >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                          <h3 className="font-semibold text-gray-900 text-base">
                            {project.projectName}
                          </h3>
                          {project.projectUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              className="shrink-0 bg-transparent"
                            >
                              <a
                                href={project.projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`View ${project.projectName} project`}
                              >
                                <Eye
                                  className="w-4 h-4 mr-1"
                                  aria-hidden="true"
                                />
                                View
                              </a>
                            </Button>
                          )}
                        </div>
                        <p className="text-gray-700 mb-3 text-sm leading-relaxed">
                          {project.description}
                        </p>
                        {project.technologiesUsed?.length ? (
                          <div className="flex flex-wrap gap-2">
                            {project.technologiesUsed.map((tech, techIndex) => (
                              <Badge
                                key={techIndex}
                                variant="outline"
                                className="text-xs bg-gray-50"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ) : null}

              {/* Languages */}
              {employee.languages?.length ? (
                <Card className="shadow-sm border-0 bg-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      Languages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {employee.languages.map((lang, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                        >
                          <span className="font-medium text-gray-900 text-sm">
                            {lang.language}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {lang.proficiency}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
