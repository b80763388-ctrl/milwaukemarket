import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const reviews = [
  {
    id: 1,
    name: "Paweł",
    role: "Budowlanka",
    rating: 5,
    comment: {
      pl: "Kupiłem wiertarkę Milwaukee M18 FUEL i jestem zachwycony! Produkt powystawowy w doskonałym stanie, oszczędziłem prawie 500 zł. Szybka dostawa, obsługa na najwyższym poziomie. Polecam każdemu!",
      en: "I bought the Milwaukee M18 FUEL drill and I'm thrilled! Exhibition product in excellent condition, I saved almost 500 PLN. Fast delivery, top-notch service. Highly recommend!"
    }
  },
  {
    id: 2,
    name: "Tomasz",
    role: "Stolarz",
    rating: 5,
    comment: {
      pl: "Świetny sklep! Zamówiłem pilarkę tarczową i młot Milwaukee. Narzędzia jak nowe, opakowania oryginalne. Ceny powystawowe to prawdziwa okazja. Gwarancja 12 miesięcy daje pewność.",
      en: "Great shop! I ordered a circular saw and Milwaukee hammer. Tools like new, original packaging. Exhibition prices are a real deal. 12-month warranty gives confidence."
    }
  },
  {
    id: 3,
    name: "Jan",
    role: "Elektryk",
    rating: 5,
    comment: {
      pl: "Profesjonalna obsługa i autentyczne produkty Milwaukee. Kupiłem zestaw combo M12 FUEL i nie mogę narzekać. Wszystko dokładnie tak jak w opisie. Szybka dostawa i bezpieczne opakowanie. Na pewno wrócę po więcej narzędzi!",
      en: "Professional service and authentic Milwaukee products. I bought the M12 FUEL combo set and can't complain. Everything exactly as described. Fast delivery and secure packaging. Will definitely come back for more tools!"
    }
  },
  {
    id: 4,
    name: "Anna",
    role: "Renowacje",
    rating: 5,
    comment: {
      pl: "Najlepszy sklep z narzędziami Milwaukee w Polsce! Szlifierka kątowa którą kupiłam działa perfekcyjnie. Cena powystawowa o 30% niższa niż w zwykłych sklepach. Obsługa bardzo pomocna, odpowiadali na wszystkie pytania.",
      en: "Best Milwaukee tool shop in Poland! The angle grinder I bought works perfectly. Exhibition price 30% lower than regular stores. Very helpful service, answered all questions."
    }
  },
  {
    id: 5,
    name: "Michał",
    role: "Mechanik",
    rating: 5,
    comment: {
      pl: "Zamówiłem wózek narzędziowy Milwaukee 52\" - rewelacja! Stan idealny, wszystkie szuflady działają płynnie. Produkt powystawowy znacznie tańszy niż nowy. Polecam ten sklep każdemu profesjonaliście!",
      en: "I ordered the Milwaukee 52\" tool cabinet - amazing! Perfect condition, all drawers work smoothly. Exhibition product much cheaper than new. I recommend this shop to every professional!"
    }
  },
  {
    id: 6,
    name: "Krzysztof",
    role: "Instalator",
    rating: 5,
    comment: {
      pl: "Kupiłem klucz udarowy Milwaukee M18 i baterie REDLITHIUM. Produkt powystawowy nie różni się od nowego! Moc, jakość, wszystko na najwyższym poziomie. Świetny stosunek ceny do jakości!",
      en: "I bought the Milwaukee M18 impact wrench and REDLITHIUM batteries. Exhibition product no different from new! Power, quality, everything top-notch. Great value for money!"
    }
  },
  {
    id: 7,
    name: "Marek",
    role: "Dekarz",
    rating: 5,
    comment: {
      pl: "Laser liniowy Milwaukee - precyzja w najlepszym wydaniu! Stan idealny, wszystkie funkcje działają bez zarzutu. Cena o wiele lepsza niż w tradycyjnych sklepach. Polecam!",
      en: "Milwaukee line laser - precision at its best! Perfect condition, all functions work flawlessly. Much better price than traditional stores. Highly recommend!"
    }
  },
  {
    id: 8,
    name: "Piotr",
    role: "Ślusarz",
    rating: 5,
    comment: {
      pl: "Zestaw M18 FUEL to strzał w dziesiątkę! Dwie super wiertarki w jednym zestawie, produkty powystawowe wyglądają jak nowe. Świetna inwestycja dla każdego fachowca.",
      en: "M18 FUEL combo set is a bullseye! Two great drills in one package, exhibition products look like new. Great investment for any professional."
    }
  },
  {
    id: 9,
    name: "Bartosz",
    role: "Monter",
    rating: 5,
    comment: {
      pl: "Piła łańcuchowa Milwaukee M18 to maszyna! Moc jak na akumulatorówkę niesamowita. Produkt powystawowy bez śladów użytkowania. Obsługa klienta rewelacyjna, odpowiedzi na wszystkie pytania błyskawiczne.",
      en: "Milwaukee M18 chainsaw is a beast! Amazing power for a cordless tool. Exhibition product with no signs of use. Customer service excellent, lightning-fast responses to all questions."
    }
  }
];

export function Reviews() {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, []);

  const visibleReviews = [
    reviews[currentIndex],
    reviews[(currentIndex + 1) % reviews.length],
    reviews[(currentIndex + 2) % reviews.length],
  ];

  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tl from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {language === 'pl' ? 'Opinie Naszych Klientów' : 'Customer Reviews'}
          </h2>
          <p className="text-lg text-gray-300">
            {language === 'pl' 
              ? 'Zobacz co mówią profesjonaliści o naszych produktach' 
              : 'See what professionals say about our products'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleReviews.map((review, idx) => (
            <Card 
              key={`${review.id}-${idx}`} 
              className="hover-elevate transition-all duration-300 bg-slate-900/50 border-slate-800/50 backdrop-blur-sm"
              style={{
                opacity: idx === 0 ? 1 : 0.7,
                transform: idx === 0 ? 'scale(1.02)' : 'scale(1)',
              }}
              data-testid={`review-card-${review.id}`}
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="font-semibold text-lg text-white" data-testid={`review-name-${review.id}`}>{review.name}</h3>
                  <p className="text-sm text-gray-400" data-testid={`review-role-${review.id}`}>{review.role}</p>
                </div>

                <div className="flex gap-1 mb-3" data-testid={`review-rating-${review.id}`}>
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-gray-300 leading-relaxed" data-testid={`review-comment-${review.id}`}>
                  {language === 'pl' ? review.comment.pl : review.comment.en}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex 
                  ? 'w-8 bg-primary' 
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              data-testid={`review-indicator-${idx}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
