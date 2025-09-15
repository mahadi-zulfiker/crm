"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast, Toaster } from "sonner";
import { cn } from "@/lib/utils";
import {
  Loader2,
  Upload,
  User,
  Mail,
  Phone,
  Briefcase,
  FileText,
  MapPin,
  DollarSign,
  Building,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";

const ApplyPage = () => {
  const { jobId } = useParams();
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    resume: null,
    coverLetter: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobDetails, setJobDetails] = useState(null);
  const [loadingJob, setLoadingJob] = useState(true);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [checkingApplication, setCheckingApplication] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      setFormData((prev) => ({ ...prev, email: session.user.email }));
    }

    // Fetch job details
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`/api/jobs/${jobId}`);
        const job = await response.json();
        if (response.ok) {
          setJobDetails(job);
          setFormData((prev) => ({
            ...prev,
            position: job.title || "",
          }));
        } else {
          toast.error(job.error || "Failed to fetch job details");
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
        toast.error("Error fetching job details");
      } finally {
        setLoadingJob(false);
      }
    };

    // Check if user already applied
    const checkIfApplied = async () => {
      if (!session?.user?.email || !jobId) return;

      try {
        const response = await fetch(
          `/api/checkApplication?jobId=${jobId}&email=${session.user.email}`
        );
        const result = await response.json();
        if (result.success) {
          setAlreadyApplied(result.applied);
        }
      } catch (error) {
        console.error("Error checking application status:", error);
      } finally {
        setCheckingApplication(false);
      }
    };

    if (jobId) {
      fetchJobDetails();
      checkIfApplied();
    }
  }, [session, jobId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.resume) {
      toast.error("Please upload a resume!");
      return;
    }

    setIsSubmitting(true);
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    formDataToSend.append("jobId", jobId);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Application submitted successfully!");
        setFormData({
          fullName: "",
          email: session?.user?.email || "",
          phone: "",
          position: jobDetails?.title || "",
          resume: null,
          coverLetter: "",
        });
        document.getElementById("resume").value = "";
        // Update the application status
        setAlreadyApplied(true);
      } else {
        toast.error(result.error || "Failed to submit application.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Something went wrong. Please try again!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingJob || checkingApplication) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-teal-600 mx-auto" />
            <p className="mt-4 text-gray-600">
              {loadingJob
                ? "Loading job details..."
                : "Checking application status..."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If already applied, show success message
  if (alreadyApplied) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex flex-col">
        <Navbar />
        <Toaster />
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl shadow-2xl rounded-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-8 text-center">
              <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
              <CardTitle className="text-3xl font-bold text-white">
                Application Submitted Successfully!
              </CardTitle>
            </div>
            <CardContent className="p-8 text-center">
              <div className="bg-teal-50 rounded-2xl p-6 mb-6">
                <AlertCircle className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  You've Already Applied for This Position
                </h3>
                <p className="text-gray-700 mb-4">
                  We've received your application for{" "}
                  <span className="font-semibold">{jobDetails?.title}</span> at{" "}
                  <span className="font-semibold">{jobDetails?.company}</span>.
                  Our team will review your application and contact you if
                  there's a match.
                </p>
                <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-teal-200">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                  <span className="text-teal-700 font-medium">
                    Application Received
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    What's Next?
                  </h4>
                  <ul className="text-sm text-gray-600 text-left space-y-1">
                    <li>• Application review process</li>
                    <li>• Initial screening interview</li>
                    <li>• Skills assessment (if required)</li>
                    <li>• Final interview stage</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-800 mb-2">Timeline</h4>
                  <ul className="text-sm text-gray-600 text-left space-y-1">
                    <li>• Review within 3-5 business days</li>
                    <li>• Interview scheduling</li>
                    <li>• Decision notification</li>
                    <li>• Onboarding process</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => router.push("/allJobs")}
                  className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-300"
                >
                  Browse More Jobs
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/dashboard")}
                  className="border-teal-300 text-teal-700 hover:bg-teal-50 px-6 py-3 rounded-xl font-bold shadow-sm transition-all duration-300"
                >
                  Go to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <Toaster />

      {/* Hero Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-700/90 via-teal-800/90 to-teal-900/90"></div>
        <div className="absolute inset-0 bg-[url('/Job.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 py-16 px-4 max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
              Apply for Your Dream Job
            </h1>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto mb-8">
              Take the next step in your career journey. Fill out the form below
              and submit your resume to get started.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-teal-300" />
                <span className="text-white font-medium">Career Growth</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 flex items-center gap-2">
                <Building className="w-5 h-5 text-teal-300" />
                <span className="text-white font-medium">Top Companies</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 flex items-center gap-2">
                <Clock className="w-5 h-5 text-teal-300" />
                <span className="text-white font-medium">Fast Process</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Job Details Preview */}
      {jobDetails && (
        <div className="py-8 px-4 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-6 shadow-lg border border-teal-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {jobDetails.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-gray-700 flex items-center gap-2">
                      <Building className="w-5 h-5 text-teal-600" />
                      <span className="font-medium">{jobDetails.company}</span>
                    </span>
                    <span className="text-gray-700 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-teal-600" />
                      <span>{jobDetails.location}</span>
                    </span>
                    <span className="text-gray-700 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-teal-600" />
                      <span className="font-medium">{jobDetails.salary}</span>
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full text-sm font-semibold shadow-md">
                    {jobDetails.jobType}
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-semibold shadow-md">
                    {jobDetails.experienceLevel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Section */}
      <div className="flex-1 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-2xl rounded-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-6">
                <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <User className="w-6 h-6" />
                  </div>
                  Application Form
                </CardTitle>
                <p className="text-teal-100 mt-2">
                  Please fill in all required information to apply for this
                  position
                </p>
              </div>
              <CardContent className="p-6">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="fullName"
                      className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-teal-600" />
                      Full Name
                    </Label>
                    <Input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4 text-teal-600" />
                      Email Address
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      disabled
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl cursor-not-allowed"
                      placeholder="Your email address"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4 text-teal-600" />
                      Phone Number
                    </Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  {/* Position */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="position"
                      className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2"
                    >
                      <Briefcase className="w-4 h-4 text-teal-600" />
                      Position Applying For
                    </Label>
                    <Input
                      type="text"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                      placeholder="Position you're applying for"
                      required
                    />
                  </div>

                  {/* Resume */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="resume"
                      className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4 text-teal-600" />
                      Resume
                    </Label>
                    <div className="mt-2 flex justify-center px-6 pt-8 pb-10 border-2 border-dashed border-teal-300 rounded-2xl bg-gradient-to-br from-teal-50 to-blue-50 hover:from-teal-100 hover:to-blue-100 transition-all duration-300">
                      <div className="space-y-4 text-center">
                        <div className="mx-auto bg-teal-100 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                          <Upload className="mx-auto h-8 w-8 text-teal-600" />
                        </div>
                        <div className="flex flex-col sm:flex-row text-sm text-gray-600 gap-2 justify-center">
                          <label
                            htmlFor="resume"
                            className="relative cursor-pointer bg-white rounded-lg font-semibold text-teal-600 hover:text-teal-500 focus-within:outline-none px-4 py-2 border border-teal-300 shadow-sm hover:shadow-md transition-all duration-300"
                          >
                            <span>Upload a file</span>
                            <Input
                              type="file"
                              id="resume"
                              name="resume"
                              accept=".pdf,.doc,.docx"
                              onChange={handleChange}
                              className="sr-only"
                              required
                            />
                          </label>
                          <p className="pl-1 flex items-center justify-center">
                            or drag and drop
                          </p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PDF, DOC, DOCX up to 10MB
                        </p>
                        {formData.resume && (
                          <div className="mt-4 p-3 bg-teal-100 rounded-lg border border-teal-200">
                            <p className="text-sm text-teal-800 font-medium flex items-center justify-center gap-2">
                              <FileText className="w-4 h-4" />
                              {formData.resume.name}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="coverLetter"
                      className="block text-sm font-semibold text-gray-800 mb-2"
                    >
                      Cover Letter
                    </Label>
                    <Textarea
                      id="coverLetter"
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleChange}
                      rows="6"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                      placeholder="Tell us why you're the perfect candidate for this position..."
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl",
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Summary Card */}
            {jobDetails && (
              <Card className="shadow-xl rounded-2xl border-0 bg-gradient-to-br from-teal-50 to-blue-50 overflow-hidden">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4">
                  <h3 className="text-lg font-bold text-white">Job Summary</h3>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-teal-100 p-2 rounded-lg">
                        <Briefcase className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Job Title
                        </h4>
                        <p className="text-gray-600">{jobDetails.title}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-teal-100 p-2 rounded-lg">
                        <Building className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Company</h4>
                        <p className="text-gray-600">{jobDetails.company}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-teal-100 p-2 rounded-lg">
                        <MapPin className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Location
                        </h4>
                        <p className="text-gray-600">{jobDetails.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-teal-100 p-2 rounded-lg">
                        <DollarSign className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Salary</h4>
                        <p className="text-gray-600">{jobDetails.salary}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-teal-100 p-2 rounded-lg">
                        <Clock className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Job Type
                        </h4>
                        <p className="text-gray-600">{jobDetails.jobType}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tips Card */}
            <Card className="shadow-xl rounded-2xl border-0 bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4">
                <h3 className="text-lg font-bold text-white">
                  Application Tips
                </h3>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="bg-amber-100 p-1 rounded-full mt-1">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">
                      Customize your cover letter for this specific role
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-amber-100 p-1 rounded-full mt-1">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">
                      Proofread your resume and application materials
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-amber-100 p-1 rounded-full mt-1">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">
                      Highlight relevant skills and experiences
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-amber-100 p-1 rounded-full mt-1">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">
                      Keep your application concise and impactful
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Need Help Card */}
            <Card className="shadow-xl rounded-2xl border-0 bg-gradient-to-br from-indigo-50 to-purple-50 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
                <h3 className="text-lg font-bold text-white">Need Help?</h3>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-700 mb-4">
                  Our team is here to assist you with your application process.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-indigo-300 text-indigo-700 hover:bg-indigo-50 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                  onClick={() => router.push("/contactUs")}
                >
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
