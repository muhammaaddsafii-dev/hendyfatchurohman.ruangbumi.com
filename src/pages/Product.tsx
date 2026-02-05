 import Header from "@/components/Header";
 import Footer from "@/components/Footer";
 import ProductCard from "@/components/ProductCard";
 import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
 
 // Import artwork images
 import artworkChopes from "@/assets/artwork-chopes.jpg";
 import artworkCampout from "@/assets/artwork-campout.jpg";
 import artworkLighthouse from "@/assets/artwork-lighthouse.jpg";
 import artworkFlow from "@/assets/artwork-flow.jpg";
 import artworkFortpoint from "@/assets/artwork-fortpoint.jpg";
 import artworkWhale from "@/assets/artwork-whale.jpg";
 import artworkWaterfall from "@/assets/artwork-waterfall.jpg";
 import artworkKelp from "@/assets/artwork-kelp.jpg";
 
 const products = [
   { id: "chopes", title: "'Chopes", price: "$50.00 USD", image: artworkChopes },
   { id: "campout", title: "Campout", price: "$50.00 USD", image: artworkCampout },
   { id: "el-farol", title: "El Farol", price: "$50.00 USD", image: artworkLighthouse },
   { id: "flow", title: "Flow", price: "$55.00 USD", image: artworkFlow },
   { id: "fort-point", title: "Fort Point", price: "$50.00 USD", image: artworkFortpoint, pricePrefix: "From" },
   { id: "frenzy", title: "Frenzy", price: "$50.00 USD", image: artworkWhale },
   { id: "isolation", title: "Isolation", price: "$50.00 USD", image: artworkFlow },
   { id: "kelp-warden", title: "Kelp Warden", price: "$50.00 USD", image: artworkKelp },
 ];
 
 const Product = () => {
   return (
     <div className="min-h-screen bg-background">
       <Header />
 
       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         {/* Page Header */}
         <h1 className="page-title mb-8">Products</h1>
 
         {/* Filters */}
         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
           <div className="flex items-center gap-6">
             <span className="section-title">FILTER:</span>
             <button className="filter-btn">
               Availability <ChevronDown className="w-3 h-3" />
             </button>
             <button className="filter-btn">
               Price <ChevronDown className="w-3 h-3" />
             </button>
           </div>
           <div className="flex items-center gap-4">
             <span className="section-title">SORT BY:</span>
             <button className="filter-btn">
               Alphabetically, A-Z <ChevronDown className="w-3 h-3" />
             </button>
             <span className="text-xs text-muted-foreground">17 products</span>
           </div>
         </div>
 
         {/* Product Grid */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
           {products.map((product) => (
             <ProductCard
               key={product.id}
               id={product.id}
               title={product.title}
               price={product.price}
               image={product.image}
               pricePrefix={product.pricePrefix}
             />
           ))}
         </div>
 
         {/* Pagination */}
         <div className="flex items-center justify-center gap-4">
           <span className="text-sm font-medium border-b border-foreground">1</span>
           <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">2</span>
           <button className="p-1 hover:bg-muted rounded">
             <ChevronRight className="w-4 h-4" />
           </button>
         </div>
       </main>
 
       <Footer />
     </div>
   );
 };
 
 export default Product;