import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import StickyHeader from "@/components/StickyHeader";
import Image from "next/image";

export default function RequestCallbackPage() {
  return (
    <div className="bg-white">
      <Navbar />
      <StickyHeader></StickyHeader>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-gray-700 relative text-white py-24 text-center overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-4">
            Request a Callback
          </h1>
          <p className="text-lg text-white mb-6 max-w-2xl mx-auto">
            Looking to hire? Submit a job spec or request a callback to speak
            with our specialist consultants.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold">
              Request a Callback
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md font-semibold">
              Submit a Job Spec
            </button>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Request Callback
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="First Name"
            className="border p-3 rounded-md"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border p-3 rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-md"
          />
          <input
            type="text"
            placeholder="Company"
            className="border p-3 rounded-md"
          />
          <input
            type="text"
            placeholder="Telephone"
            className="border p-3 rounded-md"
          />
          <input
            type="text"
            placeholder="Job Title"
            className="border p-3 rounded-md"
          />
          <select className="border p-3 rounded-md" defaultValue="">
            <option value="" disabled>
              Nearest Office Location
            </option>
            <option>London</option>
            <option>Manchester</option>
            <option>Edinburgh</option>
            <option>Remote</option>
          </select>
          <select className="border p-3 rounded-md" defaultValue="">
            <option value="" disabled>
              Your Sector
            </option>
            <option>Technology</option>
            <option>Healthcare</option>
            <option>Finance</option>
            <option>Engineering</option>
          </select>
          <textarea
            placeholder="How can we help you?"
            className="border p-3 rounded-md md:col-span-2"
            rows={5}
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md md:col-span-2 text-lg font-semibold">
            Submit
          </button>
        </form>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-6 bg-gray-50 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Why Choose Us?
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-6">
          We partner with businesses across industries to find top talent and
          deliver customized recruitment solutions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-gray-800">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="font-semibold text-lg mb-2">
              Specialist Consultants
            </h3>
            <p>Experienced experts in your sector who understand your needs.</p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="font-semibold text-lg mb-2">Tailored Approach</h3>
            <p>
              Flexible hiring options for permanent, contract, or temporary
              roles.
            </p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="font-semibold text-lg mb-2">Extensive Network</h3>
            <p>
              Access a broad network of qualified professionals ready to make an
              impact.
            </p>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Our Office Locations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
          <div>
            <h3 className="font-semibold mb-2">London</h3>
            <p>123 Recruitment St, London, UK</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Manchester</h3>
            <p>456 Hiring Rd, Manchester, UK</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Edinburgh</h3>
            <p>789 Talent Ln, Edinburgh, UK</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
