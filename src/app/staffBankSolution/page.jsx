import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { FaFileAlt, FaPlayCircle } from 'react-icons/fa';
import { CheckCircle } from 'lucide-react';

export default function StaffBank() {
  return (
    <>
      <Navbar />
      <Head>
        <title>Demand Recruitment Services Ltd – Smarter Healthcare Staffing</title>
        <meta name="description" content="Tailored staffing solutions to optimize your healthcare workforce." />
      </Head>

      <main className="text-gray-800">
        {/* Hero Section */}
        <section className="relative bg-[url('/v1.jpg')] bg-cover bg-center text-white py-24 text-center px-4">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold drop-shadow-lg">Demand Recruitment Services Ltd</h1>
            <p className="mt-4 text-xl drop-shadow-md">Your Partner in Smarter Healthcare Staffing</p>
          </div>
        </section>

        {/* Main Content & Sticky Sidebar */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left/Main Content */}
          <div className="lg:col-span-3 space-y-16">
            {/* Why Partner */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-center">Why Partner With Us?</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                  <p>We work closely with your team to identify workforce challenges, reduce costs, and implement strategic solutions.</p>
                </div>
                <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                  <p>Our recruitment experts help attract, engage, and retain top healthcare talent—driving performance and cost-efficiency.</p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gray-50 py-8 px-4 rounded-xl shadow">
              <h2 className="text-3xl font-bold mb-8 text-center">Benefits of Our Solutions</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: 'Staff Bank Technology', desc: 'Mobile and online booking platform for easy access.' },
                  { title: 'Talent Engagement', desc: 'Recruit top-tier talent and keep them motivated.' },
                  { title: 'High Fill Rates', desc: 'Achieve 95%+ fill rates with 24/7 support.' },
                  { title: 'Workforce Optimisation', desc: 'Smart resource matching to improve care and efficiency.' },
                  { title: 'Cost Savings', desc: 'Reduce reliance on agencies to save money.' },
                  { title: 'Data & Insights', desc: 'Real-time tracking and forecasting for smarter decisions.' },
                  { title: 'Process Automation', desc: 'Automate onboarding, rate approvals, and payroll.' },
                ].map(({ title, desc }, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl shadow text-left flex items-start space-x-4">
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
              <h2 className="text-4xl font-bold mb-6 text-center">Explore Our Solutions</h2>
              <p className="mb-10 text-lg text-gray-600 text-center">Discover how our tailored solutions can transform your healthcare workforce.</p>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                {[
                  { text: 'View a Staff Bank case study (all staffing groups)', icon: FaFileAlt },
                  { text: 'Watch our Staff Bank video', icon: FaPlayCircle },
                  { text: 'View a Medical Bank case study', icon: FaFileAlt },
                  { text: 'Watch our Staff Bank Webinar', icon: FaPlayCircle },
                ].map(({ text, icon: Icon }, idx) => (
                  <a key={idx} href="#" className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition">
                    <Icon className="text-xl text-gray-700" />
                    <span className="text-gray-800 font-medium">{text}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-100 py-10 px-6 rounded-xl shadow">
              <h2 className="text-3xl font-bold mb-4 text-center">Let’s Talk!</h2>
              <p className="text-center text-gray-600 mb-8">Need expert guidance on building or optimising your staff bank?</p>
              <form className="space-y-6 bg-white p-8 rounded-lg shadow-md">
                <div className="grid md:grid-cols-3 gap-4">
                  <input type="text" placeholder="Full Name" className="w-full px-4 py-2 border rounded" />
                  <input type="email" placeholder="Email Address" className="w-full px-4 py-2 border rounded" />
                  <input type="tel" placeholder="Phone Number" className="w-full px-4 py-2 border rounded" />
                </div>
                <label className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">I consent to have Demand Recruitment Services Ltd store my submitted information for updates.</span>
                </label>
                <button type="submit" className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">
                  Request a Call Back
                </button>
                <p className="text-sm text-gray-600 text-center">Let’s transform your healthcare staffing together!</p>
              </form>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside className="lg:sticky top-24 h-fit">
            <div className="bg-white border border-gray-200 rounded-xl shadow p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Quick Access</h3>
              <a
                href="/requestEmployee"
                className="block bg-teal-600 text-white text-center py-2 px-4 rounded-lg font-semibold hover:bg-teal-700 transition"
              >
                🚀 Request Staff
              </a>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                <li>Healthcare-specific solutions</li>
                <li>95%+ fill rate performance</li>
                <li>Mobile-first booking platform</li>
                <li>Automated onboarding & payroll</li>
                <li>Real-time staffing analytics</li>
              </ul>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </>
  );
}
