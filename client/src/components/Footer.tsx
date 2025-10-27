import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin } from "lucide-react";
import { ExhibitionProductsModal } from "@/components/ExhibitionProductsModal";
import { ShippingPaymentModal } from "@/components/ShippingPaymentModal";
import blikLogo from "@assets/image_1761428175926.png";
import visaLogo from "@assets/image_1761428208056.png";
import mastercardLogo from "@assets/image_1761428253613.png";
import googlePayLogo from "@assets/image_1761521226301.png";
import applePayLogo from "@assets/image_1761521274408.png";

export function Footer() {
  const [exhibitionModalOpen, setExhibitionModalOpen] = useState(false);
  const [shippingModalOpen, setShippingModalOpen] = useState(false);
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
                <a href="/kategoria/wozki" className="hover:text-foreground transition-colors" data-testid="link-footer-wozki">
                  Wózki Narzędziowe
                </a>
              </li>
              <li>
                <a href="/kategoria/zestawy" className="hover:text-foreground transition-colors" data-testid="link-footer-zestawy">
                  Zestawy Narzędzi
                </a>
              </li>
              <li>
                <a href="/kategoria/pily" className="hover:text-foreground transition-colors" data-testid="link-footer-pily">
                  Piły
                </a>
              </li>
              <li>
                <a href="/kategoria/lasery" className="hover:text-foreground transition-colors" data-testid="link-footer-lasery">
                  Lasery
                </a>
              </li>
              <li>
                <a href="/kategoria/akcesoria" className="hover:text-foreground transition-colors" data-testid="link-footer-akcesoria">
                  Akcesoria
                </a>
              </li>
              <li>
                <a href="/kategoria/zestawy-specjalistyczne-milwaukee" className="hover:text-foreground transition-colors" data-testid="link-footer-zestawy-specjalistyczne-milwaukee">
                  Zestawy Specjalistyczne Milwaukee
                </a>
              </li>
              <li>
                <a href="/kategoria/zestawy-makita" className="hover:text-foreground transition-colors" data-testid="link-footer-zestawy-makita">
                  Zestawy Makita
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Info */}
          <div className="space-y-4">
            <h4 className="font-semibold">Informacje</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button
                  onClick={() => setExhibitionModalOpen(true)}
                  className="hover:text-foreground transition-colors text-left"
                  data-testid="link-footer-about-exhibition"
                >
                  O produktach powystawowych
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShippingModalOpen(true)}
                  className="hover:text-foreground transition-colors text-left"
                  data-testid="link-footer-delivery"
                >
                  Dostawa i płatności
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShippingModalOpen(true)}
                  className="hover:text-foreground transition-colors text-left"
                  data-testid="link-footer-returns"
                >
                  Zwroty i reklamacje
                </button>
              </li>
              <li>
                <a href="/regulamin" className="hover:text-foreground transition-colors" data-testid="link-footer-terms">
                  Regulamin
                </a>
              </li>
              <li>
                <a href="/polityka-prywatnosci" className="hover:text-foreground transition-colors" data-testid="link-footer-privacy">
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
            <div className="flex items-center gap-3">
              <div className="h-8 px-3 bg-background border rounded flex items-center justify-center" data-testid="payment-visa">
                <img src={visaLogo} alt="Visa" className="h-5 w-auto object-contain" />
              </div>
              <div className="h-8 px-3 bg-background border rounded flex items-center justify-center" data-testid="payment-mastercard">
                <img src={mastercardLogo} alt="Mastercard" className="h-5 w-auto object-contain" />
              </div>
              <div className="h-8 px-3 bg-background border rounded flex items-center justify-center" data-testid="payment-blik">
                <img src={blikLogo} alt="BLIK" className="h-5 w-auto object-contain" />
              </div>
              <div className="h-8 px-3 bg-background border rounded flex items-center justify-center" data-testid="payment-googlepay">
                <img src={googlePayLogo} alt="Google Pay" className="h-7 w-auto object-contain" />
              </div>
              <div className="h-8 px-3 bg-background border rounded flex items-center justify-center" data-testid="payment-applepay">
                <img src={applePayLogo} alt="Apple Pay" className="h-5 w-auto object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ExhibitionProductsModal open={exhibitionModalOpen} onOpenChange={setExhibitionModalOpen} />
      <ShippingPaymentModal open={shippingModalOpen} onOpenChange={setShippingModalOpen} />
    </footer>
  );
}
