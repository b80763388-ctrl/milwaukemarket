import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link, useLocation } from "wouter";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export function Header({ cartItemCount, onCartClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navigation = [
    { name: "Strona Główna", href: "/" },
    { name: "Wiertarki", href: "/kategoria/wiertarki" },
    { name: "Szlifierki", href: "/kategoria/szlifierki" },
    { name: "Klucze Udarowe", href: "/kategoria/klucze" },
    { name: "Młoty", href: "/kategoria/mloty" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-2 hover-elevate active-elevate-2 px-3 py-2 rounded-md cursor-pointer">
              <div className="text-2xl font-bold font-heading text-primary">
                TOOLS SHOP
              </div>
              <Badge variant="secondary" className="text-xs hidden sm:inline-flex">
                POWYSTAWOWE
              </Badge>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} data-testid={`link-nav-${item.name.toLowerCase().replace(/ /g, '-')}`}>
                <Button
                  variant={location === item.href ? "secondary" : "ghost"}
                  className="text-sm font-medium"
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Right Side - Cart & Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onCartClick}
              data-testid="button-cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  data-testid="badge-cart-count"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 space-y-2 border-t">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} data-testid={`link-mobile-${item.name.toLowerCase().replace(/ /g, '-')}`}>
                <Button
                  variant={location === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
