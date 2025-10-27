import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Truck, CheckCircle, ArrowRight, Drill, Disc3, Wrench, Hammer, Container, Boxes, CircleDashed, Ruler, Settings, Package, PackageOpen } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { ExhibitionProductsModal } from "@/components/ExhibitionProductsModal";
import { ShippingPaymentModal } from "@/components/ShippingPaymentModal";
import { Reviews } from "@/components/Reviews";
import type { Product } from "@shared/schema";
import heroImage from "@assets/generated_images/Workshop_hero_background_image_7fd60b9a.png";

interface HomePageProps {
  onAddToCart: (productId: string) => void;
}

export function HomePage({ onAddToCart }: HomePageProps) {
  const { t } = useLanguage();
  const [exhibitionModalOpen, setExhibitionModalOpen] = useState(false);
  const [shippingModalOpen, setShippingModalOpen] = useState(false);
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const featuredProducts = products?.slice(0, 4) || [];
  
  const categoryConfig = {
    wiertarki: { icon: Drill, gradient: "from-primary to-red-700" },
    szlifierki: { icon: Disc3, gradient: "from-slate-700 to-slate-900" },
    klucze: { icon: Wrench, gradient: "from-zinc-700 to-zinc-900" },
    mloty: { icon: Hammer, gradient: "from-gray-700 to-gray-900" },
    wozki: { icon: Container, gradient: "from-slate-800 to-black" },
    zestawy: { icon: Boxes, gradient: "from-primary/90 to-red-800" },
    pily: { icon: CircleDashed, gradient: "from-neutral-700 to-neutral-900" },
    lasery: { icon: Ruler, gradient: "from-stone-700 to-stone-900" },
    akcesoria: { icon: Settings, gradient: "from-gray-800 to-zinc-900" },
    "zestawy-specjalistyczne-milwaukee": { icon: Package, gradient: "from-primary to-red-900" },
    "zestawy-makita": { icon: PackageOpen, gradient: "from-slate-600 to-slate-800" },
  };
  
  const categories = [
    { name: t('category.wiertarki'), slug: "wiertarki", count: products?.filter(p => p.category === "wiertarki").length || 0 },
    { name: t('category.szlifierki'), slug: "szlifierki", count: products?.filter(p => p.category === "szlifierki").length || 0 },
    { name: t('category.klucze'), slug: "klucze", count: products?.filter(p => p.category === "klucze").length || 0 },
    { name: t('category.mloty'), slug: "mloty", count: products?.filter(p => p.category === "mloty").length || 0 },
    { name: t('category.wozki'), slug: "wozki", count: products?.filter(p => p.category === "wozki").length || 0 },
    { name: t('category.zestawy'), slug: "zestawy", count: products?.filter(p => p.category === "zestawy").length || 0 },
    { name: t('category.pily'), slug: "pily", count: products?.filter(p => p.category === "pily").length || 0 },
    { name: t('category.lasery'), slug: "lasery", count: products?.filter(p => p.category === "lasery").length || 0 },
    { name: t('category.akcesoria'), slug: "akcesoria", count: products?.filter(p => p.category === "akcesoria").length || 0 },
    { name: t('category.zestawy-specjalistyczne-milwaukee'), slug: "zestawy-specjalistyczne-milwaukee", count: products?.filter(p => p.category === "zestawy-specjalistyczne-milwaukee").length || 0 },
    { name: t('category.zestawy-makita'), slug: "zestawy-makita", count: products?.filter(p => p.category === "zestawy-makita").length || 0 },
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
            {t('hero.badge')}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 font-heading">
            {t('hero.title')}
            <br />
            <span className="text-primary">{t('hero.titleBrand')}</span> {t('hero.titleFrom')}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('hero.subtitle1')}
            <br />
            {t('hero.subtitle2')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#produkty">
              <Button size="lg" className="text-lg px-8" data-testid="button-hero-shop">
                {t('hero.cta.shop')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-background/10 backdrop-blur-sm border-white/20 text-white hover:bg-background/20"
              onClick={() => setExhibitionModalOpen(true)}
              data-testid="button-hero-learn"
            >
              {t('hero.cta.learn')}
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-white">
            <button
              onClick={() => setExhibitionModalOpen(true)}
              className="flex items-center gap-2 hover-elevate active-elevate-2 px-3 py-2 rounded-md transition-colors"
              data-testid="badge-warranty-info"
            >
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">{t('trust.warranty')}</span>
            </button>
            <button
              onClick={() => setShippingModalOpen(true)}
              className="flex items-center gap-2 hover-elevate active-elevate-2 px-3 py-2 rounded-md transition-colors"
              data-testid="badge-shipping-info"
            >
              <Truck className="h-5 w-5" />
              <span className="text-sm font-medium">{t('trust.shipping')}</span>
            </button>
            <button
              onClick={() => setExhibitionModalOpen(true)}
              className="flex items-center gap-2 hover-elevate active-elevate-2 px-3 py-2 rounded-md transition-colors"
              data-testid="badge-verified-info"
            >
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-medium">{t('trust.verified')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ExhibitionProductsModal open={exhibitionModalOpen} onOpenChange={setExhibitionModalOpen} />
      <ShippingPaymentModal open={shippingModalOpen} onOpenChange={setShippingModalOpen} />

      {/* Featured Products */}
      <section id="produkty" className="relative py-16 md:py-20 bg-gradient-to-br from-gray-950 to-slate-900 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              OFERTY SPECJALNE
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-white">
              Wyróżnione Produkty Powystawowe
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
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
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-gray-950 to-slate-950 overflow-hidden">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-10 right-20 w-96 h-96 bg-gradient-to-br from-primary/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-gradient-to-tl from-red-500/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-slate-800/40 to-transparent rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-white">
              Kategorie Produktów
            </h2>
            <p className="text-lg text-gray-300">
              Przeglądaj narzędzia według typu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = categoryConfig[category.slug as keyof typeof categoryConfig].icon;
              const gradient = categoryConfig[category.slug as keyof typeof categoryConfig].gradient;
              
              return (
                <Link key={category.slug} href={`/kategoria/${category.slug}`}>
                  <div
                    className="group relative overflow-hidden rounded-xl hover-elevate active-elevate-2 cursor-pointer transition-all duration-300"
                    data-testid={`card-category-${category.slug}`}
                  >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90 group-hover:opacity-100 transition-opacity`} />
                    
                    {/* Content */}
                    <div className="relative z-10 p-8 text-white">
                      {/* Icon */}
                      <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform">
                        <Icon className="h-8 w-8" />
                      </div>
                      
                      {/* Category Name */}
                      <h3 className="text-2xl font-bold mb-2 font-heading">
                        {category.name}
                      </h3>
                      
                      {/* Product Count Badge */}
                      <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                        <span className="text-sm font-medium">{category.count} {t('category.productsCount')}</span>
                      </div>
                      
                      {/* CTA */}
                      <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                        {t('nav.allProducts')}
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                    
                    {/* Decorative Pattern */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
                      <Icon className="w-full h-full transform rotate-12" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <Reviews />

      {/* Trust Section */}
      <section className="relative py-16 md:py-20 bg-gradient-to-br from-slate-950 via-gray-950 to-zinc-950 overflow-hidden">
        {/* Decorative Shapes */}
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-primary/12 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-blue-500/12 to-transparent rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Gwarancja Producenta</h3>
              <p className="text-gray-300">
                Wszystkie produkty objęte są pełną gwarancją producenta na 12 miesięcy
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Darmowa Dostawa</h3>
              <p className="text-gray-300">
                Darmowa dostawa dla zamówień powyżej 500 zł. Szybka realizacja i bezpieczne opakowanie
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Produkty Sprawdzone</h3>
              <p className="text-gray-300">
                Każdy produkt powystawowy jest dokładnie sprawdzony i gotowy do użycia
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
