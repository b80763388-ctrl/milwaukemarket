import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import toolsShopLogo from "@assets/image_1761439850491.png";
import plFlag from "@/assets/flags/pl.png";
import usFlag from "@/assets/flags/us.png";
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
  const { t, language, currency, setLanguage, setCurrency } = useLanguage();

  const categories = [
    { name: t('category.wiertarki'), href: "/kategoria/wiertarki" },
    { name: t('category.szlifierki'), href: "/kategoria/szlifierki" },
    { name: t('category.klucze'), href: "/kategoria/klucze" },
    { name: t('category.mloty'), href: "/kategoria/mloty" },
    { name: t('category.wozki'), href: "/kategoria/wozki" },
    { name: t('category.zestawy'), href: "/kategoria/zestawy" },
    { name: t('category.pily'), href: "/kategoria/pily" },
    { name: t('category.lasery'), href: "/kategoria/lasery" },
    { name: t('category.akcesoria'), href: "/kategoria/akcesoria" },
    { name: t('category.zestawy-specjalistyczne'), href: "/kategoria/zestawy-specjalistyczne" },
    { name: t('category.makita'), href: "/kategoria/makita" },
  ];

  const handleFlagClick = (lang: 'pl' | 'en', curr: 'PLN' | 'USD') => {
    setLanguage(lang);
    setCurrency(curr);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      {/* Flag Bar */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-end items-center gap-3 py-2">
            <button
              onClick={() => handleFlagClick('pl', 'PLN')}
              className={`transition-all hover:scale-110 ${language === 'pl' ? 'ring-2 ring-primary rounded' : 'opacity-60 hover:opacity-100'}`}
              data-testid="button-flag-pl"
              title="Polski / PLN"
            >
              <img src={plFlag} alt="Poland" className="h-6 w-auto rounded shadow-sm" />
            </button>
            <button
              onClick={() => handleFlagClick('en', 'USD')}
              className={`transition-all hover:scale-110 ${language === 'en' ? 'ring-2 ring-primary rounded' : 'opacity-60 hover:opacity-100'}`}
              data-testid="button-flag-us"
              title="English / USD"
            >
              <img src={usFlag} alt="United States" className="h-6 w-auto rounded shadow-sm" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex h-32 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" data-testid="link-home">
            <div className="hover-elevate active-elevate-2 px-3 py-2 rounded-md cursor-pointer">
              <img 
                src={toolsShopLogo} 
                alt="Tools Shop Sretensky" 
                className="h-28 w-auto"
              />
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
      </div>
    </header>
  );
}
