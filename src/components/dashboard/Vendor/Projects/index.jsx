"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Folder,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Loader2,
  UserPlus,
  DollarSign,
  Calendar,
  Users,
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
import SearchEmployees from "./SearchEmployees";

export default function VendorProjects() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectToAssign, setProjectToAssign] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    clientEmail: "",
    budget: "",
    deadline: "",
  });
  const [employeeToAssign, setEmployeeToAssign] = useState({
    email: "",
    role: "Team Member",
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

  // Fetch projects data
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if user is logged in
        if (!session?.user?.email) {
          setError("Please log in as a vendor to view projects");
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
          `/api/vendor/projects?vendorEmail=${session?.user?.email}&status=${filterStatus}`
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        
        const data = await response.json();
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to fetch projects. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to fetch projects",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchProjects();
    } else {
      setLoading(false);
      setError("Please log in as a vendor to view projects");
    }
  }, [session, filterStatus, toast]);

  const handleAddProject = async () => {
    if (
      !newProject.title ||
      !newProject.description ||
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
      const response = await fetch("/api/vendor/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vendorEmail: session?.user?.email,
          clientEmail: newProject.clientEmail,
          title: newProject.title,
          description: newProject.description,
          budget: parseFloat(newProject.budget),
          deadline: newProject.deadline || null,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setProjects([...projects, result.project]);
        setNewProject({ title: "", description: "", clientEmail: "", budget: "", deadline: "" });
        setIsModalOpen(false);

        toast({
          title: "Success",
          description: "Project added successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to add project",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding project:", error);
      toast({
        title: "Error",
        description: "Failed to add project",
        variant: "destructive",
      });
    }
  };

  const handleUpdateProject = async () => {
    if (
      !editingProject.title ||
      !editingProject.description ||
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
      const response = await fetch("/api/vendor/projects", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingProject.id,
          title: editingProject.title,
          description: editingProject.description,
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
      const response = await fetch(`/api/vendor/projects?id=${id}`, {
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

  const handleAssignEmployee = async () => {
    if (!employeeToAssign.email || !projectToAssign) {
      toast({
        title: "Error",
        description: "Please select an employee to assign",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/vendor/projects/assign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: projectToAssign.id,
          employeeEmail: employeeToAssign.email,
          role: employeeToAssign.role,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Update the project in the state to show the newly assigned employee
        setProjects(
          projects.map((project) => {
            if (project.id === projectToAssign.id) {
              return {
                ...project,
                assignedEmployees: [
                  ...(project.assignedEmployees || []),
                  {
                    email: employeeToAssign.email,
                    name: employeeToAssign.email,
                    role: employeeToAssign.role,
                    assignedAt: new Date().toISOString(),
                  },
                ],
              };
            }
            return project;
          })
        );

        setEmployeeToAssign({ email: "", role: "Team Member" });
        setProjectToAssign(null);
        setIsAssignModalOpen(false);

        toast({
          title: "Success",
          description: "Employee assigned to project successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to assign employee",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error assigning employee:", error);
      toast({
        title: "Error",
        description: "Failed to assign employee",
        variant: "destructive",
      });
    }
  };

  const handleRemoveEmployee = async (projectId, employeeEmail) => {
    try {
      const response = await fetch(
        `/api/vendor/projects/assign?projectId=${projectId}&employeeEmail=${employeeEmail}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (response.ok) {
        // Update the project in the state to remove the employee
        setProjects(
          projects.map((project) => {
            if (project.id === projectId) {
              return {
                ...project,
                assignedEmployees: (project.assignedEmployees || []).filter(
                  (emp) => emp.email !== employeeEmail
                ),
              };
            }
            return project;
          })
        );

        toast({
          title: "Success",
          description: "Employee removed from project successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to remove employee",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error removing employee:", error);
      toast({
        title: "Error",
        description: "Failed to remove employee",
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
      project.clientEmail.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
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
          <p className="text-gray-600 mt-2">
            Please make sure you are logged in as a vendor.
          </p>
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
              My Projects
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your ongoing and completed projects
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
            Add New Project
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
          <Folder className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No projects yet
          </h3>
          <p className="text-gray-500 mb-4">
            Get started by creating a new project.
          </p>
          <Button
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => {
              setEditingProject(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Project
          </Button>
        </div>

        {/* Add/Edit Project Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">
                  {editingProject ? "Edit Project" : "Add New Project"}
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
                          : setNewProject({
                              ...newProject,
                              title: e.target.value,
                            })
                      }
                      placeholder="Enter project title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientEmail">Client Email *</Label>
                    <Input
                      id="clientEmail"
                      value={
                        editingProject
                          ? editingProject.clientEmail
                          : newProject.clientEmail
                      }
                      onChange={(e) =>
                        editingProject
                          ? setEditingProject({
                              ...editingProject,
                              clientEmail: e.target.value,
                            })
                          : setNewProject({
                              ...newProject,
                              clientEmail: e.target.value,
                            })
                      }
                      placeholder="Enter client email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="budget">Budget ($) *</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={
                        editingProject
                          ? editingProject.budget
                          : newProject.budget
                      }
                      onChange={(e) =>
                        editingProject
                          ? setEditingProject({
                              ...editingProject,
                              budget: e.target.value,
                            })
                          : setNewProject({
                              ...newProject,
                              budget: e.target.value,
                            })
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
                        editingProject
                          ? editingProject.deadline?.split("T")[0]
                          : newProject.deadline
                      }
                      onChange={(e) =>
                        editingProject
                          ? setEditingProject({
                              ...editingProject,
                              deadline: e.target.value,
                            })
                          : setNewProject({
                              ...newProject,
                              deadline: e.target.value,
                            })
                      }
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
                  {editingProject ? "Update Project" : "Add Project"}
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
            My Projects
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your ongoing and completed projects
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
          Add New Project
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
              <p className="text-sm text-gray-500">{project.clientEmail}</p>
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
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>
                      {new Date(project.deadline).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Assigned Employees */}
              <div className="mb-4">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Users className="w-4 h-4 mr-1" />
                  <span>
                    Assigned Team ({project.assignedEmployees?.length || 0})
                  </span>
                </div>
                {project.assignedEmployees &&
                project.assignedEmployees.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {project.assignedEmployees
                      .slice(0, 3)
                      .map((employee, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-xs"
                        >
                          <span className="truncate max-w-[80px]">
                            {employee.name || employee.email}
                          </span>
                          <button
                            onClick={() =>
                              handleRemoveEmployee(project.id, employee.email)
                            }
                            className="ml-1 text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    {project.assignedEmployees.length > 3 && (
                      <div className="bg-gray-100 rounded-full px-3 py-1 text-xs">
                        +{project.assignedEmployees.length - 3} more
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No team assigned</p>
                )}
              </div>

              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setProjectToAssign(project);
                    setIsAssignModalOpen(true);
                  }}
                >
                  <UserPlus className="w-4 h-4 mr-1" />
                  Assign
                </Button>
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
                {editingProject ? "Edit Project" : "Add New Project"}
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
                        : setNewProject({
                            ...newProject,
                            title: e.target.value,
                          })
                    }
                    placeholder="Enter project title"
                  />
                </div>
                <div>
                  <Label htmlFor="clientEmail">Client Email *</Label>
                  <Input
                    id="clientEmail"
                    value={
                      editingProject
                        ? editingProject.clientEmail
                        : newProject.clientEmail
                    }
                    onChange={(e) =>
                      editingProject
                        ? setEditingProject({
                            ...editingProject,
                            clientEmail: e.target.value,
                          })
                        : setNewProject({
                            ...newProject,
                            clientEmail: e.target.value,
                          })
                    }
                    placeholder="Enter client email"
                  />
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
                        : setNewProject({
                            ...newProject,
                            budget: e.target.value,
                          })
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
                      editingProject
                        ? editingProject.deadline?.split("T")[0]
                        : newProject.deadline
                    }
                    onChange={(e) =>
                      editingProject
                        ? setEditingProject({
                            ...editingProject,
                            deadline: e.target.value,
                          })
                        : setNewProject({
                            ...newProject,
                            deadline: e.target.value,
                          })
                    }
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
                {editingProject ? "Update Project" : "Add Project"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Employee Modal */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                Assign Employee to Project
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="projectTitle">Project</Label>
                  <Input
                    id="projectTitle"
                    value={projectToAssign?.title || ""}
                    disabled
                  />
                </div>

                <SearchEmployees
                  onEmployeeSelect={(employee) => {
                    setEmployeeToAssign({
                      ...employeeToAssign,
                      email: employee.email,
                      name: employee.name,
                    });
                  }}
                />

                <div>
                  <Label htmlFor="employeeEmail">Selected Employee</Label>
                  <Input
                    id="employeeEmail"
                    value={employeeToAssign.email || ""}
                    onChange={(e) =>
                      setEmployeeToAssign({
                        ...employeeToAssign,
                        email: e.target.value,
                      })
                    }
                    placeholder="Employee email will appear here after selection"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={employeeToAssign.role}
                    onChange={(e) =>
                      setEmployeeToAssign({
                        ...employeeToAssign,
                        role: e.target.value,
                      })
                    }
                    placeholder="Enter role (e.g., Developer, Designer)"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 pt-0">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAssignModalOpen(false);
                  setProjectToAssign(null);
                  setEmployeeToAssign({ email: "", role: "Team Member" });
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAssignEmployee}
                disabled={!employeeToAssign.email}
              >
                Assign Employee
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}