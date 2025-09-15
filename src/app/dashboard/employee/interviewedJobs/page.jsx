"use client";
import MainLayout from "@/components/dashboard/MainLayout";
import InterviewedJobs from "@/components/dashboard/Employee/InterviewedJobs";

export default function InterviewedJobsPage() {
  return (
    <MainLayout>
      <InterviewedJobs />
    </MainLayout>
  );
}
