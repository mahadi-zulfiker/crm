import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserX, UserMinus } from "lucide-react";

function Admin() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
    onLeaveToday: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/admin/dashboard");
        const result = await response.json();
        if (response.ok) {
          setStats(result.data);
        } else {
          console.error(
            "Error fetching dashboard data:",
            result.error || "Unknown error"
          );
        }
      } catch (error) {
        console.error("Network error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: "Total Employees",
      value: stats.totalEmployees,
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Present Today",
      value: stats.presentToday,
      icon: UserCheck,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Absent Today",
      value: stats.absentToday,
      icon: UserX,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "On Leave Today",
      value: stats.onLeaveToday,
      icon: UserMinus,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  ];

  return (
    <div className="flex flex-col items-start w-full">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-8">
        {statCards.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="bg-white shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {loading ? (
                        <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                      ) : (
                        stat.value
                      )}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.iconBg}`}>
                    {loading ? (
                      <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                    ) : (
                      <IconComponent className={`w-6 h-6 ${stat.iconColor}`} />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <p className="text-gray-700">
        Welcome to your admin dashboard. Here you can manage all the
        administrative tasks efficiently.
      </p>
    </div>
  );
}

export default Admin;
