"use client";

import EmployeeLoanManagement from "@/components/dashboard/Employee/LoanManagement";
import MainLayout from "@/components/dashboard/MainLayout";

export default function LoanManagementPage() {
  return (
    <MainLayout>
      <EmployeeLoanManagement />
    </MainLayout>
  );
}
