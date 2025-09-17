"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./SidebarLayout";
import Header from "./HeaderLayout";
import Client from "./Client";
import Vendor from "./Vendor";
import Admin from "./Admin";
import Employee from "./Employee";
import AppliedJobs from "./Employee/AppliedJobs";
import ApprovedJobs from "./Employee/ApprovedJobs";
import RejectedJobs from "./Employee/RejectedJobs";
import CompletedJobs from "./Employee/CompletedJobs";
import PostedJobs from "./Client/PostedJobs";
import CompletedJobsClient from "./Client/CompletedJobsClient";
import PaymentHistory from "./Client/PaymentHistory";
import UserManagement from "./Admin/UserManagement";
import EmployeeManagement from "./Vendor/EmployeeManagement";
import JobApplyManagement from "./Employee/JobApplyManagement";
import JobHistory from "./Employee/JobHistory";
import ProfileManagement from "./Employee/ProfileManagement";
import VendorInteraction from "./Client/VendorInteraction";
import JobHistoryReports from "./Client/JobHistoryReports";
import JobManagementAdmin from "./Admin/JobManagementAdmin";
import JobManagementClient from "./Client/JobManagementClient";
import JobManagementVendor from "./Vendor/JobManagementVendor";
import ReportsAnalyticsAdmin from "./Admin/ReportAnalyticsAdmin";
import ReportsAnalyticsVendor from "./Vendor/ReportsAnalyticsVendor";
import PostBlogs from "./Admin/PostBlogs";
import PostProjects from "./Admin/PostProjects";
import Meeting from "./Vendor/Meeting";
import JobProgressVendor from "./Vendor/JobProgressVendor";
import ViewResumeVendor from "./Vendor/ViewResumeVendor";
import ViewResumeAdmin from "./Admin/ViewResumeAdmin";
import JobProgressAdmin from "./Admin/JobProgressAdmin";
import CreateJobCategory from "./Admin/CreateJobCategory";
import ApplicationManagementE from "./Admin/ApplicationManagementE";
import TimeSheetJob from "./Admin/TimeSheetJob";
import AdminProfileManagement from "./Admin/AdminProfileManagement";
import VendorProfileManagement from "./Vendor/VendorProfileManagement";
import ClientProfileManagement from "./Client/ClientProfileManagement";
import Messages from "./Employee/Messages";
import AllJobApplications from "./Employee/AllJobApplications";
import CreateJobs from "./Client/CreateJobs";
import ALlCandidates from "./Client/AllCandidates";
import HiredCandidatesPage from "./Client/HiredCandidatesClient";
import JobDetailsClient from "./Client/JobDetailsClient";
import ViewEmployeeProfile from "./Client/ViewEmployeeProfile";
import InterviewScheduleClient from "./Client/InterviewScheduleClient";
import SetInterViewClient from "./Client/SetInterviewClient";
import InterviewedJobs from "./Employee/InterviewedJobs";
import NoticeBoard from "./NoticeBoard";
import NoticeManagement from "./Admin/NoticeManagement";
import AdminNoticeBoard from "./Admin/NoticeBoard";
import Attendance from "./Employee/Attendance";
import CompanyManagement from "./Admin/CompanyManagement";
import Company from "./Employee/Company";
import AttendanceManagement from "./Admin/CompanyManagement/Attendance";
import MonthlyAttendance from "./Admin/CompanyManagement/MonthlyAttendance";
import MissingAttendance from "./Admin/CompanyManagement/MissingAttendance";
import LoanList from "./Admin/CompanyManagement/LoanList";
import LeaveManagement from "./Admin/CompanyManagement/LeaveManagement";
import CompanyEmployeeManagement from "./Admin/CompanyManagement/EmployeeManagement";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const pathname = usePathname();

  return (
    <div className="relative bg-[#f7f6f9] w-full h-screen font-[sans-serif] flex flex-col lg:flex-row">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen">
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Content based on route */}
        <div className="flex-1 overflow-y-auto bg-[#f7f6f9] p-3 md:p-6">
          {pathname === "/dashboard/client" && <Client />}
          {pathname === "/dashboard/client/postedJobs" && <PostedJobs />}
          {pathname === "/dashboard/client/completedJobsClient" && (
            <CompletedJobsClient />
          )}
          {pathname === "/dashboard/client/paymentHistory" && (
            <PaymentHistory />
          )}
          {pathname === "/dashboard/client/jobManagementClient" && (
            <JobManagementClient />
          )}
          {pathname === "/dashboard/client/vendorInteraction" && (
            <VendorInteraction />
          )}
          {pathname === "/dashboard/client/jobHistoryReports" && (
            <JobHistoryReports />
          )}
          {pathname === "/dashboard/client/clientProfileManagement" && (
            <ClientProfileManagement />
          )}
          {pathname === "/dashboard/client/createJobs" && <CreateJobs />}
          {pathname === "/dashboard/client/jobDetailsClient" && (
            <JobDetailsClient />
          )}
          {pathname === "/dashboard/client/allCandidates" && <ALlCandidates />}
          {pathname === "/dashboard/client/hiredCandidatesClient" && (
            <HiredCandidatesPage />
          )}
          {pathname === "/dashboard/client/viewEmployeeProfile" && (
            <ViewEmployeeProfile />
          )}
          {pathname === "/dashboard/client/interviewScheduleClient" && (
            <InterviewScheduleClient />
          )}
          {pathname === "/dashboard/client/interviews" && (
            <InterviewScheduleClient />
          )}
          {pathname === "/dashboard/client/noticeBoard" && <NoticeBoard />}

          {pathname === "/dashboard/vendor" && <Vendor />}
          {pathname === "/dashboard/vendor/jobManagementVendor" && (
            <JobManagementVendor />
          )}
          {pathname === "/dashboard/vendor/employeeManagement" && (
            <EmployeeManagement />
          )}
          {pathname === "/dashboard/vendor/reportsAnalyticsVendor" && (
            <ReportsAnalyticsVendor />
          )}
          {pathname === "/dashboard/vendor/meeting" && <Meeting />}
          {pathname === "/dashboard/vendor/jobProgressVendor" && (
            <JobProgressVendor />
          )}
          {pathname === "/dashboard/vendor/viewResumeVendor" && (
            <ViewResumeVendor />
          )}
          {pathname === "/dashboard/vendor/vendorProfileManagement" && (
            <VendorProfileManagement />
          )}
          {pathname === "/dashboard/vendor/noticeBoard" && <NoticeBoard />}

          {pathname === "/dashboard/admin" && <Admin />}
          {pathname === "/dashboard/admin/userManagement" && <UserManagement />}
          {pathname === "/dashboard/admin/jobManagementAdmin" && (
            <JobManagementAdmin />
          )}
          {pathname === "/dashboard/admin/reportsAnalyticsAdmin" && (
            <ReportsAnalyticsAdmin />
          )}
          {pathname === "/dashboard/admin/postBlogs" && <PostBlogs />}
          {pathname === "/dashboard/admin/postProjects" && <PostProjects />}
          {pathname === "/dashboard/admin/jobProgressAdmin" && (
            <JobProgressAdmin />
          )}
          {pathname === "/dashboard/admin/viewResumeAdmin" && (
            <ViewResumeAdmin />
          )}
          {pathname === "/dashboard/admin/createJobCategory" && (
            <CreateJobCategory />
          )}
          {pathname === "/dashboard/admin/applicationManagementE" && (
            <ApplicationManagementE />
          )}
          {pathname === "/dashboard/admin/timeSheetJob" && <TimeSheetJob />}
          {pathname === "/dashboard/admin/adminProfileManagement" && (
            <AdminProfileManagement />
          )}
          {pathname === "/dashboard/admin/noticeManagement" && (
            <NoticeManagement />
          )}
          {pathname === "/dashboard/admin/noticeBoard" && <AdminNoticeBoard />}
          {pathname === "/dashboard/admin/companyManagement" && (
            <CompanyManagement />
          )}
          {pathname === "/dashboard/admin/companyManagement/attendance" && (
            <AttendanceManagement />
          )}
          {pathname ===
            "/dashboard/admin/companyManagement/monthlyAttendance" && (
            <MonthlyAttendance />
          )}
          {pathname ===
            "/dashboard/admin/companyManagement/missingAttendance" && (
            <MissingAttendance />
          )}
          {pathname === "/dashboard/admin/companyManagement/loanList" && (
            <LoanList />
          )}
          {pathname ===
            "/dashboard/admin/companyManagement/leaveManagement" && (
            <LeaveManagement />
          )}
          {pathname ===
            "/dashboard/admin/companyManagement/employeeManagement" && (
            <CompanyEmployeeManagement />
          )}

          {pathname === "/dashboard/employee" && <Employee />}
          {pathname === "/dashboard/employee/appliedJobs" && <AppliedJobs />}
          {pathname === "/dashboard/employee/approvedJobs" && <ApprovedJobs />}
          {pathname === "/dashboard/employee/rejectedJobs" && <RejectedJobs />}
          {pathname === "/dashboard/employee/completedJobs" && (
            <CompletedJobs />
          )}
          {pathname === "/dashboard/employee/jobApplyManagement" && (
            <JobApplyManagement />
          )}
          {pathname === "/dashboard/employee/jobHistory" && <JobHistory />}
          {pathname === "/dashboard/employee/profileManagement" && (
            <ProfileManagement />
          )}
          {pathname === "/dashboard/employee/messages" && <Messages />}
          {pathname === "/dashboard/employee/allJobApplications" && (
            <AllJobApplications />
          )}
          {pathname === "/dashboard/employee/interviewedJobs" && (
            <InterviewedJobs />
          )}
          {pathname === "/dashboard/employee/noticeBoard" && <NoticeBoard />}
          {pathname === "/dashboard/employee/attendance" && <Attendance />}
          {pathname === "/dashboard/employee/company" && <Company />}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
