import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import {
  CheckCircle,
  ArrowRight,
  Download,
  PlayCircle,
  Users,
  Clipboard,
  Wrench,
  DollarSign,
  HeartHandshake,
  Database,
  BarChart,
} from "lucide-react";
import { FaFileAlt, FaPlayCircle } from "react-icons/fa";
import StickyHeader from "@/components/StickyHeader";

export default function HousingManagement() {
  return (
    <>
      <Navbar />
      <StickyHeader></StickyHeader>
      <Head>
        <title>Housing Management | Demand Recruitment Services Ltd</title>
        <meta
          name="description"
          content="Comprehensive housing management solutions for sustainable communities and satisfied tenants."
        />
      </Head>

      <main className="text-gray-800 bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-[url('/services/44.jpg')] bg-cover bg-center text-white py-32 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-700 to-teal-900 opacity-90"></div>
          <div className="relative z-10 max-w-5xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight drop-shadow-xl">
              Housing Management
            </h1>
            <p className="mt-6 text-xl md:text-2xl font-light max-w-3xl mx-auto drop-shadow-md">
              Efficient, Resident-Focused Property Solutions that build
              thriving, sustainable communities for the future.
            </p>
          </div>
        </section>

        {/* Main Content with Sticky Sidebar and new layout */}
        <section className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Content Column */}
          <div className="lg:col-span-3 space-y-16">
            {/* Introduction with statistics */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
                Professional & Compassionate Housing Services
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1 bg-teal-600 p-8 rounded-2xl shadow-lg text-white flex flex-col items-center justify-center text-center transform transition-transform hover:scale-105 duration-300">
                  <BarChart className="w-16 h-16 mb-2" />
                  <span className="text-5xl font-extrabold">98%</span>
                  <p className="text-lg font-light mt-1">Tenant Satisfaction</p>
                </div>
                <div className="md:col-span-2 bg-gray-50 p-8 rounded-2xl shadow-inner border border-gray-100 flex flex-col justify-center">
                  <p className="text-lg leading-relaxed text-gray-700">
                    We deliver responsive and responsible housing management
                    services, fostering safe, sustainable living environments
                    for residents. Our approach is built on trust, transparency,
                    and a commitment to excellence. Our team ensures full
                    compliance with all regulatory standards while maintaining a
                    people-first approach to tenant engagement and property
                    upkeep. We're dedicated to your peace of mind.
                  </p>
                </div>
              </div>
            </div>

            {/* Featured Benefits with icons */}
            <div className="bg-white py-12 px-8 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-4xl font-bold mb-10 text-center text-gray-900">
                Why Our Housing Management Works
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: Users,
                    title: "Tenant-Focused Support",
                    desc: "24/7 access to tenant services and responsive issue resolution.",
                  },
                  {
                    icon: Clipboard,
                    title: "Lease & Compliance Management",
                    desc: "Regulatory adherence and seamless lease processing.",
                  },
                  {
                    icon: Wrench,
                    title: "Property Maintenance",
                    desc: "Scheduled repairs, inspections, and contractor oversight.",
                  },
                  {
                    icon: DollarSign,
                    title: "Rent Collection & Reporting",
                    desc: "Secure systems for rent, arrears, and financial accountability.",
                  },
                  {
                    icon: HeartHandshake,
                    title: "Community Building",
                    desc: "Trust-driven resident interaction for housing harmony.",
                  },
                  {
                    icon: Database,
                    title: "Data & Asset Management",
                    desc: "Centralized records and advanced property tracking tools.",
                  },
                ].map(({ icon: Icon, title, desc }, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col items-start space-y-3 transform transition-all hover:shadow-xl hover:scale-105 duration-300"
                  >
                    <div className="p-3 bg-teal-500 rounded-full text-white">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl text-gray-900">
                        {title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Explore Section with real video preview */}
            <div className="bg-gray-100 p-10 rounded-3xl shadow-lg border border-gray-200">
              <h2 className="text-4xl font-bold mb-6 text-center text-gray-900">
                Unlock Our Featured Resources
              </h2>
              <p className="mb-12 text-lg text-gray-600 text-center">
                Deepen your understanding of our comprehensive housing
                solutions.
              </p>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                {/* Video Preview with actual video file */}
                <div className="relative bg-gray-200 rounded-2xl overflow-hidden shadow-xl group cursor-pointer aspect-video">
                  <video
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src="/hero.mp4"
                    poster="/services/video-placeholder.jpg"
                    controls
                    preload="none"
                  >
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute bottom-4 left-4 right-4 p-4 bg-black bg-opacity-60 rounded-xl">
                    <span className="text-white text-lg font-semibold">
                      Watch Our Property Services Overview Video
                    </span>
                    <p className="text-sm text-gray-300">
                      Learn how our solutions empower property owners and
                      tenants.
                    </p>
                  </div>
                </div>

                {/* Featured Case Study Callout */}
                <a
                  href="#"
                  className="relative flex flex-col justify-between p-8 bg-white rounded-2xl shadow-md border-l-4 border-teal-500 transition-all hover:bg-gray-50 hover:shadow-xl duration-300"
                >
                  <span className="absolute top-4 right-4 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Featured
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-teal-100 text-teal-600 rounded-xl">
                      <Download className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        Housing Management Case Study
                      </h3>
                      <p className="text-gray-600">
                        See how we achieved a 98% tenant satisfaction rate.
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center text-teal-600 font-semibold">
                    Download Now <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </a>

                {/* Other Resources */}
                <a
                  href="#"
                  className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-200 hover:bg-gray-100 transition duration-300"
                >
                  <FaFileAlt className="text-3xl text-gray-700" />
                  <span className="text-gray-800 font-medium">
                    Explore Tenant Success Stories
                  </span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-200 hover:bg-gray-100 transition duration-300"
                >
                  <FaPlayCircle className="text-3xl text-gray-700" />
                  <span className="text-gray-800 font-medium">
                    Watch Our Compliance & Repairs Webinar
                  </span>
                </a>
              </div>
            </div>

            {/* Contact Form with improved UI and CTA hierarchy */}
            <div className="bg-gray-100 py-12 px-8 rounded-3xl shadow-lg border border-gray-200">
              <h2 className="text-4xl font-bold mb-4 text-center text-gray-900">
                Talk to Our Housing Experts
              </h2>
              <p className="text-center text-gray-600 mb-10 text-lg">
                Whether you're a housing provider or a tenant, we’re here to
                help.
              </p>
              <form className="space-y-6 bg-white p-10 rounded-2xl shadow-xl">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Company (Optional)"
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  />
                </div>
                <textarea
                  placeholder="Tell us about your needs..."
                  rows="4"
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                ></textarea>
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 w-5 h-5 text-teal-600 rounded focus:ring-teal-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-600">
                    I consent to have Demand Recruitment Services Ltd store my
                    submitted information for updates and to contact me about my
                    inquiry.
                  </span>
                </label>
                <div className="text-center">
                  <button
                    type="submit"
                    className="px-10 py-4 bg-teal-600 text-white font-bold rounded-full shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50 transition-all"
                  >
                    Request a Call Back
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sticky Sidebar with Secondary CTA */}
          <aside className="lg:sticky top-24 h-fit">
            <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8 space-y-8">
              <h3 className="text-3xl font-bold text-gray-900">Quick Access</h3>
              <a
                href="/requestEmployee"
                className="block w-full py-4 px-6 text-center text-teal-600 border-2 border-teal-600 rounded-full font-bold hover:bg-teal-600 hover:text-white transition-all shadow-md"
              >
                📝 Request Staff
              </a>
              <ul className="list-none pl-0 text-lg text-gray-700 space-y-4 border-t pt-6">
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-teal-600 w-5 h-5" />
                  <span>Lease & rent support</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-teal-600 w-5 h-5" />
                  <span>Maintenance coordination</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-teal-600 w-5 h-5" />
                  <span>Data-driven housing reports</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-teal-600 w-5 h-5" />
                  <span>Tenant & community services</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-teal-600 w-5 h-5" />
                  <span>Regulatory compliance experts</span>
                </li>
              </ul>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </>
  );
}
