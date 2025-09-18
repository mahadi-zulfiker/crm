"use client";

import JobManagementAdmin from "@/components/dashboard/Admin/JobManagementAdmin";
import MainLayout from "@/components/dashboard/MainLayout";

export default function JobManagementAdminPage() {
  return (
    <MainLayout>
      <JobManagementAdmin />
    </MainLayout>
  );
}