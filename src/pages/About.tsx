import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Profile {
  id: number;
  name: string;
  bio: string;
  image: string | null;
  instagram: string | null;
  youtube: string | null;
  education?: string[];
  focus_areas?: string[];
}

const About = () => {
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const response = await fetch("http://127.0.0.1:8000/api/about");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  // Default static data if API fails or is loading (optional, but good for perceived performance if SSR not used, 
  // or better yet show loading state as requested in previous turns)
  // However, to follow the pattern of other pages, let's show loading/error states.

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F0F2F5] dark:bg-zinc-950 font-sans text-gray-900 dark:text-gray-100 flex flex-col justify-between">
        <div className="bg-white dark:bg-zinc-900 shadow-sm border-b border-gray-200 dark:border-zinc-800">
          <Header />
        </div>
        <main className="flex-grow flex items-center justify-center p-20">
          <p>Loading profile...</p>
        </main>
        <div className="w-full max-w-3xl mx-auto border-t border-gray-200 dark:border-zinc-800">
          <Footer />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F0F2F5] dark:bg-zinc-950 font-sans text-gray-900 dark:text-gray-100 flex flex-col justify-between">
        <div className="bg-white dark:bg-zinc-900 shadow-sm border-b border-gray-200 dark:border-zinc-800">
          <Header />
        </div>
        <main className="flex-grow flex items-center justify-center p-20">
          <div className="text-center">
            <p className="text-red-500 mb-2">Error loading profile.</p>
            <p className="text-sm text-gray-500">{error instanceof Error ? error.message : "Currently unable to reach the server."}</p>
          </div>
        </main>
        <div className="w-full max-w-3xl mx-auto border-t border-gray-200 dark:border-zinc-800">
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] dark:bg-zinc-950 font-sans text-gray-900 dark:text-gray-100">
      {/* Navbar - Standard Site Header */}
      <div className="bg-white dark:bg-zinc-900 shadow-sm border-b border-gray-200 dark:border-zinc-800">
        <Header />
      </div>

      <main className="flex flex-col items-center pt-20 px-4 pb-20">

        {/* Profile Section (Google-like) */}
        <div className="flex flex-col items-center w-full max-w-3xl mb-16">
          {/* Profile Avatar / Logo */}
          <div className="mb-6 relative">
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-blue-500 via-red-500 to-yellow-500">
              <div className="w-full h-full rounded-full border-2 border-white dark:border-zinc-900 bg-white dark:bg-zinc-900 overflow-hidden">
                <img src={profile?.image || "https://placehold.co/400x400?text=No+Child"} alt={profile?.name || "Hendy Fatchurohman"} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 bg-white dark:bg-zinc-800 p-1 rounded-full shadow-md">
              <div className="text-gray-700 dark:text-gray-300 w-5 h-5 flex items-center justify-center">📷</div>
            </div>
          </div>

          {/* Name */}
          <h1 className="text-3xl md:text-4xl font-normal text-gray-800 dark:text-gray-100 mb-2">{profile?.name || "Hendy Fatchurohman"}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">hendyfatchurohman.com</p>

          {/* Search Bar (Fake) */}
          <div className="w-full max-w-xl relative mb-8">
            <div className="w-full bg-white dark:bg-zinc-900 rounded-full border border-gray-200 dark:border-zinc-700 hover:shadow-md px-12 py-3 shadow-sm transition-shadow flex items-center">
              <Search className="text-gray-400 dark:text-gray-500 w-5 h-5 absolute left-4" />
              <input
                type="text"
                className="w-full outline-none bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-500"
                defaultValue="Search Profile"
              />
            </div>
          </div>

          {/* Action Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            <button className="px-4 py-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 flex items-center gap-2 transition-colors">
              Personal Info
            </button>
            <button className="px-4 py-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 flex items-center gap-2 transition-colors">
              Data & Privacy
            </button>
            <button className="px-4 py-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 flex items-center gap-2 transition-colors">
              Security
            </button>
            <button className="px-4 py-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 flex items-center gap-2 transition-colors">
              People & Sharing
            </button>
          </div>
        </div>

        {/* Bio & Details Section */}
        <div className="w-full max-w-3xl space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-8 shadow-sm">
            <h2 className="text-xl font-normal text-gray-800 dark:text-gray-100 mb-6">Bio</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base whitespace-pre-line">
              <p>
                {profile?.bio || "No biography available."}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-gray-100 dark:border-zinc-800">
              <div>
                <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">Education</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  {/* Using hardcoded if API return null, but API controller has hardcoded defaults for now */}
                  {profile?.education?.map((edu, index) => (
                    <li key={index}>{edu}</li>
                  )) || (
                      <>
                        <li>MFA, Indonesian Institute of the Arts (2022)</li>
                        <li>B.Des, Telkom University (2018)</li>
                      </>
                    )}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">Focus Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {profile?.focus_areas?.map((area, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-zinc-800 rounded text-xs text-gray-700 dark:text-gray-300">{area}</span>
                  )) || (
                      <>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-zinc-800 rounded text-xs text-gray-700 dark:text-gray-300">Scientific Illustration</span>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-zinc-800 rounded text-xs text-gray-700 dark:text-gray-300">Visual Research</span>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-zinc-800 rounded text-xs text-gray-700 dark:text-gray-300">Mixed Media</span>
                      </>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section in Body */}
        <div className="w-full max-w-3xl mt-12 pt-8 border-t border-gray-200 dark:border-zinc-800">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default About;