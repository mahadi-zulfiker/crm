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
  Calendar,
  UserCheck,
  UserX,
  UserMinus,
  Download,
  Filter,
  Search,
  BarChart3,
  PieChart,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function AttendanceManagement() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [activeTab, setActiveTab] = useState("daily");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [markingAttendance, setMarkingAttendance] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(""); // Added state for selected employee

  // State for attendance data from database
  const [attendanceData, setAttendanceData] = useState([]);
  const [weeklyReportData, setWeeklyReportData] = useState([]);
  const [monthlyReportData, setMonthlyReportData] = useState([]);
  const [employees, setEmployees] = useState([]);

  // Fetch attendance data from the database
  useEffect(() => {
    if (activeTab === "daily") {
      const fetchAttendanceData = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `/api/admin/attendance?date=${selectedDate}`
          );
          const data = await response.json();

          if (response.ok) {
            // Transform the data to match the existing structure
            const transformedData = data.data.map((record) => ({
              id: record._id,
              name: record.employeeName || "Unknown Employee",
              department: record.employeeDepartment || "Not assigned",
              status: record.status || "present",
              date: record.date || selectedDate,
              checkIn: record.checkIn || "09:00 AM",
              checkOut: record.checkOut || "06:00 PM",
            }));
            setAttendanceData(transformedData);
          } else {
            toast({
              title: "Error",
              description: data.error || "Failed to fetch attendance data",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Error fetching attendance data:", error);
          toast({
            title: "Error",
            description: "Failed to fetch attendance data",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };

      fetchAttendanceData();
    }
  }, [selectedDate, activeTab]);

  // Fetch weekly report data
  useEffect(() => {
    if (activeTab === "weekly") {
      const fetchWeeklyReportData = async () => {
        try {
          setLoading(true);
          // Calculate start and end dates for the week
          const currentDate = new Date(selectedDate);
          const dayOfWeek = currentDate.getDay();
          const startDate = new Date(currentDate);
          startDate.setDate(currentDate.getDate() - dayOfWeek);
          const endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + 6);

          const response = await fetch(
            `/api/admin/attendance?startDate=${
              startDate.toISOString().split("T")[0]
            }&endDate=${endDate.toISOString().split("T")[0]}`
          );
          const data = await response.json();

          if (response.ok) {
            // Process data to group by day
            const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const dailyStats = Array(7)
              .fill()
              .map((_, i) => ({
                day: days[i],
                present: 0,
                absent: 0,
                leave: 0,
              }));

            data.data.forEach((record) => {
              const recordDate = new Date(record.date);
              const dayIndex = recordDate.getDay();
              if (dailyStats[dayIndex]) {
                switch (record.status) {
                  case "present":
                    dailyStats[dayIndex].present++;
                    break;
                  case "absent":
                    dailyStats[dayIndex].absent++;
                    break;
                  case "leave":
                    dailyStats[dayIndex].leave++;
                    break;
                }
              }
            });

            setWeeklyReportData(dailyStats);
          } else {
            toast({
              title: "Error",
              description: data.error || "Failed to fetch weekly report data",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Error fetching weekly report data:", error);
          toast({
            title: "Error",
            description: "Failed to fetch weekly report data",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };

      fetchWeeklyReportData();
    }
  }, [selectedDate, activeTab]);

  // Fetch monthly report data
  useEffect(() => {
    if (activeTab === "monthly") {
      const fetchMonthlyReportData = async () => {
        try {
          setLoading(true);
          // Calculate start and end dates for the month
          const currentDate = new Date(selectedDate);
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth();
          const startDate = new Date(year, month, 1);
          const endDate = new Date(year, month + 1, 0);

          const response = await fetch(
            `/api/admin/attendance?startDate=${
              startDate.toISOString().split("T")[0]
            }&endDate=${endDate.toISOString().split("T")[0]}`
          );
          const data = await response.json();

          if (response.ok) {
            // Process data to group by week
            const weeks = [];
            const weekCount = Math.ceil(
              (endDate.getDate() - startDate.getDate() + 1) / 7
            );

            for (let i = 0; i < weekCount; i++) {
              weeks.push({
                week: `Week ${i + 1}`,
                present: 0,
                absent: 0,
                leave: 0,
              });
            }

            data.data.forEach((record) => {
              const recordDate = new Date(record.date);
              const weekIndex = Math.floor((recordDate.getDate() - 1) / 7);
              if (weeks[weekIndex]) {
                switch (record.status) {
                  case "present":
                    weeks[weekIndex].present++;
                    break;
                  case "absent":
                    weeks[weekIndex].absent++;
                    break;
                  case "leave":
                    weeks[weekIndex].leave++;
                    break;
                }
              }
            });

            setMonthlyReportData(weeks);
          } else {
            toast({
              title: "Error",
              description: data.error || "Failed to fetch monthly report data",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Error fetching monthly report data:", error);
          toast({
            title: "Error",
            description: "Failed to fetch monthly report data",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };

      fetchMonthlyReportData();
    }
  }, [selectedDate, activeTab]);

  // Fetch all employees for attendance marking
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("/api/employeeManagement");
        const data = await response.json();

        if (response.ok) {
          setEmployees(data);
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
      }
    };

    fetchEmployees();
  }, []);

  const markAttendanceForEmployee = async (employeeId, status) => {
    try {
      setMarkingAttendance(true);
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId: employeeId,
          status: status,
          date: selectedDate,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: `Attendance marked for employee as ${status}`,
        });

        // Refresh attendance data
        const response2 = await fetch(
          `/api/admin/attendance?date=${selectedDate}`
        );
        const data2 = await response2.json();

        if (response2.ok) {
          const transformedData = data2.data.map((record) => ({
            id: record._id,
            name: record.employeeName || "Unknown Employee",
            department: record.employeeDepartment || "Not assigned",
            status: record.status || "present",
            date: record.date || selectedDate,
            checkIn: record.checkIn || "09:00 AM",
            checkOut: record.checkOut || "06:00 PM",
          }));
          setAttendanceData(transformedData);
        }
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to mark attendance",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      toast({
        title: "Error",
        description: "Failed to mark attendance",
        variant: "destructive",
      });
    } finally {
      setMarkingAttendance(false);
    }
  };

  const handleExport = (reportType) => {
    toast({
      title: `${reportType} Export Started`,
      description: `${reportType} data export has started. You'll receive a notification when it's ready.`,
    });
  };

  // Get unique departments for filter
  const departments = [...new Set(attendanceData.map((emp) => emp.department))];

  // Filter attendance data
  const filteredAttendanceData = attendanceData.filter((record) => {
    const matchesSearch =
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      filterDepartment && filterDepartment !== "all"
        ? record.department === filterDepartment
        : true;
    const matchesStatus =
      filterStatus && filterStatus !== "all"
        ? record.status === filterStatus
        : true;
    const matchesDate = record.date === selectedDate;

    return matchesSearch && matchesDepartment && matchesStatus && matchesDate;
  });

  // Calculate daily stats
  const dailyStats = {
    present: attendanceData.filter(
      (record) => record.date === selectedDate && record.status === "present"
    ).length,
    absent: attendanceData.filter(
      (record) => record.date === selectedDate && record.status === "absent"
    ).length,
    leave: attendanceData.filter(
      (record) => record.date === selectedDate && record.status === "leave"
    ).length,
    total: attendanceData.filter((record) => record.date === selectedDate)
      .length,
  };

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

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get week range for weekly report
  const getWeekRange = (dateString) => {
    const currentDate = new Date(dateString);
    const dayOfWeek = currentDate.getDay();
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - dayOfWeek);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    return `${startDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} - ${endDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;
  };

  // Get month name for monthly report
  const getMonthName = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Attendance Management</h1>
          <p className="text-gray-600">Track and manage employee attendance</p>
        </div>
      </div>

      <Tabs
        defaultValue="daily"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">Daily Overview</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Report</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Report</TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="date"
                  className="pl-10"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search employees..."
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select
                value={filterDepartment}
                onValueChange={setFilterDepartment}
              >
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
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={() => handleExport("Daily Attendance")}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>

          {/* Daily Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Employees
                </CardTitle>
                <Calendar className="w-4 h-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dailyStats.total}</div>
                <p className="text-xs text-gray-500">
                  On {formatDate(selectedDate)}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Present Today
                </CardTitle>
                <UserCheck className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dailyStats.present}</div>
                <p className="text-xs text-gray-500">
                  {dailyStats.total > 0
                    ? Math.round((dailyStats.present / dailyStats.total) * 100)
                    : 0}
                  % of total
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Absent Today
                </CardTitle>
                <UserX className="w-4 h-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dailyStats.absent}</div>
                <p className="text-xs text-gray-500">
                  {dailyStats.total > 0
                    ? Math.round((dailyStats.absent / dailyStats.total) * 100)
                    : 0}
                  % of total
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">On Leave</CardTitle>
                <UserMinus className="w-4 h-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dailyStats.leave}</div>
                <p className="text-xs text-gray-500">
                  {dailyStats.total > 0
                    ? Math.round((dailyStats.leave / dailyStats.total) * 100)
                    : 0}
                  % of total
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Mark Attendance Section */}
          <Card className="bg-white shadow-sm border-0 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Mark Employee Attendance
              </CardTitle>
              <CardDescription>
                Manually mark attendance for employees for{" "}
                {formatDate(selectedDate)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="employee-select">Select Employee</Label>
                  <Select
                    value={selectedEmployee}
                    onValueChange={setSelectedEmployee}
                  >
                    <SelectTrigger id="employee-select">
                      <SelectValue placeholder="Select an employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((employee) => (
                        <SelectItem key={employee._id} value={employee._id}>
                          {employee.name} -{" "}
                          {employee.department || "Not assigned"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end gap-2">
                  <Button
                    className="flex-1 bg-green-500 hover:bg-green-600"
                    onClick={() => {
                      if (selectedEmployee)
                        markAttendanceForEmployee(selectedEmployee, "present");
                    }}
                    disabled={markingAttendance || !selectedEmployee}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Present
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-red-200 hover:bg-red-50"
                    onClick={() => {
                      if (selectedEmployee)
                        markAttendanceForEmployee(selectedEmployee, "absent");
                    }}
                    disabled={markingAttendance || !selectedEmployee}
                  >
                    <XCircle className="w-4 h-4 mr-2 text-red-600" />
                    <span className="text-red-600">Absent</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-yellow-200 hover:bg-yellow-50"
                    onClick={() => {
                      if (selectedEmployee)
                        markAttendanceForEmployee(selectedEmployee, "leave");
                    }}
                    disabled={markingAttendance || !selectedEmployee}
                  >
                    <Clock className="w-4 h-4 mr-2 text-yellow-600" />
                    <span className="text-yellow-600">Leave</span>
                  </Button>
                </div>
              </div>
              {markingAttendance && (
                <div className="mt-3 text-center">
                  <div className="inline-flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                    <span>Marking attendance...</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Daily Attendance Table */}
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle>Daily Attendance</CardTitle>
              <CardDescription>
                View attendance records for {formatDate(selectedDate)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Employee</th>
                      <th className="text-left py-3 px-4">Department</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Check In</th>
                      <th className="text-left py-3 px-4">Check Out</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAttendanceData.map((record) => (
                      <tr key={record.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{record.name}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDepartmentColor(
                              record.department
                            )}`}
                          >
                            {record.department}
                          </span>
                        </td>
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
                        <td className="py-3 px-4">{record.checkIn || "-"}</td>
                        <td className="py-3 px-4">{record.checkOut || "-"}</td>
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
        </TabsContent>

        <TabsContent value="weekly">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Weekly Absence Report</h2>
              <p className="text-gray-600">
                Week of {getWeekRange(selectedDate)}
              </p>
            </div>
            <Button
              onClick={() => handleExport("Weekly Absence")}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>

          {/* Weekly Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Daily Present
                </CardTitle>
                <UserCheck className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {weeklyReportData.reduce((sum, day) => sum + day.present, 0) >
                  0
                    ? Math.round(
                        weeklyReportData.reduce(
                          (sum, day) => sum + day.present,
                          0
                        ) / 7
                      )
                    : 0}
                </div>
                <p className="text-xs text-gray-500">
                  Average attendance this week
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Absences
                </CardTitle>
                <UserX className="w-4 h-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {weeklyReportData.reduce((sum, day) => sum + day.absent, 0)}
                </div>
                <p className="text-xs text-gray-500">Across all departments</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Leave Requests
                </CardTitle>
                <UserMinus className="w-4 h-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {weeklyReportData.reduce((sum, day) => sum + day.leave, 0)}
                </div>
                <p className="text-xs text-gray-500">This week</p>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Chart */}
          <Card className="bg-white shadow-sm border-0 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Daily Attendance Overview
              </CardTitle>
              <CardDescription>
                Attendance distribution across the week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-2">
                {weeklyReportData.map((day, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1"
                  >
                    <div className="text-xs text-gray-500 mb-2">{day.day}</div>
                    <div className="flex flex-col items-center w-full gap-1">
                      <div
                        className="w-full bg-green-500 rounded-t"
                        style={{
                          height: `${
                            (day.present /
                              (day.present + day.absent + day.leave + 1)) *
                            100
                          }%`,
                        }}
                        title={`${day.present} present`}
                      ></div>
                      <div
                        className="w-full bg-red-500"
                        style={{
                          height: `${
                            (day.absent /
                              (day.present + day.absent + day.leave + 1)) *
                            100
                          }%`,
                        }}
                        title={`${day.absent} absent`}
                      ></div>
                      <div
                        className="w-full bg-yellow-500 rounded-b"
                        style={{
                          height: `${
                            (day.leave /
                              (day.present + day.absent + day.leave + 1)) *
                            100
                          }%`,
                        }}
                        title={`${day.leave} on leave`}
                      ></div>
                    </div>
                    <div className="text-xs mt-2 text-center">
                      {day.present + day.absent + day.leave}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                  <span className="text-xs">Present</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                  <span className="text-xs">Absent</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                  <span className="text-xs">On Leave</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Details Table */}
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle>Weekly Attendance Details</CardTitle>
              <CardDescription>
                Detailed breakdown of attendance by day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Day</th>
                      <th className="text-left py-3 px-4">Present</th>
                      <th className="text-left py-3 px-4">Absent</th>
                      <th className="text-left py-3 px-4">On Leave</th>
                      <th className="text-left py-3 px-4">Total</th>
                      <th className="text-left py-3 px-4">Attendance Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weeklyReportData.map((day, index) => {
                      const total = day.present + day.absent + day.leave;
                      const rate =
                        total > 0 ? Math.round((day.present / total) * 100) : 0;
                      return (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{day.day}</td>
                          <td className="py-3 px-4">{day.present}</td>
                          <td className="py-3 px-4">{day.absent}</td>
                          <td className="py-3 px-4">{day.leave}</td>
                          <td className="py-3 px-4">{total}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className="bg-green-600 h-2 rounded-full"
                                  style={{ width: `${rate}%` }}
                                ></div>
                              </div>
                              <span>{rate}%</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Monthly Attendance Report</h2>
              <p className="text-gray-600">{getMonthName(selectedDate)}</p>
            </div>
            <Button
              onClick={() => handleExport("Monthly Attendance")}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>

          {/* Monthly Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Working Days
                </CardTitle>
                <Calendar className="w-4 h-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Date(selectedDate).getDate()}
                </div>
                <p className="text-xs text-gray-500">
                  {getMonthName(selectedDate)}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Attendance
                </CardTitle>
                <UserCheck className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {monthlyReportData.reduce(
                    (sum, week) =>
                      sum + week.present + week.absent + week.leave,
                    0
                  ) > 0
                    ? Math.round(
                        (monthlyReportData.reduce(
                          (sum, week) => sum + week.present,
                          0
                        ) /
                          monthlyReportData.reduce(
                            (sum, week) =>
                              sum + week.present + week.absent + week.leave,
                            0
                          )) *
                          100
                      )
                    : 0}
                  %
                </div>
                <p className="text-xs text-gray-500">Across all employees</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Absences
                </CardTitle>
                <UserX className="w-4 h-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {monthlyReportData.reduce(
                    (sum, week) => sum + week.absent,
                    0
                  )}
                </div>
                <p className="text-xs text-gray-500">This month</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Leave Requests
                </CardTitle>
                <UserMinus className="w-4 h-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {monthlyReportData.reduce((sum, week) => sum + week.leave, 0)}
                </div>
                <p className="text-xs text-gray-500">This month</p>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Chart */}
          <Card className="bg-white shadow-sm border-0 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Weekly Attendance Overview
              </CardTitle>
              <CardDescription>
                Attendance distribution by week for the month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-2">
                {monthlyReportData.map((week, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1"
                  >
                    <div className="text-xs text-gray-500 mb-2">
                      {week.week}
                    </div>
                    <div className="flex flex-col items-center w-full gap-1">
                      <div
                        className="w-full bg-green-500 rounded-t"
                        style={{
                          height: `${
                            (week.present /
                              (week.present + week.absent + week.leave + 1)) *
                            100
                          }%`,
                        }}
                        title={`${week.present} present`}
                      ></div>
                      <div
                        className="w-full bg-red-500"
                        style={{
                          height: `${
                            (week.absent /
                              (week.present + week.absent + week.leave + 1)) *
                            100
                          }%`,
                        }}
                        title={`${week.absent} absent`}
                      ></div>
                      <div
                        className="w-full bg-yellow-500 rounded-b"
                        style={{
                          height: `${
                            (week.leave /
                              (week.present + week.absent + week.leave + 1)) *
                            100
                          }%`,
                        }}
                        title={`${week.leave} on leave`}
                      ></div>
                    </div>
                    <div className="text-xs mt-2 text-center">
                      {week.present + week.absent + week.leave}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                  <span className="text-xs">Present</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                  <span className="text-xs">Absent</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                  <span className="text-xs">On Leave</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Details Table */}
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle>Monthly Attendance Details</CardTitle>
              <CardDescription>
                Detailed breakdown of attendance by week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Week</th>
                      <th className="text-left py-3 px-4">Present</th>
                      <th className="text-left py-3 px-4">Absent</th>
                      <th className="text-left py-3 px-4">On Leave</th>
                      <th className="text-left py-3 px-4">Total</th>
                      <th className="text-left py-3 px-4">Attendance Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyReportData.map((week, index) => {
                      const total = week.present + week.absent + week.leave;
                      const rate =
                        total > 0
                          ? Math.round((week.present / total) * 100)
                          : 0;
                      return (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{week.week}</td>
                          <td className="py-3 px-4">{week.present}</td>
                          <td className="py-3 px-4">{week.absent}</td>
                          <td className="py-3 px-4">{week.leave}</td>
                          <td className="py-3 px-4">{total}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className="bg-green-600 h-2 rounded-full"
                                  style={{ width: `${rate}%` }}
                                ></div>
                              </div>
                              <span>{rate}%</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
