import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Product {
  id: number;
  title: string;
  price: string | number;
  slug: string;
  image: string;
  description: string;
}

const Product = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("http://127.0.0.1:8000/api/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json() as Promise<Product[]>;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow flex items-center justify-center">
          <p>Loading products...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-2">Error loading products.</p>
            <p className="text-sm text-muted-foreground">{error instanceof Error ? error.message : "Currently unable to reach the server."}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        {/* Page Header */}

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
            <span className="text-xs text-muted-foreground">{products?.length || 0} products</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
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

        {/* Pagination - Placeholder for now since API returns all */}
        <div className="flex items-center justify-center gap-4">
          <span className="text-sm font-medium border-b border-foreground">1</span>
          {/* <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">2</span> */}
          <button className="p-1 hover:bg-muted rounded" disabled>
            <ChevronRight className="w-4 h-4 opacity-50" />
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Product;