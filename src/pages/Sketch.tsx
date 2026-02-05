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
 
 const galleryImages = [
   { id: 1, src: artworkChopes, size: "large" },
   { id: 2, src: artworkFortpoint, size: "large" },
   { id: 3, src: artworkChopes, size: "large" },
   { id: 4, src: artworkCampout, size: "large" },
   { id: 5, src: artworkWhale, size: "large" },
   { id: 6, src: artworkLighthouse, size: "large" },
   { id: 7, src: artworkLighthouse, size: "tall" },
   { id: 8, src: artworkFlow, size: "medium" },
   { id: 9, src: artworkWaterfall, size: "medium" },
   { id: 10, src: artworkWaterfall, size: "medium" },
   { id: 11, src: artworkKelp, size: "large" },
   { id: 12, src: artworkCampout, size: "large" },
 ];
 
 const Sketch = () => {
   return (
     <div className="min-h-screen bg-background">
       <Header />
 
       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         {/* Page Header */}
         <div className="mb-12">
           <h1 className="page-title mb-4">Sketch Gallery</h1>
           <p className="section-title max-w-md">
             A COLLECTION OF EXPLORATORY WORKS, DAILY STUDIES, AND CONCEPTUAL DRAFTS.
           </p>
         </div>
 
         {/* Masonry Gallery */}
         <div className="columns-1 sm:columns-2 lg:columns-3 gap-0">
           {galleryImages.map((image) => (
             <div
               key={image.id}
               className="break-inside-avoid group cursor-pointer overflow-hidden"
             >
               <img
                 src={image.src}
                 alt=""
                 className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
               />
             </div>
           ))}
         </div>
       </main>
 
       <Footer />
     </div>
   );
 };
 
 export default Sketch;