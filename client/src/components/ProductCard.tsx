import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { formatPriceSync, t, language } = useLanguage();
  const discountPercent = Math.round(
    ((parseFloat(product.originalPrice) - parseFloat(product.exhibitionPrice)) /
      parseFloat(product.originalPrice)) *
      100
  );

  return (
    <Card className="group hover-elevate overflow-hidden bg-slate-900/50 border-slate-800/50 backdrop-blur-sm" data-testid={`card-product-${product.id}`}>
      <Link href={`/produkt/${product.slug}`} data-testid={`link-product-${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          {/* Exhibition Badge */}
          <Badge
            variant="destructive"
            className="absolute top-3 left-3 z-10 text-xs font-semibold uppercase tracking-wide"
            data-testid="badge-exhibition"
          >
            {t('products.exhibitionBadge')}
          </Badge>

          {/* Discount Badge */}
          {discountPercent > 0 && (
            <Badge
              className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground border-primary-border"
              data-testid="badge-discount"
            >
              -{discountPercent}%
            </Badge>
          )}

          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-testid="img-product"
          />
        </div>
      </Link>

      <CardContent className="p-4 space-y-2">
        <Link href={`/produkt/${product.slug}`}>
          <div className="space-y-1">
            <h3
              className="font-semibold text-lg leading-tight line-clamp-2 text-white hover:text-primary transition-colors"
              data-testid="text-product-name"
            >
              {language === 'en' && product.nameEn ? product.nameEn : product.name}
            </h3>
            <p className="text-sm text-gray-400" data-testid="text-product-sku">
              SKU: {product.sku}
            </p>
          </div>
        </Link>

        {/* Pricing */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span
              className="text-2xl font-bold text-primary font-heading"
              data-testid="text-exhibition-price"
            >
              {formatPriceSync(parseFloat(product.exhibitionPrice))}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="text-sm text-gray-500 line-through"
              data-testid="text-original-price"
            >
              {formatPriceSync(parseFloat(product.originalPrice))}
            </span>
            <span className="text-sm font-medium text-green-400">
              {t('products.save')} {formatPriceSync(parseFloat(product.originalPrice) - parseFloat(product.exhibitionPrice))}
            </span>
          </div>
        </div>

        {/* Stock Status */}
        {product.inStock ? (
          <Badge variant="secondary" className="text-xs">
            {t('products.available')}
          </Badge>
        ) : (
          <Badge variant="outline" className="text-xs">
            {t('products.outOfStock')}
          </Badge>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={(e) => {
            e.preventDefault();
            onAddToCart(product.id);
          }}
          disabled={!product.inStock}
          data-testid="button-add-to-cart"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {t('products.addToCart')}
        </Button>
      </CardFooter>
    </Card>
  );
}
