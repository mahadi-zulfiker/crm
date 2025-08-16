"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import {
  Search,
  Download,
  Calendar,
  DollarSign,
  CreditCard,
  Receipt,
  TrendingUp,
  Eye,
  Loader2,
  FileText,
} from "lucide-react";

export default function ClientPaymentHistoryPage() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      if (!session?.user?.email) return;

      try {
        setLoading(true);
        const response = await fetch(
          `/api/payments?clientEmail=${encodeURIComponent(session.user.email)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch payment history");
        }

        const data = await response.json();
        console.log("Payment history data:", data);

        if (data.success && Array.isArray(data.data)) {
          // Format the payment data for display
          const formattedPayments = data.data.map((payment) => ({
            id: payment._id,
            transactionId: payment.transactionId || `TXN_${payment._id}`,
            candidateName: payment.candidateName || "Unknown Candidate",
            candidateEmail: payment.candidateEmail || "N/A",
            jobId: payment.jobId || "N/A",
            jobTitle: payment.jobTitle || "Unknown Job",
            amount: payment.amount || 0,
            description: payment.description || "Payment for services",
            paymentMethod: payment.paymentMethod || "bank_transfer",
            status: payment.status || "completed",
            date: payment.createdAt
              ? new Date(payment.createdAt).toLocaleDateString()
              : "N/A",
            time: payment.createdAt
              ? new Date(payment.createdAt).toLocaleTimeString()
              : "N/A",
            createdAt: payment.createdAt,
            invoiceUrl: `/api/invoices/${payment._id}`,
          }));

          setPayments(formattedPayments);
          setFilteredPayments(formattedPayments);
        } else {
          setPayments([]);
          setFilteredPayments([]);
        }
      } catch (error) {
        console.error("Error fetching payment history:", error);
        toast({
          title: "Error",
          description: "Failed to fetch payment history. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, [session, toast]);

  useEffect(() => {
    let filtered = payments;

    if (searchTerm) {
      filtered = filtered.filter(
        (payment) =>
          payment.candidateName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          payment.transactionId
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          payment.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          payment.candidateEmail
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          payment.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (payment) => payment.status.toLowerCase() === statusFilter
      );
    }

    if (methodFilter !== "all") {
      filtered = filtered.filter(
        (payment) => payment.paymentMethod.toLowerCase() === methodFilter
      );
    }

    if (dateRange !== "all") {
      const filterDate = new Date();

      switch (dateRange) {
        case "today":
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(
            (payment) => new Date(payment.createdAt) >= filterDate
          );
          break;
        case "week":
          filterDate.setDate(filterDate.getDate() - 7);
          filtered = filtered.filter(
            (payment) => new Date(payment.createdAt) >= filterDate
          );
          break;
        case "month":
          filterDate.setMonth(filterDate.getMonth() - 1);
          filtered = filtered.filter(
            (payment) => new Date(payment.createdAt) >= filterDate
          );
          break;
        case "quarter":
          filterDate.setMonth(filterDate.getMonth() - 3);
          filtered = filtered.filter(
            (payment) => new Date(payment.createdAt) >= filterDate
          );
          break;
        case "year":
          filterDate.setFullYear(filterDate.getFullYear() - 1);
          filtered = filtered.filter(
            (payment) => new Date(payment.createdAt) >= filterDate
          );
          break;
      }
    }

    setFilteredPayments(filtered);
  }, [searchTerm, statusFilter, methodFilter, dateRange, payments]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getMethodIcon = (method) => {
    switch (method.toLowerCase()) {
      case "bank_transfer":
        return <Receipt className="w-3 h-3 text-gray-400" />;
      case "paypal":
        return <CreditCard className="w-3 h-3 text-gray-400" />;
      case "stripe":
        return <CreditCard className="w-3 h-3 text-gray-400" />;
      case "check":
        return <FileText className="w-3 h-3 text-gray-400" />;
      default:
        return <CreditCard className="w-3 h-3 text-gray-400" />;
    }
  };

  const stats = {
    totalSpent: payments.reduce(
      (sum, payment) =>
        payment.status === "completed" ? sum + payment.amount : sum,
      0
    ),
    totalTransactions: payments.length,
    pendingAmount: payments.reduce(
      (sum, payment) =>
        payment.status === "pending" ? sum + payment.amount : sum,
      0
    ),
    completedTransactions: payments.filter((p) => p.status === "completed")
      .length,
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
            <p className="text-gray-600">Loading payment history...</p>
          </div>
        </div>
    );
  }

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Payment History
            </h1>
            <p className="text-gray-600 mt-1">
              Track your payments and billing history.
            </p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Spent
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${stats.totalSpent.toLocaleString()}
                  </p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Transactions
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalTransactions}
                  </p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Receipt className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Pending Amount
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    ${stats.pendingAmount.toLocaleString()}
                  </p>
                </div>
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Success Rate
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.totalTransactions > 0
                      ? Math.round(
                          (stats.completedTransactions /
                            stats.totalTransactions) *
                            100
                        )
                      : 0}
                    %
                  </p>
                </div>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search by job title, candidate, or payment ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="stripe">Credit Card</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Payments Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              Payment Transactions ({filteredPayments.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <div className="font-medium text-gray-900">
                          {payment.transactionId}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-gray-900">
                          {payment.jobTitle}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-900">
                            {payment.candidateName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {payment.candidateEmail}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <p
                            className="text-sm text-gray-900 truncate"
                            title={payment.description}
                          >
                            {payment.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3 text-gray-400" />
                          <span className="font-medium">
                            {payment.amount.toLocaleString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getMethodIcon(payment.paymentMethod)}
                          <span className="capitalize">
                            {payment.paymentMethod.replace("_", " ")}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status.charAt(0).toUpperCase() +
                            payment.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>{payment.date}</div>
                        <div className="text-sm text-gray-500">
                          {payment.time}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            title="Download Invoice"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {filteredPayments.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Receipt className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No payments found
              </h3>
              <p className="text-gray-600">
                {searchTerm ||
                statusFilter !== "all" ||
                methodFilter !== "all" ||
                dateRange !== "all"
                  ? "Try adjusting your search criteria or filters."
                  : "You haven't made any payments yet. Payments will appear here once you start hiring candidates."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
  );
}
