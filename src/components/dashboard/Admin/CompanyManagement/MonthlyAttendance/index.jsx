import React from "react";
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

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Monthly attendance report export has started.",
    });
  };

  // Mock data for monthly attendance
  const monthlyData = [
    { month: "January", present: 125, absent: 10, leave: 5 },
    { month: "February", present: 122, absent: 8, leave: 6 },
    { month: "March", present: 130, absent: 5, leave: 3 },
    { month: "April", present: 127, absent: 7, leave: 4 },
    { month: "May", present: 120, absent: 12, leave: 6 },
    { month: "June", present: 115, absent: 15, leave: 8 },
  ];

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
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-gray-500">+2% from last quarter</p>
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
            <div className="text-2xl font-bold">March</div>
            <p className="text-xs text-gray-500">95% attendance rate</p>
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
            <div className="text-2xl font-bold">June</div>
            <p className="text-xs text-gray-500">85% attendance rate</p>
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
            {monthlyData.map((data, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{data.month}</span>
                  <span>
                    {Math.round(
                      (data.present /
                        (data.present + data.absent + data.leave)) *
                        100
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{
                      width: `${
                        (data.present /
                          (data.present + data.absent + data.leave)) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="flex text-xs text-gray-500 justify-between">
                  <span>{data.present} Present</span>
                  <span>{data.absent} Absent</span>
                  <span>{data.leave} Leave</span>
                </div>
              </div>
            ))}
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
                {monthlyData.map((data, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{data.month}</td>
                    <td className="py-3 px-4">
                      {data.present + data.absent + data.leave}
                    </td>
                    <td className="py-3 px-4 text-green-600">{data.present}</td>
                    <td className="py-3 px-4 text-red-600">{data.absent}</td>
                    <td className="py-3 px-4 text-yellow-600">{data.leave}</td>
                    <td className="py-3 px-4 font-medium">
                      {Math.round(
                        (data.present /
                          (data.present + data.absent + data.leave)) *
                          100
                      )}
                      %
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
