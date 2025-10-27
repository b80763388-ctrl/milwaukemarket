import { useLanguage } from "@/contexts/LanguageContext";

export function TermsPage() {
  const { language } = useLanguage();

  const content = {
    pl: {
      title: "Regulamin Sklepu",
      lastUpdate: "Ostatnia aktualizacja: 25 października 2025",
      sections: [
        {
          title: "§1 Postanowienia Ogólne",
          items: [
            "Sklep internetowy Tools Shop, dostępny pod adresem www.tools-shop.pl, prowadzony jest przez Tools Shop Sp. z o.o. z siedzibą w Warszawie.",
            "Niniejszy regulamin określa zasady i warunki korzystania ze sklepu internetowego, w tym składania zamówień oraz dokonywania zakupów produktów powystawowych marki Milwaukee.",
            "Regulamin jest dostępny nieodpłatnie na stronie internetowej sklepu w formie umożliwiającej jego pobranie, utrwalenie i wydrukowanie.",
            "Korzystanie ze sklepu jest równoznaczne z akceptacją postanowień niniejszego regulaminu."
          ]
        },
        {
          title: "§2 Produkty Powystawowe",
          items: [
            "Wszystkie produkty oferowane w sklepie są produktami powystawowymi - tj. urządzeniami, które były eksponowane na targach, wystawach lub w showroomach.",
            "Produkty powystawowe mogą nosić minimalne ślady użytkowania demonstracyjnego.",
            "Każdy produkt powystawowy jest sprawdzany przed wysyłką przez dział kontroli jakości.",
            "Wszystkie produkty objęte są 12-miesięczną gwarancją na wady materiałowe i produkcyjne.",
            "Stan każdego produktu jest szczegółowo opisany w jego karcie produktu."
          ]
        },
        {
          title: "§3 Składanie Zamówień",
          items: [
            "Zamówienia można składać 24 godziny na dobę, 7 dni w tygodniu poprzez formularz dostępny na stronie internetowej.",
            "Do złożenia zamówienia niezbędne jest podanie danych kontaktowych oraz adresu dostawy.",
            "Po złożeniu zamówienia klient otrzymuje potwierdzenie na podany adres e-mail.",
            "Sklep zastrzega sobie prawo do anulowania zamówienia w przypadku niedostępności produktu lub błędnej ceny.",
            "Klient zostanie niezwłocznie poinformowany o anulowaniu zamówienia."
          ]
        },
        {
          title: "§4 Ceny i Płatności",
          items: [
            "Wszystkie ceny w sklepie podane są w złotych polskich (PLN) i zawierają podatek VAT.",
            "Dla klientów z innych krajów ceny są automatycznie przeliczane na odpowiednią walutę według aktualnego kursu.",
            "Sklep akceptuje następujące formy płatności: karty płatnicze (Visa, Mastercard), BLIK.",
            "Płatności są przetwarzane przez zaufane systemy płatnicze z zachowaniem najwyższych standardów bezpieczeństwa.",
            "Produkt jest wysyłany po zaksięgowaniu płatności na koncie sklepu."
          ]
        },
        {
          title: "§5 Dostawa",
          items: [
            "Wszystkie produkty są sprowadzane ze Stanów Zjednoczonych (US) i wysyłane kurierem na terenie całej Europy.",
            "Wszystkie ładowarki oraz urządzenia zasilane kablem są wyposażone w wtyczkę standardu EU (europejskiego).",
            "Koszt dostawy wynosi 29 zł. Darmowa dostawa przysługuje przy zamówieniach powyżej 500 zł.",
            "Klient otrzymuje powiadomienie SMS z informacją o planowanej dostawie.",
            "Dostawa odbywa się pod wskazany adres, bezpośrednio do rąk odbiorcy.",
            "Standardowy czas realizacji zamówienia wynosi od 7 do 14 dni roboczych.",
            "Maksymalny czas dostawy wynosi do 28 dni od daty wysłania zamówienia."
          ]
        },
        {
          title: "§6 Prawo Odstąpienia od Umowy",
          items: [
            "Klient będący konsumentem ma prawo odstąpić od umowy bez podania przyczyny w terminie 14 dni od dnia otrzymania produktu.",
            "Aby skorzystać z prawa odstąpienia, należy poinformować sklep o swojej decyzji (e-mail, pismo).",
            "Zwracany produkt musi być kompletny i nieuszkodzony.",
            "Koszty zwrotu produktu ponosi klient.",
            "Zwrot płatności następuje niezwłocznie, nie później niż w ciągu 14 dni od otrzymania zwracanego produktu."
          ]
        },
        {
          title: "§7 Reklamacje i Gwarancja",
          items: [
            "Wszystkie produkty objęte są 12-miesięczną gwarancją producenta/sprzedawcy.",
            "Reklamacje można zgłaszać drogą elektroniczną na adres: reklamacje@tools-shop.pl lub pocztą tradycyjną.",
            "Reklamacja powinna zawierać: opis wady, numer zamówienia, dane kontaktowe.",
            "Sklep rozpatruje reklamacje w terminie 14 dni od ich otrzymania.",
            "W przypadku pozytywnego rozpatrzenia reklamacji, produkt zostanie naprawiony, wymieniony lub zwrócone zostaną pieniądze.",
            "Szczegółowe warunki gwarancji są określone w karcie gwarancyjnej dołączonej do produktu."
          ]
        },
        {
          title: "§8 Ochrona Danych Osobowych",
          items: [
            "Administratorem danych osobowych jest Tools Shop Sp. z o.o.",
            "Dane osobowe przetwarzane są zgodnie z przepisami RODO.",
            "Dane są wykorzystywane wyłącznie w celu realizacji zamówień.",
            "Szczegółowe informacje zawarte są w Polityce Prywatności dostępnej na stronie sklepu."
          ]
        },
        {
          title: "§9 Postanowienia Końcowe",
          items: [
            "Sklep zastrzega sobie prawo do zmiany regulaminu.",
            "O zmianach klienci zostaną poinformowani poprzez publikację nowego regulaminu na stronie.",
            "W sprawach nieuregulowanych w niniejszym regulaminie zastosowanie mają przepisy prawa polskiego.",
            "Ewentualne spory będą rozstrzygane przez sądy właściwe według siedziby sklepu."
          ]
        }
      ]
    },
    en: {
      title: "Terms and Conditions",
      lastUpdate: "Last update: October 25, 2025",
      sections: [
        {
          title: "§1 General Provisions",
          items: [
            "The Tools Shop online store, available at www.tools-shop.pl, is operated by Tools Shop Sp. z o.o. based in Warsaw, Poland.",
            "These terms and conditions define the rules and conditions for using the online store, including placing orders and purchasing Milwaukee exhibition products.",
            "The terms are available free of charge on the store's website in a format that allows downloading, saving, and printing.",
            "Using the store is tantamount to accepting the provisions of these terms and conditions."
          ]
        },
        {
          title: "§2 Exhibition Products",
          items: [
            "All products offered in the store are exhibition products - i.e., devices that were displayed at trade shows, exhibitions, or showrooms.",
            "Exhibition products may show minimal signs of demonstration use.",
            "Each exhibition product is inspected before shipping by the quality control department.",
            "All products are covered by a 12-month warranty for material and manufacturing defects.",
            "The condition of each product is described in detail in its product card."
          ]
        },
        {
          title: "§3 Placing Orders",
          items: [
            "Orders can be placed 24 hours a day, 7 days a week through the form available on the website.",
            "To place an order, it is necessary to provide contact details and delivery address.",
            "After placing an order, the customer receives a confirmation to the provided email address.",
            "The store reserves the right to cancel an order in case of product unavailability or incorrect price.",
            "The customer will be immediately informed about order cancellation."
          ]
        },
        {
          title: "§4 Prices and Payments",
          items: [
            "All prices in the store are given in Polish zloty (PLN) and include VAT.",
            "For customers from other countries, prices are automatically converted to the appropriate currency at the current exchange rate.",
            "The store accepts the following payment methods: credit cards (Visa, Mastercard), BLIK.",
            "Payments are processed by trusted payment systems while maintaining the highest security standards.",
            "The product is shipped after the payment is credited to the store's account."
          ]
        },
        {
          title: "§5 Delivery",
          items: [
            "All products are sourced from the United States (US) and shipped by courier throughout Europe.",
            "All chargers and cable-powered devices are equipped with EU (European) standard plugs.",
            "Delivery cost is 29 PLN. Free delivery is available for orders over 500 PLN.",
            "The customer receives an SMS notification with information about the planned delivery.",
            "Delivery is made to the specified address, directly to the recipient.",
            "Standard order fulfillment time is 7 to 14 business days.",
            "Maximum delivery time is up to 28 days from the date of shipment."
          ]
        },
        {
          title: "§6 Right of Withdrawal",
          items: [
            "A customer who is a consumer has the right to withdraw from the contract without giving a reason within 14 days from the date of receiving the product.",
            "To exercise the right of withdrawal, you must inform the store of your decision (email, letter).",
            "The returned product must be complete and undamaged.",
            "The cost of returning the product is borne by the customer.",
            "Refund is made immediately, no later than within 14 days from receiving the returned product."
          ]
        },
        {
          title: "§7 Complaints and Warranty",
          items: [
            "All products are covered by a 12-month manufacturer/seller warranty.",
            "Complaints can be submitted electronically to: reklamacje@tools-shop.pl or by traditional mail.",
            "A complaint should include: description of the defect, order number, contact details.",
            "The store processes complaints within 14 days from their receipt.",
            "In case of a positive complaint resolution, the product will be repaired, replaced, or money will be refunded.",
            "Detailed warranty conditions are specified in the warranty card attached to the product."
          ]
        },
        {
          title: "§8 Personal Data Protection",
          items: [
            "The personal data controller is Tools Shop Sp. z o.o.",
            "Personal data is processed in accordance with GDPR regulations.",
            "Data is used only for the purpose of order fulfillment.",
            "Detailed information is contained in the Privacy Policy available on the store's website."
          ]
        },
        {
          title: "§9 Final Provisions",
          items: [
            "The store reserves the right to change the terms and conditions.",
            "Customers will be informed about changes through the publication of new terms on the website.",
            "In matters not regulated in these terms, Polish law provisions shall apply.",
            "Any disputes will be resolved by courts competent according to the store's registered office."
          ]
        }
      ]
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold font-heading mb-2">{t.title}</h1>
            <p className="text-sm text-muted-foreground">{t.lastUpdate}</p>
          </div>

          <div className="space-y-8">
            {t.sections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h2 className="text-2xl font-semibold font-heading">{section.title}</h2>
                <ol className="space-y-3 list-decimal list-inside">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-muted-foreground leading-relaxed pl-2">
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">
              {language === 'pl' ? 'Kontakt' : 'Contact'}
            </h3>
            <p className="text-sm text-muted-foreground">
              Tools Shop Sp. z o.o.<br />
              ul. Przykładowa 123<br />
              00-001 Warszawa, Polska<br />
              Email: kontakt@tools-shop.pl<br />
              Tel: +48 22 123 45 67
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
