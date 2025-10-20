"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  User,
  Clock4,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

export default function Attendance() {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [todayStatus, setTodayStatus] = useState(null);
  const [marking, setMarking] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    name: "",
    joinDate: "",
    confirmationDate: "",
    workStartTime: "08:00 AM",
    workEndTime: "05:00 PM",
  });

  // Fetch employee profile data
  useEffect(() => {
    const fetchEmployeeProfile = async () => {
      try {
        if (!session?.user?.email) return;

        const response = await fetch(
          `/api/employee/profile?email=${session.user.email}`
        );
        const data = await response.json();

        if (response.ok && data.data) {
          setEmployeeData({
            name: data.data.name,
            joinDate: data.data.joinDate,
            confirmationDate: data.data.confirmationDate,
            workStartTime: data.data.workStartTime,
            workEndTime: data.data.workEndTime,
          });
        } else {
          console.error("Error fetching employee profile:", data.error);
          // Set default values if fetch fails
          setEmployeeData({
            name: session.user.name,
            joinDate: "2025-10-05",
            confirmationDate: "2026-01-05",
            workStartTime: "08:00 AM",
            workEndTime: "05:00 PM",
          });
        }
      } catch (error) {
        console.error("Error fetching employee profile:", error);
        // Set default values if fetch fails
        setEmployeeData({
          name: session.user.name,
          joinDate: "2025-10-05",
          confirmationDate: "2026-01-05",
          workStartTime: "08:00 AM",
          workEndTime: "05:00 PM",
        });
      }
    };

    fetchEmployeeProfile();
  }, [session]);

  // Calculate length of service
  const calculateLengthOfService = (joiningDate) => {
    if (!joiningDate) return 0;
    const joinDate = new Date(joiningDate);
    const today = new Date();
    const diffTime = Math.abs(today - joinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Fetch today's attendance status
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
          setTodayStatus(data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching today's attendance:", error);
        toast({
          title: "Error",
          description: "Failed to fetch today's attendance status",
          variant: "destructive",
        });
      }
    };

    fetchTodayAttendance();
  }, [session]);

  // Fetch attendance history data from the database
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        if (!session?.user?.id) return;

        setLoading(true);
        const response = await fetch(
          `/api/employee/attendance?employeeId=${session.user.id}&month=${
            currentMonth + 1
          }&year=${currentYear}`
        );
        const data = await response.json();

        if (response.ok) {
          // Transform the data to match the existing structure
          const transformedData = data.data.map((record) => ({
            date: record.date,
            status: record.status || "present",
            checkIn: record.checkIn || "-",
            checkOut: record.checkOut || "-",
            hours: record.hours || "-",
            isOnLeave: record.isOnLeave || false,
            leaveDetails: record.leaveDetails || null,
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
  }, [session, currentMonth, currentYear]);

  const markAttendance = async (status, action = null) => {
    try {
      setMarking(true);
      const requestBody = {
        employeeId: session?.user?.id,
        status: status,
        employeeName: employeeData.name,
        workStartTime: employeeData.workStartTime, // Pass work start time
      };

      // Add action if provided (checkin/checkout)
      if (action) {
        requestBody.action = action;
      }

      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        // Refresh today's attendance status
        const today = new Date().toISOString().split("T")[0];
        const response2 = await fetch(
          `/api/attendance?employeeId=${session.user.id}&date=${today}`
        );
        const data2 = await response2.json();

        if (response2.ok && data2.data.length > 0) {
          setTodayStatus(data2.data[0]);
        }

        toast({
          title: "Success",
          description:
            data.message || `Attendance action recorded successfully!`,
        });

        // Refresh attendance data after marking
        const response3 = await fetch(
          `/api/employee/attendance?employeeId=${session.user.id}&month=${
            currentMonth + 1
          }&year=${currentYear}`
        );
        const data3 = await response3.json();

        if (response3.ok) {
          const transformedData = data3.data.map((record) => ({
            date: record.date,
            status: record.status || "present",
            checkIn: record.checkIn || "-",
            checkOut: record.checkOut || "-",
            hours: record.hours || "-",
            isOnLeave: record.isOnLeave || false,
            leaveDetails: record.leaveDetails || null,
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
      setMarking(false);
    }
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getAttendanceForDay = (day) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    return attendanceData.find((record) => record.date === dateStr);
  };

  const currentMonthData = attendanceData.filter((record) => {
    const recordDate = new Date(record.date);
    return (
      recordDate.getMonth() === currentMonth &&
      recordDate.getFullYear() === currentYear
    );
  });

  const presentDays = currentMonthData.filter(
    (record) => record.status === "present"
  ).length;
  const absentDays = currentMonthData.filter(
    (record) => record.status === "absent"
  ).length;
  const leaveDays = currentMonthData.filter(
    (record) => record.status === "leave" || record.isOnLeave
  ).length;
  const lateDays = currentMonthData.filter(
    (record) => record.status === "late"
  ).length;
  const movementDays = currentMonthData.filter(
    (record) => record.status === "movement"
  ).length;
  const payableDays = currentMonthData.filter(
    (record) => record.status !== "weekend" && record.status !== "holiday"
  ).length;

  const recentRecords = [...attendanceData]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)
    .map((record) => ({
      date: new Date(record.date).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      checkIn: record.checkIn || "-",
      checkOut: record.checkOut || "-",
    }));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <p className="text-gray-600">Loading attendance data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Employee Information Section */}
        <Card className="bg-white shadow-sm border-0 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="w-5 h-5" />
              Employee Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {employeeData.name}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border-l-4 border-l-blue-500 bg-white p-4 rounded-r-lg shadow-sm">
                <div className="text-sm text-gray-600">Joining Date</div>
                <div className="text-lg font-semibold text-gray-800">
                  {employeeData.joinDate
                    ? new Date(employeeData.joinDate).toLocaleDateString(
                        "en-US",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )
                    : "N/A"}
                </div>
              </div>

              <div className="border-l-4 border-l-green-500 bg-white p-4 rounded-r-lg shadow-sm">
                <div className="text-sm text-gray-600">Confirmation Date</div>
                <div className="text-lg font-semibold text-gray-800">
                  {employeeData.confirmationDate
                    ? new Date(
                        employeeData.confirmationDate
                      ).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "N/A"}
                </div>
              </div>

              <div className="border-l-4 border-l-purple-500 bg-white p-4 rounded-r-lg shadow-sm">
                <div className="text-sm text-gray-600">Length of Service</div>
                <div className="text-lg font-semibold text-gray-800">
                  {calculateLengthOfService(employeeData.joinDate)} days
                </div>
              </div>

              <div className="border-l-4 border-l-orange-500 bg-white p-4 rounded-r-lg shadow-sm">
                <div className="text-sm text-gray-600">Working Hours</div>
                <div className="text-lg font-semibold text-gray-800">
                  {employeeData.workStartTime} - {employeeData.workEndTime}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Attendance Card */}
        <Card className="bg-white shadow-sm border-0 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
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
              <div className="space-y-4">
                <div className="text-center py-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-3">
                    {todayStatus.status === "present" && (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    )}
                    {todayStatus.status === "absent" && (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                    {todayStatus.status === "leave" && (
                      <Clock className="w-6 h-6 text-yellow-600" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-1">
                    Attendance Marked
                  </h3>
                  <p className="text-gray-600 capitalize">
                    You have marked yourself as{" "}
                    <span className="font-semibold">{todayStatus.status}</span>{" "}
                    today.
                  </p>
                  {todayStatus.checkIn && (
                    <p className="text-gray-600 mt-2">
                      Check-in time:{" "}
                      <span className="font-semibold">
                        {todayStatus.checkIn}
                      </span>
                    </p>
                  )}
                  {todayStatus.checkOut && (
                    <p className="text-gray-600">
                      Check-out time:{" "}
                      <span className="font-semibold">
                        {todayStatus.checkOut}
                      </span>
                    </p>
                  )}
                </div>

                {/* Show checkout button if checked in but not checked out */}
                {todayStatus.checkIn && !todayStatus.checkOut && (
                  <div className="text-center">
                    <Button
                      onClick={() => markAttendance("present", "checkout")}
                      disabled={marking}
                      className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <Clock4 className="w-4 h-4" />
                      Check Out
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-1">
                    Mark Your Attendance
                  </h3>
                  <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
                    <Clock4 className="w-4 h-4" />
                    {employeeData.workStartTime} to {employeeData.workEndTime}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Button
                    onClick={() => markAttendance("present", "checkin")}
                    disabled={marking}
                    className="flex flex-col items-center justify-center h-20 bg-green-500 hover:bg-green-600 text-white"
                  >
                    <CheckCircle className="w-6 h-6 mb-1" />
                    <span>Check In</span>
                  </Button>

                  <Button
                    onClick={() => markAttendance("absent")}
                    disabled={marking}
                    variant="outline"
                    className="flex flex-col items-center justify-center h-20 border-red-200 hover:bg-red-50"
                  >
                    <XCircle className="w-6 h-6 mb-1 text-red-600" />
                    <span className="text-red-600">Absent</span>
                  </Button>

                  <Button
                    onClick={() => markAttendance("leave")}
                    disabled={marking}
                    variant="outline"
                    className="flex flex-col items-center justify-center h-20 border-yellow-200 hover:bg-yellow-50"
                  >
                    <Clock className="w-6 h-6 mb-1 text-yellow-600" />
                    <span className="text-yellow-600">On Leave</span>
                  </Button>
                </div>

                {marking && (
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                      <span>Processing attendance...</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm border border-gray-200">
              <CardContent className="p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Attendance Calendar
                  </h2>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handlePreviousMonth}
                      className="h-8 w-8 bg-transparent"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Select
                      value={`${currentMonth}-${currentYear}`}
                      onValueChange={(value) => {
                        const [month, year] = value.split("-");
                        setCurrentMonth(parseInt(month));
                        setCurrentYear(parseInt(year));
                      }}
                    >
                      <SelectTrigger className="w-[160px] h-8">
                        <SelectValue>
                          {monthNames[currentMonth]} {currentYear}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {monthNames.map((month, idx) => (
                          <SelectItem key={idx} value={`${idx}-${currentYear}`}>
                            {month} {currentYear}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleNextMonth}
                      className="h-8 w-8 bg-transparent"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                  <div className="border-l-4 border-l-gray-400 bg-white p-3 rounded-r-lg shadow-sm">
                    <div className="text-2xl font-bold text-gray-800">
                      {payableDays}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Payable Days
                    </div>
                  </div>
                  <div className="border-l-4 border-l-green-500 bg-white p-3 rounded-r-lg shadow-sm">
                    <div className="text-2xl font-bold text-gray-800">
                      {presentDays}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Present</div>
                  </div>
                  <div className="border-l-4 border-l-orange-500 bg-white p-3 rounded-r-lg shadow-sm">
                    <div className="text-2xl font-bold text-gray-800">
                      {lateDays}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Late</div>
                  </div>
                  <div className="border-l-4 border-l-purple-500 bg-white p-3 rounded-r-lg shadow-sm">
                    <div className="text-2xl font-bold text-gray-800">
                      {movementDays}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Movement</div>
                  </div>
                  <div className="border-l-4 border-l-blue-500 bg-white p-3 rounded-r-lg shadow-sm">
                    <div className="text-2xl font-bold text-gray-800">
                      {leaveDays}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Leave</div>
                  </div>
                  <div className="border-l-4 border-l-red-500 bg-white p-3 rounded-r-lg shadow-sm">
                    <div className="text-2xl font-bold text-gray-800">
                      {absentDays}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Absent</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  {/* Day Headers */}
                  <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                    {dayNames.map((day) => (
                      <div
                        key={day}
                        className="text-center py-3 text-sm font-medium text-gray-600 border-r border-gray-200 last:border-r-0"
                      >
                        <span className="hidden sm:inline">{day}</span>
                        <span className="sm:hidden">{day.slice(0, 3)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7">
                    {/* Empty cells for days before month starts */}
                    {Array.from({ length: firstDay }).map((_, idx) => (
                      <div
                        key={`empty-${idx}`}
                        className="aspect-square border-r border-b border-gray-200 bg-gray-50"
                      />
                    ))}

                    {/* Actual days */}
                    {Array.from({ length: daysInMonth }).map((_, idx) => {
                      const day = idx + 1;
                      const attendance = getAttendanceForDay(day);
                      const status = attendance?.status;
                      const isOnLeave = attendance?.isOnLeave;
                      const leaveDetails = attendance?.leaveDetails;

                      // Determine if this date is before the employee's start date or after today
                      const currentDate = new Date(
                        currentYear,
                        currentMonth,
                        day
                      );
                      const today = new Date();
                      today.setHours(0, 0, 0, 0); // Reset time part for comparison
                      const isBeforeStartDate =
                        employeeData.joinDate &&
                        currentDate < new Date(employeeData.joinDate);
                      const isAfterToday = currentDate > today;

                      // Determine background color based on status
                      let bgColor = "bg-white hover:bg-gray-50";
                      let statusLabel = "";
                      let statusColor = "";

                      // Check if it's a weekend
                      const date = new Date(currentYear, currentMonth, day);
                      const isWeekend =
                        date.getDay() === 0 || date.getDay() === 6;

                      if (isBeforeStartDate || isAfterToday) {
                        // Days before start date or after today remain blank
                        bgColor = "bg-white";
                      } else if (isWeekend) {
                        bgColor = "bg-gray-100";
                        statusLabel = "Weekend";
                      } else if (isOnLeave && leaveDetails) {
                        // On approved leave - check this BEFORE checking for missing attendance
                        bgColor = "bg-blue-50";
                        statusLabel = `${leaveDetails.type} Leave`;
                        statusColor = "text-blue-600 bg-blue-100";
                      } else if (!attendance) {
                        // No attendance record and not on leave
                        bgColor = "bg-red-50";
                        statusLabel = "Missing";
                        statusColor = "text-red-600 bg-red-100";
                      } else if (status === "present") {
                        bgColor = "bg-green-50";
                        statusLabel = "Present";
                        statusColor = "text-green-600 bg-green-100";
                        // Show check-in/check-out times if available
                        if (attendance.checkIn || attendance.checkOut) {
                          statusLabel = `${attendance.checkIn || "-"} / ${
                            attendance.checkOut || "-"
                          }`;
                        }
                      } else if (status === "late") {
                        bgColor = "bg-orange-50";
                        statusLabel = "Late";
                        statusColor = "text-orange-600 bg-orange-100";
                        // Show check-in/check-out times if available
                        if (attendance.checkIn || attendance.checkOut) {
                          statusLabel = `${attendance.checkIn || "-"} / ${
                            attendance.checkOut || "-"
                          }`;
                        }
                      } else if (status === "absent") {
                        bgColor = "bg-red-50";
                        statusLabel = "Absent";
                        statusColor = "text-red-600 bg-red-100";
                      }

                      return (
                        <div
                          key={day}
                          className={`aspect-square border-r border-b border-gray-200 p-2 relative ${bgColor} transition-colors`}
                        >
                          <div className="text-sm font-medium text-gray-800">
                            {day}
                          </div>
                          {statusLabel && (
                            <div className="absolute inset-x-2 bottom-2">
                              <div
                                className={`text-xs font-medium ${statusColor} px-2 py-1 rounded text-center truncate`}
                              >
                                {statusLabel}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="shadow-sm border border-gray-200 h-full">
              <CardContent className="p-4 md:p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {recentRecords.length > 0 ? (
                    recentRecords.map((record, idx) => (
                      <div
                        key={idx}
                        className="border-l-4 border-l-green-500 bg-white p-4 rounded-r-lg shadow-sm"
                      >
                        <div className="text-sm font-medium text-gray-600 mb-3">
                          {record.date}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="bg-blue-100 p-1.5 rounded">
                                <ArrowUp className="h-4 w-4 text-blue-600" />
                              </div>
                              <span className="text-sm font-medium text-blue-600">
                                Check In
                              </span>
                            </div>
                            <span className="text-sm text-gray-700">
                              {record.checkIn}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="bg-orange-100 p-1.5 rounded">
                                <ArrowDown className="h-4 w-4 text-orange-600" />
                              </div>
                              <span className="text-sm font-medium text-orange-600">
                                Check Out
                              </span>
                            </div>
                            <span className="text-sm text-gray-700">
                              {record.checkOut}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      No recent activity
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
