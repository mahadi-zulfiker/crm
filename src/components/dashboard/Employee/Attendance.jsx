import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  History,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Attendance() {
  const { data: session } = useSession();
  const [todayStatus, setTodayStatus] = useState(null);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    const fetchTodayAttendance = async () => {
      try {
        if (!session?.user?.id) return;

        const today = new Date().toISOString().split("T")[0];
        const response = await fetch(
          `/api/attendance?employeeId=${session.user.id}&date=${today}`
        );
        const data = await response.json();

        if (response.ok && data.data.length > 0) {
          setTodayStatus(data.data[0].status);
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
        toast.error("Failed to fetch attendance status");
      } finally {
        setLoading(false);
      }
    };

    const fetchAttendanceHistory = async () => {
      try {
        setHistoryLoading(true);
        if (!session?.user?.id) return;

        const response = await fetch(
          `/api/attendance/history?employeeId=${session.user.id}`
        );
        const data = await response.json();

        if (response.ok) {
          // Transform data to match existing structure
          const transformedData = data.data.map((record) => ({
            ...record,
            date: record.date || record.createdAt, // Handle different date field names
          }));
          setAttendanceHistory(transformedData || []);
        }
      } catch (error) {
        console.error("Error fetching attendance history:", error);
        toast.error("Failed to fetch attendance history");
      } finally {
        setHistoryLoading(false);
        setLoading(false);
      }
    };

    fetchTodayAttendance();
    fetchAttendanceHistory();
  }, [session]);

  const markAttendance = async (status) => {
    try {
      setMarking(true);
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId: session?.user?.id,
          status: status,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTodayStatus(status);
        // Refresh history after marking attendance
        const historyResponse = await fetch(
          `/api/attendance/history?employeeId=${session.user.id}`
        );
        const historyData = await historyResponse.json();
        if (historyResponse.ok) {
          // Transform data to match existing structure
          const transformedData = historyData.data.map((record) => ({
            ...record,
            date: record.date || record.createdAt, // Handle different date field names
          }));
          setAttendanceHistory(transformedData || []);
        }
        toast.success(`Attendance marked as ${status} successfully!`);
      } else {
        toast.error(data.error || "Failed to mark attendance");
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      toast.error("Failed to mark attendance");
    } finally {
      setMarking(false);
    }
  };

  // Calculate attendance summary
  const calculateSummary = () => {
    const totalDays = attendanceHistory.length;
    const presentDays = attendanceHistory.filter(
      (record) => record.status === "present"
    ).length;
    const absentDays = attendanceHistory.filter(
      (record) => record.status === "absent"
    ).length;
    const leaveDays = attendanceHistory.filter(
      (record) => record.status === "leave"
    ).length;

    const presentPercentage =
      totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

    // Calculate weekly summary (last 7 days)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const weeklyRecords = attendanceHistory.filter(
      (record) => new Date(record.date) >= oneWeekAgo
    );

    const weeklyPresent = weeklyRecords.filter(
      (record) => record.status === "present"
    ).length;
    const weeklyAbsent = weeklyRecords.filter(
      (record) => record.status === "absent"
    ).length;
    const weeklyLeave = weeklyRecords.filter(
      (record) => record.status === "leave"
    ).length;

    return {
      totalDays,
      presentDays,
      absentDays,
      leaveDays,
      presentPercentage,
      weeklyRecords: weeklyRecords.length,
      weeklyPresent,
      weeklyAbsent,
      weeklyLeave,
    };
  };

  const summary = calculateSummary();

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <p className="text-gray-600">Loading attendance status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Attendance Management</h1>
        <p className="text-gray-600">
          Track your daily attendance and view history
        </p>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">Daily Attendance</TabsTrigger>
          <TabsTrigger value="history">Attendance History</TabsTrigger>
          <TabsTrigger value="summary">Attendance Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Today's Attendance
              </CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {todayStatus ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    {todayStatus === "present" && (
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    )}
                    {todayStatus === "absent" && (
                      <XCircle className="w-8 h-8 text-red-600" />
                    )}
                    {todayStatus === "leave" && (
                      <Clock className="w-8 h-8 text-yellow-600" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Attendance Marked
                  </h3>
                  <p className="text-gray-600 capitalize">
                    You have marked yourself as{" "}
                    <span className="font-semibold">{todayStatus}</span> today.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">
                      Mark Your Attendance
                    </h3>
                    <p className="text-gray-600">
                      Please select your attendance status for today
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      onClick={() => markAttendance("present")}
                      disabled={marking}
                      className="flex flex-col items-center justify-center h-24 bg-green-500 hover:bg-green-600 text-white"
                    >
                      <CheckCircle className="w-8 h-8 mb-2" />
                      <span>Present</span>
                    </Button>

                    <Button
                      onClick={() => markAttendance("absent")}
                      disabled={marking}
                      variant="outline"
                      className="flex flex-col items-center justify-center h-24 border-red-200 hover:bg-red-50"
                    >
                      <XCircle className="w-8 h-8 mb-2 text-red-600" />
                      <span className="text-red-600">Absent</span>
                    </Button>

                    <Button
                      onClick={() => markAttendance("leave")}
                      disabled={marking}
                      variant="outline"
                      className="flex flex-col items-center justify-center h-24 border-yellow-200 hover:bg-yellow-50"
                    >
                      <Clock className="w-8 h-8 mb-2 text-yellow-600" />
                      <span className="text-yellow-600">On Leave</span>
                    </Button>
                  </div>

                  {marking && (
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mr-2"></div>
                        <span>Marking attendance...</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5" />
                Attendance History
              </CardTitle>
              <CardDescription>View your attendance records</CardDescription>
            </CardHeader>
            <CardContent>
              {historyLoading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                    <p className="text-gray-600">
                      Loading attendance history...
                    </p>
                  </div>
                </div>
              ) : attendanceHistory.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Day</th>
                        <th className="text-left py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceHistory.map((record, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            {new Date(record.date).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            {new Date(record.date).toLocaleDateString("en-US", {
                              weekday: "short",
                            })}
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No attendance records found
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Days
                </CardTitle>
                <Calendar className="w-4 h-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.totalDays}</div>
                <p className="text-xs text-gray-500">Recorded attendance</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Present Days
                </CardTitle>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.presentDays}</div>
                <p className="text-xs text-gray-500">
                  {summary.presentPercentage}% attendance
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Absent Days
                </CardTitle>
                <XCircle className="w-4 h-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.absentDays}</div>
                <p className="text-xs text-gray-500">Days marked absent</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Leave Days
                </CardTitle>
                <Clock className="w-4 h-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.leaveDays}</div>
                <p className="text-xs text-gray-500">Days on leave</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white shadow-sm border-0 mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Weekly Summary
              </CardTitle>
              <CardDescription>Last 7 days attendance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">
                    {summary.weeklyPresent}
                  </div>
                  <div className="text-sm text-green-600">Present</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-700">
                    {summary.weeklyAbsent}
                  </div>
                  <div className="text-sm text-red-600">Absent</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-700">
                    {summary.weeklyLeave}
                  </div>
                  <div className="text-sm text-yellow-600">On Leave</div>
                </div>
              </div>
              <div className="mt-4 text-center text-sm text-gray-500">
                Total records in last 7 days: {summary.weeklyRecords}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
