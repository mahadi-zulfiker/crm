import {
  Home,
  User,
  Briefcase,
  FileText,
  Settings,
  BarChart3,
  Users,
  Building2,
  Package,
  MessageSquare,
  Award,
  Calendar,
  DollarSign,
  CreditCard,
  HomeIcon,
  WalletCards,
  Search,
  Bell,
  LayoutDashboard,
} from "lucide-react";

export default function getALLRoles() {
  const roleMenus = {
    client: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard/client",
      },
      {
        title: "Job Management",
        icon: Briefcase,
        items: [
          { name: "Posted Jobs", href: "/dashboard/client/postedJobs" },
          // { name: "Job Postings", href: "/dashboard/client/jobs" },
          { name: "Create Job", href: "/dashboard/client/createJobs" },
          {
            name: "Completed Job",
            href: "/dashboard/client/completedJobsClient",
          },
          {
            name: "Interview Schedule",
            href: "/dashboard/client/interviews",
          },
          // {
          //   name: "Job Templates",
          //   href: "/dashboard/client/templates",
          //   },
        ],
      },
      {
        title: "Payment History",
        icon: WalletCards,
        href: "/dashboard/client/paymentHistory",
      },
      {
        title: "Notice Board",
        icon: Bell,
        href: "/dashboard/client/noticeBoard",
      },
      {
        title: "Profile",
        icon: User,
        href: "/dashboard/client/clientProfileManagement",
      },

      {
        title: "Home",
        icon: HomeIcon,
        href: "/",
      },
      {
        title: "Settings",
        icon: Settings,
        href: "/dashboard/client/settings",
      },
    ],
    user: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard/employee",
      },

      {
        title: "Job Search",
        icon: Search,
        href: "/allJobs",
      },
      {
        title: "My Jobs",
        icon: Briefcase,
        items: [
          { name: "Applied Jobs", href: "/dashboard/employee/appliedJobs" },
          {
            name: "Interviewed Jobs",
            href: "/dashboard/employee/interviewedJobs",
          },
          { name: "Approved Jobs", href: "/dashboard/employee/approvedJobs" },
          // { name: "Rejected Jobs", href: "/dashboard/employee/rejectedJobs" },
          { name: "Completed Jobs", href: "/dashboard/employee/completedJobs" },
          {
            name: "All Applications",
            href: "/dashboard/employee/allJobApplications",
          },
        ],
      },

      {
        title: "Company Management",
        icon: Building2,
        items: [
          {
            name: "Overview",
            href: "/dashboard/employee/companyManagement",
          },
          {
            name: "Attendance",
            href: "/dashboard/employee/companyManagement/attendance",
          },
          {
            name: "Leave Management",
            href: "/dashboard/employee/companyManagement/leaveManagement",
          },
          {
            name: "Loan Management",
            href: "/dashboard/employee/companyManagement/loanManagement",
          },
          {
            name: "Reports & Analytics",
            href: "/dashboard/employee/companyManagement/reportsAnalytics",
          },
        ],
      },
      {
        title: "Job Management",
        icon: FileText,
        items: [
          {
            name: "Job Apply Management",
            href: "/dashboard/employee/jobApplyManagement",
          },
          { name: "Job History", href: "/dashboard/employee/jobHistory" },
        ],
      },
      {
        title: "Notice Board",
        icon: Bell,
        href: "/dashboard/employee/noticeBoard",
      },
      {
        title: "Profile",
        icon: User,
        href: "/dashboard/employee/profileManagement",
      },

      {
        title: "Home",
        icon: HomeIcon,
        href: "/",
      },
      {
        title: "Settings",
        icon: Settings,
        href: "/dashboard/employee/settings",
      },
    ],
    vendor: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard/vendor",
      },
      {
        title: "Services",
        icon: Package,
        items: [
          { name: "My Services", href: "/dashboard/vendor/services" },
          {
            name: "Service Packages",
            href: "/dashboard/vendor/services/packages",
          },
          { name: "Pricing", href: "/dashboard/vendor/services/pricing" },
        ],
      },
      {
        title: "Projects",
        icon: Briefcase,
        items: [
          { name: "Active Projects", href: "/dashboard/vendor/projects" },
          {
            name: "Project History",
            href: "/dashboard/vendor/projects/history",
          },
          {
            name: "Client Feedback",
            href: "/dashboard/vendor/projects/feedback",
          },
        ],
      },
      {
        title: "Notice Board",
        icon: Bell,
        href: "/dashboard/vendor/noticeBoard",
      },
      {
        title: "Clients",
        icon: Building2,
        href: "/dashboard/vendor/clients",
      },
      {
        title: "Revenue",
        icon: DollarSign,
        href: "/dashboard/vendor/revenue",
      },
      {
        title: "Home",
        icon: HomeIcon,
        href: "/",
      },
      {
        title: "Settings",
        icon: Settings,
        href: "/dashboard/vendor/settings",
      },
    ],
    admin: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard/admin",
      },
      {
        title: "User Management",
        icon: Users,
        href: "/dashboard/admin/userManagement",
      },
      {
        title: "Company Management",
        icon: Building2,
        items: [
          {
            name: "Attendance",
            href: "/dashboard/admin/companyManagement/attendance",
          },
          {
            name: "Monthly Attendance",
            href: "/dashboard/admin/companyManagement/monthlyAttendance",
          },
          {
            name: "Missing Attendance",
            href: "/dashboard/admin/companyManagement/missingAttendance",
          },
          {
            name: "Loan List",
            href: "/dashboard/admin/companyManagement/loanList",
          },
          {
            name: "Leave Management",
            href: "/dashboard/admin/companyManagement/leaveManagement",
          },
          {
            name: "Employee Management",
            href: "/dashboard/admin/companyManagement/employeeManagement",
          },
          {
            name: "Reports & Analytics",
            href: "/dashboard/admin/companyManagement/reportsAnalytics",
          },
        ],
      },
      {
        title: "Job Management",
        icon: Briefcase,
        items: [
          { name: "Manage Jobs", href: "/dashboard/admin/jobManagementAdmin" },
          { name: "Job Progress", href: "/dashboard/admin/jobProgressAdmin" },
          {
            name: "Job Categories",
            href: "/dashboard/admin/createJobCategory",
          },
          {
            name: "Applications",
            href: "/dashboard/admin/applicationManagementE",
          },
          { name: "Time Sheet", href: "/dashboard/admin/timeSheetJob" },
        ],
      },
      // {
      //   title: "Reports & Analytics",
      //   icon: BarChart3,
      //   href: "/dashboard/admin/reportsAnalyticsAdmin",
      // },
      {
        title: "Content Management",
        icon: FileText,
        items: [
          { name: "Post Blogs", href: "/dashboard/admin/postBlogs" },
          { name: "Post Projects", href: "/dashboard/admin/postProjects" },
          { name: "View Resumes", href: "/dashboard/admin/viewResumeAdmin" },
          {
            name: "Notice Management",
            href: "/dashboard/admin/noticeManagement",
          },
        ],
      },
      {
        title: "Notice Board",
        icon: Bell,
        href: "/dashboard/admin/noticeBoard",
      },
      {
        title: "Profile",
        icon: User,
        href: "/dashboard/admin/adminProfileManagement",
      },
      {
        title: "Home",
        icon: HomeIcon,
        href: "/",
      },
      {
        title: "Settings",
        icon: Settings,
        href: "/dashboard/admin/settings",
      },
    ],
  };
  return roleMenus;
}
