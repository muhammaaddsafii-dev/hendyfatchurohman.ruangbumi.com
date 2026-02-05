import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, Eye, FileText, Bookmark, Share2, MoreHorizontal, User, Search } from "lucide-react";

// Mock Data
const researchPapers = [
  {
    id: 1,
    title: "Symmetry in Organic Decay: An ethnographic approach to botanical decomposition",
    journal: "Visual Arts Research Quarterly",
    year: "2024",
    views: 142,
    downloads: 45,
    abstract: "This paper presents an ethnographic approach to documenting botanical decomposition cycles. By analyzing the mathematical representation in contemporary illustration, we observe a distinct symmetry in organic decay patterns that correlates with golden ratio harmonics found in early botanical sketches.",
    tags: ["Visual Arts", "Botany", "Illustration"],
  },
  {
    id: 2,
    title: "The Volatility of Light: Refractive indices in alpine mist",
    journal: "Journal of Environmental Aesthetics",
    year: "2023",
    views: 89,
    downloads: 21,
    abstract: "Investigating the refractive index of alpine mist and its psychological impact on spatial perception. The study focuses on landscape rendering techniques that capture the ephemeral nature of light in high-altitude environments, proposing a new framework for 'atmospheric perspective' in digital media.",
    tags: ["Environmental Aesthetics", "Optics", "Digital Art"],
  },
  {
    id: 3,
    title: "Fibrous Ephemerality: Comparative analysis of substrate longevity",
    journal: "Archives of Material Science",
    year: "2023",
    views: 204,
    downloads: 88,
    abstract: "A comparative study between 17th-century rag paper and modern synthetic substrates regarding pigment carbonation and longevity. We analyze degradation rates under varying UV exposure and humidity levels to predict the archival stability of mixed-media artworks.",
    tags: ["Material Science", "Art Conservation", "Paper History"],
  },
];

const Research = () => {
  return (
    <div className="min-h-screen bg-[#F4F5F7] dark:bg-zinc-950 font-sans text-[#404040] dark:text-gray-300">
      {/* Custom Academia-like Header override or sub-header if needed, but keeping global Header for consistency */}
      <div className="bg-white dark:bg-zinc-900 shadow-sm border-b border-gray-200 dark:border-zinc-800 sticky top-0 z-50">
        <Header />
      </div>

      <main className="max-w-[800px] mx-auto pt-6 px-4 pb-20">



        {/* Papers Stream */}
        <div className="space-y-4">
          {researchPapers.map((paper) => (
            <div key={paper.id} className="bg-white dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 p-6 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold">
                  Original Research
                </div>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-1 cursor-pointer hover:underline">
                {paper.title}
              </h2>

              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 italic">
                {paper.journal}, {paper.year}
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4 line-clamp-3">
                {paper.abstract}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {paper.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-4 border-t border-gray-100 dark:border-zinc-800">
                <div className="flex w-full sm:w-auto gap-3">
                  <button className="flex-1 sm:flex-none justify-center flex items-center gap-2 bg-[#2D3E50] dark:bg-zinc-700 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-[#1a252f] dark:hover:bg-zinc-600 transition-colors">
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download PDF</span>
                    <span className="sm:hidden">Download</span>
                  </button>
                  <button className="flex-1 sm:flex-none justify-center flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 px-3 py-2 rounded text-sm font-medium transition-colors border sm:border-transparent border-gray-200 dark:border-zinc-700">
                    <Bookmark className="w-4 h-4" />
                    Save
                  </button>
                </div>

                <div className="flex w-full sm:w-auto items-center justify-between sm:justify-start gap-4 text-xs text-gray-500 dark:text-gray-400 font-medium">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    {paper.views} Views
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    {paper.downloads} Downloads
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Research;