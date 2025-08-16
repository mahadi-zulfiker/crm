"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";
import ContactUsHomePage from "@/components/ContactHomePage";
import Image from "next/image";
import StickyHeader from "@/components/StickyHeader";

const selectedServices = [
  {
    name: "Staffing Services",
    link: "/staffBankSolution",
    image: "/services/med1.jpg",
    description:
      "Comprehensive staffing support across healthcare, cleaning, security, hospitality, and more.",
  },
  {
    name: "Workforce Management",
    link: "/workforceManagement",
    image: "/services/1.jpg",
    description:
      "Efficient solutions for scheduling, monitoring, and optimizing workforce productivity across sectors.",
  },
  {
    name: "Recruitment Solutions",
    link: "/recruitmentProcessOut",
    image: "/services/2.jpg",
    description:
      "Custom recruitment strategies to meet unique staffing demands for short- or long-term engagements.",
  },
];

const Recruitment = () => {
  return (
    <>
      <Navbar />
      <StickyHeader></StickyHeader>
      {/* Title Section */}
      <section className="py-16 bg-gray-100 px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Our Key Recruitment Services
        </h1>
        <p className="text-gray-600 text-lg">
          Focused solutions for modern workforce challenges
        </p>
      </section>

      {/* Service Cards */}
      <section className="container mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedServices.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 flex flex-col overflow-hidden"
            >
              <div className="relative w-full h-52">
                <Image
                  src={service.image}
                  alt={service.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                />
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link href={service.link}>
                  <span className="inline-block text-center bg-teal-500 text-white font-semibold text-base px-6 py-3 rounded-md hover:bg-teal-600 transition duration-300 w-full">
                    Learn More
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ContactUsHomePage />
      <Footer />
    </>
  );
};

export default Recruitment;
