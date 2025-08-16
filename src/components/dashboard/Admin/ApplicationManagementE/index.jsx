"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Eye,
  MessageSquare,
  Trash2,
  Download,
  Users,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ApplicationManagementE() {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, searchTerm, statusFilter]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/applicationManagement");
      const data = await response.json();
      if (data.success) {
        setApplications(data.data);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast({
        title: "Error",
        description: "Failed to fetch applications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterApplications = () => {
    let filtered = applications.filter(
      (app) =>
        app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.position.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    setFilteredApplications(filtered);
  };

  const updateStatus = async (id, newStatus, reason = null) => {
    try {
      const response = await fetch("/api/applicationManagement", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus, reason }),
      });

      const data = await response.json();
      if (data.success) {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === id ? { ...app, status: newStatus, reason } : app
          )
        );
        toast({
          title: "Success",
          description: "Application status updated successfully",
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to update status",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive",
      });
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedApplications(filteredApplications.map((app) => app._id));
    } else {
      setSelectedApplications([]);
    }
  };

  const handleSelectApplication = (appId, checked) => {
    if (checked) {
      setSelectedApplications([...selectedApplications, appId]);
    } else {
      setSelectedApplications(
        selectedApplications.filter((id) => id !== appId)
      );
    }
  };

  const handleBulkDelete = async () => {
    if (selectedApplications.length === 0) return;

    try {
      setDeleting(true);
      const response = await fetch("/api/applicationManagement", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedApplications }),
      });

      const data = await response.json();
      if (data.success) {
        setApplications((prev) =>
          prev.filter((app) => !selectedApplications.includes(app._id))
        );
        setSelectedApplications([]);
        toast({
          title: "Success",
          description: `${data.deletedCount} applications deleted successfully`,
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to delete applications",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting applications:", error);
      toast({
        title: "Error",
        description: "Failed to delete applications",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-500 hover:bg-green-600";
      case "Rejected":
        return "bg-red-500 hover:bg-red-600";
      case "Under Review":
        return "bg-yellow-500 hover:bg-yellow-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const statusStats = {
    total: applications.length,
    approved: applications.filter((app) => app.status === "Approved").length,
    rejected: applications.filter((app) => app.status === "Rejected").length,
    underReview: applications.filter((app) => app.status === "Under Review")
      .length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-2">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Application Management Dashboard
          </h1>
          <p className="text-gray-600">
            Review and manage job applications efficiently
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Applications
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {statusStats.total}
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-3xl font-bold text-green-600">
                    {statusStats.approved}
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Under Review
                  </p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {statusStats.underReview}
                  </p>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-3xl font-bold text-red-600">
                    {statusStats.rejected}
                  </p>
                </div>
                <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="bg-white shadow-sm border-0 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full lg:w-auto">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by name, email, or position..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {selectedApplications.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Selected ({selectedApplications.length})
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete{" "}
                        {selectedApplications.length} selected applications.
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleBulkDelete}
                        disabled={deleting}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        {deleting ? "Deleting..." : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="flex items-center justify-between">
              <span className="text-xl font-semibold text-gray-900">
                Applications ({filteredApplications.length})
              </span>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={
                    selectedApplications.length ===
                      filteredApplications.length &&
                    filteredApplications.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm text-gray-600">Select All</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Select
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Candidate
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Position
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Applied Date
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Status
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredApplications.map((app) => (
                    <tr
                      key={app._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4">
                        <Checkbox
                          checked={selectedApplications.includes(app._id)}
                          onCheckedChange={(checked) =>
                            handleSelectApplication(app._id, checked)
                          }
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={`https://api.dicebear.com/7.x/initials/svg?seed=${app.fullName}`}
                            />
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {app.fullName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-gray-900">
                              {app.fullName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {app.email}
                            </div>
                            <div className="text-sm text-gray-400">
                              {app.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-medium text-gray-900">
                          {app.position}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-gray-600">
                          {new Date(app.appliedAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="p-4">
                        <Select
                          value={app.status}
                          onValueChange={(value) =>
                            updateStatus(app._id, value)
                          }
                        >
                          <SelectTrigger className="w-36 border-0 p-0 h-auto">
                            <Badge
                              className={`${getStatusColor(
                                app.status
                              )} text-white border-0 cursor-pointer`}
                            >
                              {app.status}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Under Review">
                              Under Review
                            </SelectItem>
                            <SelectItem value="Approved">Approved</SelectItem>
                            <SelectItem value="Rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1 border-gray-200 hover:bg-gray-50 bg-transparent"
                              >
                                <Eye className="h-4 w-4" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle className="text-xl font-semibold">
                                  Application Details
                                </DialogTitle>
                                <DialogDescription>
                                  Complete application information for{" "}
                                  {app.fullName}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-2">
                                      Personal Information
                                    </h4>
                                    <div className="space-y-1 text-sm">
                                      <p>
                                        <span className="font-medium">
                                          Name:
                                        </span>{" "}
                                        {app.fullName}
                                      </p>
                                      <p>
                                        <span className="font-medium">
                                          Email:
                                        </span>{" "}
                                        {app.email}
                                      </p>
                                      <p>
                                        <span className="font-medium">
                                          Phone:
                                        </span>{" "}
                                        {app.phone}
                                      </p>
                                      <p>
                                        <span className="font-medium">
                                          Position:
                                        </span>{" "}
                                        {app.position}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-2">
                                      Application Status
                                    </h4>
                                    <Badge
                                      className={`${getStatusColor(
                                        app.status
                                      )} text-white`}
                                    >
                                      {app.status}
                                    </Badge>
                                    <p className="text-sm text-gray-500 mt-2">
                                      Applied:{" "}
                                      {new Date(
                                        app.appliedAt
                                      ).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2">
                                    Cover Letter
                                  </h4>
                                  <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                      {app.coverLetter}
                                    </p>
                                  </div>
                                </div>
                                {app.reason && (
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-2">
                                      Rejection Reason
                                    </h4>
                                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                                      <p className="text-sm text-red-700">
                                        {app.reason}
                                      </p>
                                    </div>
                                  </div>
                                )}
                                {app.resume && (
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-2">
                                      Resume
                                    </h4>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="border-gray-200 hover:bg-gray-50 bg-transparent"
                                    >
                                      <Download className="h-4 w-4 mr-2" />
                                      Download Resume
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 border-gray-200 hover:bg-gray-50 bg-transparent"
                          >
                            <MessageSquare className="h-4 w-4" />
                            Contact
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredApplications.length === 0 && (
                <div className="text-center py-16">
                  <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No applications found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
