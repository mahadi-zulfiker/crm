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
} from "lucide-react";

export default function getALLRoles() {
  const roleMenus = {
    client: [
      {
        title: "Dashboard",
        icon: Home,
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
          // {
          //   name: "Job Templates",
          //   href: "/dashboard/client/templates",
          // },
        ],
      },
      {
        title: "Payment History",
        icon: WalletCards,
        href: "/dashboard/client/paymentHistory",
      },
      {
        title: "Profile",
        icon: User,
        href: "/dashboard/client/clientProfileManagement",
      },
      {
        title: "Messages",
        icon: MessageSquare,
        href: "/dashboard/client/vendorInteraction",
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
        icon: Home,
        href: "/dashboard/employee",
      },

      {
        title: "Job Search",
        icon: Briefcase,
        items: [
          { name: "Browse Jobs", href: "/allJobs" },
          // {
          //   name: "Recommendations",
          //   href: "/dashboard/client/jobs/recommendations",
          // },
        ],
      },
      {
        title: "My Jobs",
        icon: Briefcase,
        items: [
          { name: "Applied Jobs", href: "/dashboard/employee/appliedJobs" },
          { name: "Approved Jobs", href: "/dashboard/employee/approvedJobs" },
          { name: "Rejected Jobs", href: "/dashboard/employee/rejectedJobs" },
          { name: "Completed Jobs", href: "/dashboard/employee/completedJobs" },
        ],
      },
      {
        title: "Applications",
        icon: FileText,
        items: [
          { name: "My Applications", href: "/dashboard/client/applications" },
          {
            name: "Application Status",
            href: "/dashboard/client/applications/status",
          },
          {
            name: "Interview Schedule",
            href: "/dashboard/client/applications/interviews",
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
        title: "Profile",
        icon: User,
        href: "/dashboard/employee/profileManagement",
      },
      {
        title: "Messages",
        icon: MessageSquare,
        href: "/dashboard/employee/messages",
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
        icon: Home,
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
        title: "Clients",
        icon: Building2,
      },
      {
        title: "Revenue",
        icon: DollarSign,
      },
      {
        title: "Settings",
        icon: Settings,
      },
    ],
    admin: [
      {
        title: "Dashboard",
        icon: Home,
        href: "/dashboard/admin",
      },
      {
        title: "User Management",
        icon: Users,
        items: [
          { name: "Manage Users", href: "/dashboard/admin/userManagement" },
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
        ],
      },
      {
        title: "Profile",
        icon: User,
        href: "/dashboard/admin/adminProfileManagement",
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
