'use client';
import { useState } from "react";
import { X, Phone } from "lucide-react";
import Link from "next/link";

export default function CallbackPrompt() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-2 right-2 z-50 w-[200px] sm:w-[240px] md:w-[280px]">
      <div className="bg-white text-gray-900 border border-gray-200 rounded-lg shadow-lg p-3 relative">
        {/* Close button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-1 right-1 text-gray-400 hover:text-gray-700 transition-colors duration-200 p-1"
        >
          <X className="w-3 h-3" />
        </button>

        {/* Content */}
        <div className="flex items-start gap-2">
          <div className="bg-teal-500 p-1.5 rounded-full flex-shrink-0">
            <Phone className="w-3 h-3 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xs font-semibold text-gray-900 mb-1">Need Help?</h3>
            <p className="text-[10px] text-gray-600 mb-2 leading-tight">
              Let our team call you back.
            </p>
            <Link
              href="/requestCallBack"
              className="inline-flex items-center justify-center w-full bg-teal-600 text-white text-[10px] px-2 py-1.5 rounded font-medium hover:bg-teal-700 transition-colors duration-200"
            >
              <Phone className="w-2.5 h-2.5 mr-1" />
              Callback
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
