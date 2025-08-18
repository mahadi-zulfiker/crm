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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/Separator";
import {
  Loader2,
  Plus,
  Building,
  Tag,
  AlertCircle,
  CheckCircle,
  Layers,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 ">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Create Job Category
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Organize your job postings by creating structured categories that
            help candidates find the right opportunities
          </p>
        </div>

        {/* Main Form Card */}
        <Card className="shadow-xl border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-teal-50 to-orange-50 border-b">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-teal-100 rounded-lg">
                <Plus className="w-6 h-6 text-teal-600" />
              </div>
              Category Information
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Fill in the details below to create a new job category
            </p>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-teal-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Basic Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="categoryName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Category Name *
                    </Label>
                    <Input
                      id="categoryName"
                      value={formData.categoryName}
                      onChange={(e) =>
                        handleChange("categoryName", e.target.value)
                      }
                      placeholder="e.g., Software Development, Marketing, Sales"
                      className="h-12 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="department"
                      className="text-sm font-medium text-gray-700"
                    >
                      Department
                    </Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) =>
                        handleChange("department", e.target.value)
                      }
                      placeholder="e.g., Engineering, Marketing, HR"
                      className="h-12 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 border-gray-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-sm font-medium text-gray-700"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    placeholder="Provide a detailed description of this job category..."
                    className="min-h-[120px] focus:ring-2 focus:ring-teal-500 focus:border-teal-500 border-gray-300 resize-none"
                    rows={4}
                  />
                </div>
              </div>

              <Separator />

              {/* Configuration Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Building className="w-5 h-5 text-teal-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Configuration
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="priorityLevel"
                      className="text-sm font-medium text-gray-700"
                    >
                      Priority Level
                    </Label>
                    <Select
                      value={formData.priorityLevel}
                      onValueChange={(value) =>
                        handleChange("priorityLevel", value)
                      }
                    >
                      <SelectTrigger className="h-12 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 border-gray-300">
                        <SelectValue placeholder="Select priority level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            High Priority
                          </div>
                        </SelectItem>
                        <SelectItem value="Medium">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            Medium Priority
                          </div>
                        </SelectItem>
                        <SelectItem value="Low">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Low Priority
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Status Preview
                    </Label>
                    <div className="h-12 flex items-center">
                      {formData.priorityLevel && (
                        <Badge
                          className={getPriorityColor(formData.priorityLevel)}
                        >
                          {formData.priorityLevel} Priority
                        </Badge>
                      )}
                      {!formData.priorityLevel && (
                        <span className="text-gray-400 text-sm">
                          Select priority to preview
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label
                        htmlFor="isActive"
                        className="text-sm font-medium text-gray-700"
                      >
                        Active Status
                      </Label>
                      <p className="text-sm text-gray-600">
                        Enable this category to make it available for job
                        postings
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-sm font-medium ${
                          formData.isActive ? "text-green-600" : "text-gray-500"
                        }`}
                      >
                        {formData.isActive ? "Active" : "Inactive"}
                      </span>
                      <Switch
                        id="isActive"
                        checked={formData.isActive}
                        onCheckedChange={(checked) =>
                          handleChange("isActive", checked)
                        }
                        className="data-[state=checked]:bg-teal-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Preview Section */}
              {(formData.categoryName || formData.description) && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Preview
                    </h3>
                  </div>

                  <Card className="bg-gradient-to-br from-teal-50 to-orange-50 border-teal-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-xl font-semibold text-gray-900">
                          {formData.categoryName || "Category Name"}
                        </h4>
                        <div className="flex gap-2">
                          {formData.priorityLevel && (
                            <Badge
                              className={getPriorityColor(
                                formData.priorityLevel
                              )}
                            >
                              {formData.priorityLevel}
                            </Badge>
                          )}
                          <Badge
                            className={
                              formData.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {formData.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                      {formData.department && (
                        <p className="text-sm text-gray-600 mb-2">
                          <Building className="w-4 h-4 inline mr-1" />
                          {formData.department}
                        </p>
                      )}
                      <p className="text-gray-700">
                        {formData.description ||
                          "Category description will appear here..."}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full h-14 bg-teal-600 hover:bg-teal-800 text-white font-semibold text-lg  hover:shadow-xl transition-all duration-200"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                      Creating Category...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 mr-3" />
                      Create Job Category
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">
                  Tips for Creating Categories
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>
                    • Use clear, descriptive names that candidates will easily
                    understand
                  </li>
                  <li>
                    • Set appropriate priority levels to help organize job
                    listings
                  </li>
                  <li>
                    • Include detailed descriptions to help HR teams categorize
                    jobs correctly
                  </li>
                  <li>
                    • Only activate categories when you're ready to use them for
                    job postings
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
