"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useEffect } from "react";
import "animate.css";

const InsightsPage = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate__animated", "animate__fadeInUp");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        const animatedElements = document.querySelectorAll(".animate-on-scroll");
        animatedElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            {/* <div className="bg-gradient-to-br from-gray-900 to-slate-800 relative w-full py-24 flex flex-col items-center justify-center text-white text-center px-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 animate-on-scroll">
                    Empowering Careers. Elevating Businesses.
                </h1>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight mb-8 animate-on-scroll delay-100">
                    Shaping the Future of Work.
                </h2>
                <p className="mt-4 text-lg max-w-3xl leading-relaxed animate-on-scroll delay-200">
                    Welcome to our Insights hub — your premier destination for expert analysis, real-time market intelligence, and forward-thinking perspectives on the
                    evolving landscape of recruitment and talent management.
                </p>
            </div> */}

            <div className="max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 lg:grid-cols-4 gap-10">

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-16">

                    {/* ✅ Featured Article */}
                    <section className="bg-white rounded-xl shadow overflow-hidden border border-gray-200 flex flex-col md:flex-row">
                        <img
                            src="/services/1.jpg"
                            alt="Featured Insight"
                            className="w-full md:w-1/2 h-64 object-cover"
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Featured: How AI is Shaping the Hiring Future</h2>
                            <p className="text-gray-600 mb-4">
                                Discover how leading companies are integrating AI into their recruitment pipelines—and what it means for hiring in 2025.
                            </p>
                            <Link href="/insights/ai-hiring-future" className="text-blue-600 font-medium hover:underline">
                                Read More →
                            </Link>
                        </div>
                    </section>

                    {/* ✅ Article Grid */}
                    <section>
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Latest Insights</h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                                >
                                    <img
                                        src={`/services/${i}.jpg`} // 👈 Replace with your actual image paths
                                        alt={`Insight ${i}`}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-2">
                                            Article Title {i}
                                        </h4>
                                        <p className="text-gray-600 mb-4 text-sm">
                                            A short summary of the article goes here. It should give a quick glimpse of the content...
                                        </p>
                                        <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                                            <span className="bg-gray-100 px-2 py-1 rounded">#Trends</span>
                                            <span className="bg-gray-100 px-2 py-1 rounded">#2025Hiring</span>
                                        </div>
                                        <Link href="#" className="text-blue-500 hover:underline text-sm font-medium">
                                            Continue Reading →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>

                {/* ✅ Sidebar */}
                <aside className="space-y-10">

                    {/* Filter */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Filter by Topic</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="text-gray-600 hover:text-blue-600">🌐 Workforce Trends</Link></li>
                            <li><Link href="#" className="text-gray-600 hover:text-blue-600">💼 Candidate Tips</Link></li>
                            <li><Link href="#" className="text-gray-600 hover:text-blue-600">🏢 Employer Insights</Link></li>
                            <li><Link href="#" className="text-gray-600 hover:text-blue-600">📊 Market Reports</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Signup */}
                    <div className="bg-indigo-50 rounded-xl p-6 shadow text-center">
                        <h4 className="text-lg font-semibold text-teal-800 mb-3">Join Our Newsletter</h4>
                        <p className="text-sm text-gray-600 mb-4">Get exclusive hiring insights and career tips straight to your inbox.</p>
                        <form className="space-y-3">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full p-2 rounded border border-gray-300"
                            />
                            <button
                                type="submit"
                                className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                </aside>
            </div>


            <Footer />
        </>
    );
};

export default InsightsPage;