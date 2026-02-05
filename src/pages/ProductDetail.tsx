import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";

// Import artwork images (reused from Product.tsx)
import artworkChopes from "@/assets/artwork-chopes.jpg";
import artworkCampout from "@/assets/artwork-campout.jpg";
import artworkLighthouse from "@/assets/artwork-lighthouse.jpg";
import artworkFlow from "@/assets/artwork-flow.jpg";
import artworkFortpoint from "@/assets/artwork-fortpoint.jpg";
import artworkWhale from "@/assets/artwork-whale.jpg";
import artworkKelp from "@/assets/artwork-kelp.jpg";

// Duplicate mock data with more details
const products = [
    { id: "chopes", title: "'Chopes", price: 50.00, image: artworkChopes, description: "A captured moment of pure energy at Teahupo'o. This print explores the relationship between fluid dynamics and visual impact.", dimensions: "12 x 18 inches", medium: "Giclée Print on Archival Paper" },
    { id: "campout", title: "Campout", price: 50.00, image: artworkCampout, description: "The serenity of a night spent under the stars, distilled into a monochrome study.", dimensions: "12 x 16 inches", medium: "Screen Print" },
    { id: "el-farol", title: "El Farol", price: 50.00, image: artworkLighthouse, description: "A beacon of light standing against the encroaching fog. A study in isolation and guidance.", dimensions: "16 x 20 inches", medium: "Fine Art Print" },
    { id: "flow", title: "Flow", price: 55.00, image: artworkFlow, description: "Visualizing the unseen currents that shape our environment.", dimensions: "18 x 24 inches", medium: "Digital Print" },
    { id: "fort-point", title: "Fort Point", price: 50.00, image: artworkFortpoint, description: "Architectural rigidity meets the fluidity of the bay.", dimensions: "12 x 18 inches", medium: "Print" },
    { id: "frenzy", title: "Frenzy", price: 50.00, image: artworkWhale, description: "The chaotic beauty of nature's feeding cycles.", dimensions: "14 x 14 inches", medium: "Giclée Print" },
    { id: "isolation", title: "Isolation", price: 50.00, image: artworkFlow, description: "A solitary figure in a vast landscape.", dimensions: "12 x 18 inches", medium: "Print" },
    { id: "kelp-warden", title: "Kelp Warden", price: 50.00, image: artworkKelp, description: "Guardians of the underwater forests.", dimensions: "11 x 14 inches", medium: "Archival Print" },
];

const ProductDetail = () => {
    const { id } = useParams();
    const product = products.find((p) => p.id === id);
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4 text-foreground">Product not found</h1>
                <Link to="/product" className="text-blue-500 hover:underline">
                    Back to Shop
                </Link>
            </div>
        );
    }

    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    return (
        <div className="min-h-screen bg-background text-foreground animate-in fade-in duration-500">
            <Header />

            <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
                {/* Back Button */}
                <div className="mb-12">
                    <Link to="/product" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                        Back to Shop
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                    {/* Image Column */}
                    <div className="bg-muted/10 rounded-lg overflow-hidden flex items-center justify-center p-8 border border-border/40">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-auto object-contain max-h-[70vh] shadow-xl"
                        />
                    </div>

                    {/* Info Column */}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">{product.title}</h1>
                        <div className="text-2xl font-medium mb-8">${product.price.toFixed(2)} USD</div>

                        <div className="prose prose-sm dark:prose-invert mb-8 text-muted-foreground leading-relaxed">
                            <p>{product.description}</p>
                        </div>

                        {/* Specs */}
                        <div className="space-y-4 mb-10 border-t border-b border-border py-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Dimensions</span>
                                <span className="font-medium">{product.dimensions}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Medium</span>
                                <span className="font-medium">{product.medium}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium">Quantity</span>
                                <div className="flex items-center border border-input rounded-md">
                                    <button onClick={handleDecrease} className="p-3 hover:bg-muted transition-colors">
                                        <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                                    <button onClick={handleIncrease} className="p-3 hover:bg-muted transition-colors">
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>

                            <button className="w-full bg-foreground text-background py-4 px-8 rounded-full text-sm font-medium tracking-wide hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                                <ShoppingBag className="w-4 h-4" />
                                Add to Cart — ${(product.price * quantity).toFixed(2)}
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetail;
