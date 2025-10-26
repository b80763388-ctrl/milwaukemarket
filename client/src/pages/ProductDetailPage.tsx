import { useState } from "react";
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

interface ProductDetailPageProps {
  onAddToCart: (productId: string) => void;
}

export function ProductDetailPage({ onAddToCart }: ProductDetailPageProps) {
  const { slug } = useParams();
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const product = products?.find((p) => p.slug === slug);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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
        <h2 className="text-2xl font-bold mb-4">Produkt nie znaleziony</h2>
        <Link href="/">
          <Button data-testid="button-back-home">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Wróć do strony głównej
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
  const allImages = [product.image, ...(product.images || [])];
  const hasGallery = allImages.length > 1;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" data-testid="link-breadcrumb-home">
          <span className="hover:text-foreground cursor-pointer">Strona główna</span>
        </Link>
        <span>/</span>
        <Link href={`/kategoria/${product.category}`} data-testid="link-breadcrumb-category">
          <span className="hover:text-foreground cursor-pointer capitalize">
            {product.category}
          </span>
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
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
              PRODUKT POWYSTAWOWY
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
              alt={product.name}
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
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-3 transition-all hover:scale-105 ${
                    selectedImageIndex === index
                      ? "border-primary ring-2 ring-primary ring-offset-2 shadow-lg"
                      : "border-gray-200 hover:border-primary/50"
                  }`}
                  data-testid={`button-thumbnail-${index}`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
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
            <h1 className="text-3xl md:text-4xl font-bold mb-2 font-heading" data-testid="text-product-name">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
            <div className="flex items-center gap-2 text-green-600">
              <Check className="h-5 w-5" />
              <span className="font-medium" data-testid="text-availability">
                Dostępny - wysyłka w 24h
              </span>
            </div>
          ) : (
            <div className="text-muted-foreground" data-testid="text-out-of-stock">
              Brak w magazynie
            </div>
          )}

          {/* Pricing */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Cena katalogowa:</div>
                <div className="text-xl line-through text-muted-foreground" data-testid="text-original-price">
                  {parseFloat(product.originalPrice).toLocaleString("pl-PL", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  zł
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Cena powystawowa:</div>
                <div className="text-4xl font-bold text-primary font-heading" data-testid="text-exhibition-price">
                  {parseFloat(product.exhibitionPrice).toLocaleString("pl-PL", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  zł
                </div>
                <div className="text-sm font-medium text-destructive">
                  Oszczędzasz:{" "}
                  {(
                    parseFloat(product.originalPrice) - parseFloat(product.exhibitionPrice)
                  ).toLocaleString("pl-PL", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  zł ({discountPercent}%)
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
            Dodaj do koszyka
          </Button>

          {/* Trust Icons */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary shrink-0">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium">Gwarancja</div>
                <div className="text-xs text-muted-foreground">12 miesięcy</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary shrink-0">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium">Darmowa dostawa</div>
                <div className="text-xs text-muted-foreground">Od 500 zł</div>
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
                      <div className="font-semibold text-base mb-1">Wymiary produktu</div>
                      <div className="text-lg font-medium text-foreground" data-testid="text-dimensions">
                        {product.features.find(f => f.startsWith("Wymiary:"))?.replace("Wymiary: ", "")}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        szerokość × głębokość × wysokość
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Description */}
          <div className="pt-4">
            <h3 className="font-semibold text-lg mb-2">Opis produktu</h3>
            <p className="text-muted-foreground" data-testid="text-product-description">
              {product.description}
            </p>
          </div>

          {/* Accordion Sections */}
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="features">
              <AccordionTrigger data-testid="accordion-features">
                Specyfikacja Techniczna
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {product.batteryIncluded && (
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="font-medium text-primary">
                        W zestawie z baterią i ładowarką
                      </span>
                    </li>
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="condition">
              <AccordionTrigger data-testid="accordion-condition">
                Stan Produktu
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-4">{product.condition}</p>
                <p className="text-sm text-muted-foreground">
                  Produkt był wcześniej wystawiony w salonie sprzedaży lub prezentowany na targach. 
                  Został dokładnie sprawdzony przez naszych specjalistów i jest w pełni sprawny technicz.
                  Może posiadać minimalne ślady użytkowania na obudowie.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="warranty">
              <AccordionTrigger data-testid="accordion-warranty">
                Gwarancja
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-4">{product.warranty}</p>
                <p className="text-sm text-muted-foreground">
                  Na wszystkie produkty powystawowe udzielamy pełnej gwarancji producenta Milwaukee. 
                  Gwarancja obejmuje wszelkie wady fabryczne i problemy techniczne. 
                  W przypadku awarii, narzędzie zostanie naprawione lub wymienione na nowe.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
