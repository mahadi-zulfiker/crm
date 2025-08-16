"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import img from "../../../../../public/Job.jpg";

export default function CreateJobCategory() {
  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
    department: "",
    priorityLevel: "",
    isActive: false,
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.categoryName.trim()) {
      toast({
        title: "Error",
        description: "Category name is required.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Success",
          description: data.message,
        });
        setFormData({
          categoryName: "",
          description: "",
          department: "",
          priorityLevel: "",
          isActive: false,
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Something went wrong!",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create category.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Create Job Category
        </h1>
        <p className="text-gray-600 mt-1">
          Add a new job category to organize job postings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <Card className="lg:order-2">
          <CardContent className="p-0">
            <div className="relative h-96 w-full">
              <Image
                src={img}
                alt="Job Category"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Form Section */}
        <Card className="lg:order-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-teal-600" />
              Category Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="categoryName">Category Name *</Label>
                <Input
                  id="categoryName"
                  value={formData.categoryName}
                  onChange={(e) => handleChange("categoryName", e.target.value)}
                  placeholder="Enter category name"
                  className="focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Enter category description (optional)"
                  className="focus:ring-teal-500 focus:border-teal-500"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => handleChange("department", e.target.value)}
                  placeholder="Enter department"
                  className="focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priorityLevel">Priority Level</Label>
                <Select
                  value={formData.priorityLevel}
                  onValueChange={(value) =>
                    handleChange("priorityLevel", value)
                  }
                >
                  <SelectTrigger className="focus:ring-teal-500 focus:border-teal-500">
                    <SelectValue placeholder="Select priority level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="isActive">Active Status</Label>
                  <p className="text-sm text-gray-600">
                    Enable this category for job postings
                  </p>
                </div>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    handleChange("isActive", checked)
                  }
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Category
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
