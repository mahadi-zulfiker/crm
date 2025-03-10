"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const ClientProfileManagement = () => {
  const { data: session } = useSession();
  const [client, setClient] = useState(null);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (session?.user?.email) {
      fetchClientData(session.user.email);
    }
  }, [session]);

  const fetchClientData = async (email) => {
    try {
      const response = await axios.get(`/api/clientProfile?email=${email}`);
      setClient(response.data);
    } catch (error) {
      console.error("Error fetching client data:", error);
      setError("Failed to load client profile.");
    }
  };

  const handleChange = (e) => {
    setClient((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

  if (!client) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}

        <h2 className="text-2xl font-semibold mb-4">Client Profile</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Name:</label>
          {editing ? (
            <input
              type="text"
              name="username"
              value={client.username}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          ) : (
            <p className="p-2 border rounded bg-gray-50">{client.username}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Email:</label>
          <p className="p-2 border rounded bg-gray-50">{client.email}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Contact Info:</label>
          {editing ? (
            <input
              type="text"
              name="contactInfo"
              value={client.contactInfo || ""}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          ) : (
            <p className="p-2 border rounded bg-gray-50">{client.contactInfo}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Company Name:</label>
          {editing ? (
            <input
              type="text"
              name="companyName"
              value={client.companyName || ""}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          ) : (
            <p className="p-2 border rounded bg-gray-50">{client.companyName}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Address:</label>
          {editing ? (
            <input
              type="text"
              name="address"
              value={client.address || ""}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          ) : (
            <p className="p-2 border rounded bg-gray-50">{client.address}</p>
          )}
        </div>

        <button
          onClick={() => (editing ? handleSave() : setEditing(true))}
          className="mt-4 w-full px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          {editing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default ClientProfileManagement;
