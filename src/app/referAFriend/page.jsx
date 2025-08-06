import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function ReferAFriendPage() {
    return (
        <div className="bg-white">
            {/* Intro Section */}
            <Navbar />
            <div className="bg-gradient-to-r from-blue-900 to-gray-700 relative text-white py-24 text-center overflow-hidden">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

                {/* Content */}
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold text-white mb-4">Refer a Friend</h1>
                    <p className="text-lg text-white mb-6 max-w-2xl mx-auto">
                        We’re always looking for good people.
                    </p>
                </div>
            </div>
            <section className="text-center py-16 px-6 max-w-3xl mx-auto text-gray-700">
                <h2 className="text-3xl font-bold">Do You Know Someone to Refer?</h2>
                <p className="mt-5">Refer them to Associated Staffing! Some of our best hires come from referrals. If you know someone who would be a good fit for Associated Staffing, we’d love to talk to them. You could earn $60 and the payouts are unlimited. Please provide their information using the form below and we’ll contact them!</p>
            </section>
            {/* Form Section */}
            <section className="pb-16 px-6 max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Referral Form</h2>
                <form className="grid grid-cols-1 gap-6">
                    {/* Your Info */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Your Name *</label>
                        <input type="text" placeholder="Enter your full name" required className="w-full border rounded-md p-3" />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Your Email *</label>
                        <input type="email" placeholder="Enter your email" required className="w-full border rounded-md p-3" />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Your Phone *</label>
                        <input type="tel" placeholder="Enter your phone number" required className="w-full border rounded-md p-3" />
                    </div>

                    {/* Friend's Info */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Friend's Name *</label>
                        <input type="text" placeholder="Enter your friend's full name" required className="w-full border rounded-md p-3" />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Friend's Phone *</label>
                        <input type="tel" placeholder="Enter your friend's phone number" required className="w-full border rounded-md p-3" />
                    </div>

                    {/* Optional Comments */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Questions / Comments</label>
                        <textarea placeholder="Any additional info you'd like to share" rows={5} className="w-full border rounded-md p-3" />
                    </div>

                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-md font-semibold">
                        Submit Referral
                    </button>
                </form>
            </section>
            <section className="mb-10 text-center px-6 max-w-3xl mx-auto text-gray-700">
                <p className="mt-5">By providing your phone number, you agree to receive text messages from Associated Staffing for updates, promotions and important information. Message and data rates may apply. You can opt out at any time by replying ‘STOP’ to our messages. For more information, please refer to our Privacy Policy.</p>
            </section>
            <Footer />
        </div>
    );
}
