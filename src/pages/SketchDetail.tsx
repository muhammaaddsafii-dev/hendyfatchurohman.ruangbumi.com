import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import asset1 from "@/assets/asset1.jpg";
import asset2 from "@/assets/asset2.jpg";
import asset3 from "@/assets/asset3.jpg";
import asset4 from "@/assets/asset4.jpg";
import asset5 from "@/assets/asset5.jpg";
import asset6 from "@/assets/asset6.jpg";
import asset7 from "@/assets/asset7.jpg";
import asset8 from "@/assets/asset8.jpg";
import asset9 from "@/assets/asset9.jpg";

// Duplicate of data for now, ideally in a shared file
const galleryImages = [
    { id: 1, src: asset9, title: "Abstract Composition I", year: "2024", technique: "Digital Painting", description: "An exploration of form and void, challenging the perception of spatial depth through monochromatic layers." },
    { id: 2, src: asset8, title: "Urban Fragment", year: "2023", technique: "Ink on Paper", description: "Quick study of architectural details found in the chaotic rhythm of the city." },
    { id: 3, src: asset3, title: "Organic Syntax", year: "2023", technique: "Mixed Media", description: "Visualizing the hidden language of botanical growth patterns." },
    { id: 4, src: asset4, title: "Void Study", year: "2024", technique: "Charcoal", description: "A study on negative space and the weight of darkness." },
    { id: 5, src: asset5, title: "Ephemeral Light", year: "2022", technique: "Watercolor", description: "Capturing the fleeting moment of light passing through alpine mist." },
    { id: 6, src: asset6, title: "Portrait of Entropy", year: "2023", technique: "Oil on Canvas", description: "A representation of decay as a form of transformation." },
    { id: 7, src: asset7, title: "Structure V", year: "2024", technique: "Graphite", description: "Grid systems applied to organic forms." },
    { id: 8, src: asset9, title: "Abstract Composition II", year: "2024", technique: "Digital Painting", description: "Continuing the series on spatial depth and void." },
];

const SketchDetail = () => {
    const { id } = useParams();
    const sketch = galleryImages.find((img) => img.id === Number(id));

    if (!sketch) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Sketch not found</h1>
                <Link to="/sketch" className="text-blue-500 hover:underline">
                    Back to Gallery
                </Link>
            </div>
        );
    }

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
                    {/* Image Section */}
                    <div className="bg-muted/30 rounded-lg overflow-hidden border border-border/50">
                        <img
                            src={sketch.src}
                            alt={sketch.title}
                            className="w-full h-auto object-contain max-h-[80vh]"
                        />
                    </div>

                    {/* Details Section */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-light tracking-tight mb-2">{sketch.title}</h1>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" /> {sketch.year}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Tag className="w-3.5 h-3.5" /> {sketch.technique}
                                </span>
                                <span className="flex items-center gap-1">
                                    <User className="w-3.5 h-3.5" /> Hendy Fatchurohman
                                </span>
                            </div>
                        </div>

                        <div className="prose prose-gray dark:prose-invert">
                            <h3 className="text-lg font-medium text-foreground mb-2">Description</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {sketch.description}
                            </p>
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
