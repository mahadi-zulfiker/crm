import React, { useState } from "react";
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

export default function Attendance() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMonth, setFilterMonth] = useState("all");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleExport = () => {
    toast({
      title: "Attendance Export Started",
      description:
        "Your attendance report export has started. You'll receive a notification when it's ready.",
    });
  };

  // Mock data for attendance records
  const attendanceData = [
    {
      date: "2023-06-01",
      status: "present",
      checkIn: "09:00",
      checkOut: "17:30",
      hours: "8.5",
    },
    {
      date: "2023-06-02",
      status: "present",
      checkIn: "08:45",
      checkOut: "17:15",
      hours: "8.5",
    },
    {
      date: "2023-06-03",
      status: "weekend",
      checkIn: "-",
      checkOut: "-",
      hours: "-",
    },
    {
      date: "2023-06-04",
      status: "weekend",
      checkIn: "-",
      checkOut: "-",
      hours: "-",
    },
    {
      date: "2023-06-05",
      status: "present",
      checkIn: "09:05",
      checkOut: "17:40",
      hours: "8.5",
    },
    {
      date: "2023-06-06",
      status: "present",
      checkIn: "09:00",
      checkOut: "17:30",
      hours: "8.5",
    },
    {
      date: "2023-06-07",
      status: "absent",
      checkIn: "-",
      checkOut: "-",
      hours: "-",
    },
    {
      date: "2023-06-08",
      status: "present",
      checkIn: "08:55",
      checkOut: "17:25",
      hours: "8.5",
    },
    {
      date: "2023-06-09",
      status: "present",
      checkIn: "09:00",
      checkOut: "17:30",
      hours: "8.5",
    },
    {
      date: "2023-06-10",
      status: "weekend",
      checkIn: "-",
      checkOut: "-",
      hours: "-",
    },
    {
      date: "2023-06-11",
      status: "weekend",
      checkIn: "-",
      checkOut: "-",
      hours: "-",
    },
    {
      date: "2023-06-12",
      status: "present",
      checkIn: "09:10",
      checkOut: "17:45",
      hours: "8.5",
    },
  ];

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
  const totalDays = attendanceData.filter(
    (record) => record.status !== "weekend"
  ).length;
  const attendanceRate =
    totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

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
              <SelectValue placeholder="Filter by Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>
              <SelectItem value="2023-06">June 2023</SelectItem>
              <SelectItem value="2023-05">May 2023</SelectItem>
              <SelectItem value="2023-04">April 2023</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExport} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Days</CardTitle>
            <UserCheck className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{presentDays}</div>
            <p className="text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent Days</CardTitle>
            <UserX className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{absentDays}</div>
            <p className="text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Attendance Rate
            </CardTitle>
            <Clock className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceRate}%</div>
            <p className="text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Working Days</CardTitle>
            <Calendar className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDays}</div>
            <p className="text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Records */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Attendance Records</CardTitle>
              <CardDescription>Your daily attendance history</CardDescription>
            </div>
          </div>
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
                {filteredAttendance.map((record, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {new Date(record.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
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
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
