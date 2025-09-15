"use client";
import MainLayout from "@/components/dashboard/MainLayout";
import InterviewScheduleClient from "@/components/dashboard/Client/InterviewScheduleClient";

export default function ClientInterviews() {
  return (
    <>
      <MainLayout>
        <InterviewScheduleClient />
      </MainLayout>
    </>
  );
}
