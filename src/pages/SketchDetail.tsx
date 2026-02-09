import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Sketch {
    id: number;
    title: string;
    description: string;
    src: string;
    latitude: number | null;
    longitude: number | null;
    created_at: string;
    images: { id: number; url: string }[];
}

const SketchDetail = () => {
    const { id } = useParams();

    const { data: sketch, isLoading, error } = useQuery({
        queryKey: ["sketch", id],
        queryFn: async () => {
            if (!id) throw new Error("No ID provided");
            const response = await fetch(`http://127.0.0.1:8000/api/sketches/${id}`);
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("Sketch not found");
                }
                throw new Error("Network response was not ok");
            }
            return response.json() as Promise<Sketch>;
        },
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex flex-col justify-between">
                <Header />
                <main className="pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex-grow flex items-center justify-center">
                    <p>Loading sketch details...</p>
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !sketch) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Sketch not found</h1>
                <p className="text-muted-foreground mb-4">{error?.message || "The requested sketch could not be loaded."}</p>
                <Link to="/sketch" className="text-blue-500 hover:underline">
                    Back to Gallery
                </Link>
            </div>
        );
    }

    const year = sketch.created_at ? new Date(sketch.created_at).getFullYear() : "N/A";

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
                {/* Back Button */}
                <div className="mb-8">
                    <Link to="/sketch" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                        Back to Gallery
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
                    {/* Image Section - Displays all images if available, or fallback to src */}
                    <div className="space-y-8">
                        {sketch.images && sketch.images.length > 0 ? (
                            sketch.images.map((image) => (
                                <div key={image.id} className="bg-muted/30 rounded-lg overflow-hidden border border-border/50">
                                    <img
                                        src={image.url}
                                        alt={sketch.title}
                                        className="w-full h-auto object-contain max-h-[80vh]"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://placehold.co/800x600?text=Image+Error";
                                        }}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="bg-muted/30 rounded-lg overflow-hidden border border-border/50">
                                <img
                                    src={sketch.src || "https://placehold.co/800x600?text=No+Image"}
                                    alt={sketch.title}
                                    className="w-full h-auto object-contain max-h-[80vh]"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://placehold.co/800x600?text=Image+Error";
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="space-y-8 sticky top-24 self-start">
                        <div>
                            <h1 className="text-4xl font-light tracking-tight mb-2">{sketch.title}</h1>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" /> {year}
                                </span>
                                {/* Placeholder for Technique since it's not in DB yet */}
                                <span className="flex items-center gap-1">
                                    <Tag className="w-3.5 h-3.5" /> Digital / Mixed Media
                                </span>
                                <span className="flex items-center gap-1">
                                    <User className="w-3.5 h-3.5" /> Hendy Fatchurohman
                                </span>
                            </div>
                        </div>

                        <div className="prose prose-gray dark:prose-invert">
                            <h3 className="text-lg font-medium text-foreground mb-2">Description</h3>
                            {/* Render HTML Description */}
                            <div
                                className="text-muted-foreground leading-relaxed text-justify"
                                dangerouslySetInnerHTML={{ __html: sketch.description || "No description available." }}
                            />
                        </div>

                        <div className="border-t border-border pt-6 mt-6">
                            <h3 className="text-sm font-medium text-foreground mb-4">License & Usage</h3>
                            <p className="text-xs text-muted-foreground">
                                All rights reserved. This artwork is for personal display only. For commercial licensing or usage inquiries, please contact the artist directly.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default SketchDetail;
