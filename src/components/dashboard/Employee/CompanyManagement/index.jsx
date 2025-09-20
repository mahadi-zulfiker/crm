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
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

export default function CompanyManagement() {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [companyStats, setCompanyStats] = useState([
    {
      title: "Total Departments",
      value: "0",
      icon: Building,
      change: "+0 from last month",
    },
    {
      title: "Total Employees",
      value: "0",
      icon: Users,
      change: "+0 from last month",
    },
    {
      title: "Present Today",
      value: "0",
      icon: UserCheck,
      change: "0% attendance rate",
    },
    {
      title: "Absent Today",
      value: "0",
      icon: UserX,
      change: "0% absence rate",
    },
  ]);
  const [loading, setLoading] = useState(true);

  // Fetch company statistics from the database
  useEffect(() => {
    const fetchCompanyStats = async () => {
      try {
        if (!session?.user?.id) return;
        
        setLoading(true);
        // In a real implementation, this would fetch from an API
        // For now, we'll use mock data but with a loading state
        setTimeout(() => {
          const updatedStats = [
            {
              title: "Total Departments",
              value: "12",
              icon: Building,
              change: "+2 from last month",
            },
            {
              title: "Total Employees",
              value: "142",
              icon: Users,
              change: "+5 from last month",
            },
            {
              title: "Present Today",
              value: "128",
              icon: UserCheck,
              change: "90% attendance rate",
            },
            {
              title: "Absent Today",
              value: "14",
              icon: UserX,
              change: "10% absence rate",
            },
          ];
          setCompanyStats(updatedStats);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching company stats:", error);
        toast({
          title: "Error",
          description: "Failed to fetch company statistics",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchCompanyStats();
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
      action: "New policy update",
      description: "Updated remote work policy effective next month",
      time: "2 hours ago",
    },
    {
      id: 2,
      action: "Team meeting scheduled",
      description: "Monthly all-hands meeting this Friday",
      time: "1 day ago",
    },
    {
      id: 3,
      action: "Performance reviews",
      description: "Q3 performance reviews starting next week",
      time: "2 days ago",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <p className="text-gray-600">Loading company data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Company Management</h1>
        <p className="text-gray-600">
          Access company information and manage your employment details
        </p>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {companyStats.map((stat, index) => {
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
          <CardTitle>Recent Company Updates</CardTitle>
          <CardDescription>Latest announcements and activities</CardDescription>
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