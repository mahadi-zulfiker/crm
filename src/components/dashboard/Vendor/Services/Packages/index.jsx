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
  CheckCircle,
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

export default function VendorServicePackages() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPackage, setNewPackage] = useState({
    name: "",
    description: "",
    services: [""],
    price: "",
    duration: "",
  });

  // Fetch packages data
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/vendor/services?email=${session?.user?.email}`
        );
        const result = await response.json();

        if (response.ok) {
          setPackages(result.data.packages);
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to fetch packages",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
        toast({
          title: "Error",
          description: "Failed to fetch packages",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchPackages();
    }
  }, [session]);

  const handleAddServiceField = () => {
    if (editingPackage) {
      setEditingPackage({
        ...editingPackage,
        services: [...editingPackage.services, ""],
      });
    } else {
      setNewPackage({
        ...newPackage,
        services: [...newPackage.services, ""],
      });
    }
  };

  const handleRemoveServiceField = (index) => {
    if (editingPackage) {
      const updatedServices = editingPackage.services.filter(
        (_, i) => i !== index
      );
      setEditingPackage({
        ...editingPackage,
        services: updatedServices,
      });
    } else {
      const updatedServices = newPackage.services.filter((_, i) => i !== index);
      setNewPackage({
        ...newPackage,
        services: updatedServices,
      });
    }
  };

  const handleServiceChange = (index, value) => {
    if (editingPackage) {
      const updatedServices = [...editingPackage.services];
      updatedServices[index] = value;
      setEditingPackage({
        ...editingPackage,
        services: updatedServices,
      });
    } else {
      const updatedServices = [...newPackage.services];
      updatedServices[index] = value;
      setNewPackage({
        ...newPackage,
        services: updatedServices,
      });
    }
  };

  const handleAddPackage = async () => {
    if (
      !newPackage.name ||
      !newPackage.description ||
      !newPackage.price ||
      !newPackage.duration
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Filter out empty service fields
    const validServices = newPackage.services.filter(
      (service) => service.trim() !== ""
    );

    if (validServices.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one service",
        variant: "destructive",
      });
      return;
    }

    try {
      const packageItem = {
        ...newPackage,
        services: validServices,
        price: parseFloat(newPackage.price),
        status: "Active",
      };

      const response = await fetch("/api/vendor/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          service: packageItem,
          type: "package",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setPackages([...packages, result.service]);
        setNewPackage({
          name: "",
          description: "",
          services: [""],
          price: "",
          duration: "",
        });
        setIsModalOpen(false);

        toast({
          title: "Success",
          description: "Package added successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to add package",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding package:", error);
      toast({
        title: "Error",
        description: "Failed to add package",
        variant: "destructive",
      });
    }
  };

  const handleUpdatePackage = async () => {
    if (
      !editingPackage.name ||
      !editingPackage.description ||
      !editingPackage.price ||
      !editingPackage.duration
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Filter out empty service fields
    const validServices = editingPackage.services.filter(
      (service) => service.trim() !== ""
    );

    if (validServices.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one service",
        variant: "destructive",
      });
      return;
    }

    try {
      const updatedPackage = {
        ...editingPackage,
        services: validServices,
        price: parseFloat(editingPackage.price),
      };

      const response = await fetch("/api/vendor/services", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          service: updatedPackage,
          type: "package",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setPackages(
          packages.map((pkg) =>
            pkg.id === editingPackage.id ? result.service : pkg
          )
        );
        setEditingPackage(null);

        toast({
          title: "Success",
          description: "Package updated successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update package",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating package:", error);
      toast({
        title: "Error",
        description: "Failed to update package",
        variant: "destructive",
      });
    }
  };

  const handleDeletePackage = async (id) => {
    try {
      const response = await fetch(
        `/api/vendor/services?email=${session?.user?.email}&id=${id}&type=package`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (response.ok) {
        setPackages(packages.filter((pkg) => pkg.id !== id));
        toast({
          title: "Success",
          description: "Package deleted successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete package",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting package:", error);
      toast({
        title: "Error",
        description: "Failed to delete package",
        variant: "destructive",
      });
    }
  };

  const handleStatusToggle = async (id) => {
    try {
      const pkg = packages.find((p) => p.id === id);
      if (!pkg) return;

      const updatedPackage = {
        ...pkg,
        status: pkg.status === "Active" ? "Inactive" : "Active",
      };

      const response = await fetch("/api/vendor/services", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          service: updatedPackage,
          type: "package",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setPackages(
          packages.map((pkg) => (pkg.id === id ? result.service : pkg))
        );
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update package status",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating package status:", error);
      toast({
        title: "Error",
        description: "Failed to update package status",
        variant: "destructive",
      });
    }
  };

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
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
          <p className="text-gray-600">Loading packages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Service Packages
          </h1>
          <p className="text-gray-600 mt-1">
            Create and manage service packages for your clients
          </p>
        </div>
        <Button
          className="bg-teal-600 hover:bg-teal-700"
          onClick={() => {
            setEditingPackage(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Package
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
                placeholder="Search packages..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Packages List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPackages.map((pkg) => (
          <Card key={pkg.id} className="bg-white shadow-sm border-0">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{pkg.name}</CardTitle>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    pkg.status
                  )}`}
                >
                  {pkg.status}
                </span>
              </div>
              <p className="text-sm text-gray-500">{pkg.duration}</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  Included Services:
                </h4>
                <ul className="space-y-1">
                  {pkg.services.map((service, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-teal-600">
                  ${pkg.price.toLocaleString()}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusToggle(pkg.id)}
                  >
                    {pkg.status === "Active" ? "Deactivate" : "Activate"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingPackage(pkg);
                      setIsModalOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeletePackage(pkg.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Package Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {editingPackage ? "Edit Package" : "Create New Package"}
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="packageName">Package Name *</Label>
                  <Input
                    id="packageName"
                    value={
                      editingPackage ? editingPackage.name : newPackage.name
                    }
                    onChange={(e) =>
                      editingPackage
                        ? setEditingPackage({
                            ...editingPackage,
                            name: e.target.value,
                          })
                        : setNewPackage({ ...newPackage, name: e.target.value })
                    }
                    placeholder="Enter package name"
                  />
                </div>
                <div>
                  <Label htmlFor="packageDescription">Description *</Label>
                  <Textarea
                    id="packageDescription"
                    value={
                      editingPackage
                        ? editingPackage.description
                        : newPackage.description
                    }
                    onChange={(e) =>
                      editingPackage
                        ? setEditingPackage({
                            ...editingPackage,
                            description: e.target.value,
                          })
                        : setNewPackage({
                            ...newPackage,
                            description: e.target.value,
                          })
                    }
                    placeholder="Enter package description"
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Services Included *</Label>
                  <div className="space-y-2 mt-2">
                    {(editingPackage
                      ? editingPackage.services
                      : newPackage.services
                    ).map((service, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={service}
                          onChange={(e) =>
                            handleServiceChange(index, e.target.value)
                          }
                          placeholder="Enter service"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleRemoveServiceField(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddServiceField}
                      className="mt-2"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Service
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="packagePrice">Price ($) *</Label>
                    <Input
                      id="packagePrice"
                      type="number"
                      value={
                        editingPackage ? editingPackage.price : newPackage.price
                      }
                      onChange={(e) =>
                        editingPackage
                          ? setEditingPackage({
                              ...editingPackage,
                              price: e.target.value,
                            })
                          : setNewPackage({
                              ...newPackage,
                              price: e.target.value,
                            })
                      }
                      placeholder="Enter price"
                    />
                  </div>
                  <div>
                    <Label htmlFor="packageDuration">Duration *</Label>
                    <Input
                      id="packageDuration"
                      value={
                        editingPackage
                          ? editingPackage.duration
                          : newPackage.duration
                      }
                      onChange={(e) =>
                        editingPackage
                          ? setEditingPackage({
                              ...editingPackage,
                              duration: e.target.value,
                            })
                          : setNewPackage({
                              ...newPackage,
                              duration: e.target.value,
                            })
                      }
                      placeholder="e.g., 30 days, 3 months"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 pt-0">
              <Button
                variant="outline"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingPackage(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={
                  editingPackage ? handleUpdatePackage : handleAddPackage
                }
              >
                {editingPackage ? "Update Package" : "Create Package"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
