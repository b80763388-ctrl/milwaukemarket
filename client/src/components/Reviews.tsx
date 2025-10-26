import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const reviews = [
  {
    id: 1,
    name: "Paweł Kowalski",
    role: "Budowlanka",
    rating: 5,
    comment: {
      pl: "Kupiłem wiertarkę Milwaukee M18 FUEL i jestem zachwycony! Produkt powystawowy w doskonałym stanie, oszczędziłem prawie 500 zł. Szybka dostawa, obsługa na najwyższym poziomie. Polecam każdemu!",
      en: "I bought the Milwaukee M18 FUEL drill and I'm thrilled! Exhibition product in excellent condition, I saved almost 500 PLN. Fast delivery, top-notch service. Highly recommend!"
    },
    image: "/attached_assets/generated_images/Polish_construction_worker_portrait_27f7ae00.png"
  },
  {
    id: 2,
    name: "Tomasz Wiśniewski",
    role: "Stolarz",
    rating: 5,
    comment: {
      pl: "Świetny sklep! Zamówiłem pilarkę tarczową i młot Milwaukee. Narzędzia jak nowe, opakowania oryginalne. Ceny powystawowe to prawdziwa okazja. Gwarancja 12 miesięcy daje pewność.",
      en: "Great shop! I ordered a circular saw and Milwaukee hammer. Tools like new, original packaging. Exhibition prices are a real deal. 12-month warranty gives confidence."
    },
    image: "/attached_assets/generated_images/Young_Polish_carpenter_portrait_4f419205.png"
  },
  {
    id: 3,
    name: "Jan Nowak",
    role: "Elektryk",
    rating: 5,
    comment: {
      pl: "Profesjonalna obsługa i autentyczne produkty Milwaukee. Kupiłem zestaw combo M12 FUEL i nie mogę narzekać. Wszystko dokładnie tak jak w opisie. Szybka dostawa i bezpieczne opakowanie. Na pewno wrócę po więcej narzędzi!",
      en: "Professional service and authentic Milwaukee products. I bought the M12 FUEL combo set and can't complain. Everything exactly as described. Fast delivery and secure packaging. Will definitely come back for more tools!"
    },
    image: "/attached_assets/generated_images/Mature_Polish_electrician_portrait_bca679c9.png"
  },
  {
    id: 4,
    name: "Anna Zawadzka",
    role: "Renowacje",
    rating: 5,
    comment: {
      pl: "Najlepszy sklep z narzędziami Milwaukee w Polsce! Szlifierka kątowa którą kupiłam działa perfekcyjnie. Cena powystawowa o 30% niższa niż w zwykłych sklepach. Obsługa bardzo pomocna, odpowiadali na wszystkie pytania.",
      en: "Best Milwaukee tool shop in Poland! The angle grinder I bought works perfectly. Exhibition price 30% lower than regular stores. Very helpful service, answered all questions."
    },
    image: "/attached_assets/generated_images/Polish_renovation_specialist_woman_8ba0a82f.png"
  },
  {
    id: 5,
    name: "Michał Krawczyk",
    role: "Mechanik",
    rating: 5,
    comment: {
      pl: "Zamówiłem wózek narzędziowy Milwaukee 52\" - rewelacja! Stan idealny, wszystkie szuflady działają płynnie. Cena 4699 zł zamiast 6999 zł to super oszczędność. Polecam ten sklep każdemu profesjonaliście!",
      en: "I ordered the Milwaukee 52\" tool cabinet - amazing! Perfect condition, all drawers work smoothly. Price 4699 PLN instead of 6999 PLN is great savings. I recommend this shop to every professional!"
    },
    image: "/attached_assets/generated_images/Young_Polish_mechanic_portrait_972206d4.png"
  }
];

export function Reviews() {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const visibleReviews = [
    reviews[currentIndex],
    reviews[(currentIndex + 1) % reviews.length],
    reviews[(currentIndex + 2) % reviews.length],
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'pl' ? 'Opinie Naszych Klientów' : 'Customer Reviews'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {language === 'pl' 
              ? 'Zobacz co mówią profesjonaliści o naszych produktach' 
              : 'See what professionals say about our products'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleReviews.map((review, idx) => (
            <Card 
              key={`${review.id}-${idx}`} 
              className="hover-elevate transition-all duration-300"
              style={{
                opacity: idx === 0 ? 1 : 0.7,
                transform: idx === 0 ? 'scale(1.02)' : 'scale(1)',
              }}
              data-testid={`review-card-${review.id}`}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-16 h-16 rounded-full object-cover"
                    data-testid={`review-avatar-${review.id}`}
                  />
                  <div>
                    <h3 className="font-semibold text-lg" data-testid={`review-name-${review.id}`}>{review.name}</h3>
                    <p className="text-sm text-muted-foreground" data-testid={`review-role-${review.id}`}>{review.role}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-3" data-testid={`review-rating-${review.id}`}>
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed" data-testid={`review-comment-${review.id}`}>
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
