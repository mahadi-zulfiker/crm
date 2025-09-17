import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building,
  Users,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function Company() {
  const companyInfo = {
    name: "TechCorp Solutions",
    industry: "Technology",
    founded: "2010",
    employees: "142",
    headquarters: "San Francisco, CA",
    departments: "12",
  };

  const departments = [
    { name: "Engineering", employees: 42, head: "Robert Chen" },
    { name: "Marketing", employees: 28, head: "Jennifer Walsh" },
    { name: "Sales", employees: 35, head: "Michael Torres" },
    { name: "Human Resources", employees: 12, head: "Sarah Johnson" },
    { name: "Finance", employees: 15, head: "David Kim" },
    { name: "Operations", employees: 10, head: "Lisa Anderson" },
  ];

  const leadershipTeam = [
    { name: "Alex Morgan", position: "CEO", department: "Executive" },
    { name: "Taylor Reynolds", position: "CTO", department: "Engineering" },
    { name: "Jordan Patel", position: "CMO", department: "Marketing" },
    { name: "Casey Williams", position: "CFO", department: "Finance" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Company Information</h1>
        <p className="text-gray-600">
          Learn more about our organization and team structure
        </p>
      </div>

      {/* Company Overview */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle>Company Overview</CardTitle>
          <CardDescription>
            Basic information about our organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Building className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Company Name</h3>
                <p className="text-gray-600">{companyInfo.name}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-green-100 rounded-full">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Employees</h3>
                <p className="text-gray-600">{companyInfo.employees}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium">Founded</h3>
                <p className="text-gray-600">{companyInfo.founded}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-yellow-100 rounded-full">
                <MapPin className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-medium">Headquarters</h3>
                <p className="text-gray-600">{companyInfo.headquarters}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-red-100 rounded-full">
                <Building className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-medium">Departments</h3>
                <p className="text-gray-600">{companyInfo.departments}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-indigo-100 rounded-full">
                <Building className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-medium">Industry</h3>
                <p className="text-gray-600">{companyInfo.industry}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Departments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle>Departments</CardTitle>
            <CardDescription>Explore our company structure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departments.map((dept, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <h3 className="font-medium">{dept.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{dept.employees} employees</span>
                      <User className="w-4 h-4 ml-3 mr-1" />
                      <span>{dept.head}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leadership Team */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle>Leadership Team</CardTitle>
            <CardDescription>Meet our executive team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leadershipTeam.map((leader, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 border rounded-lg"
                >
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  <div>
                    <h3 className="font-medium">{leader.name}</h3>
                    <p className="text-sm text-gray-600">{leader.position}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Building className="w-4 h-4 mr-1" />
                      <span>{leader.department}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Information */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Reach out to different departments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                HR Department
              </h3>
              <p className="text-sm text-gray-600 mt-2">+1 (555) 123-4567</p>
              <p className="text-sm text-gray-600">hr@techcorp.com</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                IT Support
              </h3>
              <p className="text-sm text-gray-600 mt-2">+1 (555) 123-4568</p>
              <p className="text-sm text-gray-600">support@techcorp.com</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-medium flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                General Inquiries
              </h3>
              <p className="text-sm text-gray-600 mt-2">info@techcorp.com</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
