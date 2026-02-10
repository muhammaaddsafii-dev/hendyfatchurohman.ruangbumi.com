import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import FAQSection from "@/components/FAQSection";
import ContactForm from "@/components/ContactForm";
import { useQuery } from "@tanstack/react-query";

// Import artwork images
import artworkChopes from "@/assets/artwork-chopes.jpg";
import artworkCampout from "@/assets/artwork-campout.jpg";
import artworkLighthouse from "@/assets/artwork-lighthouse.jpg";
import artworkFlow from "@/assets/artwork-flow.jpg";
import artworkFortpoint from "@/assets/artwork-fortpoint.jpg";
import artworkWhale from "@/assets/artwork-whale.jpg";
import artworkWaterfall from "@/assets/artwork-waterfall.jpg";
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
import heroImage from "@/assets/heroku.png";

interface Product {
  id: number;
  title: string;
  price: string | number;
  slug: string;
  image: string;
  description: string;
}

const heroImages = [
  asset1,
  asset2,
  asset3,
  asset4,
  asset5,
  asset6,
  asset7,
  asset8,
  asset9,
];

const faqItems = [
  {
    question: "How can I purchase your artwork?",
    answer: "You can purchase directly through this website by clicking the 'Order via WhatsApp' button on any product page. This will connect you directly to me to finalize the payment and delivery details.",
  },
  {
    question: "Do you accept commission projects?",
    answer: "Yes, I am open to commission work. Whether it's for a custom illustration, tattoo design, or commercial project, feel free to contact me via WhatsApp or Email to discuss your ideas.",
  },
  {
    question: "How is the shipping handled?",
    answer: "Since orders are processed manually, shipping costs and methods will be discussed and agreed upon via WhatsApp based on your location and the size of the artwork.",
  },
];

const Index = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const response = await fetch("http://127.0.0.1:8000/api/products?limit=6");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json() as Promise<Product[]>;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Image */}
        <section className="w-full">
          <img
            src={heroImage}
            alt="Hero"
            className="w-full h-auto"
          />
        </section>

        {/* Featured Products */}
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <h2 className="section-title mb-8">FEATURED PRODUCTS</h2>

          {isLoading && <p className="text-center text-muted-foreground">Loading featured products...</p>}

          {error && <p className="text-center text-red-500">Failed to load featured products.</p>}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {products?.map((product) => (
              <ProductCard
                key={product.id}
                id={String(product.id)}
                title={product.title}
                price={`$${Number(product.price).toLocaleString("id-ID")}`}
                image={product.image || "https://placehold.co/600x600?text=No+Image"}
                pricePrefix={undefined}
              />
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4">
          <hr className="border-border" />
        </div>

        {/* FAQ */}
        <div className="max-w-7xl mx-auto px-4">
          <FAQSection items={faqItems} />
        </div>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4">
          <hr className="border-border" />
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Index;
