import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import FAQSection from "@/components/FAQSection";
import ContactForm from "@/components/ContactForm";

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

const products = [
  { id: "chopes", title: "'Chopes", price: "$50.00 USD", image: artworkChopes },
  { id: "campout", title: "Campout", price: "$50.00 USD", image: artworkCampout },
  { id: "el-farol", title: "El Farol", price: "$50.00 USD", image: artworkLighthouse },
  { id: "flow", title: "Flow", price: "$55.00 USD", image: artworkFlow },
  { id: "fort-point", title: "Fort Point", price: "$50.00 USD", image: artworkFortpoint, pricePrefix: "From" },
];

const heroImages = [
  artworkForest,
  artworkFortpoint,
  artworkChopes,
  artworkCampout,
  artworkSunset,
  artworkWaterfall,
  artworkMountain,
  artworkWhale,
  artworkLighthouse,
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
                {heroImages.map((img, index) => (
                  <div
                    key={index}
                    className="overflow-hidden bg-muted"
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                      style={{ transform: "rotate(-45deg) scale(1.5)" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <h2 className="section-title mb-8">FEATURED PRODUCTS</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
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
