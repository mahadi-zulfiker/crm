"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-teal-950 to-gray-950 text-white p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-xl mx-auto"
      >
        <h1 className="text-8xl md:text-9xl font-extrabold text-teal-400 mb-4">
          404
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Looks like you have taken a wrong turn. The page you are looking for
          does not exist.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg transform hover:scale-105"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}