"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import Chat from "@/components/Chat";
import ContactUsHomePage from "@/components/ContactHomePage";

function ContactUs() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <div className="bg-gradient-to-r from-blue-900 to-gray-700 relative w-full h-44 mb-8">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                        <h1 className="text-6xl font-extrabold">Contact Us</h1>
                        <p className="mt-4 text-lg">We’re here to assist you. Feel free to reach out!</p>
                    </div>
                </div>



                <ContactUsHomePage />

                {/*Section */}
                <div className="w-full py-12 bg-gray-100">
                    <div className="max-w-7xl mx-auto text-center py-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
                            Ready to take the next step?
                        </h2>
                        <p className="mt-2 text-lg text-gray-500 mb-8">
                            Join our platform today and unlock a world of opportunities.
                        </p>
                        <div className="mt-6 flex flex-wrap justify-center gap-4">
                            <button className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <a href="allJobs" className="text-white no-underline">
                                    Find a job
                                </a>
                            </button>
                            <button className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <a href="postJob" className="text-indigo-700 no-underline">
                                    Hire talent
                                </a>
                            </button>
                            <button className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                <a href="/signUp" className="text-white no-underline">
                                    Work for us
                                </a>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="relative w-full h-96">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345091865!2d144.95592831568143!3d-37.817209979751504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1611818997208!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        allowFullScreen=""
                        loading="lazy"
                        className="rounded-lg"
                    ></iframe>
                </div>
            </main>
            <Chat />
            <Footer />
        </div>
    );
}

export default ContactUs;
