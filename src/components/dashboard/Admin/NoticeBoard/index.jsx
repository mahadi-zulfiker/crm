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
  AlertCircle,
  Info,
  CheckCircle,
  Bell,
  Edit,
  Trash2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminNoticeBoard() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    priority: "normal",
    audience: "all",
  });
  const { toast } = useToast();

  // Fetch notices
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
        setShowCreateForm(false);
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
    setShowCreateForm(true);
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
    setShowCreateForm(false);
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6 text-teal-600" />
          <h1 className="text-2xl font-bold text-gray-800">Notice Board</h1>
        </div>
        <Button
          onClick={() => {
            setEditingNotice(null);
            setFormData({
              title: "",
              content: "",
              priority: "normal",
              audience: "all",
            });
            setShowCreateForm(!showCreateForm);
          }}
          className="flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          {showCreateForm && !editingNotice ? "Cancel" : "Create Notice"}
        </Button>
      </div>

      {showCreateForm && (
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
                  rows={3}
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

      <div className="space-y-4">
        {notices.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No notices available
              </h3>
              <p className="text-gray-500">
                Create your first notice using the button above.
              </p>
            </CardContent>
          </Card>
        ) : (
          notices.map((notice) => (
            <Card
              key={notice._id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <CardTitle className="text-lg">{notice.title}</CardTitle>
                  <div className="flex flex-wrap gap-2">
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
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{notice.content}</p>
                <div className="text-sm text-gray-500 flex flex-wrap items-center justify-between gap-2">
                  <span>Posted by {notice.createdBy}</span>
                  <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(notice)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(notice._id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
