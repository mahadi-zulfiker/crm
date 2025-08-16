"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
  Search,
  MapPin,
  Building,
  DollarSign,
  Clock,
  Filter,
  Sparkles,
  Heart,
  Share2,
  Briefcase,
  Target,
  UserPlus,
  Rocket,
  Handshake,
  BarChart2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import StickyHeader from "@/components/StickyHeader";

export default function JobListings() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // State management
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [companies, setCompanies] = useState([]);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedJobType, setSelectedJobType] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState("all");
  const [salaryRange, setSalaryRange] = useState("all");
  const [isRemote, setIsRemote] = useState("all");

  // UI states
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [bookmarkedJobs, setBookmarkedJobs] = useState(new Set());

  // Fetch jobs data
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/jobs");
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
          setFilteredJobs(data);

          // Extract unique values for filters
          setCategories([
            ...new Set(data.map((job) => job.category).filter(Boolean)),
          ]);
          setLocations([
            ...new Set(data.map((job) => job.location).filter(Boolean)),
          ]);
          setCompanies([
            ...new Set(data.map((job) => job.company).filter(Boolean)),
          ]);
        } else {
          setError("Failed to fetch jobs. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("An error occurred while fetching jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Simulate async processing for search/filter
  const simulateAsync = (fn) => {
    setIsProcessing(true);
    setTimeout(() => {
      fn();
      setIsProcessing(false);
    }, 300);
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters();
  };

  // Apply all filters
  const applyFilters = () => {
    simulateAsync(() => {
      let filtered = [...jobs];

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (job) =>
            job.title?.toLowerCase().includes(query) ||
            job.company?.toLowerCase().includes(query) ||
            job.location?.toLowerCase().includes(query) ||
            job.description?.toLowerCase().includes(query) ||
            job.category?.toLowerCase().includes(query)
        );
      }

      // Category filter
      if (selectedCategory !== "all") {
        filtered = filtered.filter((job) => job.category === selectedCategory);
      }

      // Location filter
      if (selectedLocation !== "all") {
        filtered = filtered.filter((job) => job.location === selectedLocation);
      }

      // Job type filter
      if (selectedJobType !== "all") {
        filtered = filtered.filter((job) => job.jobType === selectedJobType);
      }

      // Experience filter
      if (selectedExperience !== "all") {
        filtered = filtered.filter(
          (job) => job.experienceLevel === selectedExperience
        );
      }

      // Remote filter
      if (isRemote !== "all") {
        filtered = filtered.filter((job) => {
          if (isRemote === "remote") return job.workType === "Remote";
          if (isRemote === "onsite") return job.workType === "On-site";
          if (isRemote === "hybrid") return job.workType === "Hybrid";
          return true;
        });
      }

      // Salary range filter
      if (salaryRange !== "all") {
        filtered = filtered.filter((job) => {
          const salary = Number.parseInt(
            job.salary?.replace(/[^0-9]/g, "") || 0
          );
          switch (salaryRange) {
            case "0-30k":
              return salary <= 30000;
            case "30k-60k":
              return salary > 30000 && salary <= 60000;
            case "60k-100k":
              return salary > 60000 && salary <= 100000;
            case "100k+":
              return salary > 100000;
            default:
              return true;
          }
        });
      }

      setFilteredJobs(filtered);
    });
  };

  // Apply filters when any filter changes
  useEffect(() => {
    if (!loading && jobs.length > 0) {
      applyFilters();
    }
  }, [
    searchQuery,
    selectedCategory,
    selectedLocation,
    selectedJobType,
    selectedExperience,
    salaryRange,
    isRemote,
    jobs,
    loading,
  ]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedLocation("all");
    setSelectedJobType("all");
    setSelectedExperience("all");
    setSalaryRange("all");
    setIsRemote("all");
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  // Handle job actions
  const handleJobClick = (jobId) => {
    router.push(`/singleJob/${jobId}`);
  };

  const handleBookmark = (jobId, e) => {
    e.stopPropagation();
    const newBookmarked = new Set(bookmarkedJobs);
    if (newBookmarked.has(jobId)) {
      newBookmarked.delete(jobId);
      toast.success("Job removed from bookmarks");
    } else {
      newBookmarked.add(jobId);
      toast.success("Job bookmarked successfully");
    }
    setBookmarkedJobs(newBookmarked);
  };

  const handleApply = (jobId, jobTitle, e) => {
    e.stopPropagation();
    if (!session) {
      toast.error("Please login to apply for jobs");
      router.push("/login");
      return;
    }
    router.push(`/singleJob/${jobId}`);
  };

  const handleShare = (job, e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job at ${job.company}`,
        url: `${window.location.origin}/jobs/${job._id}`,
      });
    } else {
      navigator.clipboard.writeText(
        `${window.location.origin}/jobs/${job._id}`
      );
      toast.success("Job link copied to clipboard");
    }
  };

  const getJobTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "full-time":
        return "bg-green-100 text-green-800";
      case "part-time":
        return "bg-blue-100 text-blue-800";
      case "contract":
        return "bg-orange-100 text-orange-800";
      case "freelance":
        return "bg-purple-100 text-purple-800";
      case "internship":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getExperienceColor = (level) => {
    switch (level?.toLowerCase()) {
      case "entry-level":
        return "bg-green-100 text-green-800";
      case "mid-level":
        return "bg-blue-100 text-blue-800";
      case "senior-level":
        return "bg-purple-100 text-purple-800";
      case "executive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-blue-400 animate-pulse"></div>
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-6xl">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-teal-400 hover:bg-teal-700"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300">
      <Navbar />
      <StickyHeader></StickyHeader>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-center text-gray-800">
            Find Work That Works For You.
          </h1>
          <p className="text-lg mb-5 mt-4 text-center text-gray-600">
            We connect professionals to temp, perm, and contract jobs across the
            UK.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 mt-10 text-center">
            <div className="bg-slate-100 rounded-md p-4 shadow-sm hover:shadow-md transition flex flex-col items-center">
              <UserPlus className="h-6 w-6 text-teal-600 mb-2" />
              <p className="text-gray-600 font-semibold">
                Free to Register With Us
              </p>
            </div>
            <div className="bg-slate-100 rounded-md p-4 shadow-sm hover:shadow-md transition flex flex-col items-center">
              <Rocket className="h-6 w-6 text-teal-600 mb-2" />
              <p className="text-gray-600 font-semibold">
                Fast-track to Top Employers
              </p>
            </div>
            <div className="bg-slate-100 rounded-md p-4 shadow-sm hover:shadow-md transition flex flex-col items-center">
              <Handshake className="h-6 w-6 text-teal-600 mb-2" />
              <p className="text-gray-600 font-semibold">
                1:1 Support from Our Team
              </p>
            </div>
            <div className="bg-slate-100 rounded-md p-4 shadow-sm hover:shadow-md transition flex flex-col items-center">
              <BarChart2 className="h-6 w-6 text-teal-600 mb-2" />
              <p className="text-gray-600 font-semibold">
                Career Growth Resources
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form
            onSubmit={handleSearch}
            className="flex w-full max-w-4xl mx-auto"
          >
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <Input
                type="text"
                className="pl-10 pr-3 py-3 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Search jobs, skills, or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              disabled={isProcessing || loading}
              className="ml-3 px-6 py-3 bg-teal-400 hover:bg-teal-700 text-white disabled:opacity-50"
            >
              {isProcessing ? "Searching..." : "Search"}
            </Button>
            {searchQuery && (
              <Button
                type="button"
                onClick={handleClearSearch}
                variant="ghost"
                className="ml-2 text-blue-600 hover:text-blue-700"
              >
                Clear
              </Button>
            )}
          </form>
        </motion.div>

        {/* Main Content */}
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filter Sidebar (Desktop) */}
          <motion.div
            className="hidden lg:block lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="sticky top-20">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Filters
                    </h3>
                    <Button
                      onClick={handleResetFilters}
                      variant="ghost"
                      size="sm"
                      className="text-blue-600"
                    >
                      Reset
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Location Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <Select
                        value={selectedLocation}
                        onValueChange={setSelectedLocation}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Locations" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Locations</SelectItem>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Job Type Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Type
                      </label>
                      <Select
                        value={selectedJobType}
                        onValueChange={setSelectedJobType}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Contract">Contract</SelectItem>
                          <SelectItem value="Freelance">Freelance</SelectItem>
                          <SelectItem value="Internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Experience Level Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Experience Level
                      </label>
                      <Select
                        value={selectedExperience}
                        onValueChange={setSelectedExperience}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Levels" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Levels</SelectItem>
                          <SelectItem value="Entry-level">
                            Entry Level
                          </SelectItem>
                          <SelectItem value="Mid-level">Mid Level</SelectItem>
                          <SelectItem value="Senior-level">
                            Senior Level
                          </SelectItem>
                          <SelectItem value="Executive">Executive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Remote Work Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Work Type
                      </label>
                      <Select value={isRemote} onValueChange={setIsRemote}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Work Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Work Types</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="onsite">On-site</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Salary Range Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Salary Range
                      </label>
                      <Select
                        value={salaryRange}
                        onValueChange={setSalaryRange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Salaries" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Salaries</SelectItem>
                          <SelectItem value="0-30k">$0 - $30k</SelectItem>
                          <SelectItem value="30k-60k">$30k - $60k</SelectItem>
                          <SelectItem value="60k-100k">$60k - $100k</SelectItem>
                          <SelectItem value="100k+">$100k+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            {/* Mobile Filter Toggle */}
            <div className="mb-4 lg:hidden">
              <Button
                onClick={toggleMobileFilter}
                variant="outline"
                className="w-full flex justify-center items-center bg-transparent"
              >
                <Filter className="w-4 h-4 mr-2" />
                {isMobileFilterOpen ? "Close Filters" : "Filters"}
                {(selectedCategory !== "all" ||
                  selectedLocation !== "all" ||
                  selectedJobType !== "all" ||
                  selectedExperience !== "all" ||
                  salaryRange !== "all" ||
                  isRemote !== "all") && (
                  <Badge className="ml-2 bg-teal-400 text-white">Active</Badge>
                )}
              </Button>

              <AnimatePresence>
                {isMobileFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4"
                  >
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Filters
                          </h3>
                          <Button
                            onClick={handleResetFilters}
                            variant="ghost"
                            size="sm"
                            className="text-blue-600"
                          >
                            Reset
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Select
                            value={selectedCategory}
                            onValueChange={setSelectedCategory}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">
                                All Categories
                              </SelectItem>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Select
                            value={selectedLocation}
                            onValueChange={setSelectedLocation}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Locations</SelectItem>
                              {locations.map((location) => (
                                <SelectItem key={location} value={location}>
                                  {location}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Select
                            value={selectedJobType}
                            onValueChange={setSelectedJobType}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Job Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Types</SelectItem>
                              <SelectItem value="Full-time">
                                Full-time
                              </SelectItem>
                              <SelectItem value="Part-time">
                                Part-time
                              </SelectItem>
                              <SelectItem value="Contract">Contract</SelectItem>
                              <SelectItem value="Freelance">
                                Freelance
                              </SelectItem>
                              <SelectItem value="Internship">
                                Internship
                              </SelectItem>
                            </SelectContent>
                          </Select>

                          <Select
                            value={selectedExperience}
                            onValueChange={setSelectedExperience}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Experience" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Levels</SelectItem>
                              <SelectItem value="Entry-level">
                                Entry Level
                              </SelectItem>
                              <SelectItem value="Mid-level">
                                Mid Level
                              </SelectItem>
                              <SelectItem value="Senior-level">
                                Senior Level
                              </SelectItem>
                              <SelectItem value="Executive">
                                Executive
                              </SelectItem>
                            </SelectContent>
                          </Select>

                          <Select value={isRemote} onValueChange={setIsRemote}>
                            <SelectTrigger>
                              <SelectValue placeholder="Work Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">
                                All Work Types
                              </SelectItem>
                              <SelectItem value="remote">Remote</SelectItem>
                              <SelectItem value="hybrid">Hybrid</SelectItem>
                              <SelectItem value="onsite">On-site</SelectItem>
                            </SelectContent>
                          </Select>

                          <Select
                            value={salaryRange}
                            onValueChange={setSalaryRange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Salary Range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Salaries</SelectItem>
                              <SelectItem value="0-30k">$0 - $30k</SelectItem>
                              <SelectItem value="30k-60k">
                                $30k - $60k
                              </SelectItem>
                              <SelectItem value="60k-100k">
                                $60k - $100k
                              </SelectItem>
                              <SelectItem value="100k+">$100k+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Results Info */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-medium text-gray-900">
                  {filteredJobs.length}
                </span>{" "}
                jobs
              </p>
              <Button
                onClick={handleResetFilters}
                variant="ghost"
                className="text-blue-600 hover:text-blue-700"
              >
                Reset Filters
              </Button>
            </div>

            {/* Job Listings or States */}
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-12 h-12 rounded-full bg-blue-400 animate-pulse mb-4"></div>
                <p className="text-gray-600">Processing filters...</p>
              </div>
            ) : filteredJobs.length === 0 ? (
              <motion.div
                className="text-center py-12 bg-white rounded-lg shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No jobs found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or browse all jobs
                </p>
                <Button
                  onClick={handleResetFilters}
                  className="bg-teal-400 hover:bg-teal-700"
                >
                  View all jobs
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-6">
                <AnimatePresence>
                  {filteredJobs.map((job, index) => (
                    <motion.div
                      key={job._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ y: -2 }}
                      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer border border-gray-100"
                      onClick={() => handleJobClick(job._id)}
                    >
                      <div className="p-6">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2">
                              {job.title}
                            </h3>
                            <div className="flex items-center text-gray-600 mb-2">
                              <Building className="w-4 h-4 mr-2" />
                              <span className="font-medium">{job.company}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span>{job.location}</span>
                              {job.workType && (
                                <Badge
                                  className="ml-2 bg-gray-100 text-gray-700"
                                  size="sm"
                                >
                                  {job.workType}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => handleBookmark(job._id, e)}
                            className={`${
                              bookmarkedJobs.has(job._id)
                                ? "text-red-500"
                                : "text-gray-400"
                            } hover:text-red-500`}
                          >
                            <Heart
                              className={`w-5 h-5 ${
                                bookmarkedJobs.has(job._id)
                                  ? "fill-current"
                                  : ""
                              }`}
                            />
                          </Button>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.jobType && (
                            <Badge className={getJobTypeColor(job.jobType)}>
                              {job.jobType}
                            </Badge>
                          )}
                          {job.experienceLevel && (
                            <Badge
                              className={getExperienceColor(
                                job.experienceLevel
                              )}
                            >
                              {job.experienceLevel}
                            </Badge>
                          )}
                          {job.category && (
                            <Badge className="bg-blue-100 text-blue-800">
                              <Briefcase className="w-3 h-3 mr-1" />
                              {job.category}
                            </Badge>
                          )}
                          {job.urgent && (
                            <Badge className="bg-red-100 text-red-800">
                              <Target className="w-3 h-3 mr-1" />
                              Urgent
                            </Badge>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 mb-4 line-clamp-3">
                          {job.description}
                        </p>

                        {/* Footer */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-4">
                            {job.salary && (
                              <div className="flex items-center text-green-600 font-semibold">
                                <DollarSign className="w-4 h-4 mr-1" />
                                {job.salary}
                              </div>
                            )}
                            <div className="flex items-center text-gray-500 text-sm">
                              <Clock className="w-4 h-4 mr-1" />
                              {new Date(
                                job.postedAt || job.createdAt
                              ).toLocaleDateString()}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => handleShare(job, e)}
                            >
                              <Share2 className="w-4 h-4" />
                            </Button>
                            <Button
                              onClick={(e) =>
                                handleApply(job._id, job.title, e)
                              }
                              className="bg-teal-400 hover:bg-teal-700 text-white"
                              size="sm"
                            >
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
