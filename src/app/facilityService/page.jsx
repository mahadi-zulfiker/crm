"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";
import ContactUsHomePage from "@/components/ContactHomePage";
import Image from "next/image";
import StickyHeader from "@/components/StickyHeader";

const selectedServices = [
  {
    name: "Cleaning & Hygiene Services",
    link: "/cleaningServices",
    image: "/1111.jpg",
    description:
      "Maintain a safe, sanitary, and welcoming environment for staff and visitors.",
  },
  {
    name: "Engineering & Maintenance",
    link: "/engineeringConstruction",
    image: "/services/2.jpg",
    description:
      "Ensure optimal operation of infrastructure with our expert engineering services.",
  },
  {
    name: "Integrated Facilities Management",
    link: "/facilitiesTransformation",
    image: "/services/9.jpg",
    description:
      "Streamline operations with a holistic approach to facilities management.",
  },
];

const FacilityManagement = () => {
  return (
    <>
      <Navbar />
      <StickyHeader></StickyHeader>
      {/* Simple Hero Title */}
      <div className="text-center pt-16">
        <h1 className="text-5xl font-extrabold text-gray-800">
          Facility Management
        </h1>
        <p className="text-lg mt-4 text-gray-600 font-light">
          Streamlined Solutions for Smarter Facilities.
        </p>
      </div>

      {/* Services Cards */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {selectedServices.map((service, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 flex flex-col"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={service.image}
                  alt={service.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 flex-grow">{service.description}</p>
                <Link href={service.link} className="mt-6 w-full">
                  <button className="w-full bg-teal-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-teal-600 transition duration-300 text-base">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <Link href="/contactUs">
            <span className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md text-lg font-semibold shadow-lg transition duration-300 w-full sm:w-auto">
              Get in Touch
            </span>
          </Link>
        </div>
      </div>

      <ContactUsHomePage />
      <Footer />
    </>
  );
};

export default FacilityManagement;
