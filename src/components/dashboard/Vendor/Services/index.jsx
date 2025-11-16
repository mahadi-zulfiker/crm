"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Loader2,
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

export default function VendorServices() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
  });

  // Add error state to help with debugging
  const [error, setError] = useState(null);

  const categories = [
    "HR",
    "Staffing",
    "Education",
    "Consulting",
    "IT",
    "Finance",
  ];

  // Fetch services data
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if user is logged in
        if (!session?.user?.email) {
          setError("Please log in as a vendor to view services");
          setLoading(false);
          return;
        }
        
        // Check if user is a vendor
        if (session?.user?.userType !== "Vendor") {
          setError("Only vendors can access this page");
          setLoading(false);
          return;
        }
        
        const response = await fetch(
          `/api/vendor/services?email=${session?.user?.email}`
        );
        const result = await response.json();

        if (response.ok) {
          setServices(result.data.services);
        } else {
          setError(result.error || "Failed to fetch services");
          toast({
            title: "Error",
            description: result.error || "Failed to fetch services",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Failed to fetch services. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to fetch services",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchServices();
    } else {
      setLoading(false);
      setError("Please log in as a vendor to view services");
    }
  }, [session]);

  const handleAddService = async () => {
    if (
      !newService.name ||
      !newService.description ||
      !newService.category ||
      !newService.price
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/vendor/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          service: {
            ...newService,
            price: parseFloat(newService.price),
            status: "Active",
          },
          type: "service",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setServices([...services, result.service]);
        setNewService({ name: "", description: "", category: "", price: "" });
        setIsModalOpen(false);

        toast({
          title: "Success",
          description: "Service added successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to add service",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding service:", error);
      toast({
        title: "Error",
        description: "Failed to add service",
        variant: "destructive",
      });
    }
  };

  const handleUpdateService = async () => {
    if (
      !editingService.name ||
      !editingService.description ||
      !editingService.category ||
      !editingService.price
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/vendor/services", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          service: {
            ...editingService,
            price: parseFloat(editingService.price),
          },
          type: "service",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setServices(
          services.map((service) =>
            service.id === editingService.id ? result.service : service
          )
        );
        setEditingService(null);

        toast({
          title: "Success",
          description: "Service updated successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update service",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating service:", error);
      toast({
        title: "Error",
        description: "Failed to update service",
        variant: "destructive",
      });
    }
  };

  const handleDeleteService = async (id) => {
    try {
      const response = await fetch(
        `/api/vendor/services?email=${session?.user?.email}&id=${id}&type=service`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (response.ok) {
        setServices(services.filter((service) => service.id !== id));
        toast({
          title: "Success",
          description: "Service deleted successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete service",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive",
      });
    }
  };

  const handleStatusToggle = async (id) => {
    try {
      const service = services.find((s) => s.id === id);
      if (!service) return;

      const updatedService = {
        ...service,
        status: service.status === "Active" ? "Inactive" : "Active",
      };

      const response = await fetch("/api/vendor/services", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          service: updatedService,
          type: "service",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setServices(
          services.map((service) =>
            service.id === id ? result.service : service
          )
        );
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update service status",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating service status:", error);
      toast({
        title: "Error",
        description: "Failed to update service status",
        variant: "destructive",
      });
    }
  };

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || service.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    return status === "Active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="text-gray-600">Loading services...</p>
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
          <p className="text-gray-600 mt-2">Please make sure you are logged in as a vendor.</p>
        </div>
      </div>
    );
  }

  // Show message when no services exist
  if (services.length === 0 && !loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              My Services
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your service offerings and packages
            </p>
          </div>
          <Button
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => {
              setEditingService(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Service
          </Button>
        </div>
        
        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search services..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Empty state */}
        <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border border-dashed">
          <Package className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No services yet</h3>
          <p className="text-gray-500 mb-4">Get started by creating a new service.</p>
          <Button
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => {
              setEditingService(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Service
          </Button>
        </div>
        
        {/* Add/Edit Service Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">
                  {editingService ? "Edit Service" : "Add New Service"}
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Service Name *</Label>
                    <Input
                      id="name"
                      value={
                        editingService ? editingService.name : newService.name
                      }
                      onChange={(e) =>
                        editingService
                          ? setEditingService({
                              ...editingService,
                              name: e.target.value,
                            })
                          : setNewService({ ...newService, name: e.target.value })
                      }
                      placeholder="Enter service name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={
                        editingService
                          ? editingService.description
                          : newService.description
                      }
                      onChange={(e) =>
                        editingService
                          ? setEditingService({
                              ...editingService,
                              description: e.target.value,
                            })
                          : setNewService({
                              ...newService,
                              description: e.target.value,
                            })
                      }
                      placeholder="Enter service description"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={
                        editingService
                          ? editingService.category
                          : newService.category
                      }
                      onValueChange={(value) =>
                        editingService
                          ? setEditingService({
                              ...editingService,
                              category: value,
                            })
                          : setNewService({ ...newService, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={
                        editingService ? editingService.price : newService.price
                      }
                      onChange={(e) =>
                        editingService
                          ? setEditingService({
                              ...editingService,
                              price: e.target.value,
                            })
                          : setNewService({
                              ...newService,
                              price: e.target.value,
                            })
                      }
                      placeholder="Enter price"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 p-6 pt-0">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingService(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={
                    editingService ? handleUpdateService : handleAddService
                  }
                >
                  {editingService ? "Update Service" : "Add Service"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            My Services
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your service offerings and packages
          </p>
        </div>
        <Button
          className="bg-teal-600 hover:bg-teal-700"
          onClick={() => {
            setEditingService(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Service
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search services..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="bg-white shadow-sm border-0">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    service.status
                  )}`}
                >
                  {service.status}
                </span>
              </div>
              <p className="text-sm text-gray-500">{service.category}</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {service.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-teal-600">
                  ${service.price.toLocaleString()}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusToggle(service.id)}
                  >
                    {service.status === "Active" ? "Deactivate" : "Activate"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingService(service);
                      setIsModalOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {editingService ? "Edit Service" : "Add New Service"}
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Service Name *</Label>
                  <Input
                    id="name"
                    value={
                      editingService ? editingService.name : newService.name
                    }
                    onChange={(e) =>
                      editingService
                        ? setEditingService({
                            ...editingService,
                            name: e.target.value,
                          })
                        : setNewService({ ...newService, name: e.target.value })
                    }
                    placeholder="Enter service name"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={
                      editingService
                        ? editingService.description
                        : newService.description
                    }
                    onChange={(e) =>
                      editingService
                        ? setEditingService({
                            ...editingService,
                            description: e.target.value,
                          })
                        : setNewService({
                            ...newService,
                            description: e.target.value,
                          })
                    }
                    placeholder="Enter service description"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={
                      editingService
                        ? editingService.category
                        : newService.category
                    }
                    onValueChange={(value) =>
                      editingService
                        ? setEditingService({
                            ...editingService,
                            category: value,
                          })
                        : setNewService({ ...newService, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={
                      editingService ? editingService.price : newService.price
                    }
                    onChange={(e) =>
                      editingService
                        ? setEditingService({
                            ...editingService,
                            price: e.target.value,
                          })
                        : setNewService({
                            ...newService,
                            price: e.target.value,
                          })
                    }
                    placeholder="Enter price"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 pt-0">
              <Button
                variant="outline"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingService(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={
                  editingService ? handleUpdateService : handleAddService
                }
              >
                {editingService ? "Update Service" : "Add Service"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
