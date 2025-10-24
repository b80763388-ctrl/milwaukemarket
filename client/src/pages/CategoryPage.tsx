import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { Product } from "@shared/schema";

interface CategoryPageProps {
  onAddToCart: (productId: string) => void;
}

const categoryNames: Record<string, string> = {
  wiertarki: "Wiertarki",
  szlifierki: "Szlifierki",
  klucze: "Klucze Udarowe",
  mloty: "Młoty",
  zestawy: "Zestawy",
};

export function CategoryPage({ onAddToCart }: CategoryPageProps) {
  const { category } = useParams();
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const categoryProducts = products?.filter((p) => p.category === category) || [];
  const categoryName = category ? categoryNames[category] || category : "";

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" data-testid="link-breadcrumb-home">
          <span className="hover:text-foreground cursor-pointer">Strona główna</span>
        </Link>
        <span>/</span>
        <span className="text-foreground capitalize">{categoryName}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="mb-4" data-testid="button-back">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Powrót
          </Button>
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 font-heading" data-testid="text-category-title">
          {categoryName}
        </h1>
        <p className="text-lg text-muted-foreground" data-testid="text-category-count">
          {categoryProducts.length} produktów
        </p>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-96 bg-muted animate-pulse rounded-lg"
              data-testid="skeleton-product"
            />
          ))}
        </div>
      ) : categoryProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">
            Brak produktów w tej kategorii
          </p>
          <Link href="/">
            <Button data-testid="button-back-home">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Wróć do strony głównej
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}
