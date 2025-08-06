"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";
import ContactUsHomePage from "@/components/ContactHomePage";
import Image from "next/image";

const services = [
  {
    name: "Supported Living",
    link: "/supportedLiving",
    image: "/services/41.jpg",
    description:
      "Providing compassionate and structured support for individuals in supported living environments.",
  },
  {
    name: "Community Engagement & Events",
    link: "/communityEngagement",
    image: "/services/33.jpg",
    description:
      "Building meaningful connections through local events, engagement strategies, and inclusive community experiences.",
  },
  {
    name: "Housing Management",
    link: "/housingManagement",
    image: "/services/44.jpg",
    description:
      "Professional management of residential properties ensuring tenant satisfaction, compliance, and efficiency.",
  },
];

const CommunityServices = () => {
  return (
    <>
      <Navbar />

      {/* Hero Title */}
      <section className="text-center pt-16 pb-8 bg-white">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Community Services
        </h1>
        <p className="text-lg text-gray-600">
          Building Connected Communities with Purpose & Care
        </p>
      </section>

      {/* Services Cards */}
      <section className="container mx-auto px-6 pt-4 pb-10 grid md:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white border shadow-md rounded-xl overflow-hidden transition hover:shadow-lg"
          >
            <div className="relative h-52 w-full">
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col justify-between h-[260px]">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.name}
              </h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <Link
                href={service.link}
                className="inline-block w-full text-center bg-teal-500 text-white font-semibold text-base px-6 py-3 rounded-md hover:bg-teal-600 transition duration-300 ease-in-out"
              >
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Contact CTA */}
      <section className="text-center mt-6 mb-16">
        <Link href="/contactUs">
          <span className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 text-lg font-semibold rounded-md transition-all duration-300 ease-in-out shadow-md">
            Get in Touch
          </span>
        </Link>
      </section>

      <ContactUsHomePage />
      <Footer />
    </>
  );
};

export default CommunityServices;
