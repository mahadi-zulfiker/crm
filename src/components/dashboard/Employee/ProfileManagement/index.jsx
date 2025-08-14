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
      formData.append("image", file); // imgbb expects "image" field

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

        const updatedClient = {
          ...client,
          personalInfo: {
            ...client.personalInfo,
            profilePhoto: data.url,
          },
          _id: client._id,
        };

        setClient(updatedClient);

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
      // In a real app, you'd upload this to Vercel Blob and get a URL
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
      await axios.put("/api/employeeProfile", client);
      setMessage("Profile updated successfully");
      setEditing(false);
      setError("");
      toast({
        title: "Profile updated successfully!",
        description: "Your changes have been saved.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile.");
      toast({
        title: "Failed to update profile.",
        description: "There was an error saving your changes.",
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
                            e.target.name,
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`institution-${index}`}>
                        Institution Name
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
                            e.target.name,
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`startYear-${index}`}>Start Year</Label>
                      <Input
                        id={`startYear-${index}`}
                        name="startYear"
                        value={
                          editing ? edu.startYear || "" : edu.startYear || "N/A"
                        }
                        onChange={(e) =>
                          handleArrayItemChange(
                            "education",
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`endYear-${index}`}>End Year</Label>
                      <Input
                        id={`endYear-${index}`}
                        name="endYear"
                        value={
                          editing ? edu.endYear || "" : edu.endYear || "N/A"
                        }
                        onChange={(e) =>
                          handleArrayItemChange(
                            "education",
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`major-${index}`}>
                        Major / Field of Study
                      </Label>
                      <Input
                        id={`major-${index}`}
                        name="major"
                        value={editing ? edu.major || "" : edu.major || "N/A"}
                        onChange={(e) =>
                          handleArrayItemChange(
                            "education",
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`grades-${index}`}>Grades / CGPA</Label>
                      <Input
                        id={`grades-${index}`}
                        name="grades"
                        value={editing ? edu.grades || "" : edu.grades || "N/A"}
                        onChange={(e) =>
                          handleArrayItemChange(
                            "education",
                            index,
                            e.target.name,
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
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() =>
                    addArrayItem("education", {
                      degree: "",
                      institution: "",
                      startYear: "",
                      endYear: "",
                      major: "",
                      grades: "",
                    })
                  }
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Education
                </Button>
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
              {client.workExperience?.map((work, index) => (
                <div
                  key={work.id}
                  className="border p-4 rounded-lg space-y-4 relative"
                >
                  {editing && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-red-500 hover:bg-red-50"
                      onClick={() => removeArrayItem("workExperience", work.id)}
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
                          editing ? work.jobTitle || "" : work.jobTitle || "N/A"
                        }
                        onChange={(e) =>
                          handleArrayItemChange(
                            "workExperience",
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`companyName-${index}`}>
                        Company Name
                      </Label>
                      <Input
                        id={`companyName-${index}`}
                        name="companyName"
                        value={
                          editing
                            ? work.companyName || ""
                            : work.companyName || "N/A"
                        }
                        onChange={(e) =>
                          handleArrayItemChange(
                            "workExperience",
                            index,
                            e.target.name,
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
                          editing
                            ? work.startDate || ""
                            : work.startDate || "N/A"
                        }
                        onChange={(e) =>
                          handleArrayItemChange(
                            "workExperience",
                            index,
                            e.target.name,
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
                          editing ? work.endDate || "" : work.endDate || "N/A"
                        }
                        onChange={(e) =>
                          handleArrayItemChange(
                            "workExperience",
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                    <div className="space-y-2 col-span-full">
                      <Label htmlFor={`jobLocation-${index}`}>
                        Job Location
                      </Label>
                      <Input
                        id={`jobLocation-${index}`}
                        name="jobLocation"
                        value={
                          editing
                            ? work.jobLocation || ""
                            : work.jobLocation || "N/A"
                        }
                        onChange={(e) =>
                          handleArrayItemChange(
                            "workExperience",
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                    <div className="space-y-2 col-span-full">
                      <Label htmlFor={`responsibilities-${index}`}>
                        Responsibilities / Achievements
                      </Label>
                      <Textarea
                        id={`responsibilities-${index}`}
                        name="responsibilities"
                        value={
                          editing
                            ? work.responsibilities || ""
                            : work.responsibilities || "N/A"
                        }
                        onChange={(e) =>
                          handleArrayItemChange(
                            "workExperience",
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                        disabled={!editing}
                        rows={5}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {editing && (
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() =>
                    addArrayItem("workExperience", {
                      jobTitle: "",
                      companyName: "",
                      startDate: "",
                      endDate: "",
                      jobLocation: "",
                      responsibilities: "",
                      achievements: "",
                    })
                  }
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Work Experience
                </Button>
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
            <CardContent className="space-y-4">
              {client.skills?.map((skill, index) => (
                <div
                  key={skill.id}
                  className="flex items-center gap-4 relative"
                >
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`skillName-${index}`} className="sr-only">
                      Skill Name
                    </Label>
                    <Input
                      id={`skillName-${index}`}
                      name="name"
                      value={editing ? skill.name || "" : skill.name || "N/A"}
                      onChange={(e) =>
                        handleArrayItemChange(
                          "skills",
                          index,
                          e.target.name,
                          e.target.value
                        )
                      }
                      disabled={!editing}
                      placeholder="Skill Name"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`proficiency-${index}`} className="sr-only">
                      Proficiency
                    </Label>
                    <Select
                      value={
                        editing
                          ? skill.proficiency || ""
                          : skill.proficiency || ""
                      }
                      onValueChange={(value) =>
                        handleArrayItemChange(
                          "skills",
                          index,
                          "proficiency",
                          value
                        )
                      }
                      disabled={!editing}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Proficiency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {editing && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:bg-red-50"
                      onClick={() => removeArrayItem("skills", skill.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              {editing && (
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() =>
                    addArrayItem("skills", { name: "", proficiency: "" })
                  }
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Skill
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects / Portfolio Tab */}
        <TabsContent value="projects">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Projects / Portfolio
              </CardTitle>
              <CardDescription>
                Showcase your personal or professional projects.
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
                  <div className="space-y-2">
                    <Label htmlFor={`projectTitle-${index}`}>
                      Project Title
                    </Label>
                    <Input
                      id={`projectTitle-${index}`}
                      name="projectTitle"
                      value={
                        editing
                          ? project.projectTitle || ""
                          : project.projectTitle || "N/A"
                      }
                      onChange={(e) =>
                        handleArrayItemChange(
                          "projects",
                          index,
                          e.target.name,
                          e.target.value
                        )
                      }
                      disabled={!editing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`projectDescription-${index}`}>
                      Short Description
                    </Label>
                    <Textarea
                      id={`projectDescription-${index}`}
                      name="shortDescription"
                      value={
                        editing
                          ? project.shortDescription || ""
                          : project.shortDescription || "N/A"
                      }
                      onChange={(e) =>
                        handleArrayItemChange(
                          "projects",
                          index,
                          e.target.name,
                          e.target.value
                        )
                      }
                      disabled={!editing}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`technologiesUsed-${index}`}>
                      Technologies Used
                    </Label>
                    <Input
                      id={`technologiesUsed-${index}`}
                      name="technologiesUsed"
                      value={
                        editing
                          ? project.technologiesUsed || ""
                          : project.technologiesUsed || "N/A"
                      }
                      onChange={(e) =>
                        handleArrayItemChange(
                          "projects",
                          index,
                          e.target.name,
                          e.target.value
                        )
                      }
                      disabled={!editing}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`liveDemoLink-${index}`}>
                        Link to Live Demo
                      </Label>
                      <Input
                        id={`liveDemoLink-${index}`}
                        name="liveDemoLink"
                        value={
                          editing
                            ? project.liveDemoLink || ""
                            : project.liveDemoLink || "N/A"
                        }
                        onChange={(e) =>
                          handleArrayItemChange(
                            "projects",
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`githubRepository-${index}`}>
                        GitHub Repository
                      </Label>
                      <Input
                        id={`githubRepository-${index}`}
                        name="githubRepository"
                        value={
                          editing
                            ? project.githubRepository || ""
                            : project.githubRepository || "N/A"
                        }
                        onChange={(e) =>
                          handleArrayItemChange(
                            "projects",
                            index,
                            e.target.name,
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
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() =>
                    addArrayItem("projects", {
                      projectTitle: "",
                      shortDescription: "",
                      technologiesUsed: "",
                      liveDemoLink: "",
                      githubRepository: "",
                    })
                  }
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Project
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Certifications / Training Tab */}
        <TabsContent value="certifications">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Certifications / Training
              </CardTitle>
              <CardDescription>
                List your professional certifications and training programs.
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
                  <div className="space-y-2">
                    <Label htmlFor={`certificationName-${index}`}>
                      Certification Name
                    </Label>
                    <Input
                      id={`certificationName-${index}`}
                      name="certificationName"
                      value={
                        editing
                          ? cert.certificationName || ""
                          : cert.certificationName || "N/A"
                      }
                      onChange={(e) =>
                        handleArrayItemChange(
                          "certifications",
                          index,
                          e.target.name,
                          e.target.value
                        )
                      }
                      disabled={!editing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`issuingOrganization-${index}`}>
                      Issuing Organization
                    </Label>
                    <Input
                      id={`issuingOrganization-${index}`}
                      name="issuingOrganization"
                      value={
                        editing
                          ? cert.issuingOrganization || ""
                          : cert.issuingOrganization || "N/A"
                      }
                      onChange={(e) =>
                        handleArrayItemChange(
                          "certifications",
                          index,
                          e.target.name,
                          e.target.value
                        )
                      }
                      disabled={!editing}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`issueDate-${index}`}>Issue Date</Label>
                      <Input
                        id={`issueDate-${index}`}
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
                            e.target.name,
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`expiryDate-${index}`}>
                        Expiry Date (if applicable)
                      </Label>
                      <Input
                        id={`expiryDate-${index}`}
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
                            e.target.name,
                            e.target.value
                          )
                        }
                        disabled={!editing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`certificateUrl-${index}`}>
                      Certificate URL or ID
                    </Label>
                    <Input
                      id={`certificateUrl-${index}`}
                      name="certificateUrl"
                      value={
                        editing
                          ? cert.certificateUrl || ""
                          : cert.certificateUrl || "N/A"
                      }
                      onChange={(e) =>
                        handleArrayItemChange(
                          "certifications",
                          index,
                          e.target.name,
                          e.target.value
                        )
                      }
                      disabled={!editing}
                    />
                  </div>
                </div>
              ))}
              {editing && (
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() =>
                    addArrayItem("certifications", {
                      certificationName: "",
                      issuingOrganization: "",
                      issueDate: "",
                      expiryDate: "",
                      certificateUrl: "",
                    })
                  }
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Certification
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements & Awards Tab */}
        <TabsContent value="achievements">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Achievements & Awards
              </CardTitle>
              <CardDescription>
                Highlight your notable accomplishments.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {client.achievements?.map((award, index) => (
                <div
                  key={award.id}
                  className="border p-4 rounded-lg space-y-4 relative"
                >
                  {editing && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-red-500 hover:bg-red-50"
                      onClick={() => removeArrayItem("achievements", award.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor={`awardName-${index}`}>Award Name</Label>
                    <Input
                      id={`awardName-${index}`}
                      name="awardName"
                      value={
                        editing
                          ? award.awardName || ""
                          : award.awardName || "N/A"
                      }
                      onChange={(e) =>
                        handleArrayItemChange(
                          "achievements",
                          index,
                          e.target.name,
                          e.target.value
                        )
                      }
                      disabled={!editing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`awardIssuingOrganization-${index}`}>
                      Issuing Organization
                    </Label>
                    <Input
                      id={`awardIssuingOrganization-${index}`}
                      name="issuingOrganization"
                      value={
                        editing
                          ? award.issuingOrganization || ""
                          : award.issuingOrganization || "N/A"
                      }
                      onChange={(e) =>
                        handleArrayItemChange(
                          "achievements",
                          index,
                          e.target.name,
                          e.target.value
                        )
                      }
                      disabled={!editing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`awardDate-${index}`}>Date</Label>
                    <Input
                      id={`awardDate-${index}`}
                      name="date"
                      type="date"
                      value={editing ? award.date || "" : award.date || "N/A"}
                      onChange={(e) =>
                        handleArrayItemChange(
                          "achievements",
                          index,
                          e.target.name,
                          e.target.value
                        )
                      }
                      disabled={!editing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`awardDescription-${index}`}>
                      Description
                    </Label>
                    <Textarea
                      id={`awardDescription-${index}`}
                      name="description"
                      value={
                        editing
                          ? award.description || ""
                          : award.description || "N/A"
                      }
                      onChange={(e) =>
                        handleArrayItemChange(
                          "achievements",
                          index,
                          e.target.name,
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
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() =>
                    addArrayItem("achievements", {
                      awardName: "",
                      issuingOrganization: "",
                      date: "",
                      description: "",
                    })
                  }
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Achievement
                </Button>
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
                List the languages you are proficient in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {client.languages?.map((lang, index) => (
                <div key={lang.id} className="flex items-center gap-4 relative">
                  <div className="flex-1 space-y-2">
                    <Label
                      htmlFor={`languageName-${index}`}
                      className="sr-only"
                    >
                      Language Name
                    </Label>
                    <Input
                      id={`languageName-${index}`}
                      name="name"
                      value={editing ? lang.name || "" : lang.name || "N/A"}
                      onChange={(e) =>
                        handleArrayItemChange(
                          "languages",
                          index,
                          e.target.name,
                          e.target.value
                        )
                      }
                      disabled={!editing}
                      placeholder="Language Name"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label
                      htmlFor={`languageProficiency-${index}`}
                      className="sr-only"
                    >
                      Proficiency
                    </Label>
                    <Select
                      value={
                        editing
                          ? lang.proficiency || ""
                          : lang.proficiency || ""
                      }
                      onValueChange={(value) =>
                        handleArrayItemChange(
                          "languages",
                          index,
                          "proficiency",
                          value
                        )
                      }
                      disabled={!editing}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Proficiency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Basic">Basic</SelectItem>
                        <SelectItem value="Conversational">
                          Conversational
                        </SelectItem>
                        <SelectItem value="Fluent">Fluent</SelectItem>
                        <SelectItem value="Native">Native</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {editing && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:bg-red-50"
                      onClick={() => removeArrayItem("languages", lang.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              {editing && (
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() =>
                    addArrayItem("languages", { name: "", proficiency: "" })
                  }
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Language
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* References Tab */}
        <TabsContent value="references">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                References (Optional)
              </CardTitle>
              <CardDescription>
                Contact details for your professional references.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {client.references?.map((ref, index) => (
                <div
                  key={ref.id}
                  className="border p-4 rounded-lg space-y-4 relative"
                >
                  {editing && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-red-500 hover:bg-red-50"
                      onClick={() => removeArrayItem("references", ref.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor={`refereeName-${index}`}>Referee Name</Label>
                    <Input
                      id={`refereeName-${index}`}
                      name="refereeName"
                      value={
                        editing
                          ? ref.refereeName || ""
                          : ref.refereeName || "N/A"
                      }
                      onChange={(e) =>
                        handleArrayItemChange(
                          "references",
                          index,
                          e.target.name,
                          e.target.value
                        )
                      }
                      disabled={!editing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`positionCompany-${index}`}>
                      Position / Company
                    </Label>
                    <Input
                      id={`positionCompany-${index}`}
                      name="positionCompany"
                      value={
                        editing
                          ? ref.positionCompany || ""
                          : ref.positionCompany || "N/A"
                      }
                      onChange={(e) =>
                        handleArrayItemChange(
                          "references",
                          index,
                          e.target.name,
                          e.target.value
                        )
                      }
                      disabled={!editing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`contactDetails-${index}`}>
                      Contact Details
                    </Label>
                    <Input
                      id={`contactDetails-${index}`}
                      name="contactDetails"
                      value={
                        editing
                          ? ref.contactDetails || ""
                          : ref.contactDetails || "N/A"
                      }
                      onChange={(e) =>
                        handleArrayItemChange(
                          "references",
                          index,
                          e.target.name,
                          e.target.value
                        )
                      }
                      disabled={!editing}
                    />
                  </div>
                </div>
              ))}
              {editing && (
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() =>
                    addArrayItem("references", {
                      refereeName: "",
                      positionCompany: "",
                      contactDetails: "",
                    })
                  }
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Reference
                </Button>
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
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resume">Resume</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="resume"
                    type="file"
                    ref={resumeInputRef}
                    onChange={(e) => handleFileUpload(e, "resumeUrl")}
                    className="flex-1"
                    accept=".pdf,.doc,.docx"
                    disabled={!editing}
                  />
                  {client.resumeUrl && (
                    <a
                      href={client.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:underline text-sm"
                    >
                      View Current
                    </a>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="coverLetter">Cover Letter</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="coverLetter"
                    type="file"
                    ref={coverLetterInputRef}
                    onChange={(e) => handleFileUpload(e, "coverLetterUrl")}
                    className="flex-1"
                    accept=".pdf,.doc,.docx"
                    disabled={!editing}
                  />
                  {client.coverLetterUrl && (
                    <a
                      href={client.coverLetterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:underline text-sm"
                    >
                      View Current
                    </a>
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
