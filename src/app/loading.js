export default function RootLoading() {
    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
            <div className="relative p-6 bg-white rounded-xl shadow-2xl border border-gray-200">
                <div className="flex items-center gap-4">
                    <div className="relative h-8 w-8">
                        <div className="absolute inset-0 rounded-full border-4 border-teal-200" />
                        <div className="absolute inset-0 rounded-full border-4 border-teal-500 border-t-transparent animate-spin" />
                        <div className="absolute inset-2 rounded-full bg-white" />
                    </div>
                    <div className="text-gray-700 font-medium">Loading...</div>
                </div>
            </div>
        </div>
    );
}


