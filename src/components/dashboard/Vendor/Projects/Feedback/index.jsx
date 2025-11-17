"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Loader2,
  Star,
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

export default function VendorProjectFeedback() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("all");
  const [newFeedback, setNewFeedback] = useState({
    project: "",
    client: "",
    rating: 5,
    comment: "",
  });

  // Add error state to help with debugging
  const [error, setError] = useState(null);

  const ratings = [1, 2, 3, 4, 5];

  // Fetch feedback data
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if user is logged in
        if (!session?.user?.email) {
          setError("Please log in as a vendor to view feedback");
          setLoading(false);
          return;
        }

        // Check if user is a vendor
        if (session?.user?.userType !== "Vendor") {
          setError("Only vendors can access this page");
          setLoading(false);
          return;
        }

        // For now, we'll use mock data since there's no API endpoint
        // In a real implementation, you would fetch from an API
        const mockFeedbacks = [
          {
            id: "1",
            project: "Website Redesign for TechCorp",
            client: "TechCorp Inc.",
            rating: 5,
            comment:
              "Excellent work! The team delivered beyond our expectations. The new website has significantly improved our user engagement.",
            date: "2024-03-15",
          },
          {
            id: "2",
            project: "Mobile App Development",
            client: "StartupXYZ",
            rating: 4,
            comment:
              "Great collaboration and timely delivery. The app is performing well in the market. Minor improvements could be made to the UI.",
            date: "2024-02-20",
          },
          {
            id: "3",
            project: "E-commerce Platform",
            client: "Retail Solutions Ltd.",
            rating: 5,
            comment:
              "Outstanding work! The platform has streamlined our operations and increased sales by 30%. Highly recommend their services.",
            date: "2024-01-10",
          },
          {
            id: "4",
            project: "Corporate Branding",
            client: "Global Enterprises",
            rating: 4,
            comment:
              "Professional and creative approach. The branding materials have enhanced our corporate image. Looking forward to future collaborations.",
            date: "2023-12-05",
          },
        ];

        setFeedbacks(mockFeedbacks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setError("Failed to fetch feedback. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to fetch feedback",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchFeedback();
    } else {
      setLoading(false);
      setError("Please log in as a vendor to view feedback");
    }
  }, [session]);

  const handleAddFeedback = async () => {
    if (!newFeedback.project || !newFeedback.client || !newFeedback.comment) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      // In a real implementation, you would save to an API
      const feedbackToSave = {
        ...newFeedback,
        id: Date.now().toString(),
        date: new Date().toISOString().split("T")[0],
      };

      setFeedbacks([...feedbacks, feedbackToSave]);
      setNewFeedback({ project: "", client: "", rating: 5, comment: "" });
      setIsModalOpen(false);

      toast({
        title: "Success",
        description: "Feedback added successfully",
      });
    } catch (error) {
      console.error("Error adding feedback:", error);
      toast({
        title: "Error",
        description: "Failed to add feedback",
        variant: "destructive",
      });
    }
  };

  const handleUpdateFeedback = async () => {
    if (
      !editingFeedback.project ||
      !editingFeedback.client ||
      !editingFeedback.comment
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      // In a real implementation, you would update via an API
      setFeedbacks(
        feedbacks.map((feedback) =>
          feedback.id === editingFeedback.id ? editingFeedback : feedback
        )
      );
      setEditingFeedback(null);

      toast({
        title: "Success",
        description: "Feedback updated successfully",
      });
    } catch (error) {
      console.error("Error updating feedback:", error);
      toast({
        title: "Error",
        description: "Failed to update feedback",
        variant: "destructive",
      });
    }
  };

  const handleDeleteFeedback = async (id) => {
    try {
      // In a real implementation, you would delete via an API
      setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id));
      toast({
        title: "Success",
        description: "Feedback deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting feedback:", error);
      toast({
        title: "Error",
        description: "Failed to delete feedback",
        variant: "destructive",
      });
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const matchesSearch =
      feedback.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating =
      filterRating === "all" || feedback.rating.toString() === filterRating;
    return matchesSearch && matchesRating;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="text-gray-600">Loading feedback...</p>
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

  // Show message when no feedback exists
  if (feedbacks.length === 0 && !loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Client Feedback
            </h1>
            <p className="text-gray-600 mt-1">
              View and manage feedback from your clients
            </p>
          </div>
          <Button
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => {
              setEditingFeedback(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Feedback
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
                  placeholder="Search feedback..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48">
                <Select value={filterRating} onValueChange={setFilterRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    {ratings.map((rating) => (
                      <SelectItem key={rating} value={rating.toString()}>
                        {rating} Star{rating !== 1 ? "s" : ""}
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
          <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No feedback yet
          </h3>
          <p className="text-gray-500 mb-4">
            Add client feedback to showcase your work.
          </p>
          <Button
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => {
              setEditingFeedback(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Client Feedback
          </Button>
        </div>

        {/* Add/Edit Feedback Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">
                  {editingFeedback ? "Edit Feedback" : "Add Client Feedback"}
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="project">Project *</Label>
                    <Input
                      id="project"
                      value={
                        editingFeedback
                          ? editingFeedback.project
                          : newFeedback.project
                      }
                      onChange={(e) =>
                        editingFeedback
                          ? setEditingFeedback({
                              ...editingFeedback,
                              project: e.target.value,
                            })
                          : setNewFeedback({
                              ...newFeedback,
                              project: e.target.value,
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
                        editingFeedback
                          ? editingFeedback.client
                          : newFeedback.client
                      }
                      onChange={(e) =>
                        editingFeedback
                          ? setEditingFeedback({
                              ...editingFeedback,
                              client: e.target.value,
                            })
                          : setNewFeedback({
                              ...newFeedback,
                              client: e.target.value,
                            })
                      }
                      placeholder="Enter client name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rating">Rating *</Label>
                    <div className="flex items-center gap-2">
                      {ratings.map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          className={`p-1 rounded ${
                            newFeedback.rating === rating ||
                            (editingFeedback &&
                              editingFeedback.rating === rating)
                              ? "bg-yellow-100"
                              : ""
                          }`}
                          onClick={() =>
                            editingFeedback
                              ? setEditingFeedback({
                                  ...editingFeedback,
                                  rating: rating,
                                })
                              : setNewFeedback({
                                  ...newFeedback,
                                  rating: rating,
                                })
                          }
                        >
                          <Star
                            className={`w-6 h-6 ${
                              rating <=
                              (editingFeedback
                                ? editingFeedback.rating
                                : newFeedback.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {editingFeedback
                          ? editingFeedback.rating
                          : newFeedback.rating}{" "}
                        Star
                        {editingFeedback
                          ? editingFeedback.rating !== 1
                            ? "s"
                            : ""
                          : newFeedback.rating !== 1
                          ? "s"
                          : ""}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="comment">Comment *</Label>
                    <Textarea
                      id="comment"
                      value={
                        editingFeedback
                          ? editingFeedback.comment
                          : newFeedback.comment
                      }
                      onChange={(e) =>
                        editingFeedback
                          ? setEditingFeedback({
                              ...editingFeedback,
                              comment: e.target.value,
                            })
                          : setNewFeedback({
                              ...newFeedback,
                              comment: e.target.value,
                            })
                      }
                      placeholder="Enter client feedback"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 p-6 pt-0">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingFeedback(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={
                    editingFeedback ? handleUpdateFeedback : handleAddFeedback
                  }
                >
                  {editingFeedback ? "Update Feedback" : "Add Feedback"}
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
            Client Feedback
          </h1>
          <p className="text-gray-600 mt-1">
            View and manage feedback from your clients
          </p>
        </div>
        <Button
          className="bg-teal-600 hover:bg-teal-700"
          onClick={() => {
            setEditingFeedback(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Feedback
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
                placeholder="Search feedback..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={filterRating} onValueChange={setFilterRating}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  {ratings.map((rating) => (
                    <SelectItem key={rating} value={rating.toString()}>
                      {rating} Star{rating !== 1 ? "s" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFeedbacks.map((feedback) => (
          <Card key={feedback.id} className="bg-white shadow-sm border-0">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{feedback.project}</CardTitle>
                {renderStars(feedback.rating)}
              </div>
              <p className="text-sm text-gray-500">{feedback.client}</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                "{feedback.comment}"
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">{feedback.date}</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingFeedback(feedback);
                      setIsModalOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteFeedback(feedback.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Feedback Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {editingFeedback ? "Edit Feedback" : "Add Client Feedback"}
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="project">Project *</Label>
                  <Input
                    id="project"
                    value={
                      editingFeedback
                        ? editingFeedback.project
                        : newFeedback.project
                    }
                    onChange={(e) =>
                      editingFeedback
                        ? setEditingFeedback({
                            ...editingFeedback,
                            project: e.target.value,
                          })
                        : setNewFeedback({
                            ...newFeedback,
                            project: e.target.value,
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
                      editingFeedback
                        ? editingFeedback.client
                        : newFeedback.client
                    }
                    onChange={(e) =>
                      editingFeedback
                        ? setEditingFeedback({
                            ...editingFeedback,
                            client: e.target.value,
                          })
                        : setNewFeedback({
                            ...newFeedback,
                            client: e.target.value,
                          })
                    }
                    placeholder="Enter client name"
                  />
                </div>
                <div>
                  <Label htmlFor="rating">Rating *</Label>
                  <div className="flex items-center gap-2">
                    {ratings.map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        className={`p-1 rounded ${
                          newFeedback.rating === rating ||
                          (editingFeedback && editingFeedback.rating === rating)
                            ? "bg-yellow-100"
                            : ""
                        }`}
                        onClick={() =>
                          editingFeedback
                            ? setEditingFeedback({
                                ...editingFeedback,
                                rating: rating,
                              })
                            : setNewFeedback({ ...newFeedback, rating: rating })
                        }
                      >
                        <Star
                          className={`w-6 h-6 ${
                            rating <=
                            (editingFeedback
                              ? editingFeedback.rating
                              : newFeedback.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {editingFeedback
                        ? editingFeedback.rating
                        : newFeedback.rating}{" "}
                      Star
                      {editingFeedback
                        ? editingFeedback.rating !== 1
                          ? "s"
                          : ""
                        : newFeedback.rating !== 1
                        ? "s"
                        : ""}
                    </span>
                  </div>
                </div>
                <div>
                  <Label htmlFor="comment">Comment *</Label>
                  <Textarea
                    id="comment"
                    value={
                      editingFeedback
                        ? editingFeedback.comment
                        : newFeedback.comment
                    }
                    onChange={(e) =>
                      editingFeedback
                        ? setEditingFeedback({
                            ...editingFeedback,
                            comment: e.target.value,
                          })
                        : setNewFeedback({
                            ...newFeedback,
                            comment: e.target.value,
                          })
                    }
                    placeholder="Enter client feedback"
                    rows={4}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 pt-0">
              <Button
                variant="outline"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingFeedback(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={
                  editingFeedback ? handleUpdateFeedback : handleAddFeedback
                }
              >
                {editingFeedback ? "Update Feedback" : "Add Feedback"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
