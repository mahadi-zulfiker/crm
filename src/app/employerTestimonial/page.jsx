import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import StickyHeader from "@/components/StickyHeader";

export default function EmployerTestimonialPage() {
  return (
    <div className="bg-gray-50 min-h-screen"> {/* Light background for glassy effects */}
      <Navbar />
      <StickyHeader />

      {/* Enhanced Header with Banner Image, Animations, and Hover Effects */}
      <div 
        className="relative text-white py-32 text-center overflow-hidden bg-cover bg-center transition-transform duration-500 ease-in-out hover:scale-105"
        style={{ backgroundImage: `url('/recruitment.jpg')` }}
      >
        {/* Glassy Overlay */}
        <div className="absolute inset-0 bg-teal-900/50 backdrop-blur-sm z-0"></div>

        {/* Content with Fade-In Animation */}
        <div className="relative z-10 animate-fadeIn">
          <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            Employer Testimonials
          </h1>
          <p className="text-xl font-semibold text-teal-100 mb-6 max-w-2xl mx-auto">
            Hear from the businesses we’ve partnered with and see the impact of
            our staffing solutions.
          </p>
        </div>
      </div>

      {/* Inspiring Quotes Section - Inspired by Pinterest's Quote Cards */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-teal-800 mb-12 text-center">
          Inspiring Words on Talent & Growth
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              quote: "The best way to predict the future is to create it.",
              author: "Peter Drucker",
            },
            {
              quote: "Talent wins games, but teamwork and intelligence win championships.",
              author: "Michael Jordan",
            },
            {
              quote: "Hire character. Train skill.",
              author: "Peter Schutz",
            },
          ].map((quote, index) => (
            <div
              key={index}
              className="bg-white/30 backdrop-blur-md border border-teal-200/50 shadow-lg p-8 rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              <p className="text-teal-700 italic text-lg mb-4">“{quote.quote}”</p>
              <div className="text-sm font-medium text-teal-900">
                - {quote.author}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Testimonials with Hover Effects and Glassy Design */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-teal-800 mb-12 text-center">
          What Our Partners Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
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
              className="bg-white/40 backdrop-blur-lg border border-teal-200/30 shadow-md p-8 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-white/60"
            >
              <p className="text-teal-700 italic mb-6 text-lg">“{testimonial.quote}”</p>
              <div className="text-sm font-medium text-teal-900">
                {testimonial.name} –{" "}
                <span className="text-teal-600">{testimonial.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Testimonial Form with Interactive Design and Glassy Effects */}
      <section className="bg-teal-50/50 py-16 px-6 max-w-4xl mx-auto rounded-2xl shadow-lg">
        <h2 className="text-4xl font-bold text-teal-800 mb-8 text-center">
          Share Your Experience
        </h2>
        <form className="grid grid-cols-1 gap-6">
          <div>
            <label className="block font-medium mb-2 text-teal-700">Name *</label>
            <input
              type="text"
              required
              className="w-full bg-white/20 backdrop-blur-sm border border-teal-300 rounded-lg p-4 transition duration-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-teal-700">Title *</label>
            <input
              type="text"
              required
              className="w-full bg-white/20 backdrop-blur-sm border border-teal-300 rounded-lg p-4 transition duration-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-teal-700">Phone *</label>
            <input
              type="tel"
              required
              className="w-full bg-white/20 backdrop-blur-sm border border-teal-300 rounded-lg p-4 transition duration-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-teal-700">
              Company (will not be used in marketing materials)
            </label>
            <input 
              type="text" 
              className="w-full bg-white/20 backdrop-blur-sm border border-teal-300 rounded-lg p-4 transition duration-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400" 
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-teal-700">
              Branch location that you worked with: *
            </label>
            <select 
              required 
              className="w-full bg-white/20 backdrop-blur-sm border border-teal-300 rounded-lg p-4 transition duration-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400"
            >
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
            <label className="block font-medium mb-2 text-teal-700">
              What solutions did we provide to your company?
            </label>
            <textarea 
              rows="3" 
              className="w-full bg-white/20 backdrop-blur-sm border border-teal-300 rounded-lg p-4 transition duration-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400" 
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-teal-700">
              What issue(s) were you facing before you contacted us? What
              problem did we solve for you?
            </label>
            <textarea 
              rows="3" 
              className="w-full bg-white/20 backdrop-blur-sm border border-teal-300 rounded-lg p-4 transition duration-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400" 
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-teal-700">
              How much have our services affected your profits, income, time or
              turnover rate?
            </label>
            <textarea 
              rows="3" 
              className="w-full bg-white/20 backdrop-blur-sm border border-teal-300 rounded-lg p-4 transition duration-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400" 
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-teal-700">
              Have our services made your job easier? How?
            </label>
            <textarea 
              rows="3" 
              className="w-full bg-white/20 backdrop-blur-sm border border-teal-300 rounded-lg p-4 transition duration-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400" 
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-teal-700">
              What specific feature(s) of our services did you appreciate the
              most?
            </label>
            <textarea 
              rows="3" 
              className="w-full bg-white/20 backdrop-blur-sm border border-teal-300 rounded-lg p-4 transition duration-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400" 
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-teal-700">
              Would you recommend Associated Staffing to other businesses? Why?
            </label>
            <textarea 
              rows="3" 
              className="w-full bg-white/20 backdrop-blur-sm border border-teal-300 rounded-lg p-4 transition duration-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400" 
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-teal-700">
              What part of your experience makes you want to do business with us
              again?
            </label>
            <textarea 
              rows="3" 
              className="w-full bg-white/20 backdrop-blur-sm border border-teal-300 rounded-lg p-4 transition duration-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400" 
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-teal-700">
              Additional comments about your experience with us:
            </label>
            <textarea 
              rows="3" 
              className="w-full bg-white/20 backdrop-blur-sm border border-teal-300 rounded-lg p-4 transition duration-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-400" 
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 px-8 rounded-lg transition duration-300 transform hover:scale-105"
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