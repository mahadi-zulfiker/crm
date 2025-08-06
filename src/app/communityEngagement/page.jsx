import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { CheckCircle } from 'lucide-react';
import { FaFileAlt, FaPlayCircle } from 'react-icons/fa';

export default function CommunityEngagement() {
  return (
    <>
      <Navbar />
      <Head>
        <title>Community Engagement | Demand Recruitment Services Ltd</title>
        <meta
          name="description"
          content="Inclusive and impactful community engagement programs designed to foster belonging and social value."
        />
      </Head>

      <main className="text-gray-800">
        {/* Hero Section */}
        <section className="relative bg-[url('/services/52.jpg')] bg-cover bg-center text-white py-24 text-center px-4">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold drop-shadow-lg">Community Engagement</h1>
            <p className="mt-4 text-xl drop-shadow-md">Creating Stronger, Inclusive Communities</p>
          </div>
        </section>

        {/* Main Content & Sticky Sidebar */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-16">
            {/* Introduction */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-center">Engaging People, Empowering Change</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                  <p>
                    We design and deliver community initiatives that bring people together, promote inclusion, and inspire change.
                  </p>
                </div>
                <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                  <p>
                    Our team collaborates with local groups and stakeholders to host events and projects that strengthen social bonds.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gray-50 py-8 px-4 rounded-xl shadow">
              <h2 className="text-3xl font-bold mb-8 text-center">Benefits of Our Community Engagement</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: 'Inclusive Events', desc: 'Programs designed for all abilities, ages, and backgrounds.' },
                  { title: 'Social Impact', desc: 'Foster belonging, connection, and purpose through participation.' },
                  { title: 'Local Collaboration', desc: 'Partner with community leaders and volunteers.' },
                  { title: 'Skill Development', desc: 'Empower individuals with workshops and opportunities.' },
                  { title: 'Stronger Communities', desc: 'Build long-lasting relationships and trust.' },
                  { title: 'Positive Wellbeing', desc: 'Improve mental and emotional health through involvement.' },
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
              <h2 className="text-4xl font-bold mb-6 text-center">Explore Community Engagement in Action</h2>
              <p className="mb-10 text-lg text-gray-600 text-center">
                Discover how our programs build stronger, more inclusive communities.
              </p>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                {[
                  { text: 'View Community Impact Report', icon: FaFileAlt },
                  { text: 'Watch Highlights from Our Events', icon: FaPlayCircle },
                  { text: 'Read Local Collaboration Stories', icon: FaFileAlt },
                  { text: 'Watch Volunteer Testimonials', icon: FaPlayCircle },
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
              <h2 className="text-3xl font-bold mb-4 text-center">Let’s Talk Community Engagement</h2>
              <p className="text-center text-gray-600 mb-8">
                Connect with us to build impactful, inclusive programs that benefit your community.
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
                  Let’s create something impactful together.
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
                📝 Request Staff Now
              </a>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                <li>Inclusive & accessible programs</li>
                <li>Local partnerships & outreach</li>
                <li>Event planning & support</li>
                <li>Volunteer & youth engagement</li>
                <li>Proven community impact</li>
              </ul>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </>
  );
}
