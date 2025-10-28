import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { Truck, CreditCard, Package, Clock } from "lucide-react";
import blikLogo from "@assets/image_1761428175926.png";
import visaLogo from "@assets/image_1761428208056.png";
import mastercardLogo from "@assets/image_1761428253613.png";
import googlePayLogo from "@assets/image_1761521226301.png";
import applePayLogo from "@assets/image_1761521274408.png";

interface ShippingPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShippingPaymentModal({ open, onOpenChange }: ShippingPaymentModalProps) {
  const { language } = useLanguage();

  const content = {
    pl: {
      title: "Dostawa i Płatność",
      description: "Informacje o opcjach dostawy i dostępnych metodach płatności",
      shipping: {
        title: "Dostawa kurierem",
        subtitle: "Profesjonalna dostawa na terenie całej europy",
        time: "Czas realizacji",
        timeText: "7-14 dni roboczych od momentu złożenia zamówienia.",
        delivery: "Dostawa pod drzwi",
        deliveryText: "Kurier dostarczy przesyłkę bezpośrednio pod wskazany adres. Otrzymasz powiadomienie SMS z informacją o planowanej dostawie.",
        free: "Darmowa dostawa",
        freeText: "Oferujemy bezpłatną dostawę dla zamówień powyżej 500 zł. Dla zamówień poniżej tej kwoty koszt dostawy wynosi 29 zł."
      },
      payment: {
        title: "Metody płatności",
        subtitle: "Bezpieczne i wygodne formy płatności",
        accepted: "Akceptujemy:",
        security: "Bezpieczeństwo",
        securityText: "Wszystkie płatności są szyfrowane i przetwarzane przez zaufane systemy płatnicze. Twoje dane są w pełni chronione."
      }
    },
    en: {
      title: "Shipping and Payment",
      description: "Information about shipping options and available payment methods",
      shipping: {
        title: "Courier delivery",
        subtitle: "Professional delivery throughout Europe",
        time: "Fulfillment time",
        timeText: "7-14 business days from the moment of order placement.",
        delivery: "Delivery to your door",
        deliveryText: "The courier will deliver the package directly to the specified address. You will receive an SMS notification with information about the planned delivery.",
        free: "Free shipping",
        freeText: "We offer free shipping for orders over €115. For orders below this amount, the shipping cost is €7."
      },
      payment: {
        title: "Payment methods",
        subtitle: "Safe and convenient payment forms",
        accepted: "We accept:",
        security: "Security",
        securityText: "All payments are encrypted and processed by trusted payment systems. Your data is fully protected."
      }
    }
  };

  const t = content[language];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" data-testid="modal-shipping-payment">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">{t.title}</DialogTitle>
          <DialogDescription>{t.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-8 mt-4">
          {/* Shipping section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Truck className="h-6 w-6 text-primary" />
              <div>
                <h3 className="text-xl font-semibold">{t.shipping.title}</h3>
                <p className="text-sm text-muted-foreground">{t.shipping.subtitle}</p>
              </div>
            </div>

            <div className="space-y-4 ml-8">
              {/* Delivery time */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">{t.shipping.time}</h4>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t.shipping.timeText}
                </p>
              </div>

              {/* Delivery to door */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">{t.shipping.delivery}</h4>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t.shipping.deliveryText}
                </p>
              </div>

              {/* Free shipping */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h4 className="font-semibold mb-2">{t.shipping.free}</h4>
                <p className="text-muted-foreground text-sm">{t.shipping.freeText}</p>
              </div>
            </div>
          </div>

          {/* Payment section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-primary" />
              <div>
                <h3 className="text-xl font-semibold">{t.payment.title}</h3>
                <p className="text-sm text-muted-foreground">{t.payment.subtitle}</p>
              </div>
            </div>

            <div className="space-y-4 ml-8">
              {/* Accepted payment methods */}
              <div className="space-y-3">
                <h4 className="font-semibold">{t.payment.accepted}</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="h-10 px-4 bg-background border rounded flex items-center justify-center">
                    <img src={visaLogo} alt="Visa" className="h-6 w-auto object-contain" />
                  </div>
                  <div className="h-10 px-4 bg-background border rounded flex items-center justify-center">
                    <img src={mastercardLogo} alt="Mastercard" className="h-6 w-auto object-contain" />
                  </div>
                  <div className="h-10 px-4 bg-background border rounded flex items-center justify-center">
                    <img src={blikLogo} alt="BLIK" className="h-6 w-auto object-contain" />
                  </div>
                  <div className="h-10 px-4 bg-background border rounded flex items-center justify-center">
                    <img src={googlePayLogo} alt="Google Pay" className="h-8 w-auto object-contain" />
                  </div>
                  <div className="h-10 px-4 bg-background border rounded flex items-center justify-center">
                    <img src={applePayLogo} alt="Apple Pay" className="h-6 w-auto object-contain" />
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="bg-card border rounded-lg p-4">
                <h4 className="font-semibold mb-2">{t.payment.security}</h4>
                <p className="text-muted-foreground text-sm">{t.payment.securityText}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
