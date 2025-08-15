'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Search } from "lucide-react";

export default function JobAdBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-2 left-2 z-50 w-[200px] sm:w-[240px] md:w-[280px]">
      <div className="bg-gray-900 text-white rounded-lg shadow-lg relative p-3">
        
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-1 right-1 text-gray-400 hover:text-white transition-colors duration-200 p-1"
        >
          <X className="w-3 h-3" />
        </button>

        {/* Content */}
        <div className="flex items-start gap-2">
          {/* Image */}
          <div className="flex-shrink-0">
            <div className="relative w-8 h-8 rounded overflow-hidden border border-gray-600">
              <Image
                src="/services/20.jpg"
                alt="Job Opportunities"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Text & Button */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold leading-tight mb-1">Looking for Work?</p>
            <p className="text-[10px] text-gray-300 mb-2 leading-tight">
              Discover opportunities.
            </p>
            <Link
              href="/allJobs"
              className="inline-flex items-center justify-center w-full bg-teal-600 text-white text-[10px] px-2 py-1.5 rounded font-medium hover:bg-teal-700 transition-colors duration-200"
            >
              <Search className="w-2.5 h-2.5 mr-1" />
              Search Jobs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
