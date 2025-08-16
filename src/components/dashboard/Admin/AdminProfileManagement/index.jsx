"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/Separator";
import {
  User,
  Phone,
  Building,
  Calendar,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
  Edit,
  Shield,
} from "lucide-react";

export default function AdminProfileManagement() {
  const { data: session, status } = useSession();
  const [adminData, setAdminData] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    phone: "",
    department: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session.user?.email) {
      fetchAdminProfile();
    }
  }, [status, session]);

  const fetchAdminProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/adminProfile?email=${session?.user?.email}`
      );
      const result = await response.json();

      if (result.success) {
        setAdminData(result.data);
        setFormData({
          username: result.data.username || "",
          fullName: result.data.fullName || "",
          phone: result.data.phone || "",
          department: result.data.department || "",
          bio: result.data.bio || "",
        });
      } else {
        setMessage(result.error || "Failed to load profile");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Failed to load profile");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/adminProfile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: adminData._id,
          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage("Profile updated successfully!");
        setMessageType("success");
        setIsEditing(false);
        // Refresh the data
        await fetchAdminProfile();
      } else {
        setMessage(result.error || "Update failed");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Failed to update profile");
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-teal-600" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (
    !session ||
    (session.user.userType !== "Admin" && session.user.userType !== "admin")
  ) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-lg font-medium text-red-800 mb-2">
            Access Denied
          </h2>
          <p className="text-red-600">
            You don't have permission to access this page.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Profile Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your admin account settings and information
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-teal-100 text-teal-800 font-semibold">
            <Shield className="w-3 h-3 mr-1" />
            Administrator
          </Badge>
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-teal-600 hover:bg-teal-700"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  // Reset form data
                  setFormData({
                    username: adminData?.username || "",
                    fullName: adminData?.fullName || "",
                    phone: adminData?.phone || "",
                    department: adminData?.department || "",
                    bio: adminData?.bio || "",
                  });
                }}
                className="text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={saving}
                className="bg-teal-600 hover:bg-teal-700"
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
          )}
        </div>
      </div>

      {/* Success/Error Message */}
      {message && (
        <Card
          className={`border-l-4 ${
            messageType === "success"
              ? "border-l-green-500 bg-green-50"
              : "border-l-red-500 bg-red-50"
          }`}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              {messageType === "success" ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <p
                className={`font-medium ${
                  messageType === "success" ? "text-green-800" : "text-red-800"
                }`}
              >
                {message}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {adminData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview Card */}
          <Card className="lg:col-span-1">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src="/placeholder.svg?height=96&width=96"
                    alt={adminData.fullName || adminData.username}
                  />
                  <AvatarFallback className="bg-teal-500 text-white text-2xl">
                    {(
                      adminData.fullName ||
                      adminData.username ||
                      adminData.email
                    )
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-xl text-gray-900">
                {adminData.fullName || adminData.username || "Admin User"}
              </CardTitle>
              <p className="text-gray-600">{adminData.email}</p>
              <Badge className="bg-teal-100 text-teal-800 mt-2">
                {adminData.userType || "Administrator"}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>
                  Joined{" "}
                  {adminData.createdAt
                    ? new Date(adminData.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              {adminData.department && (
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Building className="w-4 h-4" />
                  <span>{adminData.department}</span>
                </div>
              )}
              {adminData.phone && (
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{adminData.phone}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Profile Details Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label
                    htmlFor="username"
                    className="text-gray-700 font-medium"
                  >
                    Username
                  </Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    disabled={!isEditing}
                    className="mt-1"
                    placeholder="Enter username"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="fullName"
                    className="text-gray-700 font-medium"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    disabled={!isEditing}
                    className="mt-1"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    value={adminData.email}
                    disabled
                    className="mt-1 bg-gray-50"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Email cannot be changed
                  </p>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-700 font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label
                    htmlFor="department"
                    className="text-gray-700 font-medium"
                  >
                    Department
                  </Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) =>
                      handleInputChange("department", e.target.value)
                    }
                    disabled={!isEditing}
                    className="mt-1"
                    placeholder="Enter department"
                  />
                </div>
              </div>

              <Separator />

              <div>
                <Label htmlFor="bio" className="text-gray-700 font-medium">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1 min-h-[100px]"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-teal-50 rounded-lg">
              <h3 className="font-semibold text-teal-800">Account Type</h3>
              <p className="text-teal-600 mt-1">
                {adminData?.userType || "Administrator"}
              </p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800">Account Status</h3>
              <p className="text-blue-600 mt-1">Active</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800">Last Updated</h3>
              <p className="text-green-600 mt-1">
                {adminData?.updatedAt
                  ? new Date(adminData.updatedAt).toLocaleDateString()
                  : "Never"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
