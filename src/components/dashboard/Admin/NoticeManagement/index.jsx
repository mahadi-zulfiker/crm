"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  PlusCircle,
  Edit,
  Trash2,
  AlertCircle,
  Info,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function NoticeManagement() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    priority: "normal",
    audience: "all",
  });
  const { toast } = useToast();

  // Fetch all notices
  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/notices");
      const data = await response.json();

      if (data.success) {
        setNotices(data.data);
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to fetch notices",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch notices: " + error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Validation Error",
        description: "Title and content are required",
        variant: "destructive",
      });
      return;
    }

    try {
      const method = editingNotice ? "PUT" : "POST";
      const url = "/api/notices";
      const body = editingNotice
        ? { ...formData, id: editingNotice._id }
        : { ...formData, createdBy: "Admin" };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: editingNotice
            ? "Notice updated successfully"
            : "Notice created successfully",
        });

        // Reset form
        setFormData({
          title: "",
          content: "",
          priority: "normal",
          audience: "all",
        });
        setIsCreating(false);
        setEditingNotice(null);
        fetchNotices(); // Refresh notices
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to save notice",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save notice: " + error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title,
      content: notice.content,
      priority: notice.priority,
      audience: notice.audience,
    });
    setIsCreating(true);
    // Scroll to form
    setTimeout(() => {
      document
        .getElementById("notice-form")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this notice? This action cannot be undone."
      )
    )
      return;

    try {
      const response = await fetch("/api/notices", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: "Notice deleted successfully",
        });
        fetchNotices(); // Refresh notices
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to delete notice",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete notice: " + error.message,
        variant: "destructive",
      });
    }
  };

  const cancelEdit = () => {
    setIsCreating(false);
    setEditingNotice(null);
    setFormData({
      title: "",
      content: "",
      priority: "normal",
      audience: "all",
    });
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="w-4 h-4" />;
      case "medium":
        return <Info className="w-4 h-4" />;
      case "low":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Notice Management</h1>
        <Button
          onClick={() => setIsCreating(!isCreating)}
          className="flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          {isCreating ? "Cancel" : "Create Notice"}
        </Button>
      </div>

      {isCreating && (
        <Card id="notice-form">
          <CardHeader>
            <CardTitle>
              {editingNotice ? "Edit Notice" : "Create New Notice"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter notice title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Enter notice content"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) =>
                      handleSelectChange("priority", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="audience">Audience</Label>
                  <Select
                    value={formData.audience}
                    onValueChange={(value) =>
                      handleSelectChange("audience", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="client">Clients Only</SelectItem>
                      <SelectItem value="employee">Employees Only</SelectItem>
                      <SelectItem value="vendor">Vendors Only</SelectItem>
                      <SelectItem value="admin">Admins Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={cancelEdit}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingNotice ? "Update Notice" : "Create Notice"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Notices ({notices.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {notices.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No notices found. Create your first notice!
            </div>
          ) : (
            <div className="space-y-4">
              {notices.map((notice) => (
                <div
                  key={notice._id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="text-lg font-semibold">
                          {notice.title}
                        </h3>
                        <Badge
                          className={`${getPriorityColor(
                            notice.priority
                          )} flex items-center gap-1`}
                        >
                          {getPriorityIcon(notice.priority)}
                          {notice.priority.charAt(0).toUpperCase() +
                            notice.priority.slice(1)}
                        </Badge>
                        <Badge variant="secondary">
                          {notice.audience === "all"
                            ? "All Users"
                            : notice.audience.charAt(0).toUpperCase() +
                              notice.audience.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{notice.content}</p>
                      <div className="text-sm text-gray-500 flex flex-wrap items-center justify-between gap-2">
                        <span>Created by {notice.createdBy}</span>
                        <span>
                          {new Date(notice.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(notice)}
                        title="Edit notice"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(notice._id)}
                        title="Delete notice"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
