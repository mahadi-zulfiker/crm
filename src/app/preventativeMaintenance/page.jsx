import React from "react";
import Image from "next/image";
import { BriefcaseIcon, UsersIcon, CheckCircleIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import Achievements from "@/components/Achievements";
import img1 from "../../../public/about-us-wte/2.jpg";
import img2 from "../../../public/about-us-wte/3.jpg";
import img3 from "../../../public/about-us-wte/2.jpg";

const PreventativeMaintenanceRepairs = () => {
  return (
    <div className="bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-gray-700 relative text-white py-24 text-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            Preventative Maintenance & Repairs
          </h1>
        </div>
      </div>

      {/* Strategy Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-800">Our Preventative Maintenance Strategy</h2>
          <p className="text-gray-600 leading-relaxed">
            Preventative maintenance is a critical strategy for keeping your equipment and assets in optimal working condition. By addressing potential issues before they become costly repairs, we help you minimize downtime and extend the lifespan of your machinery, systems, and infrastructure. Our team provides comprehensive maintenance services tailored to your specific needs, ensuring that your operations run smoothly and efficiently.
          </p>
          <ul className="mt-4 space-y-3">
            {["Regular inspections and assessments", "Proactive repairs and upgrades", "Equipment lifespan optimization", "Reduced operational costs"].map((item, index) => (
              <li key={index} className="flex items-start space-x-3">
                <CheckCircleIcon className="w-6 h-6 text-blue-600" />
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Image src={img1} alt="Preventative Maintenance" className="rounded-2xl shadow-2xl" placeholder="blur" />
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Image src={img2} alt="Maintenance Services" className="rounded-2xl shadow-2xl" placeholder="blur" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-800">Comprehensive Preventative Maintenance Services</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Our preventative maintenance services are designed to help you stay ahead of potential equipment failures and repairs. We offer scheduled inspections, routine maintenance, and specialized services to ensure your systems and machinery continue to operate at peak efficiency. From HVAC systems to industrial equipment, we’ve got you covered with tailored solutions for your unique needs.
            </p>
            <button className="mt-6 bg-blue-600 text-white py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition">
              <a href="/contactUs">Get Started</a>
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-800">Why Choose Us for Preventative Maintenance & Repairs?</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Choosing the right maintenance partner is crucial to ensuring the longevity of your equipment and infrastructure. Our experienced team specializes in providing preventative maintenance services that help businesses reduce unexpected repairs and maximize uptime. With our proactive approach, you can focus on growing your business while we keep your operations running smoothly.
            </p>
            <ul className="mt-4 space-y-4">
              {["Expert maintenance services", "Customizable maintenance plans", "Proven track record of reducing downtime", "Cost-effective solutions for long-term benefits"].map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <UsersIcon className="w-6 h-6 text-blue-600" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Image src={img3} alt="Why Choose Us" className="rounded-2xl shadow-2xl" placeholder="blur" />
          </div>
        </div>
      </section>

      {/* Testimonials & Achievements */}
      <Testimonials />
      <Achievements />
      
      <Footer />
    </div>
  );
}

export default PreventativeMaintenanceRepairs;
