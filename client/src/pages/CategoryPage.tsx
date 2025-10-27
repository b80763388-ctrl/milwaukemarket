import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Product } from "@shared/schema";

interface CategoryPageProps {
  onAddToCart: (productId: string) => void;
}

export function CategoryPage({ onAddToCart }: CategoryPageProps) {
  const { category } = useParams();
  const { t } = useLanguage();
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const categoryProducts = products?.filter((p) => p.category === category) || [];
  const categoryName = category ? t(`category.${category}`) : "";

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:from-slate-950 dark:to-stone-950 overflow-hidden">
      {/* Category-specific decorative elements */}
      <div className="absolute top-10 right-20 w-72 h-72 bg-gradient-to-br from-primary/6 to-violet-500/6 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-20 w-96 h-96 bg-gradient-to-tl from-indigo-500/6 to-slate-500/6 rounded-full blur-3xl" />
      
      {/* Subtle Decorative Elements */}
      <div className="absolute top-1/4 left-1/3 w-20 h-20 border-2 border-primary/10 rounded-lg rotate-12 animate-pulse" style={{animationDuration: '4s'}} />
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 border-2 border-slate-400/10 rounded-lg -rotate-12 animate-pulse" style={{animationDuration: '5s', animationDelay: '1s'}} />
      
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" data-testid="link-breadcrumb-home">
          <span className="hover:text-foreground cursor-pointer">{t('nav.home')}</span>
        </Link>
        <span>/</span>
        <span className="text-foreground capitalize">{categoryName}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="mb-4" data-testid="button-back">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('category.back')}
          </Button>
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 font-heading" data-testid="text-category-title">
          {categoryName}
        </h1>
        <p className="text-lg text-muted-foreground" data-testid="text-category-count">
          {categoryProducts.length} {t('category.productsCount')}
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
            {t('category.noProducts')}
          </p>
          <Link href="/">
            <Button data-testid="button-back-home">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('category.backHome')}
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
    </div>
  );
}
