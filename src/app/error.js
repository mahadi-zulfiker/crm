"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RefreshCcw, Home } from "lucide-react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Error boundary caught:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold mb-4">⚠️ Oops!</h1>
        <p className="text-lg text-gray-300 mb-6 max-w-lg">
          Something went wrong. Don’t worry, it happens to the best of us. You can try again or head back home.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 px-5 py-3 rounded-2xl shadow-lg transition"
          >
            <RefreshCcw size={18} /> Try Again
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 bg-white text-black hover:bg-gray-700 px-5 py-3 rounded-2xl shadow-lg transition"
          >
            <Home size={18} /> Go Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
