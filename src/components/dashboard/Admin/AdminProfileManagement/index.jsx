"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/Separator";
import {
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  Edit,
  Save,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
  Shield,
  Settings,
  UserCheck,
  Clock,
  MapPin,
} from "lucide-react";

export default function AdminProfileManagement() {
  const { data: session, status } = useSession();
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    phone: "",
    department: "",
    bio: "",
  });

  useEffect(() => {
    if (status === "authenticated" && session.user?.email) {
      fetchAdminProfile();
    }
  }, [status, session]);

  const fetchAdminProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/adminProfile?email=${session.user.email}`
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
        showMessage("error", result.error || "Failed to load profile");
      }
    } catch (error) {
      console.error("Error fetching admin profile:", error);
      showMessage("error", "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await fetch("/api/adminProfile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: adminData._id,
          ...formData,
          email: session?.user?.email,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setAdminData((prev) => ({ ...prev, ...formData }));
        setIsEditing(false);
        showMessage("success", "Profile updated successfully");
      } else {
        showMessage("error", result.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      showMessage("error", "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      username: adminData.username || "",
      fullName: adminData.fullName || "",
      phone: adminData.phone || "",
      department: adminData.department || "",
      bio: adminData.bio || "",
    });
    setIsEditing(false);
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto"></div>
            <Shield className="w-8 h-8 text-teal-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-gray-600 mt-4 font-medium">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (
    !session ||
    (session.user.userType !== "Admin" && session.user.userType !== "admin")
  ) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-red-200 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-red-800 mb-2">
              Access Denied
            </h2>
            <p className="text-red-600">
              You don't have permission to access this page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-teal-600 via-teal-650 to-teal-700 rounded-2xl shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative px-8 py-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-20 w-20 border-4 border-white shadow-xl">
                    <AvatarImage
                      src="/placeholder.svg?height=80&width=80"
                      alt="Admin"
                    />
                    <AvatarFallback className="bg-white text-teal-600 text-2xl font-bold">
                      {adminData?.username?.substring(0, 2).toUpperCase() ||
                        "AD"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="text-white">
                  <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                    {adminData?.fullName || adminData?.username || "Admin User"}
                  </h1>
                  <p className="text-teal-100 text-lg mb-3">
                    {adminData?.email}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                      <Shield className="w-3 h-3 mr-1" />
                      Administrator
                    </Badge>
                    <Badge className="bg-green-500/20 text-white border-green-300/30">
                      <UserCheck className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    size="lg"
                    className="bg-white text-teal-600 hover:bg-gray-100 shadow-lg font-semibold"
                  >
                    <Edit className="w-5 h-5 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      disabled={saving}
                      size="lg"
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                    >
                      <X className="w-5 h-5 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={saving}
                      size="lg"
                      className="bg-white text-teal-600 hover:bg-gray-100 shadow-lg font-semibold"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        {message.text && (
          <Card
            className={`border-l-4 shadow-lg ${
              message.type === "success"
                ? "border-l-green-500 bg-green-50 border-green-200"
                : "border-l-red-500 bg-red-50 border-red-200"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                {message.type === "success" ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-red-600" />
                )}
                <p
                  className={`font-semibold ${
                    message.type === "success"
                      ? "text-green-800"
                      : "text-red-800"
                  }`}
                >
                  {message.text}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Quick Stats */}
          <Card className="xl:col-span-1 shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Settings className="w-5 h-5 text-teal-600" />
                Quick Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-teal-50 rounded-xl border border-teal-100">
                  <Calendar className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="font-bold text-teal-800">
                    {adminData?.createdAt
                      ? new Date(adminData.createdAt).getFullYear()
                      : "N/A"}
                  </p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Last Update</p>
                  <p className="font-bold text-orange-800">
                    {adminData?.updatedAt ? "Recent" : "Never"}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-800">
                      {adminData?.email}
                    </p>
                  </div>
                </div>

                {adminData?.phone && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-gray-800">
                        {adminData.phone}
                      </p>
                    </div>
                  </div>
                )}

                {adminData?.department && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Building className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Department</p>
                      <p className="font-medium text-gray-800">
                        {adminData.department}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <Card className="xl:col-span-2 shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <User className="w-6 h-6 text-teal-600" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="username"
                    className="text-gray-700 font-semibold flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Username
                  </Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`transition-all duration-200 ${
                      isEditing
                        ? "border-teal-300 focus:border-teal-500 focus:ring-teal-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                    placeholder="Enter your username"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="fullName"
                    className="text-gray-700 font-semibold flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`transition-all duration-200 ${
                      isEditing
                        ? "border-teal-300 focus:border-teal-500 focus:ring-teal-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-gray-700 font-semibold flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                    className={`transition-all duration-200 ${
                      isEditing
                        ? "border-teal-300 focus:border-teal-500 focus:ring-teal-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="department"
                    className="text-gray-700 font-semibold flex items-center gap-2"
                  >
                    <Building className="w-4 h-4" />
                    Department
                  </Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) =>
                      handleInputChange("department", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`transition-all duration-200 ${
                      isEditing
                        ? "border-teal-300 focus:border-teal-500 focus:ring-teal-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                    placeholder="Enter your department"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="bio"
                  className="text-gray-700 font-semibold flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  disabled={!isEditing}
                  className={`min-h-[120px] transition-all duration-200 ${
                    isEditing
                      ? "border-teal-300 focus:border-teal-500 focus:ring-teal-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                  placeholder="Tell us about yourself and your role..."
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Security */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-white to-gray-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Shield className="w-6 h-6 text-teal-600" />
              Account Security & Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl border border-teal-200">
                <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-teal-800 mb-1">Account Type</h3>
                <p className="text-teal-600 font-medium">
                  {adminData?.userType || "Administrator"}
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-green-800 mb-1">
                  Account Status
                </h3>
                <p className="text-green-600 font-medium">Active & Verified</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-orange-800 mb-1">Last Updated</h3>
                <p className="text-orange-600 font-medium">
                  {adminData?.updatedAt
                    ? new Date(adminData.updatedAt).toLocaleDateString()
                    : "Never updated"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
