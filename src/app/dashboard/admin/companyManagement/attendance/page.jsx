"use client";

import AttendanceManagement from "@/components/dashboard/Admin/CompanyManagement/Attendance";
import MainLayout from "@/components/dashboard/MainLayout";

export default function AttendancePage() {
  return (
    <MainLayout>
      <AttendanceManagement />
    </MainLayout>
  );
}
