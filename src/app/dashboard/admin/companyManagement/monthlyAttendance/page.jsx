"use client";

import MonthlyAttendance from "@/components/dashboard/Admin/CompanyManagement/MonthlyAttendance";
import MainLayout from "@/components/dashboard/MainLayout";

export default function MonthlyAttendancePage() {
  return (
    <MainLayout>
      <MonthlyAttendance />
    </MainLayout>
  );
}