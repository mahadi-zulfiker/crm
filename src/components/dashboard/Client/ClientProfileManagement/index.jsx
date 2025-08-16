"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import {
  Building2,
  Mail,
  Users,
  Calendar,
  Star,
  Edit,
  Save,
  Camera,
  Briefcase,
  Award,
  Loader2,
} from "lucide-react";

export default function ClientProfilePage() {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    // Basic Information
    _id: "",
    username: "",
    email: "",
    userType: "client",
    createdAt: "",
    lastUpdate: null,

    // Company Information
    companyName: "",
    companyLogo: "/placeholder.svg?height=120&width=120",
    industry: "",
    companySize: "",
    foundedYear: "",
    website: "",
    description: "",

    // Contact Information
    contactPerson: "",
    jobTitle: "",
    phone: "",
    alternativePhone: "",

    // Address Information
    headquarters: "",
    country: "",
    city: "",
    state: "",
    zipCode: "",

    // Business Details
    businessRegistration: "",
    taxId: "",
    businessType: "",

    // Hiring Information
    typicalHiringVolume: "",
    averageTimeToHire: "",
    preferredCandidateLevel: "",
    remoteWorkPolicy: "",

    // Company Culture & Benefits (as strings)
    companyValues: "",
    benefits: "",
    workEnvironment: "",

    // Social Media & Links
    linkedinUrl: "",
    twitterUrl: "",
    facebookUrl: "",

    // Preferences
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,

    // Statistics (read-only)
    totalJobsPosted: 0,
    activeJobs: 0,
    totalHires: 0,
    averageRating: 0,
    memberSince: "",
  });

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.email) return;

      try {
        setLoading(true);
        const response = await fetch(
          `/api/clientProfile?email=${session.user.email}`
        );

        if (response.ok) {
          const data = await response.json();

          // Handle the response data and provide defaults for missing fields
          const processedData = {
            // Basic user data from database
            _id: data._id || "",
            username: data.username || "",
            email: data.email || "",
            userType: data.userType || "client",
            createdAt: data.createdAt || new Date().toISOString(),
            lastUpdate: data.lastUpdate || null,

            // Company Information (with defaults if not exists)
            companyName: data.companyName || data.username || "Your Company",
            companyLogo:
              data.companyLogo || "/placeholder.svg?height=120&width=120",
            industry: data.industry || "",
            companySize: data.companySize || "",
            foundedYear: data.foundedYear || "",
            website: data.website || "",
            description: data.description || "",

            // Contact Information
            contactPerson: data.contactPerson || data.username || "",
            jobTitle: data.jobTitle || "",
            phone: data.phone || "",
            alternativePhone: data.alternativePhone || "",

            // Address Information
            headquarters: data.headquarters || "",
            country: data.country || "",
            city: data.city || "",
            state: data.state || "",
            zipCode: data.zipCode || "",

            // Business Details
            businessRegistration: data.businessRegistration || "",
            taxId: data.taxId || "",
            businessType: data.businessType || "",

            // Hiring Information
            typicalHiringVolume: data.typicalHiringVolume || "",
            averageTimeToHire: data.averageTimeToHire || "",
            preferredCandidateLevel: data.preferredCandidateLevel || "",
            remoteWorkPolicy: data.remoteWorkPolicy || "",

            // Company Culture & Benefits (convert arrays to strings if needed)
            companyValues: Array.isArray(data.companyValues)
              ? data.companyValues.join(", ")
              : data.companyValues || "",
            benefits: Array.isArray(data.benefits)
              ? data.benefits.join(", ")
              : data.benefits || "",
            workEnvironment: data.workEnvironment || "",

            // Social Media & Links
            linkedinUrl: data.linkedinUrl || "",
            twitterUrl: data.twitterUrl || "",
            facebookUrl: data.facebookUrl || "",

            // Preferences
            emailNotifications:
              data.emailNotifications !== undefined
                ? data.emailNotifications
                : true,
            smsNotifications:
              data.smsNotifications !== undefined
                ? data.smsNotifications
                : false,
            marketingEmails:
              data.marketingEmails !== undefined ? data.marketingEmails : true,

            // Statistics (calculated or default)
            totalJobsPosted: data.totalJobsPosted || 0,
            activeJobs: data.activeJobs || 0,
            totalHires: data.totalHires || 0,
            averageRating: data.averageRating || 0,
            memberSince: data.createdAt || new Date().toISOString(),
          };

          setProfileData(processedData);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Error",
          description:
            error.message || "Failed to load profile data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [session, toast]);

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  

  const handleSave = async () => {
    try {
      // Convert comma-separated strings to arrays for storage if needed
      const dataToSave = {
        ...profileData,
        email: session.user.email,
        // Keep as strings for now, but could convert to arrays if needed
        companyValues: profileData.companyValues,
        benefits: profileData.benefits,
      };

      const response = await fetch("/api/clientProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSave),
      });

      if (response.ok) {
        const result = await response.json();

        // Update the profile data with the returned profile
        if (result.profile) {
          const processedData = {
            ...profileData,
            ...result.profile,
            lastUpdate: result.profile.lastUpdate,
            // Handle arrays/strings conversion if needed
            companyValues: Array.isArray(result.profile.companyValues)
              ? result.profile.companyValues.join(", ")
              : result.profile.companyValues || "",
            benefits: Array.isArray(result.profile.benefits)
              ? result.profile.benefits.join(", ")
              : result.profile.benefits || "",
          };
          setProfileData(processedData);
        }

        toast({
          title: "Profile Updated",
          description:
            result.message ||
            "Your company profile has been successfully updated.",
        });
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description:
          error.message || "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // In a real app, you would upload to a storage service
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData((prev) => ({
          ...prev,
          companyLogo: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
          <p className="text-gray-600 mt-1">
            Manage your company information and hiring preferences.
          </p>
          {profileData.lastUpdate && (
            <p className="text-sm text-gray-500 mt-1">
              Last updated:{" "}
              {new Date(profileData.lastUpdate).toLocaleDateString()}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-teal-600 hover:bg-teal-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-teal-600 hover:bg-teal-700"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Profile Overview Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage
                    src={profileData.companyLogo || "/placeholder.svg"}
                    alt="Company Logo"
                  />
                  <AvatarFallback className="text-2xl bg-teal-500 text-white">
                    {(profileData.companyName || profileData.username || "C")
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-teal-600 text-white p-2 rounded-full cursor-pointer hover:bg-teal-700">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <div className="text-center mt-4">
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  {profileData.userType === "client"
                    ? "Client Account"
                    : "Verified Company"}
                </Badge>
              </div>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {profileData.companyName ||
                      profileData.username ||
                      "Your Company"}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    {profileData.industry || "Industry not specified"}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {profileData.companySize || "Size not specified"}
                    </div>
                    {profileData.foundedYear && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Founded {profileData.foundedYear}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      {profileData.averageRating || 0} Rating
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {profileData.totalJobsPosted}
                    </div>
                    <div className="text-sm text-gray-600">Jobs Posted</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {profileData.activeJobs}
                    </div>
                    <div className="text-sm text-gray-600">Active Jobs</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {profileData.totalHires}
                    </div>
                    <div className="text-sm text-gray-600">Total Hires</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {profileData.averageRating}
                    </div>
                    <div className="text-sm text-gray-600">Avg Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="company" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="company">Company Info</TabsTrigger>
          <TabsTrigger value="contact">Contact Details</TabsTrigger>
          <TabsTrigger value="hiring">Hiring Preferences</TabsTrigger>
          <TabsTrigger value="culture">Culture & Benefits</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Company Information Tab */}
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={profileData.companyName}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="Enter company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry *</Label>
                  <Input
                    id="industry"
                    value={profileData.industry}
                    onChange={(e) =>
                      handleInputChange("industry", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="e.g., Technology, Healthcare"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Input
                    id="companySize"
                    value={profileData.companySize}
                    onChange={(e) =>
                      handleInputChange("companySize", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="e.g., 1-10, 11-50, 51-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="foundedYear">Founded Year</Label>
                  <Input
                    id="foundedYear"
                    value={profileData.foundedYear}
                    onChange={(e) =>
                      handleInputChange("foundedYear", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="e.g., 2020"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="https://yourcompany.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Input
                    id="businessType"
                    value={profileData.businessType}
                    onChange={(e) =>
                      handleInputChange("businessType", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="e.g., Corporation, LLC"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  value={profileData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  disabled={!isEditing}
                  rows={4}
                  placeholder="Describe your company, mission, and values..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessRegistration">
                    Business Registration
                  </Label>
                  <Input
                    id="businessRegistration"
                    value={profileData.businessRegistration}
                    onChange={(e) =>
                      handleInputChange("businessRegistration", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="Registration number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID</Label>
                  <Input
                    id="taxId"
                    value={profileData.taxId}
                    onChange={(e) => handleInputChange("taxId", e.target.value)}
                    disabled={!isEditing}
                    placeholder="Tax identification number"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Details Tab */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input
                    id="contactPerson"
                    value={profileData.contactPerson}
                    onChange={(e) =>
                      handleInputChange("contactPerson", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="Primary contact name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={profileData.jobTitle}
                    onChange={(e) =>
                      handleInputChange("jobTitle", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="e.g., HR Manager, CEO"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={true} // Email should not be editable
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alternativePhone">Alternative Phone</Label>
                  <Input
                    id="alternativePhone"
                    value={profileData.alternativePhone}
                    onChange={(e) =>
                      handleInputChange("alternativePhone", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="Secondary contact number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="headquarters">Headquarters Address</Label>
                <Textarea
                  id="headquarters"
                  value={profileData.headquarters}
                  onChange={(e) =>
                    handleInputChange("headquarters", e.target.value)
                  }
                  disabled={!isEditing}
                  rows={2}
                  placeholder="Full company address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={profileData.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="Country"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    value={profileData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    disabled={!isEditing}
                    placeholder="State/Province"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={profileData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    disabled={!isEditing}
                    placeholder="City"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={profileData.zipCode}
                    onChange={(e) =>
                      handleInputChange("zipCode", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="ZIP/Postal Code"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                  <Input
                    id="linkedinUrl"
                    value={profileData.linkedinUrl}
                    onChange={(e) =>
                      handleInputChange("linkedinUrl", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="https://linkedin.com/company/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitterUrl">Twitter URL</Label>
                  <Input
                    id="twitterUrl"
                    value={profileData.twitterUrl}
                    onChange={(e) =>
                      handleInputChange("twitterUrl", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="https://twitter.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebookUrl">Facebook URL</Label>
                  <Input
                    id="facebookUrl"
                    value={profileData.facebookUrl}
                    onChange={(e) =>
                      handleInputChange("facebookUrl", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="https://facebook.com/..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hiring Preferences Tab */}
        <TabsContent value="hiring">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Hiring Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="typicalHiringVolume">
                    Typical Hiring Volume
                  </Label>
                  <Input
                    id="typicalHiringVolume"
                    value={profileData.typicalHiringVolume}
                    onChange={(e) =>
                      handleInputChange("typicalHiringVolume", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="e.g., 5-10 per month"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="averageTimeToHire">
                    Average Time to Hire
                  </Label>
                  <Input
                    id="averageTimeToHire"
                    value={profileData.averageTimeToHire}
                    onChange={(e) =>
                      handleInputChange("averageTimeToHire", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="e.g., 2-4 weeks"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredCandidateLevel">
                    Preferred Candidate Level
                  </Label>
                  <Input
                    id="preferredCandidateLevel"
                    value={profileData.preferredCandidateLevel}
                    onChange={(e) =>
                      handleInputChange(
                        "preferredCandidateLevel",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                    placeholder="e.g., Mid to Senior Level"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="remoteWorkPolicy">Remote Work Policy</Label>
                  <Input
                    id="remoteWorkPolicy"
                    value={profileData.remoteWorkPolicy}
                    onChange={(e) =>
                      handleInputChange("remoteWorkPolicy", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="e.g., Hybrid, Remote, On-site"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Culture & Benefits Tab */}
        <TabsContent value="culture">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Company Culture & Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyValues">Company Values</Label>
                <Textarea
                  id="companyValues"
                  value={profileData.companyValues}
                  onChange={(e) =>
                    handleInputChange("companyValues", e.target.value)
                  }
                  disabled={!isEditing}
                  rows={3}
                  placeholder="Enter your company values separated by commas (e.g., Innovation, Collaboration, Excellence, Integrity)"
                />
                <p className="text-sm text-gray-500">
                  Enter multiple values separated by commas
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="benefits">Benefits & Perks</Label>
                <Textarea
                  id="benefits"
                  value={profileData.benefits}
                  onChange={(e) =>
                    handleInputChange("benefits", e.target.value)
                  }
                  disabled={!isEditing}
                  rows={4}
                  placeholder="Enter your company benefits separated by commas (e.g., Health Insurance, 401(k) Matching, Flexible Hours, Remote Work, Professional Development)"
                />
                <p className="text-sm text-gray-500">
                  Enter multiple benefits separated by commas
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="workEnvironment">Work Environment</Label>
                <Textarea
                  id="workEnvironment"
                  value={profileData.workEnvironment}
                  onChange={(e) =>
                    handleInputChange("workEnvironment", e.target.value)
                  }
                  disabled={!isEditing}
                  rows={3}
                  placeholder="Describe your company culture and work environment..."
                />
              </div>

              {/* Display current values as badges when not editing */}
              {!isEditing && (
                <div className="space-y-4">
                  {profileData.companyValues && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Current Company Values:
                      </Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {profileData.companyValues
                          .split(",")
                          .map((value, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-blue-50 text-blue-700"
                            >
                              {value.trim()}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  )}

                  {profileData.benefits && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Current Benefits:
                      </Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {profileData.benefits
                          .split(",")
                          .map((benefit, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-green-50 text-green-700"
                            >
                              {benefit.trim()}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-gray-600">
                    Receive email notifications for new applications
                  </p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={profileData.emailNotifications}
                  onCheckedChange={(checked) =>
                    handleInputChange("emailNotifications", checked)
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="smsNotifications">SMS Notifications</Label>
                  <p className="text-sm text-gray-600">
                    Receive SMS alerts for urgent updates
                  </p>
                </div>
                <Switch
                  id="smsNotifications"
                  checked={profileData.smsNotifications}
                  onCheckedChange={(checked) =>
                    handleInputChange("smsNotifications", checked)
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="marketingEmails">Marketing Emails</Label>
                  <p className="text-sm text-gray-600">
                    Receive updates about new features and tips
                  </p>
                </div>
                <Switch
                  id="marketingEmails"
                  checked={profileData.marketingEmails}
                  onCheckedChange={(checked) =>
                    handleInputChange("marketingEmails", checked)
                  }
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
