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
} from "lucide-react";

export default function getALLRoles() {
  const roleMenus = {
    user: [
      {
        title: "Dashboard",
        icon: Home,
        href: "/dashboard/client",
      },
      {
        title: "Job Search",
        icon: Briefcase,
        items: [
          { name: "Browse Jobs", href: "/allJobs" },
          { name: "Saved Jobs", href: "/dashboard/client/jobs/saved" },
          {
            name: "Completed Jobs",
            href: "/dashboard/client/completedJobsClient",
          },
          { name: "Posted Jobs", href: "/dashboard/client/jobs/postedJobs" },
          {
            name: "Recommendations",
            href: "/dashboard/client/jobs/recommendations",
          },
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
        title: "Profile",
        icon: User,
      },
      {
        title: "Messages",
        icon: MessageSquare,
      },
      {
        title: "Settings",
        icon: Settings,
      },
    ],
    employee: [
      {
        title: "Dashboard",
        icon: Home,
        href: "/dashboard/employee",
      },
      {
        title: "Job Management",
        icon: Briefcase,
        items: [
          { name: "Job Postings", href: "/dashboard/employee/jobs" },
          { name: "Create Job", href: "/dashboard/employee/jobs/create" },
          {
            name: "Job Templates",
            href: "/dashboard/employee/jobs/templates",
          },
        ],
      },
      {
        title: "Candidates",
        icon: Users,
        items: [
          {
            name: "All Applications",
            href: "/dashboard/employee/applications",
          },
          { name: "Candidate Pool", href: "/dashboard/employee/candidates" },
          {
            name: "Interview Schedule",
            href: "/dashboard/employee/interviews",
          },
          { name: "Hired Candidates", href: "/dashboard/employee/hired" },
        ],
      },
      {
        title: "Analytics",
        icon: BarChart3,
      },
      {
        title: "Messages",
        icon: MessageSquare,
      },
      {
        title: "Settings",
        icon: Settings,
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
        title: "Attendance",
        icon: Users,
        items: [
          {
            name: "Attendance form",
            href: "/dashboard/admin/attendance/form",
          },
          {
            name: "Monthly attendance",
            href: "/dashboard/admin/attendance/monthly",
          },
          {
            name: "Missing attendance",
            href: "/dashboard/admin/attendance/missing",
          },
        ],
      },
      {
        title: "Award",
        icon: Award,
      },
      {
        title: "Department",
        icon: Building2,
      },
      {
        title: "Employee",
        icon: Users,
      },
      {
        title: "Leave",
        icon: Calendar,
      },
      {
        title: "Loan",
        icon: CreditCard,
      },
    ],
  };
  return roleMenus;
}
