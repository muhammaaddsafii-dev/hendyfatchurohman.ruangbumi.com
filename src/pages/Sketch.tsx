import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Sketch {
  id: number;
  title: string;
  description: string;
  src: string;
  latitude: number | null;
  longitude: number | null;
  images: { id: number; url: string }[];
}

const Sketch = () => {
  const { data: sketches, isLoading, error } = useQuery({
    queryKey: ["sketches"],
    queryFn: async () => {
      const response = await fetch("https://be-hendy-sketch-278881327745.asia-southeast1.run.app/api/sketches");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json() as Promise<Sketch[]>;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow flex items-center justify-center">
          <p>Loading sketches...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-2">Error loading sketches.</p>
            <p className="text-sm text-gray-500">{error instanceof Error ? error.message : "Currently unable to reach the server."}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        {/* Page Header - kept commented out as per original file, or remove if desired */}
        {/* <div className="mb-12">
          <h1 className="page-title mb-4">Sketch Gallery</h1>
          <p className="section-title max-w-md">
            A COLLECTION OF EXPLORATORY WORKS, DAILY STUDIES, AND CONCEPTUAL DRAFTS.
          </p>
        </div> */}

        {/* Masonry Layout to fit images naturally */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {sketches?.map((image) => (
            <Link
              to={`/sketch/${image.id}`}
              key={image.id}
              className="break-inside-avoid mb-4 group overflow-hidden block cursor-pointer"
            >
              <img
                src={image.src || "https://placehold.co/600x400?text=No+Image"}
                alt={image.title}
                className="w-full h-auto object-contain transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/600x400?text=Image+Error";
                }}
              />
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sketch;