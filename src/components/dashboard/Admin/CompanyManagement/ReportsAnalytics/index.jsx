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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  BarChart3,
  PieChart,
  TrendingUp,
  Calendar,
  Download,
  Filter,
  Search,
  Users,
  UserCheck,
  UserX,
  DollarSign,
  CreditCard,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function ReportsAnalytics() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [selectedDateRange, setSelectedDateRange] = useState("monthly");
  const [loading, setLoading] = useState(false);

  // State for report data from database
  const [attendanceData, setAttendanceData] = useState([]);
  const [employeeStats, setEmployeeStats] = useState([]);
  const [leaveData, setLeaveData] = useState({});
  const [loanData, setLoanData] = useState({});

  // Fetch report data from the database
  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setLoading(true);

        // Fetch attendance data
        const attendanceResponse = await fetch(
          "/api/admin/reports/attendance?days=7"
        );
        const attendanceResult = await attendanceResponse.json();

        // Fetch employee statistics
        const employeeResponse = await fetch("/api/admin/reports/employees");
        const employeeResult = await employeeResponse.json();

        // Fetch leave data
        const leaveResponse = await fetch("/api/admin/reports/leave?months=1");
        const leaveResult = await leaveResponse.json();

        // Fetch loan data
        const loanResponse = await fetch("/api/admin/reports/loans?months=1");
        const loanResult = await loanResponse.json();

        if (attendanceResponse.ok) {
          setAttendanceData(attendanceResult.data);
        } else {
          console.error(
            "Error fetching attendance data:",
            attendanceResult.error
          );
        }

        if (employeeResponse.ok) {
          setEmployeeStats(employeeResult.data);
        } else {
          console.error("Error fetching employee data:", employeeResult.error);
        }

        if (leaveResponse.ok) {
          setLeaveData(leaveResult.data);
        } else {
          console.error("Error fetching leave data:", leaveResult.error);
        }

        if (loanResponse.ok) {
          setLoanData(loanResult.data);
        } else {
          console.error("Error fetching loan data:", loanResult.error);
        }
      } catch (error) {
        console.error("Error fetching report data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch report data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  const handleExport = (reportType) => {
    toast({
      title: `${reportType} Export Started`,
      description: `${reportType} report export has started. You'll receive a notification when it's ready.`,
    });
  };

  // Get unique departments for filter
  const departments = [
    ...new Set(employeeStats.map((stat) => stat.department)),
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "bg-green-500";
      case "absent":
        return "bg-red-500";
      case "leave":
        return "bg-yellow-500";
      default:
        return "bg-gray-300";
    }
  };

  // Filter data based on department selection
  const filteredEmployeeStats = employeeStats.filter(
    (stat) => filterDepartment === "all" || stat.department === filterDepartment
  );

  // Calculate summary stats based on filtered data
  const totalEmployees = filteredEmployeeStats.reduce(
    (sum, stat) => sum + stat.total,
    0
  );
  const totalPresent = filteredEmployeeStats.reduce(
    (sum, stat) => sum + stat.present,
    0
  );
  const totalAbsent = filteredEmployeeStats.reduce(
    (sum, stat) => sum + stat.absent,
    0
  );
  const totalLeave = filteredEmployeeStats.reduce(
    (sum, stat) => sum + stat.leave,
    0
  );
  const attendanceRate =
    totalEmployees > 0 ? Math.round((totalPresent / totalEmployees) * 100) : 0;

  const totalLoans = loanData.loanStats
    ? loanData.loanStats.reduce((sum, stat) => sum + stat.count, 0)
    : 0;
  const totalLoanAmount = loanData.summary ? loanData.summary.totalAmount : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-gray-600">
            Comprehensive reports and analytics for employee management
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search reports..."
              className="pl-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterDepartment} onValueChange={setFilterDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept, index) => (
                <SelectItem key={index} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedDateRange}
            onValueChange={setSelectedDateRange}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          
        </div>
      </div>

      <Tabs defaultValue="attendance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="leave">Leave</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
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
                  Present Today
                </CardTitle>
                <UserCheck className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPresent}</div>
                <p className="text-xs text-gray-500">
                  {attendanceRate}% attendance rate
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
                <div className="text-2xl font-bold">{totalAbsent}</div>
                <p className="text-xs text-gray-500">
                  {totalEmployees > 0
                    ? Math.round((totalAbsent / totalEmployees) * 100)
                    : 0}
                  % absence rate
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">On Leave</CardTitle>
                <Calendar className="w-4 h-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalLeave}</div>
                <p className="text-xs text-gray-500">
                  {totalEmployees > 0
                    ? Math.round((totalLeave / totalEmployees) * 100)
                    : 0}
                  % on leave
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white shadow-sm border-0">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Daily Attendance Trend
                    </CardTitle>
                    <CardDescription>
                      Attendance pattern over the last 7 days
                    </CardDescription>
                  </div>
                 
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-2">
                  {attendanceData.map((day, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center flex-1"
                    >
                      <div className="text-xs text-gray-500 mb-2">
                        {new Date(day.date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                        })}
                      </div>
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

            <Card className="bg-white shadow-sm border-0">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="w-5 h-5" />
                      Department-wise Attendance
                    </CardTitle>
                    <CardDescription>
                      Attendance distribution by department
                    </CardDescription>
                  </div>
                
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-2">
                      {totalEmployees}
                    </div>
                    <div className="text-gray-500">Total Employees</div>
                    <div className="mt-4 text-sm text-gray-500">
                      Pie chart visualization would appear here
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {filteredEmployeeStats.map((stat, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className="w-3 h-3 rounded mr-2"
                        style={{
                          backgroundColor: [
                            "#3b82f6",
                            "#10b981",
                            "#ef4444",
                            "#f59e0b",
                            "#8b5cf6",
                          ][index % 5],
                        }}
                      ></div>
                      <span className="text-xs">{stat.department}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white shadow-sm border-0 mt-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Attendance Details</CardTitle>
                  <CardDescription>
                    Detailed attendance records by department
                  </CardDescription>
                </div>
               
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Department</th>
                      <th className="text-left py-3 px-4">Total Employees</th>
                      <th className="text-left py-3 px-4">Present</th>
                      <th className="text-left py-3 px-4">Absent</th>
                      <th className="text-left py-3 px-4">On Leave</th>
                      <th className="text-left py-3 px-4">Attendance Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployeeStats.map((stat, index) => {
                      const total = stat.present + stat.absent + stat.leave;
                      const rate =
                        total > 0
                          ? Math.round((stat.present / total) * 100)
                          : 0;
                      return (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">
                            {stat.department}
                          </td>
                          <td className="py-3 px-4">{stat.total}</td>
                          <td className="py-3 px-4">{stat.present}</td>
                          <td className="py-3 px-4">{stat.absent}</td>
                          <td className="py-3 px-4">{stat.leave}</td>
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

        <TabsContent value="employees">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
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
                <UserCheck className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPresent}</div>
                <p className="text-xs text-gray-500">Currently working</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Departments
                </CardTitle>
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{departments.length}</div>
                <p className="text-xs text-gray-500">Organization units</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Hires</CardTitle>
                <UserCheck className="w-4 h-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-gray-500">This month</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Employee Distribution</CardTitle>
                  <CardDescription>
                    Employee count by department
                  </CardDescription>
                </div>
               
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Department</th>
                      <th className="text-left py-3 px-4">Total Employees</th>
                      <th className="text-left py-3 px-4">Percentage</th>
                      <th className="text-left py-3 px-4">Visualization</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployeeStats.map((stat, index) => {
                      const percentage =
                        totalEmployees > 0
                          ? Math.round((stat.total / totalEmployees) * 100)
                          : 0;
                      return (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">
                            {stat.department}
                          </td>
                          <td className="py-3 px-4">{stat.total}</td>
                          <td className="py-3 px-4">{percentage}%</td>
                          <td className="py-3 px-4">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
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

        <TabsContent value="leave">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Leave Requests
                </CardTitle>
                <Calendar className="w-4 h-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {leaveData.summary?.totalRequests || 0}
                </div>
                <p className="text-xs text-gray-500">This month</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Approved Leaves
                </CardTitle>
                <UserCheck className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {leaveData.summary?.approvedRequests || 0}
                </div>
                <p className="text-xs text-gray-500">This month</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Requests
                </CardTitle>
                <Calendar className="w-4 h-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {leaveData.summary?.pendingRequests || 0}
                </div>
                <p className="text-xs text-gray-500">Awaiting approval</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Rejected Leaves
                </CardTitle>
                <UserX className="w-4 h-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {leaveData.summary?.rejectedRequests || 0}
                </div>
                <p className="text-xs text-gray-500">This month</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Leave Type Distribution</CardTitle>
                  <CardDescription>
                    Distribution of leave requests by type
                  </CardDescription>
                </div>
               
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex flex-col items-center justify-center">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold">
                    {leaveData.summary?.totalRequests || 0}
                  </div>
                  <div className="text-gray-500">Total Leave Requests</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {leaveData.loanStats &&
                    leaveData.loanStats.map((stat, index) => (
                      <div key={index} className="flex items-center">
                        <div
                          className="w-3 h-3 rounded mr-2"
                          style={{
                            backgroundColor: [
                              "#10b981",
                              "#3b82f6",
                              "#f59e0b",
                              "#8b5cf6",
                            ][index % 4],
                          }}
                        ></div>
                        <span className="text-sm">
                          {stat.type} ({stat.count})
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loans">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Loans
                </CardTitle>
                <DollarSign className="w-4 h-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loanData.summary?.totalLoans || 0}
                </div>
                <p className="text-xs text-gray-500">Active and completed</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Loan Amount
                </CardTitle>
                <DollarSign className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${loanData.summary?.totalAmount?.toLocaleString() || 0}
                </div>
                <p className="text-xs text-gray-500">Loaned to employees</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Loans
                </CardTitle>
                <CreditCard className="w-4 h-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loanData.summary?.approvedLoans || 0}
                </div>
                <p className="text-xs text-gray-500">Currently processing</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Outstanding Balance
                </CardTitle>
                <DollarSign className="w-4 h-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${loanData.summary?.outstandingAmount?.toLocaleString() || 0}
                </div>
                <p className="text-xs text-gray-500">Remaining balance</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Loan Distribution</CardTitle>
                  <CardDescription>
                    Loan types and their distribution
                  </CardDescription>
                </div>
             
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Loan Type</th>
                      <th className="text-left py-3 px-4">Number of Loans</th>
                      <th className="text-left py-3 px-4">Total Amount</th>
                      <th className="text-left py-3 px-4">Percentage</th>
                      <th className="text-left py-3 px-4">Visualization</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loanData.loanStats &&
                      loanData.loanStats.map((stat, index) => {
                        const percentage =
                          loanData.summary?.totalLoans > 0
                            ? Math.round(
                                (stat.count / loanData.summary.totalLoans) * 100
                              )
                            : 0;
                        return (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium">
                              {stat.type}
                            </td>
                            <td className="py-3 px-4">{stat.count}</td>
                            <td className="py-3 px-4">
                              ${stat.totalAmount?.toLocaleString()}
                            </td>
                            <td className="py-3 px-4">{percentage}%</td>
                            <td className="py-3 px-4">
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                ></div>
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
