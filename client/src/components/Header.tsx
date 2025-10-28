import { ShoppingCart, Menu, X, ChevronDown, Phone, Mail, MapPin, Clock } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export function Header({ cartItemCount, onCartClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDialogOpen, setAboutDialogOpen] = useState(false);
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
                  variant="default"
                  className="text-sm font-medium bg-primary hover:bg-primary/90"
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
              
              <Button
                variant="ghost"
                className="text-sm font-medium text-white hover:bg-white/10"
                onClick={() => setAboutDialogOpen(true)}
                data-testid="button-about-us"
              >
                {t('nav.aboutUs')}
              </Button>
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
            
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-white/10"
              onClick={() => {
                setAboutDialogOpen(true);
                setMobileMenuOpen(false);
              }}
              data-testid="button-mobile-about-us"
            >
              {t('nav.aboutUs')}
            </Button>
          </nav>
        )}
      </div>

      {/* About Us Dialog */}
      <Dialog open={aboutDialogOpen} onOpenChange={setAboutDialogOpen}>
        <DialogContent className="sm:max-w-lg overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 border-slate-700">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-red-500/5 pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-32 translate-x-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl translate-y-32 -translate-x-32 pointer-events-none" />
          
          <DialogHeader className="relative z-10">
            <DialogTitle className="text-2xl font-heading text-white">{t('about.title')}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 relative z-10">
              {/* Since 2023 */}
              <div className="relative bg-gradient-to-r from-primary/20 via-primary/10 to-red-500/20 border border-primary/30 rounded-lg p-4 shadow-lg shadow-primary/20">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-red-500/5 rounded-lg blur-xl" />
                <p className="relative text-lg font-semibold text-primary text-center">
                  {t('about.since')}
                </p>
              </div>
            
              {/* Description */}
              <p className="text-gray-300 leading-relaxed">
                {t('about.description')}
              </p>
              
              <Separator className="bg-slate-700" />
              
              {/* Contact Section */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg text-white">{t('about.contact')}</h3>
              
                {/* Phone */}
                <div className="flex items-start gap-3 bg-slate-800/30 p-3 rounded-lg border border-slate-700/50">
                  <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white">{t('about.phone')}</p>
                    <a href="tel:+48123456789" className="text-sm text-gray-300 hover:text-primary transition-colors">
                      +48 123 456 789
                    </a>
                  </div>
                </div>
                
                {/* Email */}
                <div className="flex items-start gap-3 bg-slate-800/30 p-3 rounded-lg border border-slate-700/50">
                  <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white">{t('about.email')}</p>
                    <a href="mailto:sklep@tools-shop.pl" className="text-sm text-gray-300 hover:text-primary transition-colors">
                      sklep@tools-shop.pl
                    </a>
                  </div>
                </div>
                
                {/* Opening Hours */}
                <div className="flex items-start gap-3 bg-slate-800/30 p-3 rounded-lg border border-slate-700/50">
                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white">{t('about.hours')}</p>
                    <p className="text-sm text-gray-300">{t('about.hoursWeekday')}</p>
                    <p className="text-sm text-gray-300">{t('about.hoursWeekend')}</p>
                  </div>
                </div>
                
                {/* Address */}
                <div className="flex items-start gap-3 bg-slate-800/30 p-3 rounded-lg border border-slate-700/50">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white">{t('about.address')}</p>
                    <p className="text-sm text-gray-300">
                      Tools Shop Sp. z o.o.<br />
                      ul. Przykładowa 123<br />
                      00-001 Warszawa, Polska
                    </p>
                    <a 
                      href="https://www.google.com/maps/place/Warsaw,+Poland/@52.2319581,20.7547684,10z" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-1"
                    >
                      <MapPin className="h-3 w-3" />
                      {t('about.viewOnMap')}
                    </a>
                  </div>
                </div>
              </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
