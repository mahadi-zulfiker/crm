import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import StickyHeader from "@/components/StickyHeader";

export default function EmployerTestimonialPage() {
  return (
    <div className="bg-white">
      <Navbar />
      <StickyHeader></StickyHeader>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-gray-700 relative text-white py-24 text-center overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-4">
            Employer Testimonials
          </h1>
          <p className="font-bold text-white mb-4">
            Hear from the businesses we’ve partnered with and see the impact of
            our staffing solutions.
          </p>
        </div>
      </div>

      {/* Testimonials */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {[
          {
            name: "Sarah Johnson",
            title: "HR Manager",
            quote:
              "Associated Staffing helped us reduce turnover and streamline hiring for our seasonal needs. Truly a game-changer!",
          },
          {
            name: "David Clark",
            title: "Operations Director",
            quote:
              "We needed urgent staff for a product launch event. The team at Associated Staffing delivered in record time!",
          },
          {
            name: "Emily Davis",
            title: "Business Owner",
            quote:
              "Their Professional Staffing Division brought us top-tier permanent employees. Couldn’t be happier!",
          },
        ].map((testimonial, index) => (
          <div
            key={index}
            className="bg-white shadow-md p-6 rounded-lg border border-gray-200"
          >
            <p className="text-gray-700 italic mb-4">“{testimonial.quote}”</p>
            <div className="text-sm font-medium text-gray-900">
              {testimonial.name} –{" "}
              <span className="text-gray-600">{testimonial.title}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Testimonial Form */}
      <section className="bg-gray-50 py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Share Your Experience
        </h2>
        <form className="grid grid-cols-1 gap-6">
          <div>
            <label className="block font-medium mb-1">Name *</label>
            <input
              type="text"
              required
              className="w-full border rounded-md p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Title *</label>
            <input
              type="text"
              required
              className="w-full border rounded-md p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Phone *</label>
            <input
              type="tel"
              required
              className="w-full border rounded-md p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Company (will not be used in marketing materials)
            </label>
            <input type="text" className="w-full border rounded-md p-3" />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Branch location that you worked with: *
            </label>
            <select required className="w-full border rounded-md p-3">
              <option value="">Select Branch</option>
              <option>Grand Island</option>
              <option>Hastings</option>
              <option>Kearney</option>
              <option>Omaha</option>
              <option>Columbus</option>
              <option>Professional Staffing Division</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              What solutions did we provide to your company?
            </label>
            <textarea rows="3" className="w-full border rounded-md p-3" />
          </div>

          <div>
            <label className="block font-medium mb-1">
              What issue(s) were you facing before you contacted us? What
              problem did we solve for you?
            </label>
            <textarea rows="3" className="w-full border rounded-md p-3" />
          </div>

          <div>
            <label className="block font-medium mb-1">
              How much have our services affected your profits, income, time or
              turnover rate?
            </label>
            <textarea rows="3" className="w-full border rounded-md p-3" />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Have our services made your job easier? How?
            </label>
            <textarea rows="3" className="w-full border rounded-md p-3" />
          </div>

          <div>
            <label className="block font-medium mb-1">
              What specific feature(s) of our services did you appreciate the
              most?
            </label>
            <textarea rows="3" className="w-full border rounded-md p-3" />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Would you recommend Associated Staffing to other businesses? Why?
            </label>
            <textarea rows="3" className="w-full border rounded-md p-3" />
          </div>

          <div>
            <label className="block font-medium mb-1">
              What part of your experience makes you want to do business with us
              again?
            </label>
            <textarea rows="3" className="w-full border rounded-md p-3" />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Additional comments about your experience with us:
            </label>
            <textarea rows="3" className="w-full border rounded-md p-3" />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md"
            >
              Submit Testimonial
            </button>
          </div>
        </form>
      </section>
      <Footer />
    </div>
  );
}
