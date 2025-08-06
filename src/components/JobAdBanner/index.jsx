'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

export default function JobAdBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-gray-900 text-white w-full md:w-[400px] rounded-lg shadow-xl relative p-4">
        
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Image */}
          <div className="flex-shrink-0">
            <Image
              src="/services/20.jpg"
              alt="Job Ad"
              width={80}
              height={50}
              className="rounded-md object-cover"
            />
          </div>

          {/* Text & Button */}
          <div className="flex-1">
            <p className="text-base font-semibold leading-snug">Looking for Work?</p>
            <p className="text-sm text-gray-300 mb-2">Associated Staffing is hiring now.</p>
            <Link
              href="/allJobs"
              className="inline-block bg-white text-gray-800 font-medium px-4 py-2 rounded-md text-sm hover:bg-gray-200 transition"
            >
              🔍 Search Jobs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
