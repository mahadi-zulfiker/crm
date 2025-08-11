import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import {
  CheckCircle,
  Users,
  Handshake,
  Lightbulb,
  Heart,
  Quote,
  ArrowRight,
  GalleryHorizontal,
  BarChart
} from 'lucide-react';

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

      <main className="text-gray-800 bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-[url('/services/52.jpg')] bg-cover bg-center text-white py-32 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-700 to-teal-900 opacity-90"></div>
          <div className="relative z-10 max-w-5xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight drop-shadow-xl">
              Community Engagement
            </h1>
            <p className="mt-6 text-xl md:text-2xl font-light max-w-3xl mx-auto drop-shadow-md">
              Creating Stronger, Inclusive Communities
            </p>
            {/* Data in Hero */}
            <div className="mt-12 flex justify-center space-x-8">
              <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm p-4 rounded-xl text-center shadow-lg">
                <p className="text-4xl font-bold">10,000+</p>
                <p className="text-sm font-light uppercase tracking-wider mt-1">Event Participants</p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm p-4 rounded-xl text-center shadow-lg">
                <p className="text-4xl font-bold">150+</p>
                <p className="text-sm font-light uppercase tracking-wider mt-1">Local Partnerships</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <div className="max-w-4xl mx-auto px-4 -mt-16 relative z-20">
          <div className="bg-white p-10 rounded-3xl shadow-xl border-t-8 border-teal-600 text-center">
            <Quote className="w-10 h-10 text-teal-600 mx-auto mb-4" />
            <p className="text-xl italic font-serif text-gray-700">
              "Working with Demand Recruitment Services has truly transformed our local community center. Their engagement programs have brought so many new faces together, fostering a sense of belonging we've never had before."
            </p>
            <p className="mt-4 font-semibold text-gray-900">— Sarah Chen, Community Leader</p>
          </div>
        </div>

        {/* Main Content & Sticky Sidebar */}
        <section className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-16">
            {/* Introduction */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
                Engaging People, Empowering Change
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-8 rounded-2xl shadow-inner border border-gray-100 transform transition-transform hover:scale-105 duration-300">
                  <p className="text-lg leading-relaxed text-gray-700">
                    We design and deliver community initiatives that bring people together,
                    promote inclusion, and inspire lasting change. Our projects are tailored to
                    meet the unique needs of each community we serve.
                  </p>
                </div>
                <div className="bg-gray-50 p-8 rounded-2xl shadow-inner border border-gray-100 transform transition-transform hover:scale-105 duration-300">
                  <p className="text-lg leading-relaxed text-gray-700">
                    Our team collaborates with local groups and stakeholders to host events and
                    projects that strengthen social bonds and build a foundation of mutual trust
                    and support.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits Section with Thematic Grouping & Hover Effects */}
            <div className="bg-white py-12 px-8 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-4xl font-bold mb-10 text-center text-gray-900">
                Benefits of Our Community Engagement
              </h2>
              <div className="space-y-12">
                {/* Social Impact Group */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Handshake className="text-teal-600 w-6 h-6" /> Social Impact
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <a href="#" className="p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col items-start space-y-3 transform transition-all hover:shadow-xl hover:scale-105 duration-300">
                      <div className="p-3 bg-teal-500 rounded-full text-white">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-xl text-gray-900">Inclusive Events</h4>
                        <p className="text-sm text-gray-600 mt-1">Programs designed for all abilities, ages, and backgrounds.</p>
                      </div>
                    </a>
                    <a href="#" className="p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col items-start space-y-3 transform transition-all hover:shadow-xl hover:scale-105 duration-300">
                      <div className="p-3 bg-teal-500 rounded-full text-white">
                        <Handshake className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-xl text-gray-900">Local Collaboration</h4>
                        <p className="text-sm text-gray-600 mt-1">Partner with community leaders and volunteers.</p>
                      </div>
                    </a>
                    <a href="#" className="p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col items-start space-y-3 transform transition-all hover:shadow-xl hover:scale-105 duration-300">
                      <div className="p-3 bg-teal-500 rounded-full text-white">
                        <Heart className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-xl text-gray-900">Positive Wellbeing</h4>
                        <p className="text-sm text-gray-600 mt-1">Improve mental and emotional health through involvement.</p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Personal Growth Group */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Lightbulb className="text-teal-600 w-6 h-6" /> Personal Growth
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <a href="#" className="p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col items-start space-y-3 transform transition-all hover:shadow-xl hover:scale-105 duration-300">
                      <div className="p-3 bg-teal-500 rounded-full text-white">
                        <Handshake className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-xl text-gray-900">Stronger Communities</h4>
                        <p className="text-sm text-gray-600 mt-1">Build long-lasting relationships and trust.</p>
                      </div>
                    </a>
                    <a href="#" className="p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col items-start space-y-3 transform transition-all hover:shadow-xl hover:scale-105 duration-300">
                      <div className="p-3 bg-teal-500 rounded-full text-white">
                        <Lightbulb className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-xl text-gray-900">Skill Development</h4>
                        <p className="text-sm text-gray-600 mt-1">Empower individuals with workshops and opportunities.</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrolling Gallery */}
            <div className="bg-gray-100 p-10 rounded-3xl shadow-lg border border-gray-200">
              <h2 className="text-4xl font-bold mb-6 text-center text-gray-900">
                Community Engagement in Action
              </h2>
              <p className="mb-10 text-lg text-gray-600 text-center">
                A glimpse into our events that foster connection and positive change.
              </p>
              <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
                {[
                  { img: '/services/1.jpg', title: 'Summer Festival', desc: 'Bringing the community together with music and food.' },
                  { img: '/services/2.jpg', title: 'Youth Workshop', desc: 'Empowering the next generation with new skills.' },
                  { img: '/services/3.jpg', title: 'Volunteer Day', desc: 'Making a difference with hands-on projects.' },
                  { img: '/services/4.jpg', title: 'Inclusive Sports', desc: 'Fun and games for all abilities.' },
                  { img: '/services/5.jpg', title: 'Neighborhood Cleanup', desc: 'Working together for a cleaner, greener space.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex-shrink-0 w-80 rounded-2xl overflow-hidden shadow-xl group hover:shadow-2xl transition-all duration-300">
                    <div className="relative h-48 w-full bg-gray-200">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4 transition-all duration-300 group-hover:bg-opacity-20">
                        <div className="text-white">
                          <h4 className="text-lg font-semibold">{item.title}</h4>
                          <p className="text-sm font-light">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form with improved UI and CTA hierarchy */}
            <div className="bg-gray-100 py-12 px-8 rounded-3xl shadow-lg border border-gray-200">
              <h2 className="text-4xl font-bold mb-4 text-center text-gray-900">
                Let’s Build Something Great Together
              </h2>
              <p className="text-center text-gray-600 mb-10 text-lg">
                Connect with us to start planning impactful, inclusive programs for your community.
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
                    placeholder="Organization (Optional)"
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  />
                </div>
                <textarea
                  placeholder="Tell us about your community engagement needs..."
                  rows="4"
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                ></textarea>
                <label className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 w-5 h-5 text-teal-600 rounded focus:ring-teal-500 border-gray-300" />
                  <span className="text-sm text-gray-600">
                    I consent to have Demand Recruitment Services Ltd store my submitted information
                    for updates and to contact me about my inquiry.
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
                📝 Request Staff Now
              </a>
              <ul className="list-none pl-0 text-lg text-gray-700 space-y-4 border-t pt-6">
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-teal-600 w-5 h-5" />
                  <span>Inclusive & accessible programs</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-teal-600 w-5 h-5" />
                  <span>Local partnerships & outreach</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-teal-600 w-5 h-5" />
                  <span>Event planning & support</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-teal-600 w-5 h-5" />
                  <span>Volunteer & youth engagement</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-teal-600 w-5 h-5" />
                  <span>Proven community impact</span>
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