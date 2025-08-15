"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast, Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { Loader2 } from "@/components/ui/loader2";
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

  useEffect(() => {
    if (session?.user?.email) {
      setFormData((prev) => ({ ...prev, email: session.user.email }));
    }
  }, [session]);

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
          position: "",
          resume: null,
          coverLetter: "",
        });
        document.getElementById("resume").value = "";
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

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <Toaster />

      {/* Hero Banner */}
      <div
        className="w-full h-64 bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: "url('/Job.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Apply for Your Dream Job
          </h1>
          <p className="mt-3 text-lg text-gray-200">
            Fill out the form below and submit your resume to get started.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex justify-center items-center py-12 px-4">
        <Card className="w-full max-w-3xl shadow-2xl rounded-xl border-2 border-orange-200">
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Quick Apply & Upload Resume
              </h2>
              <p className="text-gray-600 mt-2">
                Get one step closer to your dream job
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <Label
                  htmlFor="fullName"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Full Name
                </Label>
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-2 w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="mt-2 w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <Label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Phone Number
                </Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-2 w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              {/* Position */}
              <div>
                <Label
                  htmlFor="position"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Position Applying For
                </Label>
                <Input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="mt-2 w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              {/* Resume */}
              <div>
                <Label
                  htmlFor="resume"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Resume
                </Label>
                <Input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                  className="mt-2 w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              {/* Cover Letter */}
              <div>
                <Label
                  htmlFor="coverLetter"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Cover Letter
                </Label>
                <Textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  rows="5"
                  className="mt-2 w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full py-3 rounded-lg font-semibold text-white shadow-md transition duration-300",
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-teal-600 hover:bg-teal-700"
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplyPage;
