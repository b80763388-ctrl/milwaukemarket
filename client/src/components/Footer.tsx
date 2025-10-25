import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        {/* Newsletter Section */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h3 className="text-2xl font-bold font-heading">
              Bądź na bieżąco z ofertami
            </h3>
            <p className="text-muted-foreground">
              Zapisz się do newslettera i otrzymuj informacje o najnowszych produktach powystawowych
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Twój adres e-mail"
                className="flex-1"
                data-testid="input-newsletter-email"
              />
              <Button data-testid="button-newsletter-submit">
                <Mail className="mr-2 h-4 w-4" />
                Zapisz się
              </Button>
            </div>
          </div>
        </div>

        <Separator className="mb-12" />

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1 - About */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg font-heading text-primary">
              TOOLS SHOP
            </h4>
            <p className="text-sm text-muted-foreground">
              Profesjonalne narzędzia w atrakcyjnych cenach. Produkty powystawowe z pełną gwarancją producenta.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" data-testid="button-social-facebook">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-social-instagram">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-social-youtube">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Column 2 - Products */}
          <div className="space-y-4">
            <h4 className="font-semibold">Produkty</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/kategoria/wiertarki" className="hover:text-foreground transition-colors" data-testid="link-footer-wiertarki">
                  Wiertarki
                </a>
              </li>
              <li>
                <a href="/kategoria/szlifierki" className="hover:text-foreground transition-colors" data-testid="link-footer-szlifierki">
                  Szlifierki
                </a>
              </li>
              <li>
                <a href="/kategoria/klucze" className="hover:text-foreground transition-colors" data-testid="link-footer-klucze">
                  Klucze Udarowe
                </a>
              </li>
              <li>
                <a href="/kategoria/mloty" className="hover:text-foreground transition-colors" data-testid="link-footer-mloty">
                  Młoty
                </a>
              </li>
              <li>
                <a href="/kategoria/zestawy" className="hover:text-foreground transition-colors" data-testid="link-footer-zestawy">
                  Zestawy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Info */}
          <div className="space-y-4">
            <h4 className="font-semibold">Informacje</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="link-footer-about-exhibition">
                  O produktach powystawowych
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="link-footer-delivery">
                  Dostawa i płatności
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="link-footer-returns">
                  Zwroty i reklamacje
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="link-footer-terms">
                  Regulamin
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="link-footer-privacy">
                  Polityka prywatności
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Kontakt</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-foreground">+48 123 456 789</div>
                  <div className="text-xs">Pn-Pt: 8:00 - 18:00</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 mt-0.5 shrink-0" />
                <div className="font-medium text-foreground">sklep@tools-shop.pl</div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-foreground">Tools Shop</div>
                  <div>ul. Przykładowa 123</div>
                  <div>00-001 Warszawa</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>
            © {new Date().getFullYear()} Tools Shop. Wszystkie prawa zastrzeżone.
          </div>
          <div className="flex items-center gap-4">
            <span>Bezpieczne płatności:</span>
            <div className="flex items-center gap-2">
              <div className="px-2 py-1 bg-background border rounded text-xs font-semibold">
                VISA
              </div>
              <div className="px-2 py-1 bg-background border rounded text-xs font-semibold">
                MASTERCARD
              </div>
              <div className="px-2 py-1 bg-background border rounded text-xs font-semibold">
                PayU
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
