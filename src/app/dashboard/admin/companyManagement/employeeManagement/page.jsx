"use client";

import CompanyEmployeeManagement from "@/components/dashboard/Admin/CompanyManagement/EmployeeManagement";
import MainLayout from "@/components/dashboard/MainLayout";

export default function EmployeeManagementPage() {
  return (
    <MainLayout>
      <CompanyEmployeeManagement />
    </MainLayout>
  );
}
