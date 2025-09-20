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
  Calendar,
  Download,
  Search,
  UserCheck,
  UserX,
  Clock,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

export default function Attendance() {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMonth, setFilterMonth] = useState("all");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch attendance data from the database
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        if (!session?.user?.id) return;
        
        setLoading(true);
        const response = await fetch(
          `/api/employee/attendance?employeeId=${session.user.id}`
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
  }, [session]);

  const handleExport = () => {
    toast({
      title: "Attendance Export Started",
      description:
        "Your attendance report export has started. You'll receive a notification when it's ready.",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "weekend":
        return "bg-gray-100 text-gray-800";
      case "holiday":
        return "bg-blue-100 text-blue-800";
      case "leave":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "present":
        return "Present";
      case "absent":
        return "Absent";
      case "weekend":
        return "Weekend";
      case "holiday":
        return "Holiday";
      case "leave":
        return "On Leave";
      default:
        return status;
    }
  };

  const filteredAttendance = attendanceData.filter((record) => {
    const matchesSearch = record.date.includes(searchTerm);
    const matchesMonth =
      filterMonth === "all" || record.date.startsWith(filterMonth);
    return matchesSearch && matchesMonth;
  });

  // Calculate summary stats
  const presentDays = attendanceData.filter(
    (record) => record.status === "present"
  ).length;
  const absentDays = attendanceData.filter(
    (record) => record.status === "absent"
  ).length;
  const leaveDays = attendanceData.filter(
    (record) => record.status === "leave"
  ).length;
  const totalDays = attendanceData.filter(
    (record) => record.status !== "weekend"
  ).length;
  const attendanceRate =
    totalDays > 0 ? Math.round(((presentDays + leaveDays) / totalDays) * 100) : 0;

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Attendance</h1>
          <p className="text-gray-600">
            View and manage your attendance records
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search by date..."
              className="pl-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterMonth} onValueChange={setFilterMonth}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>
              <SelectItem value="2023-01">January 2023</SelectItem>
              <SelectItem value="2023-02">February 2023</SelectItem>
              <SelectItem value="2023-03">March 2023</SelectItem>
              <SelectItem value="2023-04">April 2023</SelectItem>
              <SelectItem value="2023-05">May 2023</SelectItem>
              <SelectItem value="2023-06">June 2023</SelectItem>
              <SelectItem value="2023-07">July 2023</SelectItem>
              <SelectItem value="2023-08">August 2023</SelectItem>
              <SelectItem value="2023-09">September 2023</SelectItem>
              <SelectItem value="2023-10">October 2023</SelectItem>
              <SelectItem value="2023-11">November 2023</SelectItem>
              <SelectItem value="2023-12">December 2023</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExport} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Days</CardTitle>
            <UserCheck className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{presentDays}</div>
            <p className="text-xs text-gray-500">Days you were present</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent Days</CardTitle>
            <UserX className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{absentDays}</div>
            <p className="text-xs text-gray-500">Days you were absent</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leave Days</CardTitle>
            <Clock className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaveDays}</div>
            <p className="text-xs text-gray-500">Days on leave</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Attendance Rate
            </CardTitle>
            <Calendar className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceRate}%</div>
            <p className="text-xs text-gray-500">Overall attendance rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Records */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
          <CardDescription>
            Your attendance history and records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Check In</th>
                  <th className="text-left py-3 px-4">Check Out</th>
                  <th className="text-left py-3 px-4">Hours</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendance.length > 0 ? (
                  filteredAttendance.map((record, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{record.date}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            record.status
                          )}`}
                        >
                          {getStatusText(record.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4">{record.checkIn}</td>
                      <td className="py-3 px-4">{record.checkOut}</td>
                      <td className="py-3 px-4">{record.hours}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-3 px-4 text-center text-gray-500">
                      No attendance records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}