"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Briefcase,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Loader2,
  Users,
  DollarSign,
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

export default function AdminProjectManagement() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [projects, setProjects] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    vendorEmail: "",
    clientEmail: "",
    budget: "",
    deadline: "",
  });

  // Add error state to help with debugging
  const [error, setError] = useState(null);

  const statuses = [
    "Pending",
    "In Progress",
    "Completed",
    "On Hold",
    "Cancelled",
  ];

  // Fetch projects, vendors, and clients data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if user is logged in
        if (!session?.user?.email) {
          setError("Please log in as an admin to view projects");
          setLoading(false);
          return;
        }
        
        // Check if user is an admin
        if (session?.user?.userType !== "Admin") {
          setError("Only admins can access this page");
          setLoading(false);
          return;
        }
        
        // Fetch projects
        const projectsResponse = await fetch(`/api/admin/projectManagement?status=${filterStatus}`);
        if (!projectsResponse.ok) {
          throw new Error("Failed to fetch projects");
        }
        const projectsData = await projectsResponse.json();
        
        // Fetch vendors
        const vendorsResponse = await fetch("/api/users?type=Vendor");
        let vendorsData = [];
        if (vendorsResponse.ok) {
          vendorsData = await vendorsResponse.json();
        }
        
        // Fetch clients
        const clientsResponse = await fetch("/api/users?type=Client");
        let clientsData = [];
        if (clientsResponse.ok) {
          clientsData = await clientsResponse.json();
        }
        
        setProjects(projectsData);
        setVendors(vendorsData);
        setClients(clientsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to fetch data",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchData();
    } else {
      setLoading(false);
      setError("Please log in as an admin to view projects");
    }
  }, [session, filterStatus]);

  const handleAddProject = async () => {
    if (
      !newProject.title ||
      !newProject.description ||
      !newProject.vendorEmail ||
      !newProject.clientEmail ||
      !newProject.budget
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/admin/projectManagement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newProject.title,
          description: newProject.description,
          vendorEmail: newProject.vendorEmail,
          clientEmail: newProject.clientEmail,
          budget: parseFloat(newProject.budget),
          deadline: newProject.deadline || null,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setProjects([...projects, result.project]);
        setNewProject({ 
          title: "", 
          description: "", 
          vendorEmail: "", 
          clientEmail: "", 
          budget: "", 
          deadline: "" 
        });
        setIsModalOpen(false);

        toast({
          title: "Success",
          description: "Project created successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to create project",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding project:", error);
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    }
  };

  const handleUpdateProject = async () => {
    if (
      !editingProject.title ||
      !editingProject.description ||
      !editingProject.vendorEmail ||
      !editingProject.clientEmail ||
      !editingProject.budget
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/admin/projectManagement", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingProject.id,
          title: editingProject.title,
          description: editingProject.description,
          vendorEmail: editingProject.vendorEmail,
          clientEmail: editingProject.clientEmail,
          budget: parseFloat(editingProject.budget),
          deadline: editingProject.deadline || null,
          status: editingProject.status,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setProjects(
          projects.map((project) =>
            project.id === editingProject.id ? editingProject : project
          )
        );
        setEditingProject(null);
        setIsModalOpen(false);

        toast({
          title: "Success",
          description: "Project updated successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update project",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating project:", error);
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      const response = await fetch(`/api/admin/projectManagement?id=${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (response.ok) {
        setProjects(projects.filter((project) => project.id !== id));
        toast({
          title: "Success",
          description: "Project deleted successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete project",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "On Hold":
        return "bg-orange-100 text-orange-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.vendorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.clientEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="text-gray-600">Loading projects...</p>
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
          <p className="text-gray-600 mt-2">Please make sure you are logged in as an admin.</p>
        </div>
      </div>
    );
  }

  // Show message when no projects exist
  if (projects.length === 0 && !loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Project Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage projects between vendors and clients
            </p>
          </div>
          <Button
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => {
              setEditingProject(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Project
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
                  placeholder="Search projects..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
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
          <Briefcase className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No projects yet</h3>
          <p className="text-gray-500 mb-4">Get started by creating a new project.</p>
          <Button
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => {
              setEditingProject(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Project
          </Button>
        </div>
        
        {/* Add/Edit Project Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">
                  {editingProject ? "Edit Project" : "Create New Project"}
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Project Title *</Label>
                    <Input
                      id="title"
                      value={
                        editingProject ? editingProject.title : newProject.title
                      }
                      onChange={(e) =>
                        editingProject
                          ? setEditingProject({
                              ...editingProject,
                              title: e.target.value,
                            })
                          : setNewProject({ ...newProject, title: e.target.value })
                      }
                      placeholder="Enter project title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={
                        editingProject
                          ? editingProject.description
                          : newProject.description
                      }
                      onChange={(e) =>
                        editingProject
                          ? setEditingProject({
                              ...editingProject,
                              description: e.target.value,
                            })
                          : setNewProject({
                              ...newProject,
                              description: e.target.value,
                            })
                      }
                      placeholder="Enter project description"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="vendorEmail">Vendor *</Label>
                    <Select
                      value={
                        editingProject
                          ? editingProject.vendorEmail
                          : newProject.vendorEmail
                      }
                      onValueChange={(value) =>
                        editingProject
                          ? setEditingProject({
                              ...editingProject,
                              vendorEmail: value,
                            })
                          : setNewProject({ ...newProject, vendorEmail: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select vendor" />
                      </SelectTrigger>
                      <SelectContent>
                        {vendors.map((vendor) => (
                          <SelectItem key={vendor.email} value={vendor.email}>
                            {vendor.name || vendor.email}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="clientEmail">Client *</Label>
                    <Select
                      value={
                        editingProject
                          ? editingProject.clientEmail
                          : newProject.clientEmail
                      }
                      onValueChange={(value) =>
                        editingProject
                          ? setEditingProject({
                              ...editingProject,
                              clientEmail: value,
                            })
                          : setNewProject({ ...newProject, clientEmail: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.email} value={client.email}>
                            {client.name || client.email}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="budget">Budget ($) *</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={
                        editingProject ? editingProject.budget : newProject.budget
                      }
                      onChange={(e) =>
                        editingProject
                          ? setEditingProject({
                              ...editingProject,
                              budget: e.target.value,
                            })
                          : setNewProject({ ...newProject, budget: e.target.value })
                      }
                      placeholder="Enter project budget"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deadline">Deadline (Optional)</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={
                        editingProject ? editingProject.deadline : newProject.deadline
                      }
                      onChange={(e) =>
                        editingProject
                          ? setEditingProject({
                              ...editingProject,
                              deadline: e.target.value,
                            })
                          : setNewProject({ ...newProject, deadline: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 p-6 pt-0">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingProject(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={
                    editingProject ? handleUpdateProject : handleAddProject
                  }
                >
                  {editingProject ? "Update Project" : "Create Project"}
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
            Project Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage projects between vendors and clients
          </p>
        </div>
        <Button
          className="bg-teal-600 hover:bg-teal-700"
          onClick={() => {
            setEditingProject(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Project
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
                placeholder="Search projects..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="bg-white shadow-sm border-0">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    project.status
                  )}`}
                >
                  {project.status}
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                <p>Vendor: {project.vendorEmail}</p>
                <p>Client: {project.clientEmail}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span>${project.budget?.toLocaleString()}</span>
                </div>
                {project.deadline && (
                  <div className="text-sm text-gray-500">
                    Due: {new Date(project.deadline).toLocaleDateString()}
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  Created: {new Date(project.createdAt).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingProject(project);
                      setIsModalOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {editingProject ? "Edit Project" : "Create New Project"}
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    value={
                      editingProject ? editingProject.title : newProject.title
                    }
                    onChange={(e) =>
                      editingProject
                        ? setEditingProject({
                            ...editingProject,
                            title: e.target.value,
                          })
                        : setNewProject({ ...newProject, title: e.target.value })
                    }
                    placeholder="Enter project title"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={
                      editingProject
                        ? editingProject.description
                        : newProject.description
                    }
                    onChange={(e) =>
                      editingProject
                        ? setEditingProject({
                            ...editingProject,
                            description: e.target.value,
                          })
                        : setNewProject({
                            ...newProject,
                            description: e.target.value,
                          })
                    }
                    placeholder="Enter project description"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="vendorEmail">Vendor *</Label>
                  <Select
                    value={
                      editingProject
                        ? editingProject.vendorEmail
                        : newProject.vendorEmail
                    }
                    onValueChange={(value) =>
                      editingProject
                        ? setEditingProject({
                            ...editingProject,
                            vendorEmail: value,
                          })
                        : setNewProject({ ...newProject, vendorEmail: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      {vendors.map((vendor) => (
                        <SelectItem key={vendor.email} value={vendor.email}>
                          {vendor.name || vendor.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="clientEmail">Client *</Label>
                  <Select
                    value={
                      editingProject
                        ? editingProject.clientEmail
                        : newProject.clientEmail
                    }
                    onValueChange={(value) =>
                      editingProject
                        ? setEditingProject({
                            ...editingProject,
                            clientEmail: value,
                          })
                        : setNewProject({ ...newProject, clientEmail: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.email} value={client.email}>
                          {client.name || client.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="budget">Budget ($) *</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={
                      editingProject ? editingProject.budget : newProject.budget
                    }
                    onChange={(e) =>
                      editingProject
                        ? setEditingProject({
                            ...editingProject,
                            budget: e.target.value,
                          })
                        : setNewProject({ ...newProject, budget: e.target.value })
                    }
                    placeholder="Enter project budget"
                  />
                </div>
                <div>
                  <Label htmlFor="deadline">Deadline (Optional)</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={
                      editingProject ? editingProject.deadline : newProject.deadline
                    }
                    onChange={(e) =>
                      editingProject
                        ? setEditingProject({
                            ...editingProject,
                            deadline: e.target.value,
                          })
                        : setNewProject({ ...newProject, deadline: e.target.value })
                    }
                  />
                </div>
                {editingProject && (
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={editingProject.status}
                      onValueChange={(value) =>
                        setEditingProject({ ...editingProject, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 pt-0">
              <Button
                variant="outline"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingProject(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={
                  editingProject ? handleUpdateProject : handleAddProject
                }
              >
                {editingProject ? "Update Project" : "Create Project"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}