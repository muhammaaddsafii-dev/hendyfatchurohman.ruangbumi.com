import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Import artwork images
import artworkChopes from "@/assets/artwork-chopes.jpg";
import artworkCampout from "@/assets/artwork-campout.jpg";
import artworkLighthouse from "@/assets/artwork-lighthouse.jpg";
import artworkFlow from "@/assets/artwork-flow.jpg";
import artworkFortpoint from "@/assets/artwork-fortpoint.jpg";
import artworkWhale from "@/assets/artwork-whale.jpg";
import artworkWaterfall from "@/assets/artwork-waterfall.jpg";
import artworkKelp from "@/assets/artwork-kelp.jpg";
import artworkMountain from "@/assets/artwork-mountain.jpg";
import artworkForest from "@/assets/artwork-forest.jpg";
import artworkSunset from "@/assets/artwork-sunset.jpg";
import asset1 from "@/assets/asset1.jpg";
import asset2 from "@/assets/asset2.jpg";
import asset3 from "@/assets/asset3.jpg";
import asset4 from "@/assets/asset4.jpg";
import asset5 from "@/assets/asset5.jpg";
import asset6 from "@/assets/asset6.jpg";
import asset7 from "@/assets/asset7.jpg";
import asset8 from "@/assets/asset8.jpg";
import asset9 from "@/assets/asset9.jpg";


const galleryImages = [
  { id: 1, src: asset9, className: "col-span-2 row-span-2" },
  { id: 2, src: asset8, className: "col-span-1 row-span-1" },
  { id: 3, src: asset3, className: "col-span-1 row-span-1" },
  { id: 4, src: asset4, className: "col-span-2 row-span-1" },
  { id: 5, src: asset5, className: "col-span-1 row-span-2" },
  { id: 6, src: asset6, className: "col-span-2 row-span-2" },
  { id: 7, src: asset7, className: "col-span-1 row-span-1" },
  { id: 8, src: asset9, className: "col-span-2 row-span-1" },
  // { id: 9, src: asset9, className: "col-span-1 row-span-2" },
];

const Sketch = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        {/* <div className="mb-12">
          <h1 className="page-title mb-4">Sketch Gallery</h1>
          <p className="section-title max-w-md">
            A COLLECTION OF EXPLORATORY WORKS, DAILY STUDIES, AND CONCEPTUAL DRAFTS.
          </p>
        </div> */}

        {/* Masonry Layout to fit images naturally */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {galleryImages.map((image) => (
            <Link
              to={`/sketch/${image.id}`}
              key={image.id}
              className="break-inside-avoid mb-4 group overflow-hidden block cursor-pointer"
            >
              <img
                src={image.src}
                alt=""
                className="w-full h-auto object-contain transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105"
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