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
    question: "Are you accepting commission projects?",
    answer: "Yes, I am currently accepting commission projects. Please reach out through the contact form with details about your project, timeline, and budget.",
  },
  {
    question: "Do you design tattoos?",
    answer: "I occasionally design tattoos for clients. Each design is custom and unique. Contact me to discuss your ideas and we can see if it's a good fit.",
  },
  {
    question: "My print didn't arrive or is damaged. What do I do?",
    answer: "Please contact me immediately with your order number and photos of any damage. I will work with you to resolve the issue as quickly as possible.",
  },
];

const Index = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const response = await fetch("http://127.0.0.1:8000/api/products?limit=5");
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
        {/* Hero Diamond Collage */}
        <section className="py-16 px-4">
          <div className="max-w-xl mx-auto">
            <div className="relative w-full aspect-square">
              {/* Diamond Grid */}
              <div
                className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1"
                style={{ transform: "rotate(45deg) scale(0.7)" }}
              >
                {Array.from({ length: 9 }).map((_, index) => {
                  const row = Math.floor(index / 3);
                  const col = index % 3;
                  return (
                    <div
                      key={index}
                      className="overflow-hidden bg-muted relative"
                    >
                      <img
                        src={asset8}
                        alt=""
                        className="absolute max-w-none object-cover"
                        style={{
                          width: "calc(300% + 0.5rem)",
                          height: "calc(300% + 0.5rem)",
                          left: `calc(-${col * 100}% - ${col * 0.25}rem)`,
                          top: `calc(-${row * 100}% - ${row * 0.25}rem)`,
                          transform: "rotate(-45deg) scale(1.5)",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <h2 className="section-title mb-8">FEATURED PRODUCTS</h2>

          {isLoading && <p className="text-center text-muted-foreground">Loading featured products...</p>}

          {error && <p className="text-center text-red-500">Failed to load featured products.</p>}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {products?.map((product) => (
              <ProductCard
                key={product.id}
                id={String(product.id)}
                title={product.title}
                price={`$${Number(product.price).toFixed(2)} USD`}
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

        {/* Contact */}
        <div className="max-w-7xl mx-auto px-4">
          <ContactForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
