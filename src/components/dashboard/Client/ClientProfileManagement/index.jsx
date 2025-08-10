"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signIn } from "next-auth/react"; // Import signIn
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Loader2, LogIn } from "lucide-react"; // Import Loader2 and LogIn icons

export default function UserProfilePage() {
  const { data: session, status } = useSession();
  const [client, setClient] = useState(null);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetchClientData(session.user.email);
    }
  }, [status, session]);

  const fetchClientData = async (email) => {
    try {
      const response = await axios.get(`/api/clientProfile?email=${email}`);
      console.log("response", response.data);
      setClient(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching client data:", error);
      setError("Failed to load client profile.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClient((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put("/api/clientProfile", client);
      setMessage("Profile updated successfully");
      setEditing(false);
      setError("");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile.");
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

  return (
      <div className="space-y-6">
        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              User Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={client.image || "/placeholder.svg?height=96&width=96"}
                  alt="User Profile"
                />
                <AvatarFallback className="bg-teal-500 text-white text-3xl">
                  {client.username
                    ? client.username.charAt(0).toUpperCase()
                    : "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {client.username || "User"}
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
                  disabled={!editing}
                >
                  Change Photo
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Full Name</Label>
                <Input
                  id="username"
                  name="username"
                  value={editing ? client.username : client.username || "N/A"}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={client.email || session.user.email || "N/A"}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={editing ? client.phone : client.phone || "N/A"}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={editing ? client.location : client.location || "N/A"}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold"
                onClick={editing ? handleSave : handleEditToggle}
              >
                {editing ? "Save Changes" : "Edit Profile"}
              </Button>
              {editing && (
                <Button
                  variant="outline"
                  onClick={handleEditToggle}
                  className="bg-transparent"
                >
                  Cancel
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
  );
}
