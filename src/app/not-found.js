"use client"

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-8xl font-extrabold text-pink-500 mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-6">
          Looks like you’re lost in space. 🚀  
          The page you’re looking for doesn’t exist.
        </p>

        <Link
          href="/"
          className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-2xl shadow-lg transition"
        >
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
