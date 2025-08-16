import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import StickyHeader from "@/components/StickyHeader";

export default function RequestEmployeePage() {
  return (
    <div className="bg-white">
      <Navbar />
      <StickyHeader></StickyHeader>
      {/* Intro Section */}
      <div className="bg-gradient-to-r from-blue-900 to-gray-700 relative text-white py-24 text-center overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-4">
            Request an Employee
          </h1>
        </div>
      </div>
      <section className="text-center py-16 px-6 max-w-3xl mx-auto text-gray-700">
        <h2 className="text-3xl font-bold">
          Request an Employee for your Project
        </h2>
        <p className="mt-5">
          {" "}
          We Are Here to Help. 
          <br />
          If you’re interested in requesting an employee for an open position or
          project, please take a moment to provide us with the necessary details
          by filling out the form below. Your perfect team member is just a
          click away!
        </p>
      </section>
      {/* Form Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Info */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-700">
              Job Title *
            </label>
            <input
              type="text"
              required
              className="w-full border rounded-md p-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-700">
              Duties & Responsibilities *
            </label>
            <textarea
              rows="4"
              required
              className="w-full border rounded-md p-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-700">
              Location *
            </label>
            <input
              type="text"
              required
              className="w-full border rounded-md p-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-700">
              How did you hear about us?
            </label>
            <input type="text" className="w-full border rounded-md p-3" />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-700">
              Additional Comments
            </label>
            <textarea rows="4" className="w-full border rounded-md p-3" />
          </div>

          {/* Contact Info */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Your Contact Information
            </h3>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              First Name *
            </label>
            <input
              type="text"
              required
              className="w-full border rounded-md p-3"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Last Name *
            </label>
            <input
              type="text"
              required
              className="w-full border rounded-md p-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-700">
              Company *
            </label>
            <input
              type="text"
              required
              className="w-full border rounded-md p-3"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Phone *
            </label>
            <input
              type="tel"
              required
              className="w-full border rounded-md p-3"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              required
              className="w-full border rounded-md p-3"
            />
          </div>

          {/* Preferred Contact Method */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium text-gray-700">
              Respond by:
            </label>
            <div className="flex items-center gap-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="respondBy"
                  value="phone"
                  className="mr-2"
                />
                Phone
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="respondBy"
                  value="email"
                  className="mr-2"
                />
                Email
              </label>
            </div>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md w-full md:w-auto"
            >
              Submit Request
            </button>
          </div>
        </form>
      </section>
      <Footer />
    </div>
  );
}
