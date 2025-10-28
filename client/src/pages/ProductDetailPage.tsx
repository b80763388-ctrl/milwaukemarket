import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShoppingCart, ArrowLeft, Check, Shield, Package } from "lucide-react";
import type { Product } from "@shared/schema";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate, convertPrice, formatCurrency } from "@/lib/i18n";

interface ProductDetailPageProps {
  onAddToCart: (productId: string) => void;
}

export function ProductDetailPage({ onAddToCart }: ProductDetailPageProps) {
  const { slug } = useParams();
  const { language, currency } = useLanguage();
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const product = products?.find((p) => p.slug === slug);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [convertedPrices, setConvertedPrices] = useState<{
    original: number;
    exhibition: number;
  } | null>(null);

  const t = (key: string) => translate(key, language);

  useEffect(() => {
    async function convertPrices() {
      if (!product) return;
      
      const originalPrice = parseFloat(product.originalPrice);
      const exhibitionPrice = parseFloat(product.exhibitionPrice);
      
      const convertedOriginal = await convertPrice(originalPrice, currency);
      const convertedExhibition = await convertPrice(exhibitionPrice, currency);
      
      setConvertedPrices({
        original: convertedOriginal,
        exhibition: convertedExhibition,
      });
    }
    
    convertPrices();
  }, [product, currency]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-muted animate-pulse rounded-lg" />
          <div className="space-y-4">
            <div className="h-8 bg-muted animate-pulse rounded w-3/4" />
            <div className="h-6 bg-muted animate-pulse rounded w-1/2" />
            <div className="h-12 bg-muted animate-pulse rounded w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">{t('product.notFound')}</h2>
        <Link href="/">
          <Button data-testid="button-back-home">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('product.backHome')}
          </Button>
        </Link>
      </div>
    );
  }

  const discountPercent = Math.round(
    ((parseFloat(product.originalPrice) - parseFloat(product.exhibitionPrice)) /
      parseFloat(product.originalPrice)) *
      100
  );

  // Combine main image with additional images for gallery
  // Always use product.image as the first image, then add additional images (excluding duplicates)
  const additionalImages = product.images
    ? product.images.filter((img) => img !== product.image)
    : [];
  const allImages = [product.image, ...additionalImages];
  const hasGallery = allImages.length > 1;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 overflow-hidden">
      {/* Floating Decorative Elements */}
      <div className="absolute top-32 right-16 w-64 h-64 bg-gradient-to-br from-primary/10 to-rose-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-32 left-16 w-80 h-80 bg-gradient-to-tl from-amber-500/10 to-slate-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}} />
      
      
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-white/70 mb-8">
        <Link href="/" data-testid="link-breadcrumb-home">
          <span className="hover:text-white cursor-pointer">{t('nav.home')}</span>
        </Link>
        <span>/</span>
        <Link href={`/kategoria/${product.category}`} data-testid="link-breadcrumb-category">
          <span className="hover:text-white cursor-pointer capitalize">
            {t(`category.${product.category}`)}
          </span>
        </Link>
        <span>/</span>
        <span className="text-white">{language === 'en' && product.nameEn ? product.nameEn : product.name}</span>
      </nav>

      {/* Product Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left - Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
            <Badge
              variant="destructive"
              className="absolute top-4 left-4 z-10 text-sm font-semibold uppercase tracking-wide"
              data-testid="badge-exhibition"
            >
              {t('products.exhibitionBadge')}
            </Badge>
            {discountPercent > 0 && (
              <Badge
                className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground border-primary-border text-lg px-3 py-1"
                data-testid="badge-discount"
              >
                -{discountPercent}%
              </Badge>
            )}
            <img
              src={allImages[selectedImageIndex]}
              alt={language === 'en' && product.nameEn ? product.nameEn : product.name}
              className="w-full h-full object-cover"
              data-testid="img-product-detail"
            />
          </div>

          {/* Thumbnail Gallery */}
          {hasGallery && (
            <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square bg-slate-800 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                    selectedImageIndex === index
                      ? "border-primary ring-2 ring-primary ring-offset-2 shadow-lg"
                      : "border-slate-700 hover:border-primary/50"
                  }`}
                  data-testid={`button-thumbnail-${index}`}
                >
                  <img
                    src={image}
                    alt={`${language === 'en' && product.nameEn ? product.nameEn : product.name} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right - Info */}
        <div className="space-y-6">
          {/* Title & SKU */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 font-heading text-white" data-testid="text-product-name">
              {language === 'en' && product.nameEn ? product.nameEn : product.name}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span data-testid="text-product-sku">SKU: {product.sku}</span>
              {product.voltage && (
                <>
                  <span>•</span>
                  <span data-testid="text-product-voltage">{product.voltage}</span>
                </>
              )}
            </div>
          </div>

          {/* Availability */}
          {product.inStock ? (
            <div className="flex items-center gap-2 text-green-400">
              <Check className="h-5 w-5" />
              <span className="font-medium text-white" data-testid="text-availability">
                {t('products.available')}
              </span>
            </div>
          ) : (
            <div className="text-gray-400" data-testid="text-out-of-stock">
              {t('products.outOfStock')}
            </div>
          )}

          {/* Pricing */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="text-sm text-gray-400">{t('products.originalPrice')}</div>
                <div className="text-xl line-through text-gray-400" data-testid="text-original-price">
                  {convertedPrices ? formatCurrency(convertedPrices.original, currency) : '...'}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-white">{t('products.exhibitionPrice')}</div>
                <div className="text-4xl font-bold text-primary font-heading" data-testid="text-exhibition-price">
                  {convertedPrices ? formatCurrency(convertedPrices.exhibition, currency) : '...'}
                </div>
                <div className="text-sm font-medium text-destructive">
                  {t('products.save')}:{" "}
                  {convertedPrices ? formatCurrency(convertedPrices.original - convertedPrices.exhibition, currency) : '...'} ({discountPercent}%)
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add to Cart */}
          <Button
            size="lg"
            className="w-full text-lg"
            onClick={() => onAddToCart(product.id)}
            disabled={!product.inStock}
            data-testid="button-add-to-cart"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {t('products.addToCart')}
          </Button>

          {/* Trust Icons */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary shrink-0">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium text-white">{t('product.warranty')}</div>
                <div className="text-xs text-white/80">{t('product.warrantyTime')}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary shrink-0">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium text-white">{t('product.shipping.title')}</div>
                <div className="text-xs text-white/80">{t('product.shipping.from')}</div>
              </div>
            </div>
          </div>

          {/* Dimensions - if available */}
          {product.features.some(f => f.startsWith("Wymiary:")) && (
            <div className="pt-4">
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="18" x="3" y="3" rx="2"/>
                        <path d="M3 9h18"/>
                        <path d="M9 21V9"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-base mb-1 text-white">{t('product.dimensions')}</div>
                      <div className="text-lg font-medium text-white" data-testid="text-dimensions">
                        {product.features.find(f => f.startsWith("Wymiary:"))?.replace("Wymiary: ", "")}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {t('product.dimensionsLabel')}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Description */}
          <div className="pt-4">
            <h3 className="font-semibold text-lg mb-2 text-white">{t('product.description')}</h3>
            <p className="text-gray-300" data-testid="text-product-description">
              {language === 'en' && product.descriptionEn ? product.descriptionEn : product.description}
            </p>
          </div>

          {/* Accordion Sections */}
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="features">
              <AccordionTrigger data-testid="accordion-features" className="text-white hover:text-white">
                {t('product.features')}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                  {product.batteryIncluded && (
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="font-medium text-primary">
                        {t('product.batteryIncluded')}
                      </span>
                    </li>
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="condition">
              <AccordionTrigger data-testid="accordion-condition" className="text-white hover:text-white">
                {t('product.condition')}
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-4 text-gray-300">{product.condition}</p>
                <p className="text-sm text-gray-400">
                  {t('product.conditionText')}
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="warranty">
              <AccordionTrigger data-testid="accordion-warranty" className="text-white hover:text-white">
                {t('product.warranty')}
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-4 text-gray-300">{product.warranty}</p>
                <p className="text-sm text-gray-400">
                  {t('product.warrantyText')}
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      </div>
    </div>
  );
}
