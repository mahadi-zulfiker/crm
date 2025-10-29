import React, { useState, useEffect } from "react";
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
  const [employees, setEmployees] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [daysToCheck, setDaysToCheck] = useState(5); 

  // Fetch employees and attendance data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        
        const employeesResponse = await fetch("/api/employeeManagement");
        const employeesData = await employeesResponse.json();

        if (!employeesResponse.ok) {
          throw new Error(employeesData.error || "Failed to fetch employees");
        }

        // Fetch attendance data for the last N days
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - daysToCheck);

        const attendanceResponse = await fetch(
          `/api/admin/attendance?startDate=${
            startDate.toISOString().split("T")[0]
          }&endDate=${endDate.toISOString().split("T")[0]}`
        );
        const attendanceData = await attendanceResponse.json();

        if (!attendanceResponse.ok) {
          throw new Error(
            attendanceData.error || "Failed to fetch attendance data"
          );
        }

        setEmployees(employeesData);
        setAttendanceRecords(attendanceData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to fetch data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [daysToCheck]);

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

  // Process data to find employees with missing attendance
  const getMissingAttendanceData = () => {
    if (employees.length === 0 || attendanceRecords.length === 0) {
      return [];
    }

    // Create a map of employee IDs to employee data
    const employeeMap = {};
    employees.forEach((employee) => {
      employeeMap[employee._id] = employee;
    });

    // Group attendance records by employee
    const attendanceByEmployee = {};
    attendanceRecords.forEach((record) => {
      if (!attendanceByEmployee[record.employeeId]) {
        attendanceByEmployee[record.employeeId] = [];
      }
      attendanceByEmployee[record.employeeId].push(record);
    });

    // Find employees with missing attendance
    const missingAttendance = [];
    const today = new Date();

    employees.forEach((employee) => {
      const employeeAttendance = attendanceByEmployee[employee._id] || [];

      // If employee has no attendance records in the period
      if (employeeAttendance.length === 0) {
        // Calculate days since join date or days in period
        const joinDate = new Date(employee.joinDate);
        const daysSinceJoin = Math.floor(
          (today - joinDate) / (1000 * 60 * 60 * 24)
        );
        const relevantDays = Math.min(daysSinceJoin, daysToCheck);

        if (relevantDays > 0) {
          missingAttendance.push({
            id: employee._id,
            name: employee.name,
            department: employee.department || "Not assigned",
            lastAttendance: employee.joinDate,
            daysMissing: relevantDays,
          });
        }
      } else {
        // Find the most recent attendance date
        const sortedAttendance = [...employeeAttendance].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        const lastAttendanceDate = new Date(sortedAttendance[0].date);
        const daysSinceLastAttendance = Math.floor(
          (today - lastAttendanceDate) / (1000 * 60 * 60 * 24)
        );

        // If employee hasn't marked attendance in the last N days
        if (daysSinceLastAttendance >= daysToCheck) {
          missingAttendance.push({
            id: employee._id,
            name: employee.name,
            department: employee.department || "Not assigned",
            lastAttendance: sortedAttendance[0].date,
            daysMissing: daysSinceLastAttendance,
          });
        }
      }
    });

    return missingAttendance;
  };

  // Calculate summary statistics
  const getStats = () => {
    const missingData = getMissingAttendanceData();

    if (missingData.length === 0) {
      return {
        totalMissing: 0,
        avgDaysMissing: 0,
        highPriority: 0,
      };
    }

    const totalMissing = missingData.length;
    const totalDaysMissing = missingData.reduce(
      (sum, emp) => sum + emp.daysMissing,
      0
    );
    const avgDaysMissing = Math.round(totalDaysMissing / totalMissing);
    const highPriority = missingData.filter(
      (emp) => emp.daysMissing >= 5
    ).length;

    return {
      totalMissing,
      avgDaysMissing,
      highPriority,
    };
  };

  const missingAttendanceData = getMissingAttendanceData();
  const stats = getStats();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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
            <div className="text-2xl font-bold">{stats.totalMissing}</div>
            <p className="text-xs text-gray-500">
              As of {new Date().toLocaleDateString()}
            </p>
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
            <div className="text-2xl font-bold">{stats.avgDaysMissing}</div>
            <p className="text-xs text-gray-500">Days per employee</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.highPriority}</div>
            <p className="text-xs text-gray-500">Missing 5+ days</p>
          </CardContent>
        </Card>
      </div>

      {/* Missing Attendance Table */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle>Employees with Missing Attendance</CardTitle>
          <CardDescription>
            Employees who haven't marked attendance in the last {daysToCheck}{" "}
            days
          </CardDescription>
        </CardHeader>
        <CardContent>
          {missingAttendanceData.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No employees with missing attendance found.
            </div>
          ) : (
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
