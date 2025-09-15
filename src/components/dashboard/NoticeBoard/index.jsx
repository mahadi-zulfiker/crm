"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Info, CheckCircle, Bell } from "lucide-react";
import { useSession } from "next-auth/react";

export default function NoticeBoard() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const userRole = session?.user?.userType?.toLowerCase() || "user";

  // Fetch notices
  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/notices");
      const data = await response.json();

      if (data.success) {
        // Filter notices based on user role
        const filteredNotices = data.data.filter(
          (notice) =>
            notice.audience === "all" ||
            notice.audience === userRole ||
            (userRole === "user" && notice.audience === "employee")
        );
        setNotices(filteredNotices);
      }
    } catch (error) {
      console.error("Error fetching notices:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="w-4 h-4" />;
      case "medium":
        return <Info className="w-4 h-4" />;
      case "low":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Bell className="w-6 h-6 text-teal-600" />
        <h1 className="text-2xl font-bold text-gray-800">Notice Board</h1>
      </div>

      {notices.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No notices available
            </h3>
            <p className="text-gray-500">
              Check back later for updates and announcements.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {notices.map((notice) => (
            <Card
              key={notice._id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <CardTitle className="text-lg">{notice.title}</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      className={`${getPriorityColor(
                        notice.priority
                      )} flex items-center gap-1`}
                    >
                      {getPriorityIcon(notice.priority)}
                      {notice.priority.charAt(0).toUpperCase() +
                        notice.priority.slice(1)}
                    </Badge>
                    <Badge variant="secondary">
                      {notice.audience === "all"
                        ? "All Users"
                        : notice.audience.charAt(0).toUpperCase() +
                          notice.audience.slice(1)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{notice.content}</p>
                <div className="text-sm text-gray-500 flex flex-wrap items-center justify-between gap-2">
                  <span>Posted by {notice.createdBy}</span>
                  <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
