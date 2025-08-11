import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import {
  CheckCircle,
  ShieldCheck,
  HeartHandshake,
  Home,
  User,
  Quote,
  Star,
  Users,
  Award,
  BookMarked,
  PlayCircle,
  Download,
} from 'lucide-react';
import { FaFileAlt } from 'react-icons/fa';

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

      <main className="text-gray-800 bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-[url('/services/41.jpg')] bg-cover bg-center text-white py-32 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-700 to-teal-900 opacity-90"></div>
          <div className="relative z-10 max-w-5xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight drop-shadow-xl">
              Supported Living Services
            </h1>
            <p className="mt-6 text-xl md:text-2xl font-light max-w-3xl mx-auto drop-shadow-md">
              Empowering Lives with Dignity and Purpose
            </p>
            {/* Measurable Outcomes in Hero */}
            <div className="mt-12 flex justify-center space-x-8">
              <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm p-4 rounded-xl text-center shadow-lg">
                <p className="text-4xl font-bold">99%</p>
                <p className="text-sm font-light uppercase tracking-wider mt-1">Client Safety Score</p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm p-4 rounded-xl text-center shadow-lg">
                <p className="text-4xl font-bold">500+</p>
                <p className="text-sm font-light uppercase tracking-wider mt-1">Lives Empowered</p>
              </div>
            </div>
          </div>
        </section>

        {/* Emotional Quote Section */}
        <div className="max-w-4xl mx-auto px-4 -mt-16 relative z-20">
          <div className="bg-white p-10 rounded-3xl shadow-xl border-t-8 border-teal-600 text-center">
            <Quote className="w-10 h-10 text-teal-600 mx-auto mb-4" />
            <p className="text-xl italic font-serif text-gray-700">
              "The support my son receives from Demand Recruitment Services has given him a new lease on life. He's more independent and confident than ever before. We couldn't be more grateful."
            </p>
            <p className="mt-4 font-semibold text-gray-900">— Maria, Parent & Guardian</p>
          </div>
        </div>

        {/* Main Content & Sticky Sidebar */}
        <section className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-16">
            {/* Introduction */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
                Compassionate & Consistent Care
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-8 rounded-2xl shadow-inner border border-gray-100 transform transition-transform hover:scale-105 duration-300">
                  <p className="text-lg leading-relaxed text-gray-700">
                    We help individuals live independently with the right support, promoting
                    safety, confidence, and wellbeing. Our services are tailored to each
                    individual's unique needs and aspirations.
                  </p>
                </div>
                <div className="bg-gray-50 p-8 rounded-2xl shadow-inner border border-gray-100 transform transition-transform hover:scale-105 duration-300">
                  <p className="text-lg leading-relaxed text-gray-700">
                    Our trained support workers provide personalised assistance with daily living,
                    social inclusion, and personal development, fostering a life of dignity and purpose.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits Section with Thematic Icons and Hover Effects */}
            <div className="bg-white py-12 px-8 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-4xl font-bold mb-10 text-center text-gray-900">
                Benefits of Our Supported Living
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { icon: User, title: 'Independence Focused', desc: 'Helping individuals live on their own terms, safely and confidently.' },
                  { icon: HeartHandshake, title: '24/7 Personalised Support', desc: 'Round-the-clock care tailored to personal goals and preferences.' },
                  { icon: Home, title: 'Safe & Comfortable Homes', desc: 'Clean, accessible, and secure supported housing environments.' },
                  { icon: Users, title: 'Trained & Compassionate Staff', desc: 'Professionals who prioritise dignity and empathy.' },
                  { icon: ShieldCheck, title: 'Community Integration', desc: 'Encouraging participation, friendships, and local engagement.' },
                  { icon: Star, title: 'Family & Guardian Collaboration', desc: 'Open communication and partnership with loved ones.' },
                ].map(({ icon: Icon, title, desc }, idx) => (
                  <div key={idx} className="p-6 bg-gray-50 rounded-2xl shadow-md border border-gray-200 flex flex-col items-start space-y-3 transform transition-all hover:shadow-xl hover:scale-105 duration-300">
                    <div className="p-3 bg-teal-500 rounded-full text-white">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl text-gray-900">{title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Explore & Trust Section */}
            <div className="bg-gray-100 p-10 rounded-3xl shadow-lg border border-gray-200">
              <h2 className="text-4xl font-bold mb-6 text-center text-gray-900">
                Explore Our Supported Living Resources
              </h2>
              <p className="mb-10 text-lg text-gray-600 text-center">
                Learn how we make independence possible through tailored support.
              </p>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                {/* Callout Button with Icon */}
                <a
                  href="#"
                  className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-md border-l-4 border-teal-500 transition-all hover:bg-gray-50 hover:shadow-xl duration-300"
                >
                  <div className="p-4 bg-teal-100 text-teal-600 rounded-xl">
                    <Download className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Supported Living Case Study
                    </h3>
                    <p className="text-gray-600 text-sm">
                      See our approach to personalised care in detail.
                    </p>
                  </div>
                </a>
                {/* Callout Button with Icon */}
                <a
                  href="#"
                  className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-md border-l-4 border-teal-500 transition-all hover:bg-gray-50 hover:shadow-xl duration-300"
                >
                  <div className="p-4 bg-teal-100 text-teal-600 rounded-xl">
                    <PlayCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Watch Family Feedback Video
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Hear directly from the families we have supported.
                    </p>
                  </div>
                </a>
                {/* Callout Button with Icon */}
                <a
                  href="#"
                  className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-md border-l-4 border-teal-500 transition-all hover:bg-gray-50 hover:shadow-xl duration-300"
                >
                  <div className="p-4 bg-teal-100 text-teal-600 rounded-xl">
                    <FaFileAlt className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Read About Our Care Framework
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Understand our commitment to quality and dignity.
                    </p>
                  </div>
                </a>
                {/* Callout Button with Icon */}
                <a
                  href="#"
                  className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-md border-l-4 border-teal-500 transition-all hover:bg-gray-50 hover:shadow-xl duration-300"
                >
                  <div className="p-4 bg-teal-100 text-teal-600 rounded-xl">
                    <BookMarked className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Browse Our Supported Homes
                    </h3>
                    <p className="text-sm text-gray-600">
                      Find the perfect, safe environment for your loved one.
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Contact Form with Trust Signals and Client Story */}
            <div className="bg-gray-100 py-12 px-8 rounded-3xl shadow-lg border border-gray-200">
              <h2 className="text-4xl font-bold mb-4 text-center text-gray-900">
                Let’s Talk Supported Living
              </h2>
              <p className="text-center text-gray-600 mb-10 text-lg">
                Connect with our care coordinators to find the right support package for your needs.
              </p>
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Trust Signals & Client Story */}
                <div className="bg-white p-8 rounded-2xl shadow-inner border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <Award className="text-teal-600 w-8 h-8" /> Our Commitment
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    We are dedicated to providing the highest standards of care. Our services are CQC-certified and we adhere strictly to GDPR regulations, ensuring your peace of mind and data security.
                  </p>
                  <p className="mt-4 text-sm font-semibold text-teal-600">
                    Your support journey starts with one conversation.
                  </p>
                </div>
                {/* Contact Form */}
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
                      placeholder="Relationship to Client"
                      className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                    />
                  </div>
                  <textarea
                    placeholder="Tell us about your needs..."
                    rows="4"
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  ></textarea>
                  <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1 w-5 h-5 text-teal-600 rounded focus:ring-teal-500 border-gray-300" />
                    <span className="text-sm text-gray-600">
                      I consent to have Demand Recruitment Services Ltd store my submitted information for updates and to contact me about my inquiry.
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
          </div>

          {/* Sticky Sidebar with Secondary CTA */}
          <aside className="lg:sticky top-24 h-fit">
            <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8 space-y-8">
              <h3 className="text-3xl font-bold text-gray-900">Quick Access</h3>
              <a
                href="/requestEmployee"
                className="block w-full py-4 px-6 text-center text-teal-600 border-2 border-teal-600 rounded-full font-bold hover:bg-teal-600 hover:text-white transition-all shadow-md"
              >
                📝 Request Staff Now
              </a>
              <ul className="list-none pl-0 text-lg text-gray-700 space-y-4 border-t pt-6">
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-teal-600 w-5 h-5" />
                  <span>Tailored care for each individual</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-teal-600 w-5 h-5" />
                  <span>Promote independence and safety</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-teal-600 w-5 h-5" />
                  <span>Carefully vetted compassionate staff</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-teal-600 w-5 h-5" />
                  <span>24/7 support across supported homes</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-teal-600 w-5 h-5" />
                  <span>Build confidence & life skills</span>
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