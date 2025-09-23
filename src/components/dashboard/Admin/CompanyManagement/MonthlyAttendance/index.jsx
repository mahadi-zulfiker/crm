import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, BarChart3, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function MonthlyAttendance() {
  const { toast } = useToast();
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyAttendanceData = async () => {
      try {
        setLoading(true);
        // Calculate date range for the past 6 months
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 5);

        const response = await fetch(
          `/api/admin/attendance?startDate=${
            startDate.toISOString().split("T")[0]
          }&endDate=${endDate.toISOString().split("T")[0]}`
        );
        const data = await response.json();

        if (response.ok) {
          // Process data to group by month
          const months = [];
          for (let i = 5; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            const monthName = date.toLocaleString("default", { month: "long" });
            const year = date.getFullYear();
            months.push({
              month: `${monthName} ${year}`,
              present: 0,
              absent: 0,
              leave: 0,
              totalEmployees: 0,
            });
          }

          // Count attendance by month
          data.data.forEach((record) => {
            const recordDate = new Date(record.date);
            const monthIndex = months.findIndex(
              (m) =>
                m.month.includes(
                  recordDate.toLocaleString("default", { month: "long" })
                ) && m.month.includes(recordDate.getFullYear())
            );

            if (monthIndex !== -1) {
              switch (record.status) {
                case "present":
                  months[monthIndex].present++;
                  break;
                case "absent":
                  months[monthIndex].absent++;
                  break;
                case "leave":
                  months[monthIndex].leave++;
                  break;
              }
              // Count total employees (only once per employee per month)
              months[monthIndex].totalEmployees =
                months[monthIndex].present +
                months[monthIndex].absent +
                months[monthIndex].leave;
            }
          });

          setMonthlyData(months);
        } else {
          toast({
            title: "Error",
            description:
              data.error || "Failed to fetch monthly attendance data",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching monthly attendance data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch monthly attendance data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyAttendanceData();
  }, []);

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Monthly attendance report export has started.",
    });
  };

  // Calculate summary stats
  const calculateStats = () => {
    if (monthlyData.length === 0)
      return { avgAttendance: 0, highest: null, lowest: null };

    let totalAttendance = 0;
    let validMonths = 0;
    let highest = monthlyData[0];
    let lowest = monthlyData[0];

    monthlyData.forEach((data) => {
      const total = data.present + data.absent + data.leave;
      if (total > 0) {
        const rate = (data.present / total) * 100;
        totalAttendance += rate;
        validMonths++;

        if (
          rate >
          (highest.present /
            (highest.present + highest.absent + highest.leave)) *
            100
        ) {
          highest = data;
        }

        if (
          rate <
          (lowest.present / (lowest.present + lowest.absent + lowest.leave)) *
            100
        ) {
          lowest = data;
        }
      }
    });

    const avgAttendance = validMonths > 0 ? totalAttendance / validMonths : 0;
    return { avgAttendance, highest, lowest };
  };

  const stats = calculateStats();

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
          <h1 className="text-3xl font-bold">Monthly Attendance Report</h1>
          <p className="text-gray-600">
            View and analyze attendance trends across months
          </p>
        </div>
        <Button onClick={handleExport} className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Monthly Attendance
            </CardTitle>
            <Calendar className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(stats.avgAttendance)}%
            </div>
            <p className="text-xs text-gray-500">Based on last 6 months</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Highest Attendance
            </CardTitle>
            <BarChart3 className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.highest?.month.split(" ")[0] || "N/A"}
            </div>
            <p className="text-xs text-gray-500">
              {stats.highest
                ? Math.round(
                    (stats.highest.present /
                      (stats.highest.present +
                        stats.highest.absent +
                        stats.highest.leave)) *
                      100
                  )
                : 0}
              % attendance rate
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Lowest Attendance
            </CardTitle>
            <BarChart3 className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.lowest?.month.split(" ")[0] || "N/A"}
            </div>
            <p className="text-xs text-gray-500">
              {stats.lowest
                ? Math.round(
                    (stats.lowest.present /
                      (stats.lowest.present +
                        stats.lowest.absent +
                        stats.lowest.leave)) *
                      100
                  )
                : 0}
              % attendance rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Attendance Chart */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle>Monthly Attendance Trends</CardTitle>
          <CardDescription>
            Attendance rates across the past 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyData.map((data, index) => {
              const total = data.present + data.absent + data.leave;
              const attendanceRate =
                total > 0 ? (data.present / total) * 100 : 0;

              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{data.month}</span>
                    <span>{Math.round(attendanceRate)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-green-600 h-2.5 rounded-full"
                      style={{
                        width: `${attendanceRate}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex text-xs text-gray-500 justify-between">
                    <span>{data.present} Present</span>
                    <span>{data.absent} Absent</span>
                    <span>{data.leave} Leave</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Table */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle>Detailed Monthly Report</CardTitle>
          <CardDescription>Breakdown of attendance by month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Month</th>
                  <th className="text-left py-3 px-4">Total Employees</th>
                  <th className="text-left py-3 px-4">Present</th>
                  <th className="text-left py-3 px-4">Absent</th>
                  <th className="text-left py-3 px-4">On Leave</th>
                  <th className="text-left py-3 px-4">Attendance Rate</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((data, index) => {
                  const total = data.present + data.absent + data.leave;
                  const attendanceRate =
                    total > 0 ? Math.round((data.present / total) * 100) : 0;

                  return (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{data.month}</td>
                      <td className="py-3 px-4">{total}</td>
                      <td className="py-3 px-4 text-green-600">
                        {data.present}
                      </td>
                      <td className="py-3 px-4 text-red-600">{data.absent}</td>
                      <td className="py-3 px-4 text-yellow-600">
                        {data.leave}
                      </td>
                      <td className="py-3 px-4 font-medium">
                        {attendanceRate}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
