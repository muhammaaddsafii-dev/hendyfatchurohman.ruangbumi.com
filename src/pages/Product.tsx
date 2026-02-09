import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

interface Product {
  id: number;
  title: string;
  price: string | number;
  slug: string;
  image: string;
  description: string;
}

const Product = () => {
  const [availability, setAvailability] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("alphabetical-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  const getFilteredProducts = () => {
    if (!products) return [];

    let filtered = [...products];

    // Filter by Availability (Placeholder as no stock data is available yet)
    if (availability === "in-stock") {
      // Assuming all fetched products are in stock for now
      // If we had a stock field: filtered = filtered.filter(p => p.stock > 0);
    } else if (availability === "out-of-stock") {
      // filtered = filtered.filter(p => p.stock === 0);
      return []; // Placeholder: API doesn't return out of stock items usually
    }

    // Filter by Price
    if (priceFilter !== "all") {
      filtered = filtered.filter((product) => {
        const price = Number(product.price);
        if (priceFilter === "under-50") return price < 50;
        if (priceFilter === "50-100") return price >= 50 && price <= 100;
        if (priceFilter === "over-100") return price > 100;
        return true;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      const priceA = Number(a.price);
      const priceB = Number(b.price);

      switch (sortBy) {
        case "alphabetical-asc":
          return a.title.localeCompare(b.title);
        case "alphabetical-desc":
          return b.title.localeCompare(a.title);
        case "price-asc":
          return priceA - priceB;
        case "price-desc":
          return priceB - priceA;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  // Pagination Logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
          <div className="flex items-center gap-4">
            <span className="section-title">SORT BY:</span>

            {/* Sort By */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="filter-btn">
                  {sortBy === "alphabetical-asc" && "Alphabetically, A-Z"}
                  {sortBy === "alphabetical-desc" && "Alphabetically, Z-A"}
                  {sortBy === "price-asc" && "Price, low to high"}
                  {sortBy === "price-desc" && "Price, high to low"}
                  <ChevronDown className="w-3 h-3 ml-1" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                  <DropdownMenuRadioItem value="alphabetical-asc">Alphabetically, A-Z</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="alphabetical-desc">Alphabetically, Z-A</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-asc">Price, low to high</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-desc">Price, high to low</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <span className="text-xs text-muted-foreground">{filteredProducts.length} products</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={String(product.id)}
                title={product.title}
                price={`$${Number(product.price).toLocaleString("id-ID")}`}
                image={product.image || "https://placehold.co/600x600?text=No+Image"}
                pricePrefix={undefined}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No products found matching your filters.
            </div>
          )}
        </div>

        {/* Pagination - Placeholder for now since API returns all */}
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="p-2 hover:bg-muted rounded transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => goToPage(number)}
                className={`text-sm font-medium w-8 h-8 flex items-center justify-center rounded transition-colors ${currentPage === number
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="p-2 hover:bg-muted rounded transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Product;