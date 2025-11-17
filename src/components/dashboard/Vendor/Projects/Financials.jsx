"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  TrendingUp,
  Calendar,
  FileText,
  Download,
  BarChart3,
  PieChart,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

export default function FinancialReporting() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [financialData, setFinancialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("monthly");

  // Fetch financial data
  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        setLoading(true);

        // Check if user is logged in
        if (!session?.user?.email) {
          setLoading(false);
          return;
        }

        // Check if user is a vendor
        if (session?.user?.userType !== "Vendor") {
          setLoading(false);
          return;
        }

        // In a real implementation, you would fetch from an API
        // For now, we'll use mock data
        const mockData = {
          totalRevenue: 75000,
          totalExpenses: 45000,
          netProfit: 30000,
          profitMargin: 40,
          projectsCompleted: 12,
          avgProjectValue: 6250,
          monthlyData: [
            { month: "Jan", revenue: 8000, expenses: 5000, profit: 3000 },
            { month: "Feb", revenue: 12000, expenses: 7000, profit: 5000 },
            { month: "Mar", revenue: 15000, expenses: 8000, profit: 7000 },
            { month: "Apr", revenue: 18000, expenses: 9000, profit: 9000 },
            { month: "May", revenue: 22000, expenses: 11000, profit: 11000 },
          ],
          projectBreakdown: [
            { category: "Web Development", value: 35000, percentage: 47 },
            { category: "Mobile Apps", value: 25000, percentage: 33 },
            { category: "Consulting", value: 15000, percentage: 20 },
          ],
        };

        setFinancialData(mockData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching financial data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch financial data",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchFinancialData();
    } else {
      setLoading(false);
    }
  }, [session, timeRange, toast]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleExportReport = () => {
    toast({
      title: "Report Exported",
      description: "Financial report has been exported successfully.",
    });
    // In a real implementation, you would generate and download a PDF or CSV report
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-teal-600 rounded-full animate-bounce"></div>
          <div
            className="w-4 h-4 bg-teal-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-4 h-4 bg-teal-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    );
  }

  if (!financialData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No financial data available
          </h3>
          <p className="text-gray-500">
            Financial data will appear here once you have projects.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Financial Reporting
          </h1>
          <p className="text-gray-600 mt-1">
            Track your revenue, expenses, and profitability
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <Button
            onClick={handleExportReport}
            className="bg-teal-600 hover:bg-teal-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold">
                  {formatCurrency(financialData.totalRevenue)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-full">
                <FileText className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Expenses
                </p>
                <p className="text-2xl font-bold">
                  {formatCurrency(financialData.totalExpenses)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Net Profit</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(financialData.netProfit)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <PieChart className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Profit Margin
                </p>
                <p className="text-2xl font-bold">
                  {financialData.profitMargin}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Revenue Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {financialData.monthlyData.map((data, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{data.month}</span>
                    <span>{formatCurrency(data.revenue)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-teal-600 h-2 rounded-full"
                      style={{ width: `${(data.revenue / 25000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="w-5 h-5 mr-2" />
              Project Category Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {financialData.projectBreakdown.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{category.category}</span>
                    <span>{formatCurrency(category.value)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-teal-600 h-2 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {category.percentage}% of total revenue
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Projects Completed</p>
              <p className="text-2xl font-bold">
                {financialData.projectsCompleted}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Avg. Project Value</p>
              <p className="text-2xl font-bold">
                {formatCurrency(financialData.avgProjectValue)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                <div>
                  <p className="font-medium">Project Payment</p>
                  <p className="text-sm text-gray-500">Web Development</p>
                </div>
                <p className="font-medium text-green-600">
                  +{formatCurrency(15000)}
                </p>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                <div>
                  <p className="font-medium">Software License</p>
                  <p className="text-sm text-gray-500">Annual Subscription</p>
                </div>
                <p className="font-medium text-red-600">
                  -{formatCurrency(2500)}
                </p>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                <div>
                  <p className="font-medium">Project Payment</p>
                  <p className="text-sm text-gray-500">Mobile App</p>
                </div>
                <p className="font-medium text-green-600">
                  +{formatCurrency(12000)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
