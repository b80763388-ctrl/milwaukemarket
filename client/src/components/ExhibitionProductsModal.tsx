import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, CheckCircle, Package } from "lucide-react";

interface ExhibitionProductsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExhibitionProductsModal({ open, onOpenChange }: ExhibitionProductsModalProps) {
  const { language } = useLanguage();

  const content = {
    pl: {
      title: "O Produktach Powystawowych",
      description: "Poznaj zalety zakupu produktów powystawowych Milwaukee",
      what: {
        title: "Czym są produkty powystawowe?",
        text: "Produkty powystawowe to oryginalne narzędzia Milwaukee, które były prezentowane na targach, w showroomach lub sklepach demonstracyjnych. Są to w pełni sprawne, oryginalne urządzenia, które przeszły szczegółową kontrolę jakości przed sprzedażą."
      },
      condition: {
        title: "Stan produktów",
        text: "Wszystkie produkty powystawowe są w stanie bardzo dobrym lub idealnym. Mogą nosić jedynie minimalne ślady użytkowania demonstracyjnego. Każde urządzenie jest sprawdzane przez nasz zespół techniczny przed wysyłką."
      },
      warranty: {
        title: "Gwarancja 12 miesięcy",
        text: "Każdy produkt powystawowy objęty jest pełną 12-miesięczną gwarancją. Gwarancja obejmuje wszystkie wady materiałowe i produkcyjne. Jesteśmy pewni jakości oferowanych produktów."
      },
      benefits: {
        title: "Zalety zakupu produktów powystawowych",
        items: [
          "Oszczędność do 40% w porównaniu z ceną detaliczną",
          "Pełna 12-miesięczna gwarancja",
          "Oryginalne produkty Milwaukee",
          "Sprawdzone i przetestowane przed wysyłką",
          "Kompletne wyposażenie zgodne z opisem produktu"
        ]
      }
    },
    en: {
      title: "About Exhibition Products",
      description: "Discover the benefits of buying Milwaukee exhibition products",
      what: {
        title: "What are exhibition products?",
        text: "Exhibition products are original Milwaukee tools that have been displayed at trade shows, showrooms, or demonstration stores. These are fully functional, authentic devices that have undergone detailed quality control before sale."
      },
      condition: {
        title: "Product condition",
        text: "All exhibition products are in very good or perfect condition. They may only show minimal signs of demonstration use. Each device is checked by our technical team before shipping."
      },
      warranty: {
        title: "12-month warranty",
        text: "Every exhibition product is covered by a full 12-month warranty. The warranty covers all material and manufacturing defects. We are confident in the quality of the products we offer."
      },
      benefits: {
        title: "Benefits of buying exhibition products",
        items: [
          "Save up to 40% compared to retail price",
          "Full 12-month warranty",
          "Original Milwaukee products",
          "Tested and verified before shipping",
          "Complete equipment as described"
        ]
      }
    }
  };

  const t = content[language];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" data-testid="modal-exhibition-products">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">{t.title}</DialogTitle>
          <DialogDescription>{t.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* What are exhibition products */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">{t.what.title}</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">{t.what.text}</p>
          </div>

          {/* Product condition */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">{t.condition.title}</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">{t.condition.text}</p>
          </div>

          {/* Warranty */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">{t.warranty.title}</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">{t.warranty.text}</p>
          </div>

          {/* Benefits */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">{t.benefits.title}</h3>
            <ul className="space-y-2">
              {t.benefits.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
