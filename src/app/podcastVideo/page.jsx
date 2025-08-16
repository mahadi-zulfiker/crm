// app/podcasts-videos/page.jsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import StickyHeader from "@/components/StickyHeader";

const PodcastsVideosPage = () => {
  // Dummy data for demonstration
  const recentPodcasts = [
    {
      id: 1,
      title: "The Future of AI in Recruitment",
      date: "May 28, 2025",
      summary:
        "Tune in as we discuss how artificial intelligence is reshaping the recruitment landscape and what it means for your career.",
      imageUrl: "./services/26.jpg", // Placeholder image
      link: "/podcasts/ai-recruitment",
    },
    {
      id: 2,
      title: "Navigating Career Transitions with Confidence",
      date: "May 20, 2025",
      summary:
        "Our experts share invaluable tips and strategies for successfully managing career changes and finding your next opportunity.",
      imageUrl: "./services/27.jpg", // Placeholder image
      link: "/podcasts/career-transitions",
    },
    {
      id: 3,
      title: "Employer Branding: Attracting Top Talent",
      date: "May 12, 2025",
      summary:
        "Learn why employer branding is crucial in today's competitive market and how to build a strong brand to attract the best talent.",
      imageUrl: "./services/28.jpg", // Placeholder image
      link: "/podcasts/employer-branding",
    },
  ];

  const featuredVideos = [
    {
      id: 1,
      title: "Interview Skills Workshop: Mastering the Art of Conversation",
      date: "April 10, 2025",
      summary:
        "Watch our comprehensive workshop on refining your interview skills to make a lasting impression.",
      thumbnailUrl: "./videos/video-interview-skills.jpg", // Placeholder thumbnail
      videoUrl: "https://www.youtube.com/embed/your_video_id_1", // Replace with actual YouTube embed URL
    },
    {
      id: 2,
      title: "Decoding the Modern Resume: Tips from Recruiters",
      date: "March 25, 2025",
      summary:
        "Get an inside look at what recruiters really look for in a resume and how to make yours stand out.",
      thumbnailUrl: "./videos/video-resume-tips.jpg", // Placeholder thumbnail
      videoUrl: "https://www.youtube.com/embed/your_video_id_2", // Replace with actual YouTube embed URL
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar /> {/* Include your Navbar component */}
      <StickyHeader></StickyHeader>
      <main className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">
          Podcasts & Videos
        </h1>

        {/* Recent Podcasts Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-700 mb-8">
            Recent Podcasts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPodcasts.map((podcast) => (
              <div
                key={podcast.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={podcast.imageUrl}
                  alt={podcast.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {podcast.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{podcast.date}</p>
                  <p className="text-gray-600 mb-4">{podcast.summary}</p>
                  <Link
                    href={podcast.link}
                    className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
                  >
                    Listen Now &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Videos Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-700 mb-8">
            Featured Videos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{video.date}</p>
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  {/* Using an iframe for embedded videos. Ensure proper sanitization if videoUrl comes from user input. */}
                  <iframe
                    width="100%"
                    height="315"
                    src={video.videoUrl}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-md"
                  ></iframe>
                </div>
                <p className="text-gray-600 mb-4">{video.summary}</p>
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
                >
                  Watch Now &rarr;
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action for More Content (Optional) */}
        <section className="text-center bg-gray-200 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Explore More!
          </h2>
          <p className="text-gray-600 mb-6">
            Dive deeper into our extensive library of podcasts and videos for
            expert insights, career advice, and industry trends.
          </p>
          <Link
            href="/contact"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors duration-300"
          >
            Suggest a Topic
          </Link>
        </section>
      </main>
      <Footer /> {/* Include your Footer component */}
    </div>
  );
};

export default PodcastsVideosPage;
