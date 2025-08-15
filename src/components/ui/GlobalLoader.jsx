"use client";

import { useEffect, useState } from "react";
import { useLoading } from "@/contexts/LoadingContext";

export default function GlobalLoader() {
    const { isLoading } = useLoading();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isLoading) {
            setVisible(true);
        } else {
            const t = setTimeout(() => setVisible(false), 200); // small fade-out
            return () => clearTimeout(t);
        }
    }, [isLoading]);

    if (!visible) return null;

    return (
        <div className={`fixed inset-0 z-[1000] flex items-center justify-center transition-opacity duration-200 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div className="relative p-6 bg-white rounded-xl shadow-2xl border border-gray-200">
                <div className="flex items-center gap-4">
                    <Spinner />
                    <div className="text-gray-700 font-medium">Loading, please wait...</div>
                </div>
            </div>
        </div>
    );
}

function Spinner() {
    return (
        <div className="relative h-10 w-10">
            <div className="absolute inset-0 rounded-full border-4 border-teal-200" />
            <div className="absolute inset-0 rounded-full border-4 border-teal-500 border-t-transparent animate-spin" />
            <div className="absolute inset-2 rounded-full bg-white" />
        </div>
    );
}


