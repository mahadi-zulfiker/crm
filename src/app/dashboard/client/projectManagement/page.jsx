"use client";
import MainLayout from "@/components/dashboard/MainLayout";
import ClientProjectManagement from "@/components/dashboard/Client/ProjectManagement";

export default function ClientProjectManagementPage() {
  return (
    <MainLayout>
      <ClientProjectManagement />
    </MainLayout>
  );
}