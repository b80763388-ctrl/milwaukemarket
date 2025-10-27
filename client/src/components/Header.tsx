import { ShoppingCart, Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import toolsShopLogo from "@assets/29f7271b-2d01-45a4-97e1-d56fae6fa3bb__1_-removebg-preview_1761596331644.png";
import plFlag from "@/assets/flags/pl.png";
import euFlag from "@/assets/flags/eu.png";
import usFlag from "@/assets/flags/us.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
    { name: t('category.lasery'), href: "/kategoria/lasery" },
    { name: t('category.akcesoria'), href: "/kategoria/akcesoria" },
    { name: t('category.zestawy-specjalistyczne-milwaukee'), href: "/kategoria/zestawy-specjalistyczne-milwaukee" },
    { name: t('category.zestawy-makita'), href: "/kategoria/zestawy-makita" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/50 bg-gradient-to-r from-slate-900 via-gray-900 to-zinc-900 backdrop-blur-sm">
      {/* Subtle Decorative Element */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-red-500/5 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" data-testid="link-home">
            <div className="hover-elevate active-elevate-2 px-3 py-2 rounded-md cursor-pointer flex-shrink-0">
              <img 
                src={toolsShopLogo} 
                alt="Tools Shop Sretensky" 
                className="h-16 w-auto"
              />
            </div>
          </Link>

          {/* Center Section: Flags + Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Flags (decorative) */}
            <div className="flex items-center gap-2">
              <div className="opacity-90" data-testid="flag-pl">
                <img src={plFlag} alt="Poland" className="h-5 w-auto rounded shadow-sm" />
              </div>
              <div className="opacity-90" data-testid="flag-eu">
                <img src={euFlag} alt="European Union" className="h-5 w-auto rounded shadow-sm" />
              </div>
              <div className="opacity-90" data-testid="flag-us">
                <img src={usFlag} alt="United States" className="h-5 w-auto rounded shadow-sm" />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="flex items-center gap-2">
              <Link href="/" data-testid="link-nav-home">
                <Button
                  variant="outline"
                  className="text-sm font-medium bg-white text-slate-900 border-white hover:bg-gray-100"
                >
                  {t('nav.home')}
                </Button>
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-sm font-medium gap-1 text-white hover:bg-white/10" data-testid="button-categories">
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
          </div>

          {/* Right Side - Contact, Language, Cart & Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Phone Icon */}
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="w-10 h-10 rounded-lg bg-slate-800/90 border border-slate-700/50 flex items-center justify-center hover:bg-slate-700/90 transition-colors"
                  data-testid="button-phone"
                  title="Telefon"
                >
                  <Phone className="h-5 w-5 text-primary" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href="tel:+48123456789" className="font-medium hover:text-primary transition-colors">
                      +48 123 456 789
                    </a>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Pn-Pt: 8:00 - 18:00
                  </p>
                </div>
              </PopoverContent>
            </Popover>

            {/* Email Icon */}
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="w-10 h-10 rounded-lg bg-slate-800/90 border border-slate-700/50 flex items-center justify-center hover:bg-slate-700/90 transition-colors"
                  data-testid="button-email"
                  title="Email"
                >
                  <Mail className="h-5 w-5 text-primary" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href="mailto:sklep@tools-shop.pl" className="font-medium hover:text-primary transition-colors">
                    sklep@tools-shop.pl
                  </a>
                </div>
              </PopoverContent>
            </Popover>

            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* Cart Button */}
            <button
              className="relative w-10 h-10 rounded-lg bg-slate-800/90 border border-slate-700/50 flex items-center justify-center hover:bg-slate-700/90 transition-colors"
              onClick={onCartClick}
              data-testid="button-cart"
            >
              <ShoppingCart className="h-5 w-5 text-primary" />
              {cartItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  data-testid="badge-cart-count"
                >
                  {cartItemCount}
                </Badge>
              )}
            </button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10"
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
          <nav className="lg:hidden py-4 space-y-2 border-t border-slate-800/50">
            <Link href="/" data-testid="link-mobile-home">
              <Button
                variant={location === "/" ? "default" : "ghost"}
                className={location === "/" ? "w-full justify-start bg-primary hover:bg-primary/90" : "w-full justify-start text-white hover:bg-white/10"}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.home')}
              </Button>
            </Link>
            
            <div className="px-2 py-1 text-sm font-semibold text-gray-400">
              {t('nav.categories')}
            </div>
            
            {categories.map((category) => (
              <Link key={category.name} href={category.href} data-testid={`link-mobile-category-${category.name.toLowerCase().replace(/ /g, '-')}`}>
                <Button
                  variant={location === category.href ? "default" : "ghost"}
                  className={location === category.href ? "w-full justify-start pl-6 bg-primary hover:bg-primary/90" : "w-full justify-start pl-6 text-white hover:bg-white/10"}
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
