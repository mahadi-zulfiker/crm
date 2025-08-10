"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UserProfilePage() {
  const { data: session, status } = useSession();
  const [client, setClient] = useState(null);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Please sign in to view your profile.</p>;
  if (!client) return <p>Loading profile...</p>;

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
                {client.name ? client.username.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {client.name || "User"}
              </h3>
              <p className="text-gray-600">{client.role || "Job Seeker"}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 bg-transparent"
                onClick={() => alert("Photo upload not implemented yet")}
              >
                Change Photo
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={client.username || "N/A"}
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
                value={client.phone || "N/A"}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={client.location || "N/A"}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              className="bg-teal-600 hover:bg-teal-700"
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
