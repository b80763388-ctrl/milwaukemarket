import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import toolsShopLogo from "@assets/generated_images/Tools_Shop_logo_design_986f0e42.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export function Header({ cartItemCount, onCartClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { t } = useLanguage();

  const categories = [
    { name: t('category.wiertarki'), href: "/kategoria/wiertarki" },
    { name: t('category.szlifierki'), href: "/kategoria/szlifierki" },
    { name: t('category.klucze'), href: "/kategoria/klucze" },
    { name: t('category.mloty'), href: "/kategoria/mloty" },
    { name: t('category.wozki'), href: "/kategoria/wozki" },
    { name: t('category.zestawy'), href: "/kategoria/zestawy" },
    { name: t('category.pily'), href: "/kategoria/pily" },
    { name: t('category.oswietlenie'), href: "/kategoria/oswietlenie" },
    { name: t('category.akcesoria'), href: "/kategoria/akcesoria" },
    { name: t('category.zestawy-specjalistyczne'), href: "/kategoria/zestawy-specjalistyczne" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-3 hover-elevate active-elevate-2 px-3 py-2 rounded-md cursor-pointer">
              <img 
                src={toolsShopLogo} 
                alt="Tools Shop" 
                className="h-14 w-auto"
              />
              <div className="flex flex-col">
                <span className="font-bold text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Sretensky
                </span>
                <Badge variant="secondary" className="text-xs">
                  POWYSTAWOWE
                </Badge>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            <Link href="/" data-testid="link-nav-home">
              <Button
                variant={location === "/" ? "secondary" : "ghost"}
                className="text-sm font-medium"
              >
                {t('nav.home')}
              </Button>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium gap-1" data-testid="button-categories">
                  {t('nav.categories')}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {categories.map((category) => (
                  <Link key={category.name} href={category.href}>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      data-testid={`link-category-${category.name.toLowerCase().replace(/ /g, '-')}`}
                    >
                      {category.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right Side - Language, Cart & Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <LanguageSwitcher />
            
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
            <Link href="/" data-testid="link-mobile-home">
              <Button
                variant={location === "/" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.home')}
              </Button>
            </Link>
            
            <div className="px-2 py-1 text-sm font-semibold text-muted-foreground">
              {t('nav.categories')}
            </div>
            
            {categories.map((category) => (
              <Link key={category.name} href={category.href} data-testid={`link-mobile-category-${category.name.toLowerCase().replace(/ /g, '-')}`}>
                <Button
                  variant={location === category.href ? "secondary" : "ghost"}
                  className="w-full justify-start pl-6"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Button>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
