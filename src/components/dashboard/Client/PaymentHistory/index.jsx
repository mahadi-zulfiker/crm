"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import Lucide icons for pagination

export default function UserPaymentHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [payments, setPayments] = useState([]);
  const paymentsPerPage = 5;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("/api/paymentHistoryClient");
        const data = await response.json();
        setPayments(data);
      } catch (error) {
        console.error("Failed to fetch payment history", error);
      }
    };
    fetchPayments();
  }, []);

  const filteredPayments = payments.filter((payment) =>
    payment.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = filteredPayments.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );
  const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Payment History
          </CardTitle>
          <CardDescription>
            A record of all your transactions and subscriptions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search Input */}
          <div className="mb-6">
            <Input
              type="text"
              placeholder="Search payments by job title..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Payment Table */}
          <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-teal-600 text-white hover:bg-teal-700">
                  <TableHead className="p-4 text-left rounded-tl-lg">
                    Job Title
                  </TableHead>
                  <TableHead className="p-4 text-left">Company</TableHead>
                  <TableHead className="p-4 text-left">Payment</TableHead>
                  <TableHead className="p-4 text-left rounded-tr-lg">
                    Deadline
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPayments.length > 0 ? (
                  currentPayments.map((payment) => (
                    <TableRow
                      key={payment._id}
                      className="border-b border-gray-100 hover:bg-teal-50 transition-colors duration-200"
                    >
                      <TableCell className="p-4 font-medium text-gray-900">
                        {payment.title}
                      </TableCell>
                      <TableCell className="p-4 text-gray-700">
                        {payment.company}
                      </TableCell>
                      <TableCell className="p-4 text-gray-700">
                        ${payment.payment}
                      </TableCell>
                      <TableCell className="p-4 text-gray-700">
                        {payment.deadline}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-8 text-gray-500"
                    >
                      No payments found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-2">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                variant="outline"
                size="icon"
                className="p-2 rounded-lg border border-teal-300 text-teal-600 hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    currentPage === i + 1
                      ? "bg-teal-600 text-white shadow-md"
                      : "bg-white text-teal-600 border border-teal-300 hover:bg-teal-50"
                  }`}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                variant="outline"
                size="icon"
                className="p-2 rounded-lg border border-teal-300 text-teal-600 hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
