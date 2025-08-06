import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { CheckCircle } from 'lucide-react';
import { FaFileAlt, FaPlayCircle } from 'react-icons/fa';

export default function SupportedLiving() {
  return (
    <>
      <Navbar />
      <Head>
        <title>Supported Living | Demand Recruitment Services Ltd</title>
        <meta
          name="description"
          content="Specialised Supported Living services that empower independence and deliver compassionate care."
        />
      </Head>

      <main className="text-gray-800">
        {/* Hero Section */}
        <section className="relative bg-[url('/services/41.jpg')] bg-cover bg-center text-white py-24 text-center px-4">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold drop-shadow-lg">Supported Living Services</h1>
            <p className="mt-4 text-xl drop-shadow-md">Empowering Lives with Dignity and Purpose</p>
          </div>
        </section>

        {/* Main Content & Sticky Sidebar */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-16">
            {/* Introduction */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-center">Compassionate & Consistent Care</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                  <p>
                    We help individuals live independently with the right support, promoting safety, confidence, and wellbeing.
                  </p>
                </div>
                <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                  <p>
                    Our trained support workers provide personalised assistance with daily living, social inclusion, and personal development.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gray-50 py-8 px-4 rounded-xl shadow">
              <h2 className="text-3xl font-bold mb-8 text-center">Benefits of Our Supported Living</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: 'Independence Focused', desc: 'Helping individuals live on their own terms, safely and confidently.' },
                  { title: '24/7 Personalised Support', desc: 'Round-the-clock care tailored to personal goals and preferences.' },
                  { title: 'Safe & Comfortable Homes', desc: 'Clean, accessible, and secure supported housing environments.' },
                  { title: 'Trained & Compassionate Staff', desc: 'Professionals who prioritise dignity and empathy.' },
                  { title: 'Community Integration', desc: 'Encouraging participation, friendships, and local engagement.' },
                  { title: 'Family & Guardian Collaboration', desc: 'Open communication and partnership with loved ones.' },
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
              <h2 className="text-4xl font-bold mb-6 text-center">Explore Supported Living in Action</h2>
              <p className="mb-10 text-lg text-gray-600 text-center">
                Learn how we make independence possible through tailored support.
              </p>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                {[
                  { text: 'View Supported Living Case Study', icon: FaFileAlt },
                  { text: 'Watch Family Feedback Video', icon: FaPlayCircle },
                  { text: 'Read About Our Care Framework', icon: FaFileAlt },
                  { text: 'Watch Our Support Worker Testimonials', icon: FaPlayCircle },
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
              <h2 className="text-3xl font-bold mb-4 text-center">Let’s Talk Supported Living</h2>
              <p className="text-center text-gray-600 mb-8">
                Connect with our care coordinators to find the right support package for your needs.
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
                  Your support journey starts with one conversation.
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
                className="block bg-teal-600 text-white text-center py-2 px-4 rounded-lg font-semibold hover:bg-teal-700 transition"
              >
                📝 Request Staff Now
              </a>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                <li>Tailored care for each individual</li>
                <li>Promote independence and safety</li>
                <li>Carefully vetted compassionate staff</li>
                <li>24/7 support across supported homes</li>
                <li>Build confidence & life skills</li>
              </ul>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </>
  );
}
