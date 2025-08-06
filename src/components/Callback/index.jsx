'use client';
import { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

export default function CallbackPrompt() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white text-gray-900 border border-gray-300 rounded-lg shadow-lg w-72 p-4 relative">
        {/* Close button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <h3 className="text-base font-semibold mb-1">Need Assistance?</h3>
        <p className="text-sm text-gray-600 mb-3">
          Let our team call you back to discuss your hiring needs.
        </p>
        <Link
          href="/requestCallBack"
          className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition"
        >
          📞 Request Callback
        </Link>
      </div>
    </div>
  );
}
