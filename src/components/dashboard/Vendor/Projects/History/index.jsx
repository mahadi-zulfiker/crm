"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
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

export default function VendorProjectHistory() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("all");
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    client: "",
    year: new Date().getFullYear().toString(),
  });

  // Add error state to help with debugging
  const [error, setError] = useState(null);

  // Generate years for filter
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) =>
    (currentYear - i).toString()
  );

  // Fetch project history data
  useEffect(() => {
    const fetchProjectHistory = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if user is logged in
        if (!session?.user?.email) {
          setError("Please log in as a vendor to view project history");
          setLoading(false);
          return;
        }

        // Check if user is a vendor
        if (session?.user?.userType !== "Vendor") {
          setError("Only vendors can access this page");
          setLoading(false);
          return;
        }

        // Fetch project history data from the API
        const response = await fetch(
          `/api/vendor/projects/history?vendorEmail=${session?.user?.email}&year=${filterYear}&search=${searchTerm}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch project history");
        }

        const data = await response.json();
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project history:", error);
        setError("Failed to fetch project history. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to fetch project history",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchProjectHistory();
    } else {
      setLoading(false);
      setError("Please log in as a vendor to view project history");
    }
  }, [session, filterYear, searchTerm]);

  const handleAddProject = async () => {
    if (
      !newProject.name ||
      !newProject.description ||
      !newProject.client ||
      !newProject.year
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      // Save to the API
      const response = await fetch("/api/vendor/projects/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vendorEmail: session?.user?.email,
          title: newProject.name,
          description: newProject.description,
          clientEmail: newProject.client,
          year: newProject.year,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add project to history");
      }

      const result = await response.json();

      setProjects([...projects, result.project]);
      setNewProject({
        name: "",
        description: "",
        client: "",
        year: new Date().getFullYear().toString(),
      });
      setIsModalOpen(false);

      toast({
        title: "Success",
        description: "Project added to history successfully",
      });
    } catch (error) {
      console.error("Error adding project:", error);
      toast({
        title: "Error",
        description: "Failed to add project to history",
        variant: "destructive",
      });
    }
  };

  const handleUpdateProject = async () => {
    if (
      !editingProject.name ||
      !editingProject.description ||
      !editingProject.client ||
      !editingProject.year
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      // Update via the API
      const response = await fetch("/api/vendor/projects/history", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingProject.id,
          vendorEmail: session?.user?.email,
          title: editingProject.name,
          description: editingProject.description,
          clientEmail: editingProject.client,
          year: editingProject.year,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      setProjects(
        projects.map((project) =>
          project.id === editingProject.id ? editingProject : project
        )
      );
      setEditingProject(null);

      toast({
        title: "Success",
        description: "Project updated successfully",
      });
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
      // Delete via the API
      const response = await fetch(
        `/api/vendor/projects/history?id=${id}&vendorEmail=${session?.user?.email}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove project from history");
      }

      setProjects(projects.filter((project) => project.id !== id));
      toast({
        title: "Success",
        description: "Project removed from history successfully",
      });
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error",
        description: "Failed to remove project from history",
        variant: "destructive",
      });
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = filterYear === "all" || project.year === filterYear;
    return matchesSearch && matchesYear;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="text-gray-600">Loading project history...</p>
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
              Project History
            </h1>
            <p className="text-gray-600 mt-1">
              View and manage your completed projects
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
            Add Project to History
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
                  placeholder="Search project history..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48">
                <Select value={filterYear} onValueChange={setFilterYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
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
          <Calendar className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No project history yet
          </h3>
          <p className="text-gray-500 mb-4">
            Add completed projects to your history.
          </p>
          <Button
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => {
              setEditingProject(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Project to History
          </Button>
        </div>

        {/* Add/Edit Project Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">
                  {editingProject ? "Edit Project" : "Add Project to History"}
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Project Name *</Label>
                    <Input
                      id="name"
                      value={
                        editingProject ? editingProject.name : newProject.name
                      }
                      onChange={(e) =>
                        editingProject
                          ? setEditingProject({
                              ...editingProject,
                              name: e.target.value,
                            })
                          : setNewProject({
                              ...newProject,
                              name: e.target.value,
                            })
                      }
                      placeholder="Enter project name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="client">Client *</Label>
                    <Input
                      id="client"
                      value={
                        editingProject
                          ? editingProject.client
                          : newProject.client
                      }
                      onChange={(e) =>
                        editingProject
                          ? setEditingProject({
                              ...editingProject,
                              client: e.target.value,
                            })
                          : setNewProject({
                              ...newProject,
                              client: e.target.value,
                            })
                      }
                      placeholder="Enter client name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="year">Year *</Label>
                    <Select
                      value={
                        editingProject ? editingProject.year : newProject.year
                      }
                      onValueChange={(value) =>
                        editingProject
                          ? setEditingProject({
                              ...editingProject,
                              year: value,
                            })
                          : setNewProject({ ...newProject, year: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
            Project History
          </h1>
          <p className="text-gray-600 mt-1">
            View and manage your completed projects
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
          Add Project to History
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
                placeholder="Search project history..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
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
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {project.year}
                </span>
              </div>
              <p className="text-sm text-gray-500">{project.client}</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  <p>Duration: {project.duration}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.technologies &&
                      project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                  </div>
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
                {editingProject ? "Edit Project" : "Add Project to History"}
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Project Name *</Label>
                  <Input
                    id="name"
                    value={
                      editingProject ? editingProject.name : newProject.name
                    }
                    onChange={(e) =>
                      editingProject
                        ? setEditingProject({
                            ...editingProject,
                            name: e.target.value,
                          })
                        : setNewProject({ ...newProject, name: e.target.value })
                    }
                    placeholder="Enter project name"
                  />
                </div>
                <div>
                  <Label htmlFor="client">Client *</Label>
                  <Input
                    id="client"
                    value={
                      editingProject ? editingProject.client : newProject.client
                    }
                    onChange={(e) =>
                      editingProject
                        ? setEditingProject({
                            ...editingProject,
                            client: e.target.value,
                          })
                        : setNewProject({
                            ...newProject,
                            client: e.target.value,
                          })
                    }
                    placeholder="Enter client name"
                  />
                </div>
                <div>
                  <Label htmlFor="year">Year *</Label>
                  <Select
                    value={
                      editingProject ? editingProject.year : newProject.year
                    }
                    onValueChange={(value) =>
                      editingProject
                        ? setEditingProject({
                            ...editingProject,
                            year: value,
                          })
                        : setNewProject({ ...newProject, year: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
