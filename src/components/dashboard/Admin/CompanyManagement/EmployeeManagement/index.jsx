import React, { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  UserPlus,
  Download,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function EmployeeManagement() {
  const { toast } = useToast();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "Not assigned",
    position: "Not assigned",
    salary: "",
    manager: "Not assigned",
    joinDate: new Date().toISOString().split("T")[0],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Fetch employees from the database
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("/api/employeeManagement");
        const data = await response.json();

        if (response.ok) {
          // Transform the data to match the existing structure
          const transformedEmployees = data.map((employee) => ({
            id: employee._id,
            name: employee.name || `${employee.firstName} ${employee.lastName}`,
            department: employee.department || "Not assigned",
            position: employee.position || "Not assigned",
            email: employee.email,
            phone: employee.phone || "Not provided",
            status: employee.status || "Active",
            joinDate:
              employee.joinDate || new Date().toISOString().split("T")[0],
            salary: employee.salary
              ? `$${employee.salary.toLocaleString()}`
              : "Not provided",
            manager: employee.manager || "Not assigned",
          }));
          setEmployees(transformedEmployees);
        } else {
          toast({
            title: "Error",
            description: data.error || "Failed to fetch employees",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        toast({
          title: "Error",
          description: "Failed to fetch employees",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleAddEmployee = () => {
    // Reset the new employee form
    setNewEmployee({
      name: "",
      email: "",
      phone: "",
      department: "Not assigned",
      position: "Not assigned",
      salary: "",
      manager: "Not assigned",
      joinDate: new Date().toISOString().split("T")[0],
    });
    setIsAddModalOpen(true);
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Employee data export has started.",
    });
  };

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsViewModalOpen(true);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee({ ...employee });
    setIsEditModalOpen(true);
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      const response = await fetch(`/api/employeeManagement?id=${employeeId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        setEmployees(employees.filter((emp) => emp.id !== employeeId));
        toast({
          title: "Employee Deleted",
          description: "Employee record has been removed.",
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to delete employee",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast({
        title: "Error",
        description: "Failed to delete employee",
        variant: "destructive",
      });
    }
  };

  const handleSaveEmployee = async () => {
    try {
      const response = await fetch("/api/employeeManagement", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingEmployee.id,
          role: editingEmployee.position,
          performance: "Good", // Placeholder for now
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmployees(
          employees.map((emp) =>
            emp.id === editingEmployee.id ? editingEmployee : emp
          )
        );
        setIsEditModalOpen(false);
        toast({
          title: "Employee Updated",
          description: "Employee record has been updated successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to update employee",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      toast({
        title: "Error",
        description: "Failed to update employee",
        variant: "destructive",
      });
    }
  };

  const handleAddNewEmployee = async () => {
    try {
      // Validate required fields
      if (!newEmployee.name || !newEmployee.email) {
        toast({
          title: "Validation Error",
          description: "Name and email are required fields.",
          variant: "destructive",
        });
        return;
      }

      // Format salary as number if provided
      const salaryValue = newEmployee.salary
        ? parseFloat(newEmployee.salary.toString().replace(/[^0-9.-]+/g, ""))
        : 0;

      const employeeData = {
        ...newEmployee,
        salary: salaryValue,
      };

      const response = await fetch("/api/employeeManagement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      const data = await response.json();

      if (response.ok) {
        // Transform the new employee to match the existing structure
        const transformedEmployee = {
          id: data._id,
          name: data.name,
          department: data.department || "Not assigned",
          position: data.position || "Not assigned",
          email: data.email,
          phone: data.phone || "Not provided",
          status: data.status || "Active",
          joinDate: data.joinDate || new Date().toISOString().split("T")[0],
          salary: data.salary
            ? `$${data.salary.toLocaleString()}`
            : "Not provided",
          manager: data.manager || "Not assigned",
        };

        setEmployees([...employees, transformedEmployee]);
        setIsAddModalOpen(false);
        toast({
          title: "Employee Added",
          description: "New employee has been added successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to add employee",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      toast({
        title: "Error",
        description: "Failed to add employee",
        variant: "destructive",
      });
    }
  };

  const handleEditInputChange = (field, value) => {
    setEditingEmployee((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddInputChange = (field, value) => {
    setNewEmployee((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "On Leave":
        return "bg-yellow-100 text-yellow-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDepartmentColor = (department) => {
    const colors = {
      Engineering: "bg-blue-100 text-blue-800",
      Marketing: "bg-purple-100 text-purple-800",
      Sales: "bg-green-100 text-green-800",
      HR: "bg-yellow-100 text-yellow-800",
      Finance: "bg-red-100 text-red-800",
    };
    return colors[department] || "bg-gray-100 text-gray-800";
  };

  // Filter employees based on search and filters
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      filterDepartment && filterDepartment !== "all"
        ? employee.department === filterDepartment
        : true;
    const matchesStatus =
      filterStatus && filterStatus !== "all"
        ? employee.status === filterStatus
        : true;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Get unique departments for filter
  const departments = [...new Set(employees.map((emp) => emp.department))];

  // Calculate statistics
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(
    (emp) => emp.status === "Active"
  ).length;
  const onLeaveEmployees = employees.filter(
    (emp) => emp.status === "On Leave"
  ).length;
  const newThisMonth = employees.filter((emp) => {
    const joinDate = new Date(emp.joinDate);
    const now = new Date();
    return (
      joinDate.getMonth() === now.getMonth() &&
      joinDate.getFullYear() === now.getFullYear()
    );
  }).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <p className="text-gray-600">Loading employees...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Employee Management</h1>
          <p className="text-gray-600">
            Manage employee records and information
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search employees..."
              className="pl-10 pr-4 py-2 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterDepartment} onValueChange={setFilterDepartment}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="On Leave">On Leave</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExport} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button
            onClick={handleAddEmployee}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <UserPlus className="w-4 h-4" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Employees
            </CardTitle>
            <Users className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-gray-500">Across all departments</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Employees
            </CardTitle>
            <Users className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeEmployees}</div>
            <p className="text-xs text-gray-500">Currently working</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Leave</CardTitle>
            <Users className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{onLeaveEmployees}</div>
            <p className="text-xs text-gray-500">Currently on leave</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              New This Month
            </CardTitle>
            <UserPlus className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newThisMonth}</div>
            <p className="text-xs text-gray-500">Joined this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Employee Table */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
          <CardDescription>
            View and manage all employee records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Employee</th>
                  <th className="text-left py-3 px-4">Department</th>
                  <th className="text-left py-3 px-4">Position</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Join Date</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-sm text-gray-500">
                        {employee.phone}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDepartmentColor(
                          employee.department
                        )}`}
                      >
                        {employee.department}
                      </span>
                    </td>
                    <td className="py-3 px-4">{employee.position}</td>
                    <td className="py-3 px-4 text-blue-600">
                      {employee.email}
                    </td>
                    <td className="py-3 px-4">{employee.joinDate}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          employee.status
                        )}`}
                      >
                        {employee.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewEmployee(employee)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditEmployee(employee)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteEmployee(employee.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Employee Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
            <DialogDescription>
              Enter the details for the new employee
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="add-name">Full Name *</Label>
                <Input
                  id="add-name"
                  value={newEmployee.name}
                  onChange={(e) => handleAddInputChange("name", e.target.value)}
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-email">Email Address *</Label>
                <Input
                  id="add-email"
                  type="email"
                  value={newEmployee.email}
                  onChange={(e) =>
                    handleAddInputChange("email", e.target.value)
                  }
                  placeholder="Enter email address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-phone">Phone Number</Label>
                <Input
                  id="add-phone"
                  value={newEmployee.phone}
                  onChange={(e) =>
                    handleAddInputChange("phone", e.target.value)
                  }
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-manager">Manager</Label>
                <Input
                  id="add-manager"
                  value={newEmployee.manager}
                  onChange={(e) =>
                    handleAddInputChange("manager", e.target.value)
                  }
                  placeholder="Enter manager name"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="add-department">Department</Label>
                <Select
                  value={newEmployee.department}
                  onValueChange={(value) =>
                    handleAddInputChange("department", value)
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
              <div className="space-y-2">
                <Label htmlFor="add-position">Position</Label>
                <Input
                  id="add-position"
                  value={newEmployee.position}
                  onChange={(e) =>
                    handleAddInputChange("position", e.target.value)
                  }
                  placeholder="Enter position"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-salary">Salary</Label>
                <Input
                  id="add-salary"
                  value={newEmployee.salary}
                  onChange={(e) =>
                    handleAddInputChange("salary", e.target.value)
                  }
                  placeholder="Enter salary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-joinDate">Join Date</Label>
                <Input
                  id="add-joinDate"
                  type="date"
                  value={newEmployee.joinDate}
                  onChange={(e) =>
                    handleAddInputChange("joinDate", e.target.value)
                  }
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
              <Button onClick={handleAddNewEmployee}>Add Employee</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Employee Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
            <DialogDescription>
              Detailed information about the employee
            </DialogDescription>
          </DialogHeader>
          {selectedEmployee && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Full Name
                  </Label>
                  <p className="font-medium">{selectedEmployee.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Email Address
                  </Label>
                  <p className="font-medium">{selectedEmployee.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Phone Number
                  </Label>
                  <p className="font-medium">{selectedEmployee.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Manager
                  </Label>
                  <p className="font-medium">{selectedEmployee.manager}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Department
                  </Label>
                  <p className="font-medium">{selectedEmployee.department}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Position
                  </Label>
                  <p className="font-medium">{selectedEmployee.position}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Salary
                  </Label>
                  <p className="font-medium">{selectedEmployee.salary}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Join Date
                  </Label>
                  <p className="font-medium">{selectedEmployee.joinDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Status
                  </Label>
                  <p>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        selectedEmployee.status
                      )}`}
                    >
                      {selectedEmployee.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Employee Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>Update employee information</DialogDescription>
          </DialogHeader>
          {editingEmployee && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    value={editingEmployee.name}
                    onChange={(e) =>
                      handleEditInputChange("name", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email Address</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingEmployee.email}
                    onChange={(e) =>
                      handleEditInputChange("email", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone Number</Label>
                  <Input
                    id="edit-phone"
                    value={editingEmployee.phone}
                    onChange={(e) =>
                      handleEditInputChange("phone", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-manager">Manager</Label>
                  <Input
                    id="edit-manager"
                    value={editingEmployee.manager}
                    onChange={(e) =>
                      handleEditInputChange("manager", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-department">Department</Label>
                  <Select
                    value={editingEmployee.department}
                    onValueChange={(value) =>
                      handleEditInputChange("department", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                      <SelectItem value="Not assigned">Not assigned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-position">Position</Label>
                  <Input
                    id="edit-position"
                    value={editingEmployee.position}
                    onChange={(e) =>
                      handleEditInputChange("position", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-salary">Salary</Label>
                  <Input
                    id="edit-salary"
                    value={editingEmployee.salary}
                    onChange={(e) =>
                      handleEditInputChange("salary", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={editingEmployee.status}
                    onValueChange={(value) =>
                      handleEditInputChange("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="On Leave">On Leave</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2 md:col-span-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveEmployee}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
