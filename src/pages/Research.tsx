import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, Eye, FileText, Bookmark, MoreHorizontal, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Publication {
  id: number;
  title: string;
  journal: string | null;
  year: string;
  abstract: string;
  views: number;
  downloads: number;
  file_url: string | null;
  tags: string[];
  authors: string | null;
}

const Research = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: researchPapers, isLoading, error } = useQuery({
    queryKey: ["publications"],
    queryFn: async () => {
      const response = await fetch("http://127.0.0.1:8000/api/publications");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json() as Promise<Publication[]>;
    },
  });

  const indexOfLastPaper = currentPage * itemsPerPage;
  const indexOfFirstPaper = indexOfLastPaper - itemsPerPage;
  const currentPapers = researchPapers?.slice(indexOfFirstPaper, indexOfLastPaper) || [];
  const totalPages = researchPapers ? Math.ceil(researchPapers.length / itemsPerPage) : 0;

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4F5F7] dark:bg-zinc-950 font-sans text-[#404040] dark:text-gray-300 flex flex-col justify-between">
        <div className="bg-white dark:bg-zinc-900 shadow-sm border-b border-gray-200 dark:border-zinc-800 sticky top-0 z-50">
          <Header />
        </div>
        <main className="max-w-[800px] mx-auto pt-6 px-4 pb-20 flex-grow flex items-center justify-center">
          <p>Loading research papers...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F4F5F7] dark:bg-zinc-950 font-sans text-[#404040] dark:text-gray-300 flex flex-col justify-between">
        <div className="bg-white dark:bg-zinc-900 shadow-sm border-b border-gray-200 dark:border-zinc-800 sticky top-0 z-50">
          <Header />
        </div>
        <main className="max-w-[800px] mx-auto pt-6 px-4 pb-20 flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-2">Error loading research papers.</p>
            <p className="text-sm text-gray-500">{error instanceof Error ? error.message : "Currently unable to reach the server."}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F5F7] dark:bg-zinc-950 font-sans text-[#404040] dark:text-gray-300">
      {/* Custom Academia-like Header override or sub-header if needed, but keeping global Header for consistency */}
      <div className="bg-white dark:bg-zinc-900 shadow-sm border-b border-gray-200 dark:border-zinc-800 sticky top-0 z-50">
        <Header />
      </div>

      <main className="max-w-[800px] mx-auto pt-6 px-4 pb-20">



        {/* Papers Stream */}
        <div className="space-y-4">
          {currentPapers.map((paper) => (
            <div key={paper.id} className="bg-white dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 p-6 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-2">
              </div>

              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-1 cursor-pointer">
                {paper.title}
              </h2>

              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 italic">
                {paper.journal || "Journal of Research"}, {paper.year}
                {paper.authors && <span className="not-italic"> • {paper.authors}</span>}
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4 line-clamp-3">
                {paper.abstract || "No abstract available."}
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
                  <a
                    href={paper.file_url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 sm:flex-none justify-center flex items-center gap-2 bg-[#2D3E50] dark:bg-zinc-700 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-[#1a252f] dark:hover:bg-zinc-600 transition-colors ${!paper.file_url ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                  >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">Read Paper</span>
                    <span className="sm:hidden">Read</span>
                  </a>
                </div>

              </div>
            </div>
          ))}
          {researchPapers?.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No research papers found.
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronRight className="w-4 h-4 rotate-180 text-gray-600 dark:text-gray-400" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => goToPage(number)}
                className={`text-sm font-medium w-8 h-8 flex items-center justify-center rounded transition-colors ${currentPage === number
                  ? "bg-[#2D3E50] dark:bg-zinc-700 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
                  }`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Research;