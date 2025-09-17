import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, UserCheck, UserX, UserMinus, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AttendanceManagement() {
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Export Started",
      description:
        "Attendance data export has started. You'll receive a notification when it's ready.",
    });
  };

  const attendanceData = [
    {
      id: 1,
      name: "John Smith",
      department: "Engineering",
      status: "present",
      date: "2023-06-15",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      department: "Marketing",
      status: "absent",
      date: "2023-06-15",
    },
    {
      id: 3,
      name: "Michael Brown",
      department: "Sales",
      status: "leave",
      date: "2023-06-15",
    },
    {
      id: 4,
      name: "Emily Davis",
      department: "HR",
      status: "present",
      date: "2023-06-15",
    },
    {
      id: 5,
      name: "Robert Wilson",
      department: "Finance",
      status: "present",
      date: "2023-06-15",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "leave":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Attendance Management</h1>
          <p className="text-gray-600">
            Track and manage daily employee attendance
          </p>
        </div>
        <Button onClick={handleExport} className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <UserCheck className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-gray-500">90% of total employees</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
            <UserX className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-500">6% of total employees</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Leave</CardTitle>
            <UserMinus className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-gray-500">4% of total employees</p>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle>Daily Attendance</CardTitle>
          <CardDescription>
            View attendance records for June 15, 2023
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Employee</th>
                  <th className="text-left py-3 px-4">Department</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((record) => (
                  <tr key={record.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{record.name}</td>
                    <td className="py-3 px-4">{record.department}</td>
                    <td className="py-3 px-4">{record.date}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          record.status
                        )}`}
                      >
                        {record.status.charAt(0).toUpperCase() +
                          record.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
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
