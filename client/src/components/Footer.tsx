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
    <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 text-white mt-20 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
        {/* Newsletter Section */}
        <div className="mb-16">
          <div className="relative max-w-2xl mx-auto">
            {/* Newsletter Card with Gradient Border */}
            <div className="relative bg-gradient-to-r from-primary/20 via-rose-500/20 to-orange-500/20 p-[2px] rounded-2xl">
              <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-2">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold font-heading bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  Bądź na bieżąco z ofertami
                </h3>
                <p className="text-gray-300 text-sm md:text-base">
                  Zapisz się do newslettera i otrzymuj informacje o najnowszych produktach powystawowych
                </p>
                <div className="flex gap-2 max-w-md mx-auto pt-2">
                  <Input
                    type="email"
                    placeholder="Twój adres e-mail"
                    className="flex-1 bg-slate-900/50 border-slate-700 text-white placeholder:text-gray-400 focus-visible:ring-primary"
                    data-testid="input-newsletter-email"
                  />
                  <Button className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" data-testid="button-newsletter-submit">
                    <Mail className="mr-2 h-4 w-4" />
                    Zapisz się
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="mb-12 bg-slate-700/50" />

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1 - About */}
          <div className="space-y-4">
            <h4 className="font-bold text-xl font-heading bg-gradient-to-r from-primary via-rose-500 to-orange-500 bg-clip-text text-transparent">
              TOOLS SHOP
            </h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Profesjonalne narzędzia w atrakcyjnych cenach. Produkty powystawowe z pełną gwarancją producenta.
            </p>
          </div>

          {/* Column 2 - Products */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white mb-4">Produkty</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <a href="/kategoria/wiertarki" className="hover:text-primary hover:translate-x-1 transition-all inline-block" data-testid="link-footer-wiertarki">
                  Wiertarki
                </a>
              </li>
              <li>
                <a href="/kategoria/szlifierki" className="hover:text-primary hover:translate-x-1 transition-all inline-block" data-testid="link-footer-szlifierki">
                  Szlifierki
                </a>
              </li>
              <li>
                <a href="/kategoria/klucze" className="hover:text-primary hover:translate-x-1 transition-all inline-block" data-testid="link-footer-klucze">
                  Klucze Udarowe
                </a>
              </li>
              <li>
                <a href="/kategoria/mloty" className="hover:text-primary hover:translate-x-1 transition-all inline-block" data-testid="link-footer-mloty">
                  Młoty
                </a>
              </li>
              <li>
                <a href="/kategoria/wozki" className="hover:text-primary hover:translate-x-1 transition-all inline-block" data-testid="link-footer-wozki">
                  Wózki Narzędziowe
                </a>
              </li>
              <li>
                <a href="/kategoria/zestawy" className="hover:text-primary hover:translate-x-1 transition-all inline-block" data-testid="link-footer-zestawy">
                  Zestawy Narzędzi
                </a>
              </li>
              <li>
                <a href="/kategoria/pily" className="hover:text-primary hover:translate-x-1 transition-all inline-block" data-testid="link-footer-pily">
                  Piły
                </a>
              </li>
              <li>
                <a href="/kategoria/lasery" className="hover:text-primary hover:translate-x-1 transition-all inline-block" data-testid="link-footer-lasery">
                  Lasery
                </a>
              </li>
              <li>
                <a href="/kategoria/akcesoria" className="hover:text-primary hover:translate-x-1 transition-all inline-block" data-testid="link-footer-akcesoria">
                  Akcesoria
                </a>
              </li>
              <li>
                <a href="/kategoria/zestawy-specjalistyczne-milwaukee" className="hover:text-primary hover:translate-x-1 transition-all inline-block" data-testid="link-footer-zestawy-specjalistyczne-milwaukee">
                  Zestawy Specjalistyczne Milwaukee
                </a>
              </li>
              <li>
                <a href="/kategoria/zestawy-makita" className="hover:text-primary hover:translate-x-1 transition-all inline-block" data-testid="link-footer-zestawy-makita">
                  Zestawy Makita
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white mb-4">Informacje</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <button
                  onClick={() => setExhibitionModalOpen(true)}
                  className="hover:text-primary hover:translate-x-1 transition-all inline-block text-left"
                  data-testid="link-footer-about-exhibition"
                >
                  O produktach powystawowych
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShippingModalOpen(true)}
                  className="hover:text-primary hover:translate-x-1 transition-all inline-block text-left"
                  data-testid="link-footer-delivery"
                >
                  Dostawa i płatności
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShippingModalOpen(true)}
                  className="hover:text-primary hover:translate-x-1 transition-all inline-block text-left"
                  data-testid="link-footer-returns"
                >
                  Zwroty i reklamacje
                </button>
              </li>
              <li>
                <a href="/regulamin" className="hover:text-primary hover:translate-x-1 transition-all inline-block" data-testid="link-footer-terms">
                  Regulamin
                </a>
              </li>
              <li>
                <a href="/polityka-prywatnosci" className="hover:text-primary hover:translate-x-1 transition-all inline-block" data-testid="link-footer-privacy">
                  Polityka prywatności
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white mb-4">Kontakt</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-white">+48 123 456 789</div>
                  <div className="text-xs text-gray-500">Pn-Pt: 8:00 - 18:00</div>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="font-medium text-white">sklep@tools-shop.pl</div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-white">Tools Shop</div>
                  <div className="text-gray-500">ul. Przykładowa 123</div>
                  <div className="text-gray-500">00-001 Warszawa</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="mb-8 bg-slate-700/50" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-400">
          <div className="text-center md:text-left">
            © {new Date().getFullYear()} Tools Shop. Wszystkie prawa zastrzeżone.
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="text-gray-500">Bezpieczne płatności:</span>
            <div className="flex items-center gap-2">
              <div className="h-10 px-3 bg-white/5 backdrop-blur-sm border border-slate-700/50 rounded-lg flex items-center justify-center hover:bg-white/10 hover:border-slate-600 transition-all" data-testid="payment-visa">
                <img src={visaLogo} alt="Visa" className="h-5 w-auto object-contain" />
              </div>
              <div className="h-10 px-3 bg-white/5 backdrop-blur-sm border border-slate-700/50 rounded-lg flex items-center justify-center hover:bg-white/10 hover:border-slate-600 transition-all" data-testid="payment-mastercard">
                <img src={mastercardLogo} alt="Mastercard" className="h-5 w-auto object-contain" />
              </div>
              <div className="h-10 px-3 bg-white/5 backdrop-blur-sm border border-slate-700/50 rounded-lg flex items-center justify-center hover:bg-white/10 hover:border-slate-600 transition-all" data-testid="payment-blik">
                <img src={blikLogo} alt="BLIK" className="h-5 w-auto object-contain" />
              </div>
              <div className="h-10 px-3 bg-white/5 backdrop-blur-sm border border-slate-700/50 rounded-lg flex items-center justify-center hover:bg-white/10 hover:border-slate-600 transition-all" data-testid="payment-googlepay">
                <img src={googlePayLogo} alt="Google Pay" className="h-7 w-auto object-contain" />
              </div>
              <div className="h-10 px-3 bg-white/5 backdrop-blur-sm border border-slate-700/50 rounded-lg flex items-center justify-center hover:bg-white/10 hover:border-slate-600 transition-all" data-testid="payment-applepay">
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
