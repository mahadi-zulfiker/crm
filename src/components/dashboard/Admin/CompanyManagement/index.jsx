import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Users, UserCheck, UserX, Calendar } from "lucide-react";

export default function CompanyManagement() {
  const companyStats = [
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

  const recentActivities = [
    {
      id: 1,
      action: "New employee onboarded",
      description: "Sarah Johnson joined as Senior Developer",
      time: "2 hours ago",
    },
    {
      id: 2,
      action: "Department restructuring",
      description: "Marketing team expanded with 3 new positions",
      time: "1 day ago",
    },
    {
      id: 3,
      action: "Policy update",
      description: "Updated remote work policy effective next month",
      time: "2 days ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Company Management</h1>
        <p className="text-gray-600">
          Manage your organization structure and employee information
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle>Department Management</CardTitle>
            <CardDescription>
              View and manage company departments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Engineering</h3>
                <p className="text-sm text-gray-500">42 employees</p>
              </div>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Marketing</h3>
                <p className="text-sm text-gray-500">28 employees</p>
              </div>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Sales</h3>
                <p className="text-sm text-gray-500">35 employees</p>
              </div>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
            <Button className="w-full">Add New Department</Button>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest company management updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="mt-1 p-2 bg-blue-100 rounded-full">
                  <Calendar className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">{activity.action}</h4>
                  <p className="text-sm text-gray-600">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button>
          <Users className="w-4 h-4 mr-2" />
          View All Employees
        </Button>
        <Button variant="outline">
          <Building className="w-4 h-4 mr-2" />
          Manage Departments
        </Button>
        <Button variant="outline">
          <Calendar className="w-4 h-4 mr-2" />
          Attendance Reports
        </Button>
      </div>
    </div>
  );
}
