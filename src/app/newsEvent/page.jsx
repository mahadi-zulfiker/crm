// app/news-events/page.jsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import StickyHeader from "@/components/StickyHeader";

const NewsEventsPage = () => {
  // Dummy data for demonstration
  const recentNews = [
    {
      id: 1,
      title: "Demand Recruitment Hosts Annual Charity Drive",
      date: "May 20, 2025",
      summary:
        "Our team successfully organized and executed its annual charity drive, raising significant funds for local community projects.",
      imageUrl: "./services/3.jpg",
      link: "/news/charity-drive-2025",
    },
    {
      id: 2,
      title: "New Partnership Announcement: Expanding Our Reach",
      date: "May 15, 2025",
      summary:
        "We are thrilled to announce a strategic partnership that will allow us to offer an even wider range of services to our clients.",
      imageUrl: "./services/4.jpg",
      link: "/news/new-partnership",
    },
    {
      id: 3,
      title: "Industry Insight: The Future of Remote Work",
      date: "May 10, 2025",
      summary:
        "Our latest article delves into the evolving landscape of remote work and its implications for the modern workforce.",
      imageUrl: "./services/5.jpg", // Placeholder image
      link: "/news/remote-work-future",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Webinar: Navigating the Green Economy",
      date: "June 15, 2025",
      time: "10:00 AM GMT",
      location: "Online",
      summary:
        "Join our experts for a discussion on sustainable practices and opportunities in the burgeoning green economy.",
      link: "/events/green-economy-webinar",
    },
    {
      id: 2,
      title: "Career Fair 2025: Meet Our Team",
      date: "July 01, 2025",
      time: "09:00 AM - 05:00 PM",
      location: "London Convention Centre",
      summary:
        "Discover exciting career opportunities and network with our recruitment specialists.",
      link: "/events/career-fair-2025",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar /> {/* Include your Navbar component */}
      <StickyHeader></StickyHeader>
      <main className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">
          News & Events
        </h1>

        {/* Recent News Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-700 mb-8">
            Recent News
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentNews.map((newsItem) => (
              <div
                key={newsItem.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={newsItem.imageUrl}
                  alt={newsItem.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {newsItem.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{newsItem.date}</p>
                  <p className="text-gray-600 mb-4">{newsItem.summary}</p>
                  <Link
                    href={newsItem.link}
                    className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
                  >
                    Read More &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-700 mb-8">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-500 mb-1">
                  <span className="font-medium">Date:</span> {event.date}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <span className="font-medium">Time:</span> {event.time}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  <span className="font-medium">Location:</span>{" "}
                  {event.location}
                </p>
                <p className="text-gray-600 mb-4">{event.summary}</p>
                <Link
                  href={event.link}
                  className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
                >
                  Learn More &rarr;
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action/Featured Articles (Optional) */}
        <section className="text-center bg-gray-200 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Stay Up-to-Date!
          </h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter to receive the latest news, event
            invitations, and industry insights directly in your inbox.
          </p>
          <Link
            href="/newsletter-signup"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors duration-300"
          >
            Subscribe Now
          </Link>
        </section>
      </main>
      <Footer /> {/* Include your Footer component */}
    </div>
  );
};

export default NewsEventsPage;
