import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, Download, Filter, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function EmployeeManagement() {
  const { toast } = useToast();

  const handleAddEmployee = () => {
    toast({
      title: "Add Employee",
      description: "Opening employee registration form.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Employee data export has started.",
    });
  };

  // Mock data for employees
  const employeeData = [
    {
      id: 1,
      name: "John Smith",
      department: "Engineering",
      position: "Senior Developer",
      email: "john@company.com",
      status: "Active",
      joinDate: "2022-01-15",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      department: "Marketing",
      position: "Marketing Manager",
      email: "sarah@company.com",
      status: "Active",
      joinDate: "2021-03-22",
    },
    {
      id: 3,
      name: "Michael Brown",
      department: "Sales",
      position: "Sales Executive",
      email: "michael@company.com",
      status: "Active",
      joinDate: "2023-02-10",
    },
    {
      id: 4,
      name: "Emily Davis",
      department: "HR",
      position: "HR Specialist",
      email: "emily@company.com",
      status: "On Leave",
      joinDate: "2020-11-05",
    },
    {
      id: 5,
      name: "Robert Wilson",
      department: "Finance",
      position: "Financial Analyst",
      email: "robert@company.com",
      status: "Active",
      joinDate: "2022-07-18",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "On Leave":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
            <input
              type="text"
              placeholder="Search employees..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button onClick={handleExport} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button
            onClick={handleAddEmployee}
            className="flex items-center gap-2"
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
            <div className="text-2xl font-bold">142</div>
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
            <div className="text-2xl font-bold">138</div>
            <p className="text-xs text-gray-500">Currently working</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Leave</CardTitle>
            <Users className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
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
            <div className="text-2xl font-bold">5</div>
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
                {employeeData.map((employee) => (
                  <tr key={employee.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{employee.name}</td>
                    <td className="py-3 px-4">{employee.department}</td>
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
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          View
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
    </div>
  );
}
