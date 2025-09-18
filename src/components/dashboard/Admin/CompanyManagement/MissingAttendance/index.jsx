import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, UserX, Send, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function MissingAttendance() {
  const { toast } = useToast();

  const handleNotify = (employeeName) => {
    toast({
      title: "Notification Sent",
      description: `Attendance reminder sent to ${employeeName}.`,
    });
  };

  const handleNotifyAll = () => {
    toast({
      title: "Notifications Sent",
      description:
        "Attendance reminders sent to all employees with missing attendance.",
    });
  };

  // Mock data for employees with missing attendance
  const missingAttendanceData = [
    {
      id: 1,
      name: "Alice Johnson",
      department: "Marketing",
      lastAttendance: "2023-06-12",
      daysMissing: 3,
    },
    {
      id: 2,
      name: "Robert Chen",
      department: "Engineering",
      lastAttendance: "2023-06-10",
      daysMissing: 5,
    },
    {
      id: 3,
      name: "Priya Sharma",
      department: "Sales",
      lastAttendance: "2023-06-13",
      daysMissing: 2,
    },
    {
      id: 4,
      name: "James Wilson",
      department: "HR",
      lastAttendance: "2023-06-11",
      daysMissing: 4,
    },
    {
      id: 5,
      name: "Maria Garcia",
      department: "Finance",
      lastAttendance: "2023-06-14",
      daysMissing: 1,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Missing Attendance</h1>
          <p className="text-gray-600">
            Track employees who haven't marked attendance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button onClick={handleNotifyAll} className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            Notify All
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Employees Missing
            </CardTitle>
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-gray-500">As of June 15, 2023</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Days Missing
            </CardTitle>
            <UserX className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-500">Days per employee</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-500">Missing 5+ days</p>
          </CardContent>
        </Card>
      </div>

      {/* Missing Attendance Table */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle>Employees with Missing Attendance</CardTitle>
          <CardDescription>
            Employees who haven't marked attendance in the last 5 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Employee</th>
                  <th className="text-left py-3 px-4">Department</th>
                  <th className="text-left py-3 px-4">Last Attendance</th>
                  <th className="text-left py-3 px-4">Days Missing</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {missingAttendanceData.map((employee) => (
                  <tr key={employee.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{employee.name}</td>
                    <td className="py-3 px-4">{employee.department}</td>
                    <td className="py-3 px-4">{employee.lastAttendance}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          employee.daysMissing > 3
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {employee.daysMissing} days
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        onClick={() => handleNotify(employee.name)}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        Notify
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
