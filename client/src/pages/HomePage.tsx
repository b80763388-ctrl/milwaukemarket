import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Truck, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { Product } from "@shared/schema";
import heroImage from "@assets/generated_images/Workshop_hero_background_image_7fd60b9a.png";

interface HomePageProps {
  onAddToCart: (productId: string) => void;
}

export function HomePage({ onAddToCart }: HomePageProps) {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const featuredProducts = products?.slice(0, 4) || [];
  const categories = [
    { name: "Wiertarki", slug: "wiertarki", count: products?.filter(p => p.category === "wiertarki").length || 0 },
    { name: "Szlifierki", slug: "szlifierki", count: products?.filter(p => p.category === "szlifierki").length || 0 },
    { name: "Klucze Udarowe", slug: "klucze", count: products?.filter(p => p.category === "klucze").length || 0 },
    { name: "Młoty", slug: "mloty", count: products?.filter(p => p.category === "mloty").length || 0 },
    { name: "Wózki Narzędziowe", slug: "wozki", count: products?.filter(p => p.category === "wozki").length || 0 },
    { name: "Zestawy Narzędzi", slug: "zestawy", count: products?.filter(p => p.category === "zestawy").length || 0 },
    { name: "Piły", slug: "pily", count: products?.filter(p => p.category === "pily").length || 0 },
    { name: "Oświetlenie", slug: "oswietlenie", count: products?.filter(p => p.category === "oswietlenie").length || 0 },
    { name: "Akcesoria", slug: "akcesoria", count: products?.filter(p => p.category === "akcesoria").length || 0 },
    { name: "Zestawy Specjalistyczne", slug: "zestawy-specjalistyczne", count: products?.filter(p => p.category === "zestawy-specjalistyczne").length || 0 },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Hero Image with Dark Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Tools Shop Workshop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-primary text-primary-foreground border-primary-border text-sm px-4 py-2">
            PRODUKTY POWYSTAWOWE
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 font-heading">
            Profesjonalne Narzędzia
            <br />
            <span className="text-primary">Milwaukee</span> od Tools Shop
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Oszczędź do 40% na profesjonalnych narzędziach
            <br />
            Produkty powystawowe z pełną gwarancją
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#produkty">
              <Button size="lg" className="text-lg px-8" data-testid="button-hero-shop">
                Zobacz Ofertę
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-background/10 backdrop-blur-sm border-white/20 text-white hover:bg-background/20"
              data-testid="button-hero-learn"
            >
              Dowiedz się więcej
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-white">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">Gwarancja 12 miesięcy</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              <span className="text-sm font-medium">Darmowa dostawa od 500 zł</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Sprawdzone produkty</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="produkty" className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              OFERTY SPECJALNE
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              Wyróżnione Produkty Powystawowe
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Najlepsze oferty na profesjonalne narzędzia w wyjątkowych cenach
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-96 bg-muted animate-pulse rounded-lg"
                  data-testid="skeleton-product"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/produkty">
              <Button size="lg" variant="outline" data-testid="button-view-all">
                Zobacz wszystkie produkty
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              Kategorie Produktów
            </h2>
            <p className="text-lg text-muted-foreground">
              Przeglądaj narzędzia według typu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.slug} href={`/kategoria/${category.slug}`}>
                <div
                  className="bg-card border rounded-lg p-8 text-center hover-elevate active-elevate-2 cursor-pointer"
                  data-testid={`card-category-${category.slug}`}
                >
                  <h3 className="text-2xl font-bold mb-2 font-heading">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {category.count} produktów
                  </p>
                  <Button variant="ghost" data-testid={`button-category-${category.slug}`}>
                    Zobacz kategorię
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Gwarancja Producenta</h3>
              <p className="text-muted-foreground">
                Wszystkie produkty objęte są pełną gwarancją producenta na 12 miesięcy
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Darmowa Dostawa</h3>
              <p className="text-muted-foreground">
                Darmowa dostawa dla zamówień powyżej 500 zł. Szybka realizacja i bezpieczne opakowanie
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Produkty Sprawdzone</h3>
              <p className="text-muted-foreground">
                Każdy produkt powystawowy jest dokładnie sprawdzony i gotowy do użycia
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
