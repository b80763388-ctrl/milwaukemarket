import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { CartItemWithProduct } from "@shared/schema";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemWithProduct[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

export function CartSidebar({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartSidebarProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + parseFloat(item.product.exhibitionPrice) * item.quantity,
    0
  );

  const FREE_SHIPPING_THRESHOLD = 500;
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 29.99;
  const total = subtotal + shippingCost;
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
        onClick={onClose}
        data-testid="overlay-cart"
      />

      {/* Sidebar */}
      <div
        className="fixed right-0 top-0 h-full w-full sm:w-96 bg-background border-l shadow-xl z-50 flex flex-col"
        data-testid="sidebar-cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <h2 className="text-xl font-bold font-heading">Koszyk</h2>
            {items.length > 0 && (
              <Badge variant="secondary" data-testid="badge-items-count">
                {items.length}
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} data-testid="button-close-cart">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Twój koszyk jest pusty</h3>
            <p className="text-muted-foreground mb-6">
              Dodaj produkty do koszyka, aby rozpocząć zakupy
            </p>
            <Button onClick={onClose} data-testid="button-continue-shopping">
              Kontynuuj zakupy
            </Button>
          </div>
        ) : (
          <>
            {/* Free Shipping Progress */}
            {subtotal < FREE_SHIPPING_THRESHOLD && (
              <div className="p-4 bg-muted/50">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Dodaj jeszcze{" "}
                      <span className="font-semibold text-foreground">
                        {(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString("pl-PL", {
                          minimumFractionDigits: 2,
                        })}{" "}
                        zł
                      </span>{" "}
                      do darmowej dostawy
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-full transition-all duration-300"
                      style={{ width: `${shippingProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Cart Items */}
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-4 border-b last:border-0"
                    data-testid={`cart-item-${item.id}`}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md bg-muted"
                      data-testid="img-cart-product"
                    />
                    <div className="flex-1 space-y-2">
                      <h4 className="font-semibold text-sm leading-tight line-clamp-2">
                        {item.product.name}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary">
                          {parseFloat(item.product.exhibitionPrice).toLocaleString("pl-PL", {
                            minimumFractionDigits: 2,
                          })}{" "}
                          zł
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                            }
                            data-testid="button-decrease-quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium" data-testid="text-quantity">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            data-testid="button-increase-quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-destructive hover:text-destructive"
                          data-testid="button-remove-item"
                        >
                          Usuń
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer - Summary */}
            <div className="border-t p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Suma częściowa</span>
                  <span className="font-medium">
                    {subtotal.toLocaleString("pl-PL", {
                      minimumFractionDigits: 2,
                    })}{" "}
                    zł
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Dostawa</span>
                  <span className="font-medium">
                    {shippingCost === 0 ? (
                      <span className="text-primary font-semibold">DARMOWA</span>
                    ) : (
                      `${shippingCost.toLocaleString("pl-PL", {
                        minimumFractionDigits: 2,
                      })} zł`
                    )}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Suma</span>
                  <span className="text-primary" data-testid="text-total">
                    {total.toLocaleString("pl-PL", {
                      minimumFractionDigits: 2,
                    })}{" "}
                    zł
                  </span>
                </div>
              </div>
              <Link href="/checkout">
                <Button className="w-full" size="lg" data-testid="button-checkout">
                  Przejdź do kasy
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full"
                onClick={onClose}
                data-testid="button-continue-shopping-bottom"
              >
                Kontynuuj zakupy
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
