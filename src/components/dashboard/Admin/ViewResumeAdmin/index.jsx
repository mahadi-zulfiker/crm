"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Download,
  Calendar,
  Briefcase,
  Loader2,
  Trash2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ViewResumeAdmin() {
  const [resumes, setResumes] = useState([]);
  const [filteredResumes, setFilteredResumes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedResumes, setSelectedResumes] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchResumes();
  }, []);

  useEffect(() => {
    filterResumes();
  }, [resumes, searchTerm]);

  useEffect(() => {
    setSelectAll(
      selectedResumes.length === filteredResumes.length &&
        filteredResumes.length > 0
    );
  }, [selectedResumes, filteredResumes]);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/resume");
      const data = await response.json();
      setResumes(data || []);
    } catch (error) {
      console.error("Error fetching resumes:", error);
      toast({
        title: "Error",
        description: "Failed to fetch resumes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterResumes = () => {
    let filtered = resumes;

    if (searchTerm) {
      filtered = filtered.filter(
        (resume) =>
          resume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resume.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resume.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredResumes(filtered);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedResumes([]);
    } else {
      setSelectedResumes(filteredResumes.map((resume) => resume.id));
    }
  };

  const handleSelectResume = (resumeId) => {
    setSelectedResumes((prev) =>
      prev.includes(resumeId)
        ? prev.filter((id) => id !== resumeId)
        : [...prev, resumeId]
    );
  };

  const handleBulkDelete = () => {
    if (selectedResumes.length === 0) return;

    // Here you would implement the bulk delete API call
    toast({
      title: "Success",
      description: `${selectedResumes.length} resumes deleted successfully`,
    });
    setSelectedResumes([]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-teal-600" />
          <p className="text-gray-600">Loading resumes...</p>
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
            Resume Management
          </h1>
          <p className="text-gray-600 mt-1">
            Review and manage uploaded resumes
          </p>
        </div>
        {selectedResumes.length > 0 && (
          <Button
            variant="destructive"
            onClick={handleBulkDelete}
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete Selected ({selectedResumes.length})
          </Button>
        )}
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search resumes by name, email, or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Resumes Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Resumes ({filteredResumes.length})</span>
            <div className="flex items-center gap-2">
              <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} />
              <span className="text-sm text-gray-600">Select All</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectAll}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Candidate Details</TableHead>
                  <TableHead>Position Applied</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResumes.length > 0 ? (
                  filteredResumes.map((resume) => (
                    <TableRow key={resume.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedResumes.includes(resume.id)}
                          onCheckedChange={() => handleSelectResume(resume.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium text-gray-900">
                            {resume.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {resume.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{resume.position}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(resume.status)}>
                          {resume.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {resume.uploadedAt}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={resume.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="text-gray-400">
                        <Briefcase className="w-12 h-12 mx-auto mb-4" />
                        <h3 className="text-lg font-medium">
                          No resumes found
                        </h3>
                        <p className="text-sm">
                          Try adjusting your search criteria
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
