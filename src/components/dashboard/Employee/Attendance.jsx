import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, XCircle, Clock } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

export default function Attendance() {
  const { data: session } = useSession();
  const [todayStatus, setTodayStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);

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
          setTodayStatus(data.data[0].status);
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
        toast.error("Failed to fetch attendance status");
      } finally {
        setLoading(false);
      }
    };

    fetchTodayAttendance();
  }, [session]);

  const markAttendance = async (status) => {
    try {
      setMarking(true);
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId: session?.user?.id,
          status: status,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTodayStatus(status);
        toast.success(`Attendance marked as ${status} successfully!`);
      } else {
        toast.error(data.error || "Failed to mark attendance");
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      toast.error("Failed to mark attendance");
    } finally {
      setMarking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <p className="text-gray-600">Loading attendance status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Daily Attendance</h1>
        <p className="text-gray-600">Mark your attendance for today</p>
      </div>

      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
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
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                {todayStatus === "present" && (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                )}
                {todayStatus === "absent" && (
                  <XCircle className="w-8 h-8 text-red-600" />
                )}
                {todayStatus === "leave" && (
                  <Clock className="w-8 h-8 text-yellow-600" />
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">Attendance Marked</h3>
              <p className="text-gray-600 capitalize">
                You have marked yourself as{" "}
                <span className="font-semibold">{todayStatus}</span> today.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">
                  Mark Your Attendance
                </h3>
                <p className="text-gray-600">
                  Please select your attendance status for today
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => markAttendance("present")}
                  disabled={marking}
                  className="flex flex-col items-center justify-center h-24 bg-green-500 hover:bg-green-600 text-white"
                >
                  <CheckCircle className="w-8 h-8 mb-2" />
                  <span>Present</span>
                </Button>

                <Button
                  onClick={() => markAttendance("absent")}
                  disabled={marking}
                  variant="outline"
                  className="flex flex-col items-center justify-center h-24 border-red-200 hover:bg-red-50"
                >
                  <XCircle className="w-8 h-8 mb-2 text-red-600" />
                  <span className="text-red-600">Absent</span>
                </Button>

                <Button
                  onClick={() => markAttendance("leave")}
                  disabled={marking}
                  variant="outline"
                  className="flex flex-col items-center justify-center h-24 border-yellow-200 hover:bg-yellow-50"
                >
                  <Clock className="w-8 h-8 mb-2 text-yellow-600" />
                  <span className="text-yellow-600">On Leave</span>
                </Button>
              </div>

              {marking && (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mr-2"></div>
                    <span>Marking attendance...</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
