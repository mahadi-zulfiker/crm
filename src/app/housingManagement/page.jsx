import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { CheckCircle } from 'lucide-react';
import { FaFileAlt, FaPlayCircle } from 'react-icons/fa';

export default function HousingManagement() {
  return (
    <>
      <Navbar />
      <Head>
        <title>Housing Management | Demand Recruitment Services Ltd</title>
        <meta
          name="description"
          content="Comprehensive housing management solutions for sustainable communities and satisfied tenants."
        />
      </Head>

      <main className="text-gray-800">
        {/* Hero Section */}
        <section className="relative bg-[url('/services/44.jpg')] bg-cover bg-center text-white py-24 text-center px-4">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold drop-shadow-lg">Housing Management</h1>
            <p className="mt-4 text-xl drop-shadow-md">Efficient, Resident-Focused Property Solutions</p>
          </div>
        </section>

        {/* Main Content with Sticky Sidebar */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Content Column */}
          <div className="lg:col-span-3 space-y-16">
            {/* Introduction */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-center">
                Professional & Compassionate Housing Services
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                  <p>
                    We deliver responsive and responsible housing management services, fostering safe,
                    sustainable living environments for residents.
                  </p>
                </div>
                <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                  <p>
                    Our team ensures full compliance with regulatory standards while maintaining a
                    people-first approach to tenant engagement and property upkeep.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gray-50 py-8 px-4 rounded-xl shadow">
              <h2 className="text-3xl font-bold mb-8 text-center">Why Our Housing Management Works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: 'Tenant-Focused Support', desc: '24/7 access to tenant services and responsive issue resolution.' },
                  { title: 'Lease & Compliance Management', desc: 'Regulatory adherence and lease processing made seamless.' },
                  { title: 'Property Maintenance Coordination', desc: 'Scheduled repairs, inspections, and contractor oversight.' },
                  { title: 'Rent Collection & Reporting', desc: 'Secure systems for rent, arrears, and financial accountability.' },
                  { title: 'Community Relationship Building', desc: 'Trust-driven resident interaction for housing harmony.' },
                  { title: 'Data & Asset Management', desc: 'Centralized records and property tracking tools.' },
                ].map(({ title, desc }, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl shadow flex items-start space-x-4">
                    <CheckCircle className="text-green-600 w-6 h-6 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">{title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Explore Section */}
            <div className="bg-white p-8 rounded-xl shadow">
              <h2 className="text-4xl font-bold mb-6 text-center">Explore Our Property Services</h2>
              <p className="mb-10 text-lg text-gray-600 text-center">
                See how our housing solutions empower communities and property owners alike.
              </p>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                {[
                  { text: 'Download our Housing Management Case Study', icon: FaFileAlt },
                  { text: 'Watch our Property Services Overview Video', icon: FaPlayCircle },
                  { text: 'Explore Tenant Success Stories', icon: FaFileAlt },
                  { text: 'Watch Our Compliance & Repairs Webinar', icon: FaPlayCircle },
                ].map(({ text, icon: Icon }, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition"
                  >
                    <Icon className="text-xl text-gray-700" />
                    <span className="text-gray-800 font-medium">{text}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-100 py-10 px-6 rounded-xl shadow">
              <h2 className="text-3xl font-bold mb-4 text-center">Talk to Our Housing Experts</h2>
              <p className="text-center text-gray-600 mb-8">
                Whether you're a housing provider or managing tenants, we’re here to help you stay ahead.
              </p>
              <form className="space-y-6 bg-white p-8 rounded-lg shadow-md">
                <div className="grid md:grid-cols-3 gap-4">
                  <input type="text" placeholder="Full Name" className="w-full px-4 py-2 border rounded" />
                  <input type="email" placeholder="Email Address" className="w-full px-4 py-2 border rounded" />
                  <input type="tel" placeholder="Phone Number" className="w-full px-4 py-2 border rounded" />
                </div>
                <label className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">
                    I consent to have Demand Recruitment Services Ltd store my submitted information for updates.
                  </span>
                </label>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
                >
                  Request a Call Back
                </button>
                <p className="text-sm text-gray-600 text-center">
                  Let’s make your housing operations smarter and more tenant-focused.
                </p>
              </form>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside className="lg:sticky top-24 h-fit">
            <div className="bg-white border border-gray-200 rounded-xl shadow p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Quick Access</h3>
              <a
                href="/requestEmployee"
                className="block bg-teal-600 text-white text-center py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                📝 Request Staff
              </a>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                <li>Lease & rent support</li>
                <li>Maintenance coordination</li>
                <li>Data-driven housing reports</li>
                <li>Tenant & community services</li>
                <li>Regulatory compliance experts</li>
              </ul>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </>
  );
}
