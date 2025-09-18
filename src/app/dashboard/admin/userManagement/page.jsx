"use client";

import UserManagement from "@/components/dashboard/Admin/UserManagement";
import MainLayout from "@/components/dashboard/MainLayout";

export default function UserManagementPage() {
  return (
    <MainLayout>
      <UserManagement />
    </MainLayout>
  );
}