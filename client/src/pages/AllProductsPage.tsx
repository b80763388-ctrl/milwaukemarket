import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import type { Product } from "@shared/schema";

interface AllProductsPageProps {
  onAddToCart: (productId: string) => void;
}

export function AllProductsPage({ onAddToCart }: AllProductsPageProps) {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" data-testid="link-breadcrumb-home">
          <span className="hover:text-foreground cursor-pointer">Strona główna</span>
        </Link>
        <span>/</span>
        <span className="text-foreground">Wszystkie produkty</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="mb-4" data-testid="button-back">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Powrót
          </Button>
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 font-heading">
          Wszystkie Produkty
        </h1>
        <p className="text-lg text-muted-foreground" data-testid="text-products-count">
          {products?.length || 0} produktów
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
      ) : products && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">Brak produktów do wyświetlenia</p>
        </div>
      )}
    </div>
  );
}
