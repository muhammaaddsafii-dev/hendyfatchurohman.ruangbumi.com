import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Minus, Plus, ShoppingBag, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface Product {
    id: number;
    title: string;
    price: string | number;
    slug: string;
    image: string | null;
    description: string;
    images: { id: number; url: string }[];
}

const ProductDetail = () => {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);

    const { data: product, isLoading, error } = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            if (!id) throw new Error("No ID provided");
            const response = await fetch(`https://be-hendy-sketch-278881327745.asia-southeast1.run.app/api/products/${id}`);
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("Product not found");
                }
                throw new Error("Network response was not ok");
            }
            return response.json() as Promise<Product>;
        },
        enabled: !!id,
    });

    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex flex-col justify-between animate-in fade-in duration-500">
                <Header />
                <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto flex-grow flex items-center justify-center">
                    <p>Loading product details...</p>
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center">
                <Header />
                <main className="flex-grow flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold mb-4 text-foreground">Product not found</h1>
                    <p className="text-muted-foreground mb-4">{error?.message || "The requested product could not be loaded."}</p>
                    <Link to="/product" className="text-blue-500 hover:underline">
                        Back to Shop
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    const price = Number(product.price);

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
                    <div className="space-y-6">
                        {product.images && product.images.length > 0 ? (
                            product.images.map((img) => (
                                <div key={img.id} className="bg-muted/10 rounded-lg overflow-hidden flex items-center justify-center p-8 border border-border/40">
                                    <img
                                        src={img.url}
                                        alt={product.title}
                                        className="w-full h-auto object-contain max-h-[70vh] shadow-xl"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://placehold.co/600x600?text=Image+Error";
                                        }}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="bg-muted/10 rounded-lg overflow-hidden flex items-center justify-center p-8 border border-border/40">
                                <img
                                    src={product.image || "https://placehold.co/600x600?text=No+Image"}
                                    alt={product.title}
                                    className="w-full h-auto object-contain max-h-[70vh] shadow-xl"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://placehold.co/600x600?text=Image+Error";
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Info Column */}
                    <div className="flex flex-col justify-start sticky top-28 self-start">
                        <h1 className="text-xl md:text-xl font-light tracking-tight mb-4 font-semibold">{product.title}</h1>
                        <div className="text-xl font-medium mb-8 text-green-500">${price.toLocaleString("id-ID")}</div>

                        <div className="prose prose-sm dark:prose-invert mb-8 text-muted-foreground leading-relaxed text-justify">
                            <div dangerouslySetInnerHTML={{ __html: product.description || "No description available." }} />
                        </div>

                        {/* Actions */}
                        <div className="space-y-6 mt-8">
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

                            <a
                                href={`https://wa.me/6282177582119?text=${encodeURIComponent(`Halo, saya tertarik dengan karya ini: ${product.title}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-foreground text-background py-4 px-8 rounded-full text-sm font-medium tracking-wide hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                            >
                                <MessageCircle className="w-4 h-4" />
                                Order via WhatsApp — ${(price * quantity).toLocaleString("id-ID")}
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetail;
