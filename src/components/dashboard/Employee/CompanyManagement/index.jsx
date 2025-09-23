import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building,
  Users,
  UserCheck,
  UserX,
  Calendar,
  FileText,
  CreditCard,
  CalendarDays,
  Clock,
  CalendarCheck,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

export default function CompanyManagement() {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [employeeStats, setEmployeeStats] = useState([
    {
      title: "Attendance Rate",
      value: "0%",
      icon: UserCheck,
      change: "0 days present",
    },
    {
      title: "Leave Balance",
      value: "0",
      icon: CalendarDays,
      change: "0 pending requests",
    },
    {
      title: "Active Loans",
      value: "0",
      icon: CreditCard,
      change: "0 approved, 0 pending",
    },
    {
      title: "Total Hours",
      value: "0",
      icon: Clock,
      change: "This month",
    },
  ]);
  const [loading, setLoading] = useState(true);

  // Fetch employee statistics from the database
  useEffect(() => {
    const fetchEmployeeStats = async () => {
      try {
        if (!session?.user?.id) return;

        setLoading(true);

        // Fetch employee reports data
        const response = await fetch(
          `/api/employee/reports?employeeId=${session.user.id}&days=30&months=12`
        );
        const data = await response.json();

        if (data.data) {
          const { attendance, leave, loans } = data.data;

          const updatedStats = [
            {
              title: "Attendance Rate",
              value: `${attendance.attendanceRate || 0}%`,
              icon: UserCheck,
              change: `${attendance.presentDays || 0} days present`,
            },
            {
              title: "Leave Balance",
              value: `${leave.approved || 0}`,
              icon: CalendarDays,
              change: `${leave.pending || 0} pending requests`,
            },
            {
              title: "Active Loans",
              value: `${loans.approved || 0}`,
              icon: CreditCard,
              change: `${loans.approved || 0} approved, ${
                loans.pending || 0
              } pending`,
            },
            {
              title: "Total Loans Amount",
              value: `$${loans.totalAmount || 0}`,
              icon: Wallet,
              change: "Total borrowed",
            },
          ];

          setEmployeeStats(updatedStats);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee stats:", error);
        toast({
          title: "Error",
          description: "Failed to fetch your statistics",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchEmployeeStats();
  }, [session]);

  const managementSections = [
    {
      title: "Attendance",
      description: "View your attendance records and history",
      icon: Calendar,
      href: "/dashboard/employee/companyManagement/attendance",
    },
    {
      title: "Leave Management",
      description: "Apply for leave and view leave balance",
      icon: CalendarDays,
      href: "/dashboard/employee/companyManagement/leaveManagement",
    },
    {
      title: "Loan Management",
      description: "View and apply for employee loans",
      icon: CreditCard,
      href: "/dashboard/employee/companyManagement/loanManagement",
    },
    {
      title: "Reports & Analytics",
      description: "View personal reports and analytics",
      icon: FileText,
      href: "/dashboard/employee/companyManagement/reportsAnalytics",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "Your attendance marked",
      description: "Today's attendance has been recorded",
      time: "Today",
    },
    {
      id: 2,
      action: "Leave request submitted",
      description: "Your leave request is pending approval",
      time: "2 days ago",
    },
    {
      id: 3,
      action: "Loan application",
      description: "Your loan application status updated",
      time: "1 week ago",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <p className="text-gray-600">Loading your data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <p className="text-gray-600">
          View your personal statistics and manage your employment details
        </p>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {employeeStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className="p-2 bg-blue-100 rounded-full">
                  <IconComponent className="w-4 h-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {/* Management Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {managementSections.map((section, index) => {
          const IconComponent = section.icon;
          return (
            <Card key={index} className="bg-white shadow-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconComponent className="w-5 h-5" />
                  {section.title}
                </CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={section.href}>
                  <Button className="w-full">Access {section.title}</Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {/* Recent Activities */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle>Your Recent Activities</CardTitle>
          <CardDescription>Latest updates related to you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50"
            >
              <div className="mt-1 p-2 bg-blue-100 rounded-full">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">{activity.action}</h4>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
