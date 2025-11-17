"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Users,
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  Building,
  Calendar,
  MessageSquare,
  Loader2,
  Send,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

export default function VendorClients() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    notes: "",
  });

  // Add messaging state variables
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(false);
  const messagesEndRef = useRef(null);

  // Add error state to help with debugging
  const [error, setError] = useState(null);

  // Fetch clients data
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if user is logged in
        if (!session?.user?.email) {
          setError("Please log in as a vendor to view clients");
          setLoading(false);
          return;
        }

        // Check if user is a vendor
        if (session?.user?.userType !== "Vendor") {
          setError("Only vendors can access this page");
          setLoading(false);
          return;
        }

        // Fetch clients data from the API
        const response = await fetch(
          `/api/vendor/clients?vendorEmail=${session?.user?.email}&type=${filterType}&search=${searchTerm}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch clients");
        }

        const data = await response.json();
        setClients(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching clients:", error);
        setError("Failed to fetch clients. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to fetch clients",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchClients();
    } else {
      setLoading(false);
      setError("Please log in as a vendor to view clients");
    }
  }, [session, filterType, searchTerm, toast]);

  const handleAddClient = async () => {
    if (!newClient.name || !newClient.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      // Save to the API
      const response = await fetch("/api/vendor/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vendorEmail: session?.user?.email,
          ...newClient,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add client");
      }

      const result = await response.json();

      setClients([...clients, result.client]);
      setNewClient({
        name: "",
        email: "",
        company: "",
        phone: "",
        notes: "",
      });
      setIsModalOpen(false);

      toast({
        title: "Success",
        description: "Client added successfully",
      });
    } catch (error) {
      console.error("Error adding client:", error);
      toast({
        title: "Error",
        description: "Failed to add client",
        variant: "destructive",
      });
    }
  };

  const handleUpdateClient = async () => {
    if (!editingClient.name || !editingClient.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      // Update via the API
      const response = await fetch("/api/vendor/clients", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingClient.id,
          vendorEmail: session?.user?.email,
          ...editingClient,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update client");
      }

      setClients(
        clients.map((client) =>
          client.id === editingClient.id ? editingClient : client
        )
      );
      setEditingClient(null);

      toast({
        title: "Success",
        description: "Client updated successfully",
      });
    } catch (error) {
      console.error("Error updating client:", error);
      toast({
        title: "Error",
        description: "Failed to update client",
        variant: "destructive",
      });
    }
  };

  const handleDeleteClient = async (id) => {
    try {
      // Delete via the API
      const response = await fetch(
        `/api/vendor/clients?id=${id}&vendorEmail=${session?.user?.email}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove client");
      }

      setClients(clients.filter((client) => client.id !== id));
      toast({
        title: "Success",
        description: "Client removed successfully",
      });
    } catch (error) {
      console.error("Error deleting client:", error);
      toast({
        title: "Error",
        description: "Failed to remove client",
        variant: "destructive",
      });
    }
  };

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || client.type === filterType;
    return matchesSearch && matchesType;
  });

  const getClientTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "client":
        return "bg-blue-100 text-blue-800";
      case "admin":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="text-gray-600">Loading clients...</p>
        </div>
      </div>
    );
  }

  // Show error message if there's an error
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 text-lg font-medium">{error}</p>
          <p className="text-gray-600 mt-2">
            Please make sure you are logged in as a vendor.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Client & Admin Connections
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your connections with clients and administrators
          </p>
        </div>
        <Button
          className="bg-teal-600 hover:bg-teal-700"
          onClick={() => {
            setEditingClient(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Connection
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search clients by name, email, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Connections</SelectItem>
                <SelectItem value="client">Clients</SelectItem>
                <SelectItem value="admin">Administrators</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Clients List */}
      {filteredClients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <Card key={client.id} className="bg-white shadow-sm border-0">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{client.name}</CardTitle>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getClientTypeColor(
                      client.type
                    )}`}
                  >
                    {client.type}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {client.company || "No company specified"}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{client.email}</span>
                  </div>
                  {client.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{client.phone}</span>
                    </div>
                  )}
                  {client.lastContact && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>
                        Last contact:{" "}
                        {new Date(client.lastContact).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {client.projectsCount !== undefined && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Building className="w-4 h-4 mr-2" />
                      <span>{client.projectsCount} projects</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openMessageModal(client)}
                  >
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Message
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingClient(client);
                        setIsModalOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClient(client.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border border-dashed">
          <Users className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No connections found
          </h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || filterType !== "all"
              ? "No connections match your search criteria."
              : "Add your first client or admin connection."}
          </p>
          <Button
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => {
              setEditingClient(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Connection
          </Button>
        </div>
      )}

      {/* Add/Edit Client Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {editingClient ? "Edit Connection" : "Add New Connection"}
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={editingClient ? editingClient.name : newClient.name}
                    onChange={(e) =>
                      editingClient
                        ? setEditingClient({
                            ...editingClient,
                            name: e.target.value,
                          })
                        : setNewClient({ ...newClient, name: e.target.value })
                    }
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={
                      editingClient ? editingClient.email : newClient.email
                    }
                    onChange={(e) =>
                      editingClient
                        ? setEditingClient({
                            ...editingClient,
                            email: e.target.value,
                          })
                        : setNewClient({ ...newClient, email: e.target.value })
                    }
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={
                      editingClient ? editingClient.company : newClient.company
                    }
                    onChange={(e) =>
                      editingClient
                        ? setEditingClient({
                            ...editingClient,
                            company: e.target.value,
                          })
                        : setNewClient({
                            ...newClient,
                            company: e.target.value,
                          })
                    }
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={
                      editingClient ? editingClient.phone : newClient.phone
                    }
                    onChange={(e) =>
                      editingClient
                        ? setEditingClient({
                            ...editingClient,
                            phone: e.target.value,
                          })
                        : setNewClient({ ...newClient, phone: e.target.value })
                    }
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Connection Type</Label>
                  <Select
                    value={editingClient ? editingClient.type : "client"}
                    onValueChange={(value) =>
                      editingClient
                        ? setEditingClient({ ...editingClient, type: value })
                        : setNewClient({ ...newClient, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={
                      editingClient ? editingClient.notes : newClient.notes
                    }
                    onChange={(e) =>
                      editingClient
                        ? setEditingClient({
                            ...editingClient,
                            notes: e.target.value,
                          })
                        : setNewClient({ ...newClient, notes: e.target.value })
                    }
                    placeholder="Add any notes about this connection"
                    rows={3}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 pt-0">
              <Button
                variant="outline"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingClient(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={editingClient ? handleUpdateClient : handleAddClient}
              >
                {editingClient ? "Update Connection" : "Add Connection"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {isMessageModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  Message {selectedUser.name}
                </h2>
                <Button variant="ghost" size="sm" onClick={closeMessageModal}>
                  ×
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {loadingMessages ? (
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.from === session?.user?.email
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.from === session?.user?.email
                            ? "bg-teal-600 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                  <MessageSquare className="h-8 w-8 mb-2" />
                  <p>No messages yet. Start a conversation!</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Add messaging functions
  const fetchMessages = async (userEmail) => {
    try {
      setLoadingMessages(true);
      const response = await fetch(
        `/api/vendor/messages?vendorEmail=${session?.user?.email}&userEmail=${userEmail}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      setMessages(data.reverse()); // Reverse to show oldest first
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast({
        title: "Error",
        description: "Failed to fetch messages",
        variant: "destructive",
      });
    } finally {
      setLoadingMessages(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await fetch("/api/vendor/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vendorEmail: session?.user?.email,
          userEmail: selectedUser.email,
          content: newMessage.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const message = await response.json();
      setMessages([...messages, message]);
      setNewMessage("");

      toast({
        title: "Success",
        description: "Message sent successfully",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  };

  const openMessageModal = async (user) => {
    setSelectedUser(user);
    setIsMessageModalOpen(true);
    await fetchMessages(user.email);
  };

  const closeMessageModal = () => {
    setIsMessageModalOpen(false);
    setSelectedUser(null);
    setMessages([]);
    setNewMessage("");
  };

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
}
