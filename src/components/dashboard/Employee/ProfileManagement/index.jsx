"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useSession, signIn } from "next-auth/react";
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { Loader2, LogIn, Plus, X, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function UserProfilePage() {
  const { data: session, status } = useSession();
  const [client, setClient] = useState(null);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const fileInputRef = useRef(null);
  const resumeInputRef = useRef(null);
  const coverLetterInputRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetchEmployeeData(session.user.email);
    }
  }, [status, session]);

  const fetchEmployeeData = async (email) => {
    try {
      const response = await axios.get(`/api/employeeProfile?email=${email}`);
      const data = response.data;

      // Ensure all array-based sections are initialized as arrays
      const initializedData = {
        ...data,
        education: data.education || [],
        workExperience: data.workExperience || [],
        skills: data.skills || [],
        projects: data.projects || [],
        certifications: data.certifications || [],
        achievements: data.achievements || [],
        languages: data.languages || [],
        references: data.references || [],
        personalInfo: {
          ...data.personalInfo,
          contact: data.personalInfo?.contact || {},
          location: data.personalInfo?.location || {},
          links: data.personalInfo?.links || {},
        },
        careerPreferences: data.careerPreferences || {},
      };

      setClient(initializedData);
      setError("");
    } catch (error) {
      console.error("Error fetching client data:", error);
      setError("Failed to load client profile.");
    }
  };

  const calculateProfileCompletion = useCallback(() => {
    if (!client) return 0;

    let completedFields = 0;
    let totalFields = 0;

    // Define fields that contribute to completion
    const checkField = (value) => {
      totalFields++;
      if (
        value &&
        value !== "" &&
        value !== "N/A" &&
        value !== "/placeholder.svg?height=96&width=96"
      ) {
        completedFields++;
      }
    };

    // Personal Information
    checkField(client.personalInfo?.username || "N/A");
    checkField(client.personalInfo?.profilePhoto);
    checkField(client.personalInfo?.dateOfBirth);
    checkField(client.personalInfo?.gender);
    checkField(client.personalInfo?.contact?.email);
    checkField(client.personalInfo?.contact?.phone);
    checkField(client.personalInfo?.location?.currentCity);
    checkField(client.personalInfo?.location?.willingnessToRelocate);
    checkField(client.personalInfo?.links?.linkedin);

    // Career Preferences
    checkField(client.careerPreferences?.desiredRoles);
    checkField(client.careerPreferences?.employmentType);
    checkField(client.careerPreferences?.expectedSalary);
    checkField(client.careerPreferences?.availabilityToJoin);
    checkField(client.careerPreferences?.preferredWorkLocation);

    // Professional Summary
    checkField(client.professionalSummary);

    // Education (at least one entry)
    totalFields++;
    if (client.education?.length > 0) {
      completedFields++;
    }

    // Work Experience (at least one entry)
    totalFields++;
    if (client.workExperience?.length > 0) {
      completedFields++;
    }

    // Skills (at least one entry)
    totalFields++;
    if (client.skills?.length > 0) {
      completedFields++;
    }

    // Projects (at least one entry)
    totalFields++;
    if (client.projects?.length > 0) {
      completedFields++;
    }

    // Certifications (at least one entry)
    totalFields++;
    if (client.certifications?.length > 0) {
      completedFields++;
    }

    // Achievements (at least one entry)
    totalFields++;
    if (client.achievements?.length > 0) {
      completedFields++;
    }

    // Languages (at least one entry)
    totalFields++;
    if (client.languages?.length > 0) {
      completedFields++;
    }

    // Resume/Cover Letter
    checkField(client.resumeUrl);
    checkField(client.coverLetterUrl);

    return totalFields > 0
      ? Math.round((completedFields / totalFields) * 100)
      : 0;
  }, [client]);

  const handleChange = (
    e,
    section = null,
    subField = null,
    nestedField = null,
    index = null
  ) => {
    const { name, value, type, checked, files } = e.target;
    const newValue = type === "checkbox" ? checked : files ? files[0] : value;

    setClient((prev) => {
      const newClient = { ...prev };

      // 1) Array of objects case: section is array and index provided
      if (index !== null && section && Array.isArray(newClient[section])) {
        const arr = newClient[section].map((item, i) => {
          if (i !== index) return item;
          // If nestedField provided: education[0].details.fieldName
          if (nestedField) {
            return {
              ...item,
              [nestedField]: {
                ...(item?.[nestedField] || {}),
                [name]: newValue,
              },
            };
          }
          // If subField provided: education[0].subFieldName
          if (subField) {
            return {
              ...item,
              [subField]: {
                ...(item?.[subField] || {}),
                [name]: newValue,
              },
            };
          }
          // plain item field
          return { ...item, [name]: newValue };
        });

        newClient[section] = arr;
        return newClient;
      }

      // 2) Nested object case: section and subField and no index
      if (section && subField && newClient[section]) {
        newClient[section] = {
          ...newClient[section],
          [subField]: {
            ...(newClient[section][subField] || {}),
            [name]: newValue,
          },
        };
        return newClient;
      }

      // 3) Section only (top-level object like personalInfo)
      if (section && newClient[section] && !subField && index === null) {
        newClient[section] = {
          ...newClient[section],
          [name]: newValue,
        };
        return newClient;
      }

      // 4) No section -> direct top-level field
      newClient[name] = newValue;
      return newClient;
    });
  };

  const handleArrayItemChange = (section, index, fieldName, value) => {
    setClient((prev) => {
      const newSection = [...(prev[section] || [])];
      newSection[index] = { ...newSection[index], [fieldName]: value };
      return { ...prev, [section]: newSection };
    });
  };

  const addArrayItem = (section, defaultItem) => {
    setClient((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), { id: Date.now(), ...defaultItem }],
    }));
  };

  const removeArrayItem = (section, idToRemove) => {
    setClient((prev) => ({
      ...prev,
      [section]: (prev[section] || []).filter((item) => item.id !== idToRemove),
    }));
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImageUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/uploadImage", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data?.url) {
        setClient((prev) => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            profilePhoto: data.url,
          },
        }));

        // Update the client object with the new profile photo URL
        const updatedClient = {
          ...client,
          personalInfo: {
            ...client.personalInfo,
            profilePhoto: data.url,
          },
          _id: client._id,
        };

        setClient(updatedClient);

        // Save the updated profile
        await axios.put("/api/employeeProfile", updatedClient);

        toast({
          title: "Image uploaded successfully!",
          description:
            "Your profile photo has been updated. Don't forget to save your changes.",
        });
      } else {
        console.error("Upload failed:", data?.error || data);
        toast({
          title: "Upload failed",
          description: data?.error || "Failed to upload image",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      toast({
        title: "Upload error",
        description: "An error occurred while uploading the image",
        variant: "destructive",
      });
    } finally {
      setImageUploading(false);
    }
  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you'd upload this to a storage service and get a URL
      // For now, we'll just store a mock URL or file name
      const mockUrl = `/uploads/${fieldName}-${file.name}`;
      setClient((prev) => ({ ...prev, [fieldName]: mockUrl }));
      toast({
        title: `${fieldName.replace("Url", "")} uploaded!`,
        description: "(Mock upload)",
      });
    }
  };

  const handleSave = async () => {
    try {
      // Validate required fields before saving
      if (!client.personalInfo?.username) {
        setError("Full name is required");
        return;
      }

      if (!client.personalInfo?.contact?.email) {
        setError("Email is required");
        return;
      }

      // Make sure we have the user ID for the update
      if (!client._id) {
        setError("User ID is missing");
        return;
      }

      // Send the updated profile data to the API
      const response = await axios.put("/api/employeeProfile", client);

      if (response.status === 200) {
        setMessage("Profile updated successfully");
        setEditing(false);
        setError("");
        toast({
          title: "Profile updated successfully!",
          description: "Your changes have been saved.",
        });
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(
        error.response?.data?.error ||
          error.message ||
          "Failed to update profile."
      );
      toast({
        title: "Failed to update profile.",
        description:
          error.response?.data?.error ||
          error.message ||
          "There was an error saving your changes.",
        variant: "destructive",
      });
    }
  };

  const handleEditToggle = () => {
    setEditing(!editing);
    setMessage("");
    setError("");
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] bg-gray-50">
        <Loader2 className="h-12 w-12 animate-spin text-teal-600" />
        <p className="mt-4 text-lg text-gray-700">Loading user session...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-180px)] bg-gray-50">
        <Card className="w-full max-w-md text-center shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Please sign in to view your profile and manage your account.
            </p>
            <Button
              onClick={() => signIn()}
              className="bg-teal-600 hover:bg-teal-700"
            >
              <LogIn className="mr-2 h-5 w-5" />
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] bg-gray-50">
        <Loader2 className="h-12 w-12 animate-spin text-teal-600" />
        <p className="mt-4 text-lg text-gray-700">Loading profile data...</p>
      </div>
    );
  }

  const profileCompletion = calculateProfileCompletion();

  return (
    <div className="space-y-6">
      {/* Header with Edit Profile Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
          <p className="text-gray-600 mt-1">
            Manage your personal information and preferences
          </p>
        </div>
      </div>

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Profile Completion Indicator */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Profile Completion
          </CardTitle>
          <CardDescription>
            Complete your profile to unlock more opportunities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <Progress
              value={profileCompletion}
              className="h-4 rounded-full transition-all duration-500 ease-out"
            />
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            {profileCompletion}% Complete
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-end ">
        <Button
          className="bg-teal-600 hover:bg-teal-700 text-white"
          onClick={editing ? handleSave : handleEditToggle}
        >
          <Edit className="mr-2 h-4 w-4" />
          {editing ? "Save Changes" : "Edit Profile"}
        </Button>
        {editing && (
          <Button
            variant="outline"
            onClick={handleEditToggle}
            className="ml-2 bg-transparent"
          >
            Cancel
          </Button>
        )}
      </div>

      <Tabs defaultValue="personal-info" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 h-auto flex-wrap">
          <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
          <TabsTrigger value="career-preferences">Career Prefs</TabsTrigger>
          <TabsTrigger value="professional-summary">Summary</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="work-experience">Work Exp.</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="languages">Languages</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal-info">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Personal Information
              </CardTitle>
              <CardDescription>Basic details about yourself.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={
                        client.personalInfo?.profilePhoto ||
                        "/placeholder.svg?height=96&width=96" ||
                        "/placeholder.svg"
                      }
                      alt="User Profile"
                    />
                    <AvatarFallback className="bg-teal-500 text-white text-3xl">
                      {client.personalInfo?.username
                        ? client.personalInfo.username.charAt(0).toUpperCase()
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                  {imageUploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                      <Loader2 className="h-6 w-6 animate-spin text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {client.personalInfo?.username || "User"}
                  </h3>
                  <p className="text-gray-600">{client.role || "Job Seeker"}</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 bg-transparent"
                    onClick={triggerFileInput}
                    disabled={imageUploading}
                  >
                    {imageUploading ? "Uploading..." : "Change Photo"}
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Full Name</Label>
                  <Input
                    id="username"
                    name="username"
                    value={
                      editing
                        ? client.personalInfo?.username || ""
                        : client.personalInfo?.username || "N/A"
                    }
                    onChange={(e) => handleChange(e, "personalInfo")}
                    disabled={!editing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={
                      editing
                        ? client.personalInfo?.dateOfBirth || ""
                        : client.personalInfo?.dateOfBirth || "N/A"
                    }
                    onChange={(e) => handleChange(e, "personalInfo")}
                    disabled={!editing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={
                      editing
                        ? client.personalInfo?.gender || ""
                        : client.personalInfo?.gender || ""
                    }
                    onValueChange={(value) =>
                      setClient((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, gender: value },
                      }))
                    }
                    disabled={!editing}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Non-binary">Non-binary</SelectItem>
                      <SelectItem value="Prefer not to say">
                        Prefer not to say
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <h3 className="text-md font-semibold text-gray-800 mt-6 mb-4">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={
                      editing
                        ? client.personalInfo?.contact?.email || ""
                        : client.personalInfo?.contact?.email || "N/A"
                    }
                    onChange={(e) => handleChange(e, "personalInfo", "contact")}
                    disabled={!editing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={
                      editing
                        ? client.personalInfo?.contact?.phone || ""
                        : client.personalInfo?.contact?.phone || "N/A"
                    }
                    onChange={(e) => handleChange(e, "personalInfo", "contact")}
                    disabled={!editing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alternativeContact">
                    Alternative Contact
                  </Label>
                  <Input
                    id="alternativeContact"
                    name="alternativeContact"
                    value={
                      editing
                        ? client.personalInfo?.contact?.alternativeContact || ""
                        : client.personalInfo?.contact?.alternativeContact ||
                          "N/A"
                    }
                    onChange={(e) => handleChange(e, "personalInfo", "contact")}
                    disabled={!editing}
                  />
                </div>
              </div>

              <h3 className="text-md font-semibold text-gray-800 mt-6 mb-4">
                Location
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentCity">Current City</Label>
                  <Input
                    id="currentCity"
                    name="currentCity"
                    value={
                      editing
                        ? client.personalInfo?.location?.currentCity || ""
                        : client.personalInfo?.location?.currentCity || "N/A"
                    }
                    onChange={(e) =>
                      handleChange(e, "personalInfo", "location")
                    }
                    disabled={!editing}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="willingnessToRelocate">
                    Willingness to Relocate
                  </Label>
                  <Switch
                    id="willingnessToRelocate"
                    checked={
                      client.personalInfo?.location?.willingnessToRelocate ===
                      "Yes"
                    }
                    onCheckedChange={(checked) =>
                      setClient((prev) => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          location: {
                            ...prev.personalInfo.location,
                            willingnessToRelocate: checked ? "Yes" : "No",
                          },
                        },
                      }))
                    }
                    disabled={!editing}
                  />
                </div>
                <div className="space-y-2 col-span-full">
                  <Label htmlFor="preferredLocations">
                    Preferred Locations
                  </Label>
                  <Input
                    id="preferredLocations"
                    name="preferredLocations"
                    value={
                      editing
                        ? client.personalInfo?.location?.preferredLocations ||
                          ""
                        : client.personalInfo?.location?.preferredLocations ||
                          "N/A"
                    }
                    onChange={(e) =>
                      handleChange(e, "personalInfo", "location")
                    }
                    disabled={!editing}
                  />
                </div>
              </div>

              <h3 className="text-md font-semibold text-gray-800 mt-6 mb-4">
                Links
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    value={
                      editing
                        ? client.personalInfo?.links?.linkedin || ""
                        : client.personalInfo?.links?.linkedin || "N/A"
                    }
                    onChange={(e) => handleChange(e, "personalInfo", "links")}
                    disabled={!editing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="portfolio">Portfolio Link</Label>
                  <Input
                    id="portfolio"
                    name="portfolio"
                    value={
                      editing
                        ? client.personalInfo?.links?.portfolio || ""
                        : client.personalInfo?.links?.portfolio || "N/A"
                    }
                    onChange={(e) => handleChange(e, "personalInfo", "links")}
                    disabled={!editing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub Profile</Label>
                  <Input
                    id="github"
                    name="github"
                    value={
                      editing
                        ? client.personalInfo?.links?.github || ""
                        : client.personalInfo?.links?.github || "N/A"
                    }
                    onChange={(e) => handleChange(e, "personalInfo", "links")}
                    disabled={!editing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Personal Website</Label>
                  <Input
                    id="website"
                    name="website"
                    value={
                      editing
                        ? client.personalInfo?.links?.website || ""
                        : client.personalInfo?.links?.website || "N/A"
                    }
                    onChange={(e) => handleChange(e, "personalInfo", "links")}
                    disabled={!editing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Career Preferences Tab */}
        <TabsContent value="career-preferences">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Career Preferences
              </CardTitle>
              <CardDescription>
                Your ideal job and work environment.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="desiredRoles">Desired Job Titles / Roles</Label>
                <Input
                  id="desiredRoles"
                  name="desiredRoles"
                  value={
                    editing
                      ? client.careerPreferences?.desiredRoles || ""
                      : client.careerPreferences?.desiredRoles || "N/A"
                  }
                  onChange={(e) => handleChange(e, "careerPreferences")}
                  disabled={!editing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employmentType">Employment Type</Label>
                <Select
                  value={
                    editing
                      ? client.careerPreferences?.employmentType || ""
                      : client.careerPreferences?.employmentType || ""
                  }
                  onValueChange={(value) =>
                    setClient((prev) => ({
                      ...prev,
                      careerPreferences: {
                        ...prev.careerPreferences,
                        employmentType: value,
                      },
                    }))
                  }
                  disabled={!editing}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Employment Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expectedSalary">
                  Expected Salary or Stipend Range
                </Label>
                <Input
                  id="expectedSalary"
                  name="expectedSalary"
                  value={
                    editing
                      ? client.careerPreferences?.expectedSalary || ""
                      : client.careerPreferences?.expectedSalary || "N/A"
                  }
                  onChange={(e) => handleChange(e, "careerPreferences")}
                  disabled={!editing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="availabilityToJoin">Availability to Join</Label>
                <Select
                  value={
                    editing
                      ? client.careerPreferences?.availabilityToJoin || ""
                      : client.careerPreferences?.availabilityToJoin || ""
                  }
                  onValueChange={(value) =>
                    setClient((prev) => ({
                      ...prev,
                      careerPreferences: {
                        ...prev.careerPreferences,
                        availabilityToJoin: value,
                      },
                    }))
                  }
                  disabled={!editing}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Immediate">Immediate</SelectItem>
                    <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                    <SelectItem value="2-4 weeks">2-4 weeks</SelectItem>
                    <SelectItem value="1 month+">1 month+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredWorkLocation">
                  Preferred Work Location
                </Label>
                <Select
                  value={
                    editing
                      ? client.careerPreferences?.preferredWorkLocation || ""
                      : client.careerPreferences?.preferredWorkLocation || ""
                  }
                  onValueChange={(value) =>
                    setClient((prev) => ({
                      ...prev,
                      careerPreferences: {
                        ...prev.careerPreferences,
                        preferredWorkLocation: value,
                      },
                    }))
                  }
                  disabled={!editing}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Work Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="On-site">On-site</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Professional Summary Tab */}
        <TabsContent value="professional-summary">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Professional Summary
              </CardTitle>
              <CardDescription>
                A short overview of your career objective or "About Me".
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                id="professionalSummary"
                name="professionalSummary"
                value={
                  editing
                    ? client.professionalSummary || ""
                    : client.professionalSummary || "N/A"
                }
                onChange={(e) => handleChange(e, null)}
                disabled={!editing}
                rows={4}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Education
              </CardTitle>
              <CardDescription>
                Your academic background and qualifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {client.education?.map((edu, index) => (
                <div
                  key={edu.id}
                  className="border p-4 rounded-lg space-y-4 relative"
                >
                  {editing && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-red-500 hover:bg-red-50"
                      onClick={() => removeArrayItem("education", edu.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`degree-${index}`}>
                        Degree / Certification Name
                      </Label>
                      <Input
                        id={`degree-${index}`}
                        name="degree"
                        value={editing ? edu.degree || "" : edu.degree || "N/A"}
                        onChange={(e) =>
                          handleArrayItemChange(
                            "education",
                            index,
                            "degree",
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`institution-${index}`}>
                        Institution / University
                      </Label>
                      <Input
                        id={`institution-${index}`}
                        name="institution"
                        value={
                          editing
                            ? edu.institution || ""
                            : edu.institution || "N/A"
                        }
                        onChange={(e) =>
                          handleArrayItemChange(
                            "education",
                            index,
                            "institution",
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                      <Input
                        id={`startDate-${index}`}
                        name="startDate"
                        type="date"
                        value={
                          editing ? edu.startDate || "" : edu.startDate || "N/A"
                        }
                        onChange={(e) =>
                          handleArrayItemChange(
                            "education",
                            index,
                            "startDate",
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`endDate-${index}`}>End Date</Label>
                      <Input
                        id={`endDate-${index}`}
                        name="endDate"
                        type="date"
                        value={
                          editing ? edu.endDate || "" : edu.endDate || "N/A"
                        }
                        onChange={(e) =>
                          handleArrayItemChange(
                            "education",
                            index,
                            "endDate",
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <Textarea
                      id={`description-${index}`}
                      name="description"
                      value={
                        editing
                          ? edu.description || ""
                          : edu.description || "N/A"
                      }
                      onChange={(e) =>
                        handleArrayItemChange(
                          "education",
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      disabled={!editing}
                      rows={3}
                    />
                  </div>
                </div>
              ))}
              {editing && (
                <Button
                  onClick={() =>
                    addArrayItem("education", {
                      degree: "",
                      institution: "",
                      startDate: "",
                      endDate: "",
                      description: "",
                    })
                  }
                  className="w-full bg-teal-600 hover:bg-teal-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Education
                </Button>
              )}
              {!editing && client.education?.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  No education information added yet.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Work Experience Tab */}
        <TabsContent value="work-experience">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Work Experience
              </CardTitle>
              <CardDescription>Your professional work history.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {client.workExperience?.map((exp, index) => (
                <div
                  key={exp.id}
                  className="border p-4 rounded-lg space-y-4 relative"
                >
                  {editing && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-red-500 hover:bg-red-50"
                      onClick={() => removeArrayItem("workExperience", exp.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`jobTitle-${index}`}>Job Title</Label>
                      <Input
                        id={`jobTitle-${index}`}
                        name="jobTitle"
                        value={
                          editing ? exp.jobTitle || "" : exp.jobTitle || "N/A"
                        }
                        onChange={(e) =>
                          handleArrayItemChange(
                            "workExperience",
                            index,
                            "jobTitle",
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`company-${index}`}>Company</Label>
                      <Input
                        id={`company-${index}`}
                        name="company"
                        value={
                          editing ? exp.company || "" : exp.company || "N/A"
                        }
                        onChange={(e) =>
                          handleArrayItemChange(
                            "workExperience",
                            index,
                            "company",
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                      <Input
                        id={`startDate-${index}`}
                        name="startDate"
                        type="date"
                        value={
                          editing ? exp.startDate || "" : exp.startDate || "N/A"
                        }
                        onChange={(e) =>
                          handleArrayItemChange(
                            "workExperience",
                            index,
                            "startDate",
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`endDate-${index}`}>End Date</Label>
                      <Input
                        id={`endDate-${index}`}
                        name="endDate"
                        type="date"
                        value={
                          editing ? exp.endDate || "" : exp.endDate || "N/A"
                        }
                        onChange={(e) =>
                          handleArrayItemChange(
                            "workExperience",
                            index,
                            "endDate",
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <Textarea
                      id={`description-${index}`}
                      name="description"
                      value={
                        editing
                          ? exp.description || ""
                          : exp.description || "N/A"
                      }
                      onChange={(e) =>
                        handleArrayItemChange(
                          "workExperience",
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      disabled={!editing}
                      rows={3}
                    />
                  </div>
                </div>
              ))}
              {editing && (
                <Button
                  onClick={() =>
                    addArrayItem("workExperience", {
                      jobTitle: "",
                      company: "",
                      startDate: "",
                      endDate: "",
                      description: "",
                    })
                  }
                  className="w-full bg-teal-600 hover:bg-teal-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Work Experience
                </Button>
              )}
              {!editing && client.workExperience?.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  No work experience added yet.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Skills
              </CardTitle>
              <CardDescription>Your technical and soft skills.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {client.skills?.map((skill, index) => (
                <div
                  key={skill.id}
                  className="border p-4 rounded-lg space-y-4 relative"
                >
                  {editing && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-red-500 hover:bg-red-50"
                      onClick={() => removeArrayItem("skills", skill.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`skillName-${index}`}>Skill Name</Label>
                      <Input
                        id={`skillName-${index}`}
                        name="name"
                        value={editing ? skill.name || "" : skill.name || "N/A"}
                        onChange={(e) =>
                          handleArrayItemChange(
                            "skills",
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`proficiency-${index}`}>
                        Proficiency Level
                      </Label>
                      <Select
                        value={
                          editing
                            ? skill.level?.toString() || ""
                            : skill.level?.toString() || ""
                        }
                        onValueChange={(value) =>
                          handleArrayItemChange(
                            "skills",
                            index,
                            "level",
                            parseInt(value)
                          )
                        }
                        disabled={!editing}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Proficiency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">Beginner</SelectItem>
                          <SelectItem value="40">Intermediate</SelectItem>
                          <SelectItem value="70">Advanced</SelectItem>
                          <SelectItem value="90">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
              {editing && (
                <Button
                  onClick={() =>
                    addArrayItem("skills", {
                      name: "",
                      level: 50,
                    })
                  }
                  className="w-full bg-teal-600 hover:bg-teal-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
              )}
              {!editing && client.skills?.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  No skills added yet.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Projects
              </CardTitle>
              <CardDescription>
                Your personal and professional projects.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {client.projects?.map((project, index) => (
                <div
                  key={project.id}
                  className="border p-4 rounded-lg space-y-4 relative"
                >
                  {editing && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-red-500 hover:bg-red-50"
                      onClick={() => removeArrayItem("projects", project.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`projectName-${index}`}>
                        Project Name
                      </Label>
                      <Input
                        id={`projectName-${index}`}
                        name="name"
                        value={
                          editing ? project.name || "" : project.name || "N/A"
                        }
                        onChange={(e) =>
                          handleArrayItemChange(
                            "projects",
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`projectLink-${index}`}>
                        Project Link
                      </Label>
                      <Input
                        id={`projectLink-${index}`}
                        name="link"
                        value={
                          editing ? project.link || "" : project.link || "N/A"
                        }
                        onChange={(e) =>
                          handleArrayItemChange(
                            "projects",
                            index,
                            "link",
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`projectDescription-${index}`}>
                      Description
                    </Label>
                    <Textarea
                      id={`projectDescription-${index}`}
                      name="description"
                      value={
                        editing
                          ? project.description || ""
                          : project.description || "N/A"
                      }
                      onChange={(e) =>
                        handleArrayItemChange(
                          "projects",
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      disabled={!editing}
                      rows={3}
                    />
                  </div>
                </div>
              ))}
              {editing && (
                <Button
                  onClick={() =>
                    addArrayItem("projects", {
                      name: "",
                      link: "",
                      description: "",
                    })
                  }
                  className="w-full bg-teal-600 hover:bg-teal-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              )}
              {!editing && client.projects?.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  No projects added yet.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Certifications Tab */}
        <TabsContent value="certifications">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Certifications
              </CardTitle>
              <CardDescription>
                Your professional certifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {client.certifications?.map((cert, index) => (
                <div
                  key={cert.id}
                  className="border p-4 rounded-lg space-y-4 relative"
                >
                  {editing && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-red-500 hover:bg-red-50"
                      onClick={() => removeArrayItem("certifications", cert.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`certName-${index}`}>
                        Certification Name
                      </Label>
                      <Input
                        id={`certName-${index}`}
                        name="name"
                        value={editing ? cert.name || "" : cert.name || "N/A"}
                        onChange={(e) =>
                          handleArrayItemChange(
                            "certifications",
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`certIssuer-${index}`}>
                        Issuing Organization
                      </Label>
                      <Input
                        id={`certIssuer-${index}`}
                        name="issuer"
                        value={
                          editing ? cert.issuer || "" : cert.issuer || "N/A"
                        }
                        onChange={(e) =>
                          handleArrayItemChange(
                            "certifications",
                            index,
                            "issuer",
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`certDate-${index}`}>Issue Date</Label>
                      <Input
                        id={`certDate-${index}`}
                        name="issueDate"
                        type="date"
                        value={
                          editing
                            ? cert.issueDate || ""
                            : cert.issueDate || "N/A"
                        }
                        onChange={(e) =>
                          handleArrayItemChange(
                            "certifications",
                            index,
                            "issueDate",
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`certExpiry-${index}`}>
                        Expiration Date
                      </Label>
                      <Input
                        id={`certExpiry-${index}`}
                        name="expiryDate"
                        type="date"
                        value={
                          editing
                            ? cert.expiryDate || ""
                            : cert.expiryDate || "N/A"
                        }
                        onChange={(e) =>
                          handleArrayItemChange(
                            "certifications",
                            index,
                            "expiryDate",
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {editing && (
                <Button
                  onClick={() =>
                    addArrayItem("certifications", {
                      name: "",
                      issuer: "",
                      issueDate: "",
                      expiryDate: "",
                    })
                  }
                  className="w-full bg-teal-600 hover:bg-teal-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Certification
                </Button>
              )}
              {!editing && client.certifications?.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  No certifications added yet.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Achievements
              </CardTitle>
              <CardDescription>
                Your professional achievements and awards.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {client.achievements?.map((achievement, index) => (
                <div
                  key={achievement.id}
                  className="border p-4 rounded-lg space-y-4 relative"
                >
                  {editing && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-red-500 hover:bg-red-50"
                      onClick={() =>
                        removeArrayItem("achievements", achievement.id)
                      }
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`achievementTitle-${index}`}>
                        Achievement Title
                      </Label>
                      <Input
                        id={`achievementTitle-${index}`}
                        name="title"
                        value={
                          editing
                            ? achievement.title || ""
                            : achievement.title || "N/A"
                        }
                        onChange={(e) =>
                          handleArrayItemChange(
                            "achievements",
                            index,
                            "title",
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`achievementDate-${index}`}>Date</Label>
                      <Input
                        id={`achievementDate-${index}`}
                        name="date"
                        type="date"
                        value={
                          editing
                            ? achievement.date || ""
                            : achievement.date || "N/A"
                        }
                        onChange={(e) =>
                          handleArrayItemChange(
                            "achievements",
                            index,
                            "date",
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`achievementDescription-${index}`}>
                      Description
                    </Label>
                    <Textarea
                      id={`achievementDescription-${index}`}
                      name="description"
                      value={
                        editing
                          ? achievement.description || ""
                          : achievement.description || "N/A"
                      }
                      onChange={(e) =>
                        handleArrayItemChange(
                          "achievements",
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      disabled={!editing}
                      rows={3}
                    />
                  </div>
                </div>
              ))}
              {editing && (
                <Button
                  onClick={() =>
                    addArrayItem("achievements", {
                      title: "",
                      date: "",
                      description: "",
                    })
                  }
                  className="w-full bg-teal-600 hover:bg-teal-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Achievement
                </Button>
              )}
              {!editing && client.achievements?.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  No achievements added yet.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Languages Tab */}
        <TabsContent value="languages">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Languages
              </CardTitle>
              <CardDescription>
                Languages you speak and your proficiency level.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {client.languages?.map((language, index) => (
                <div
                  key={language.id}
                  className="border p-4 rounded-lg space-y-4 relative"
                >
                  {editing && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-red-500 hover:bg-red-50"
                      onClick={() => removeArrayItem("languages", language.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`languageName-${index}`}>Language</Label>
                      <Input
                        id={`languageName-${index}`}
                        name="name"
                        value={
                          editing ? language.name || "" : language.name || "N/A"
                        }
                        onChange={(e) =>
                          handleArrayItemChange(
                            "languages",
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`languageProficiency-${index}`}>
                        Proficiency Level
                      </Label>
                      <Select
                        value={
                          editing
                            ? language.proficiency?.toString() || ""
                            : language.proficiency?.toString() || ""
                        }
                        onValueChange={(value) =>
                          handleArrayItemChange(
                            "languages",
                            index,
                            "proficiency",
                            parseInt(value)
                          )
                        }
                        disabled={!editing}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Proficiency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="25">Basic</SelectItem>
                          <SelectItem value="50">Conversational</SelectItem>
                          <SelectItem value="75">Fluent</SelectItem>
                          <SelectItem value="100">Native</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
              {editing && (
                <Button
                  onClick={() =>
                    addArrayItem("languages", {
                      name: "",
                      proficiency: 50,
                    })
                  }
                  className="w-full bg-teal-600 hover:bg-teal-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Language
                </Button>
              )}
              {!editing && client.languages?.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  No languages added yet.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Documents
              </CardTitle>
              <CardDescription>
                Upload your resume and cover letter.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border p-4 rounded-lg">
                  <h3 className="text-md font-semibold text-gray-800 mb-4">
                    Resume
                  </h3>
                  {client.resumeUrl ? (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">
                        Current Resume:
                      </p>
                      <a
                        href={client.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {client.resumeUrl.split("/").pop()}
                      </a>
                    </div>
                  ) : (
                    <p className="text-gray-500 mb-4">No resume uploaded</p>
                  )}
                  {editing && (
                    <div>
                      <input
                        type="file"
                        ref={resumeInputRef}
                        onChange={(e) => handleFileUpload(e, "resumeUrl")}
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                      />
                      <Button
                        variant="outline"
                        onClick={() => resumeInputRef.current?.click()}
                        className="bg-transparent"
                      >
                        Upload Resume
                      </Button>
                    </div>
                  )}
                </div>
                <div className="border p-4 rounded-lg">
                  <h3 className="text-md font-semibold text-gray-800 mb-4">
                    Cover Letter
                  </h3>
                  {client.coverLetterUrl ? (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">
                        Current Cover Letter:
                      </p>
                      <a
                        href={client.coverLetterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {client.coverLetterUrl.split("/").pop()}
                      </a>
                    </div>
                  ) : (
                    <p className="text-gray-500 mb-4">
                      No cover letter uploaded
                    </p>
                  )}
                  {editing && (
                    <div>
                      <input
                        type="file"
                        ref={coverLetterInputRef}
                        onChange={(e) => handleFileUpload(e, "coverLetterUrl")}
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                      />
                      <Button
                        variant="outline"
                        onClick={() => coverLetterInputRef.current?.click()}
                        className="bg-transparent"
                      >
                        Upload Cover Letter
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
