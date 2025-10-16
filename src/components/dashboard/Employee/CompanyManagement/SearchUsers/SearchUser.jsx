"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, PlusCircle, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SearchUsers() {
  const router = useRouter();
  const { toast } = useToast();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [employeeData, setEmployeeData] = useState({
    name: "",
    department: "Not assigned",
    position: "Not assigned",
  });

  // Fetch users that can be added as employees
  const fetchUsers = async (search = "") => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/companyEmployeeUserManagement?search=${encodeURIComponent(
          search
        )}`
      );
      const data = await response.json();

      if (response.ok) {
        setUsers(data);
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to fetch users",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUserAsEmployee = (user) => {
    setSelectedUser(user);
    // Pre-fill employee data with user information
    setEmployeeData({
      name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      department: "Not assigned",
      position: "Not assigned",
    });
    setIsAddModalOpen(true);
  };

  const handleSaveEmployee = async () => {
    try {
      const response = await fetch("/api/companyEmployeeUserManagement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: selectedUser._id,
          name: employeeData.name,
          department: employeeData.department,
          position: employeeData.position,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Remove the added user from the users list
        setUsers(users.filter((u) => u._id !== selectedUser._id));
        setIsAddModalOpen(false);

        toast({
          title: "Employee Added",
          description: "User has been added as an employee successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to add user as employee",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding user as employee:", error);
      toast({
        title: "Error",
        description: "Failed to add user as employee",
        variant: "destructive",
      });
    }
  };

  const handleSearch = () => {
    fetchUsers(searchTerm);
  };

  const handleInputChange = (field, value) => {
    setEmployeeData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="mb-4 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Employee Management
          </Button>
          <h1 className="text-3xl font-bold">Search Users</h1>
          <p className="text-gray-600">
            Search for existing users to add them as company employees
          </p>
        </div>
      </div>

      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle>Search Users</CardTitle>
          <CardDescription>
            Find users by name or email to add them as company employees
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search users by name or email..."
                className="pl-10 pr-4 py-2 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </div>
            <Button onClick={handleSearch}>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                <p className="text-gray-600">Searching users...</p>
              </div>
            </div>
          ) : users.length > 0 ? (
            <div className="border rounded-md">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4">User</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Phone</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium">
                          {user.firstName} {user.lastName}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-blue-600">{user.email}</td>
                      <td className="py-3 px-4">
                        {user.phone || "Not provided"}
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          size="sm"
                          onClick={() => handleAddUserAsEmployee(user)}
                          className="flex items-center gap-1"
                        >
                          <PlusCircle className="w-4 h-4" />
                          Add as Employee
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? (
                <p>No users found matching your search.</p>
              ) : (
                <p>Search for users to add them as employees.</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Employee Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add as Employee</DialogTitle>
            <DialogDescription>
              Set employee details for {selectedUser?.firstName}{" "}
              {selectedUser?.lastName}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employee-name">Full Name</Label>
                <Input
                  id="employee-name"
                  value={employeeData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employee-department">Department</Label>
                <Select
                  value={employeeData.department}
                  onValueChange={(value) =>
                    handleInputChange("department", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Not assigned">Not assigned</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employee-position">Position</Label>
                <Input
                  id="employee-position"
                  value={employeeData.position}
                  onChange={(e) =>
                    handleInputChange("position", e.target.value)
                  }
                  placeholder="Enter position"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 md:col-span-2">
              <Button
                variant="outline"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveEmployee}>Add Employee</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
