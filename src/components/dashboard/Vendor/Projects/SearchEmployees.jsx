"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, User, Mail, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SearchEmployees({ onEmployeeSelect }) {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast({
        title: "Error",
        description: "Please enter a search term",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      // In a real implementation, you would search your user database
      // For now, we'll use mock data
      const mockEmployees = [
        {
          id: "1",
          name: "John Doe",
          email: "john.doe@example.com",
          department: "Development",
          position: "Senior Developer",
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane.smith@example.com",
          department: "Design",
          position: "UI/UX Designer",
        },
        {
          id: "3",
          name: "Robert Johnson",
          email: "robert.j@example.com",
          department: "Marketing",
          position: "Marketing Specialist",
        },
      ];

      // Filter mock data based on search term
      const filtered = mockEmployees.filter(
        (employee) =>
          employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.department
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          employee.position.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setSearchResults(filtered);
      setLoading(false);
    } catch (error) {
      console.error("Error searching employees:", error);
      toast({
        title: "Error",
        description: "Failed to search employees",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleSelectEmployee = (employee) => {
    onEmployeeSelect(employee);
    setSearchResults([]);
    setSearchTerm("");
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search employees by name, email, department, or position..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>

      {searchResults.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Search Results</h3>
          <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
            {searchResults.map((employee) => (
              <Card
                key={employee.id}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSelectEmployee(employee)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{employee.name}</p>
                      <div className="flex items-center text-sm text-gray-500 truncate">
                        <Mail className="w-3 h-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{employee.email}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 truncate">
                        <Building className="w-3 h-3 mr-1 flex-shrink-0" />
                        <span className="truncate">
                          {employee.department} - {employee.position}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {searchResults.length === 0 && searchTerm && !loading && (
        <div className="text-center py-8 text-gray-500">
          <User className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p>No employees found matching your search</p>
        </div>
      )}
    </div>
  );
}
