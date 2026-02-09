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
  department: string | null;
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
          </div>

          {/* Name */}
          <h1 className="text-3xl md:text-4xl font-normal text-gray-800 dark:text-gray-100 mb-2">{profile?.name || "Hendy Fatchurohman"}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">hendy.fatchurohman@mail.ugm.ac.id</p>
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
                <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">Department</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {profile?.department || "No department available."}
                </p>

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