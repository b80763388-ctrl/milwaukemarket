export type Language = 'pl' | 'en';
export type Currency = 'PLN' | 'EUR' | 'USD' | 'GBP';

// Currency symbols and formatting
export const currencySymbols: Record<Currency, string> = {
  PLN: 'zł',
  EUR: '€',
  USD: '$',
  GBP: '£',
};

// EU countries that use EUR
const EU_COUNTRIES = [
  'AT', 'BE', 'CY', 'EE', 'FI', 'FR', 'DE', 'GR', 'IE', 'IT',
  'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'SK', 'SI', 'ES',
  'HR', 'BG', 'CZ', 'DK', 'HU', 'RO', 'SE'
];

export function getCurrencyForCountry(countryCode: string): Currency {
  if (countryCode === 'PL') return 'PLN';
  if (countryCode === 'GB') return 'GBP';
  if (countryCode === 'US' || countryCode === 'CA') return 'USD';
  if (EU_COUNTRIES.includes(countryCode)) return 'EUR';
  return 'USD'; // Default to USD for other countries
}

// Exchange rate cache
let exchangeRates: Record<string, number> | null = null;
let lastFetch: number = 0;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

async function getExchangeRates(): Promise<Record<string, number>> {
  const now = Date.now();
  
  // Return cached rates if still valid
  if (exchangeRates && (now - lastFetch) < CACHE_DURATION) {
    return exchangeRates;
  }
  
  try {
    // Fetch from Frankfurter API (free, no key required)
    const response = await fetch('https://api.frankfurter.dev/v1/latest?base=PLN&symbols=EUR,USD,GBP');
    const data = await response.json();
    
    exchangeRates = {
      PLN: 1,
      EUR: data.rates.EUR || 0.23,
      USD: data.rates.USD || 0.25,
      GBP: data.rates.GBP || 0.20,
    };
    lastFetch = now;
    
    return exchangeRates;
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    
    // Fallback to approximate rates if API fails
    return {
      PLN: 1,
      EUR: 0.23,
      USD: 0.25,
      GBP: 0.20,
    };
  }
}

export async function convertPrice(priceInPLN: number, toCurrency: Currency): Promise<number> {
  if (toCurrency === 'PLN') {
    return priceInPLN;
  }
  
  const rates = await getExchangeRates();
  return priceInPLN * rates[toCurrency];
}

// Free shipping threshold in PLN
export const FREE_SHIPPING_THRESHOLD_PLN = 500;

// Get formatted free shipping threshold for current currency
export async function getFreeShippingThreshold(currency: Currency): Promise<string> {
  if (currency === 'PLN') {
    return '500 zł';
  }
  
  const converted = await convertPrice(FREE_SHIPPING_THRESHOLD_PLN, currency);
  const symbol = currencySymbols[currency];
  
  if (currency === 'EUR') {
    return `${symbol}${Math.round(converted)}`;
  }
  
  return `${symbol}${Math.round(converted)}`;
}

export function formatCurrency(amount: number, currency: Currency): string {
  const symbol = currencySymbols[currency];
  const rounded = Math.round(amount * 100) / 100;
  
  // Format based on currency
  if (currency === 'PLN') {
    return `${rounded.toFixed(2)} ${symbol}`;
  } else if (currency === 'USD' || currency === 'GBP') {
    return `${symbol}${rounded.toFixed(2)}`;
  } else {
    return `${symbol}${rounded.toFixed(2)}`;
  }
}

export const translations = {
  pl: {
    // Header & Navigation
    'nav.home': 'Strona Główna',
    'nav.categories': 'Kategorie',
    'nav.allProducts': 'Wszystkie Produkty',
    'nav.cart': 'Koszyk',
    
    // Hero Section
    'hero.badge': 'PRODUKTY POWYSTAWOWE',
    'hero.title': 'Profesjonalne Narzędzia',
    'hero.titleBrand': 'Milwaukee',
    'hero.titleFrom': 'od Tools Shop',
    'hero.subtitle1': 'Oszczędź do 40% na profesjonalnych narzędziach',
    'hero.subtitle2': 'Produkty powystawowe z pełną gwarancją',
    'hero.cta.shop': 'Zobacz Ofertę',
    'hero.cta.learn': 'Dowiedz się więcej',
    
    // Trust Badges
    'trust.warranty': 'Gwarancja 12 miesięcy',
    'trust.shipping': 'Darmowa dostawa od 500 zł',
    'trust.verified': 'Sprawdzone produkty',
    
    // Products
    'products.featured': 'OFERTY SPECJALNE',
    'products.featured.title': 'Wyróżnione Produkty Powystawowe',
    'products.featured.subtitle': 'Najlepsze oferty na profesjonalne narzędzia w wyjątkowych cenach',
    'products.viewAll': 'Zobacz wszystkie produkty',
    'products.exhibitionBadge': 'PRODUKT POWYSTAWOWY',
    'products.addToCart': 'Dodaj do koszyka',
    'products.viewDetails': 'Zobacz szczegóły',
    'products.save': 'Oszczędzasz',
    'products.originalPrice': 'Cena katalogowa:',
    'products.exhibitionPrice': 'Cena powystawowa:',
    'products.available': 'Dostępny',
    'products.outOfStock': 'Brak w magazynie',
    
    // Categories
    'category.wiertarki': 'Wiertarki',
    'category.szlifierki': 'Szlifierki',
    'category.klucze': 'Klucze Udarowe',
    'category.mloty': 'Młoty',
    'category.wozki': 'Wózki Narzędziowe',
    'category.zestawy': 'Zestawy',
    'category.pily': 'Piły',
    'category.lasery': 'Lasery',
    'category.akcesoria': 'Akcesoria',
    'category.zestawy-specjalistyczne-milwaukee': 'Zestawy specjalistyczne Milwaukee',
    'category.zestawy-makita': 'Zestawy Makita',
    'category.back': 'Powrót',
    'category.productsCount': 'produktów',
    'category.noProducts': 'Brak produktów w tej kategorii',
    'category.backHome': 'Wróć do strony głównej',
    
    // HomePage Sections
    'home.categories.title': 'Kategorie Produktów',
    'home.categories.subtitle': 'Przeglądaj narzędzia według typu',
    'home.trust.warranty.title': 'Gwarancja Producenta',
    'home.trust.warranty.text': 'Wszystkie produkty objęte są pełną gwarancją producenta na 12 miesięcy',
    'home.trust.shipping.title': 'Darmowa Dostawa',
    'home.trust.shipping.text': 'Darmowa dostawa dla zamówień powyżej 500 zł. Szybka realizacja i bezpieczne opakowanie',
    'home.trust.verified.title': 'Produkty Sprawdzone',
    'home.trust.verified.text': 'Każdy produkt powystawowy jest dokładnie sprawdzony i gotowy do użycia',
    
    // Cart
    'cart.title': 'Koszyk',
    'cart.empty': 'Twój koszyk jest pusty',
    'cart.emptyText': 'Dodaj produkty do koszyka aby kontynuować zakupy',
    'cart.shipping': 'Dostawa',
    'cart.freeShipping': 'Darmowa dostawa',
    'cart.freeShippingFrom': 'Darmowa dostawa od',
    'cart.freeShippingProgress': 'Dodaj jeszcze',
    'cart.freeShippingProgressEnd': 'do darmowej dostawy',
    'cart.shippingCost': 'Koszt dostawy',
    'cart.subtotal': 'Suma częściowa',
    'cart.free': 'DARMOWA',
    'cart.total': 'Suma',
    'cart.checkout': 'Przejdź do kasy',
    'cart.continueShopping': 'Kontynuuj zakupy',
    'cart.remove': 'Usuń',
    'cart.addedToCart': 'Dodano do koszyka',
    'cart.removedFromCart': 'Usunięto z koszyka',
    
    // Footer
    'footer.newsletter.title': 'Bądź na bieżąco z ofertami',
    'footer.newsletter.text': 'Zapisz się do newslettera i otrzymuj informacje o najnowszych produktach powystawowych',
    'footer.newsletter.email': 'Twój adres e-mail',
    'footer.newsletter.submit': 'Zapisz się',
    'footer.newsletter.success': 'Dziękujemy za zapisanie się do newslettera!',
    'footer.newsletter.successInfo': 'Wkrótce otrzymasz informacje o najlepszych ofertach',
    'footer.about': 'Profesjonalne narzędzia w atrakcyjnych cenach. Produkty powystawowe z pełną gwarancją producenta.',
    'footer.products': 'Produkty',
    'footer.info': 'Informacje',
    'footer.exhibitionProducts': 'O produktach powystawowych',
    'footer.allProducts': 'Wszystkie produkty',
    'footer.categories': 'Kategorie',
    'footer.newArrivals': 'Nowości',
    'footer.customer': 'Obsługa Klienta',
    'footer.contact': 'Kontakt',
    'footer.contact.hours': 'Pn-Pt: 8:00 - 18:00',
    'footer.shipping': 'Dostawa i płatności',
    'footer.returns': 'Zwroty i reklamacje',
    'footer.terms': 'Regulamin',
    'footer.privacy': 'Polityka prywatności',
    'footer.copyright': 'Tools Shop. Wszystkie prawa zastrzeżone.',
    'footer.payments': 'Bezpieczne płatności:',
    
    // LiveChat
    'chat.title': 'Live Chat',
    'chat.online': 'Online',
    'chat.offline': 'Offline',
    'chat.welcome': 'Witamy w Tools Shop!',
    'chat.welcomeOnline': 'Jesteśmy dostępni i chętnie pomożemy. Napisz do nas!',
    'chat.welcomeOffline': 'Aktualnie jesteśmy niedostępni. Wrócimy wkrótce!',
    'chat.hours': 'Godziny dostępności:',
    'chat.hoursWeekday': 'Poniedziałek - Piątek:',
    'chat.hoursWeekend': 'Sobota - Niedziela:',
    'chat.hoursTime': '12:00 - 20:00',
    'chat.question': 'Masz pytania o produkty powystawowe? Skontaktuj się z nami:',
    'chat.start': 'Rozpocznij rozmowę',
    'chat.email': 'Napisz e-mail',
    'chat.unavailable': 'Chat niedostępny',
    'chat.emailFallback': 'Możesz wysłać nam wiadomość e-mail na sklep@tools-shop.pl',
    
    // Product Details
    'product.sku': 'SKU:',
    'product.warranty': 'Gwarancja',
    'product.warrantyTime': '12 miesięcy',
    'product.shipping.title': 'Darmowa dostawa',
    'product.shipping.from': 'Od 500 zł',
    'product.description': 'Opis produktu',
    'product.features': 'Specyfikacja Techniczna',
    'product.condition': 'Stan Produktu',
    'product.dimensions': 'Wymiary produktu',
    'product.dimensionsLabel': 'szerokość × głębokość × wysokość',
    'product.batteryIncluded': 'W zestawie z baterią i ładowarką',
    'product.conditionText': 'Produkt był wcześniej wystawiony w salonie sprzedaży lub prezentowany na targach. Został dokładnie sprawdzony przez naszych specjalistów i jest w pełni sprawny technicznie. Może posiadać minimalne ślady użytkowania na obudowie.',
    'product.warrantyText': 'Na wszystkie produkty powystawowe udzielamy pełnej gwarancji producenta Milwaukee. Gwarancja obejmuje wszelkie wady fabryczne i problemy techniczne. W przypadku awarii, narzędzie zostanie naprawione lub wymienione na nowe.',
    'product.notFound': 'Produkt nie znaleziony',
    'product.backHome': 'Wróć do strony głównej',
    
    // Checkout
    'checkout.title': 'Finalizacja zamówienia',
    'checkout.shippingDetails': 'Dane do wysyłki',
    'checkout.customerType': 'Typ klienta',
    'checkout.customerTypeIndividual': 'Osoba prywatna',
    'checkout.customerTypeCompany': 'Firma',
    'checkout.firstName': 'Imię',
    'checkout.lastName': 'Nazwisko',
    'checkout.email': 'Adres e-mail',
    'checkout.phone': 'Numer telefonu',
    'checkout.address': 'Adres (ulica i numer)',
    'checkout.city': 'Miasto',
    'checkout.postalCode': 'Kod pocztowy',
    'checkout.paymentMethod': 'Metoda płatności',
    'checkout.paymentOnline': 'Płatność online',
    'checkout.paymentBankTransfer': 'Przelew tradycyjny',
    'checkout.paymentBankTransferInfo': 'Dane do przelewu zostaną wysłane po złożeniu zamówienia',
    'checkout.courier': 'Wybierz kuriera',
    'checkout.courierInpost': 'InPost Kurier',
    'checkout.courierDpd': 'DPD',
    'checkout.courierDhl': 'DHL',
    'checkout.courierGls': 'GLS',
    'checkout.courierUps': 'UPS',
    'checkout.courierNotAvailable': 'InPost niedostępny dla dużych produktów (wózki, zestawy)',
    'checkout.fulfillmentTime': 'Czas realizacji',
    'checkout.fulfillmentInfo': '5-10 dni roboczych od momentu złożenia zamówienia',
    'checkout.orderSummary': 'Podsumowanie zamówienia',
    'checkout.summary.title': 'Podsumowanie zamówienia',
    'checkout.summary.quantity': 'Ilość:',
    'checkout.summary.subtotal': 'Suma częściowa',
    'checkout.summary.shipping': 'Dostawa',
    'checkout.summary.free': 'DARMOWA',
    'checkout.summary.total': 'Suma',
    'checkout.placeOrder': 'Złóż zamówienie',
    'checkout.processing': 'Przetwarzanie...',
    'checkout.success': 'Zamówienie złożone pomyślnie!',
    'checkout.thankYou': 'Dziękujemy za zamówienie',
    'checkout.orderConfirmation': 'Potwierdzenie zostało wysłane na adres e-mail',
    'checkout.backToShop': 'Powrót do sklepu',
    'checkout.validation.required': 'To pole jest wymagane',
    'checkout.validation.emailInvalid': 'Nieprawidłowy adres email',
    'checkout.validation.phoneMin': 'Numer telefonu musi mieć min. 9 cyfr',
    'checkout.validation.postalCodeFormat': 'Kod pocztowy w formacie XX-XXX',
    'checkout.validation.minLength': 'Zbyt krótka wartość',
    'checkout.validation.courierRequired': 'Wybierz kuriera',
    'checkout.paymentBankTransferNote': 'Dane do przelewu zostaną wyświetlone po złożeniu zamówienia',
    'checkout.companyName': 'Nazwa firmy',
    'checkout.companyNamePlaceholder': 'Nazwa Sp. z o.o.',
    'checkout.nip': 'NIP',
    'checkout.nipPlaceholder': '1234567890',
    'checkout.vatInvoiceNote': '📄 Faktura VAT zostanie dołączona do przesyłki z towarem',
    'checkout.acceptTerms': 'Akceptuję',
    'checkout.termsLink': 'regulamin sklepu',
    'checkout.acceptTermsRequired': 'Musisz zaakceptować regulamin, aby złożyć zamówienie',
    'checkout.transfer.title': 'Dane do przelewu',
    'checkout.transfer.description': 'Zamówienie zostało złożone. Proszę dokonać przelewu na poniższe konto bankowe.',
    'checkout.transfer.recipient': 'Nazwa odbiorcy',
    'checkout.transfer.accountNumber': 'Numer konta',
    'checkout.transfer.amount': 'Kwota',
    'checkout.transfer.title2': 'Tytuł przelewu',
    'checkout.transfer.confirmationTitle': 'Potwierdzenie zamówienia',
    'checkout.transfer.confirmationText': 'Po zaksięgowaniu przelewu otrzymasz wiadomość e-mail z potwierdzeniem i szczegółami dotyczącymi wysyłki.',
    'checkout.transfer.understand': 'Rozumiem',
    
    // Messages
    'error.title': 'Błąd',
    'error.addToCart': 'Nie udało się dodać produktu do koszyka',
    'error.updateQuantity': 'Nie udało się zaktualizować ilości',
    'error.removeItem': 'Nie udało się usunąć produktu',
    'error.createOrder': 'Nie udało się złożyć zamówienia',
    
    // Email
    'email.subject': 'Potwierdzenie zamówienia',
    'email.header.subtitle': 'Profesjonalne narzędzia Milwaukee & Makita',
    'email.orderAccepted': 'Zamówienie Przyjęte!',
    'email.thankYou': 'Dziękujemy za zakupy w Tools Shop',
    'email.orderDetails': 'Szczegóły Zamówienia',
    'email.orderNumber': 'Numer zamówienia:',
    'email.orderDate': 'Data złożenia:',
    'email.status': 'Status:',
    'email.statusPending': 'Oczekuje na płatność',
    'email.orderedProducts': 'Zamówione Produkty',
    'email.product': 'Produkt',
    'email.quantity': 'Ilość',
    'email.price': 'Cena',
    'email.totalToPay': 'RAZEM DO ZAPŁATY:',
    'email.shippingData': 'Dane Do Wysyłki',
    'email.courier': 'Kurier:',
    'email.fulfillmentTime': 'Czas realizacji: 5-10 dni roboczych od momentu złożenia zamówienia. Wszystkie produkty są sprowadzane z EU oraz US.',
    'email.whatNext': 'Co Dalej?',
    'email.step1': 'Oczekujemy na płatność',
    'email.step2': 'Po zaksięgowaniu płatności rozpoczniemy proces realizacji',
    'email.step3': 'Otrzymasz potwierdzenie wysyłki z numerem przesyłki',
    'email.step4': 'Kurier dostarczy paczkę na wyznaczony adres',
    'email.warranty': 'Gwarancja: Wszystkie produkty objęte są 12-miesięczną gwarancją Milwaukee/Makita. Produkty powystawowe w bardzo dobrym stanie technicznym.',
    'email.questions': 'Masz pytania? Skontaktuj się z nami:',
    'email.contactChat': 'lub przez chat na stronie',
    'email.copyright': 'Tools Shop - Profesjonalne narzędzia w atrakcyjnych cenach',
  },
  en: {
    // Header & Navigation
    'nav.home': 'Home',
    'nav.categories': 'Categories',
    'nav.allProducts': 'All Products',
    'nav.cart': 'Cart',
    
    // Hero Section
    'hero.badge': 'EXHIBITION PRODUCTS',
    'hero.title': 'Professional Tools',
    'hero.titleBrand': 'Milwaukee',
    'hero.titleFrom': 'from Tools Shop',
    'hero.subtitle1': 'Save up to 40% on professional tools',
    'hero.subtitle2': 'Exhibition products with full warranty',
    'hero.cta.shop': 'View Offers',
    'hero.cta.learn': 'Learn More',
    
    // Trust Badges
    'trust.warranty': '12 months warranty',
    'trust.shipping': 'Free shipping from €115',
    'trust.verified': 'Verified products',
    
    // Products
    'products.featured': 'SPECIAL OFFERS',
    'products.featured.title': 'Featured Exhibition Products',
    'products.featured.subtitle': 'Best offers on professional tools at exceptional prices',
    'products.viewAll': 'View all products',
    'products.exhibitionBadge': 'EXHIBITION PRODUCT',
    'products.addToCart': 'Add to Cart',
    'products.viewDetails': 'View Details',
    'products.save': 'You save',
    'products.originalPrice': 'Original price:',
    'products.exhibitionPrice': 'Exhibition price:',
    'products.available': 'Available',
    'products.outOfStock': 'Out of stock',
    
    // Categories
    'category.wiertarki': 'Drills',
    'category.szlifierki': 'Grinders',
    'category.klucze': 'Impact Wrenches',
    'category.mloty': 'Hammers',
    'category.wozki': 'Tool Carts',
    'category.zestawy': 'Sets',
    'category.pily': 'Saws',
    'category.lasery': 'Lasers',
    'category.akcesoria': 'Accessories',
    'category.zestawy-specjalistyczne-milwaukee': 'Milwaukee Specialized Sets',
    'category.zestawy-makita': 'Makita Sets',
    'category.back': 'Back',
    'category.productsCount': 'products',
    'category.noProducts': 'No products in this category',
    'category.backHome': 'Back to Home',
    
    // HomePage Sections
    'home.categories.title': 'Product Categories',
    'home.categories.subtitle': 'Browse tools by type',
    'home.trust.warranty.title': 'Manufacturer Warranty',
    'home.trust.warranty.text': 'All products are covered by full 12-month manufacturer warranty',
    'home.trust.shipping.title': 'Free Shipping',
    'home.trust.shipping.text': 'Free shipping for orders over €115. Fast delivery and secure packaging',
    'home.trust.verified.title': 'Verified Products',
    'home.trust.verified.text': 'Every exhibition product is thoroughly inspected and ready to use',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.emptyText': 'Add products to cart to continue shopping',
    'cart.shipping': 'Shipping',
    'cart.freeShipping': 'Free shipping',
    'cart.freeShippingFrom': 'Free shipping from',
    'cart.freeShippingProgress': 'Add',
    'cart.freeShippingProgressEnd': 'more for free shipping',
    'cart.shippingCost': 'Shipping cost',
    'cart.subtotal': 'Subtotal',
    'cart.free': 'FREE',
    'cart.total': 'Total',
    'cart.checkout': 'Proceed to Checkout',
    'cart.continueShopping': 'Continue Shopping',
    'cart.remove': 'Remove',
    'cart.addedToCart': 'Added to cart',
    'cart.removedFromCart': 'Removed from cart',
    
    // Footer
    'footer.newsletter.title': 'Stay updated with offers',
    'footer.newsletter.text': 'Subscribe to newsletter and receive information about new exhibition products',
    'footer.newsletter.email': 'Your email address',
    'footer.newsletter.submit': 'Subscribe',
    'footer.newsletter.success': 'Thank you for subscribing to our newsletter!',
    'footer.newsletter.successInfo': 'You will soon receive information about the best offers',
    'footer.about': 'Professional tools at attractive prices. Exhibition products with full manufacturer warranty.',
    'footer.products': 'Products',
    'footer.info': 'Information',
    'footer.exhibitionProducts': 'About exhibition products',
    'footer.allProducts': 'All products',
    'footer.categories': 'Categories',
    'footer.newArrivals': 'New arrivals',
    'footer.customer': 'Customer Service',
    'footer.contact': 'Contact',
    'footer.contact.hours': 'Mon-Fri: 8:00 AM - 6:00 PM',
    'footer.shipping': 'Shipping and payment',
    'footer.returns': 'Returns and complaints',
    'footer.terms': 'Terms and conditions',
    'footer.privacy': 'Privacy policy',
    'footer.copyright': 'Tools Shop. All rights reserved.',
    'footer.payments': 'Secure payments:',
    
    // LiveChat
    'chat.title': 'Live Chat',
    'chat.online': 'Online',
    'chat.offline': 'Offline',
    'chat.welcome': 'Welcome to Tools Shop!',
    'chat.welcomeOnline': 'We are available and happy to help. Write to us!',
    'chat.welcomeOffline': 'We are currently unavailable. We will be back soon!',
    'chat.hours': 'Availability hours:',
    'chat.hoursWeekday': 'Monday - Friday:',
    'chat.hoursWeekend': 'Saturday - Sunday:',
    'chat.hoursTime': '12:00 PM - 8:00 PM',
    'chat.question': 'Have questions about exhibition products? Contact us:',
    'chat.start': 'Start conversation',
    'chat.email': 'Send email',
    'chat.unavailable': 'Chat unavailable',
    'chat.emailFallback': 'You can send us an email at sklep@tools-shop.pl',
    
    // Product Details
    'product.sku': 'SKU:',
    'product.warranty': 'Warranty',
    'product.warrantyTime': '12 months',
    'product.shipping.title': 'Free shipping',
    'product.shipping.from': 'From €115',
    'product.description': 'Product Description',
    'product.features': 'Technical Specifications',
    'product.condition': 'Product Condition',
    'product.dimensions': 'Product Dimensions',
    'product.dimensionsLabel': 'width × depth × height',
    'product.batteryIncluded': 'Includes battery and charger',
    'product.conditionText': 'This product was previously displayed in a showroom or exhibited at trade shows. It has been thoroughly inspected by our specialists and is fully functional. May have minimal signs of use on the housing.',
    'product.warrantyText': 'All exhibition products come with full Milwaukee manufacturer warranty. The warranty covers all factory defects and technical issues. In case of failure, the tool will be repaired or replaced with a new one.',
    'product.notFound': 'Product not found',
    'product.backHome': 'Back to Home',
    
    // Checkout
    'checkout.title': 'Checkout',
    'checkout.shippingDetails': 'Shipping Details',
    'checkout.customerType': 'Customer Type',
    'checkout.customerTypeIndividual': 'Individual',
    'checkout.customerTypeCompany': 'Company',
    'checkout.firstName': 'First Name',
    'checkout.lastName': 'Last Name',
    'checkout.email': 'Email Address',
    'checkout.phone': 'Phone Number',
    'checkout.address': 'Address (street and number)',
    'checkout.city': 'City',
    'checkout.postalCode': 'Postal Code',
    'checkout.paymentMethod': 'Payment Method',
    'checkout.paymentOnline': 'Online Payment',
    'checkout.paymentBankTransfer': 'Bank Transfer',
    'checkout.paymentBankTransferInfo': 'Bank transfer details will be sent after placing the order',
    'checkout.courier': 'Select Courier',
    'checkout.courierInpost': 'InPost Courier',
    'checkout.courierDpd': 'DPD',
    'checkout.courierDhl': 'DHL',
    'checkout.courierGls': 'GLS',
    'checkout.courierUps': 'UPS',
    'checkout.courierNotAvailable': 'InPost not available for large products (carts, sets)',
    'checkout.fulfillmentTime': 'Fulfillment time',
    'checkout.fulfillmentInfo': '5-10 business days from the moment of order placement',
    'checkout.orderSummary': 'Order Summary',
    'checkout.summary.title': 'Order Summary',
    'checkout.summary.quantity': 'Quantity:',
    'checkout.summary.subtotal': 'Subtotal',
    'checkout.summary.shipping': 'Shipping',
    'checkout.summary.free': 'FREE',
    'checkout.summary.total': 'Total',
    'checkout.placeOrder': 'Place Order',
    'checkout.processing': 'Processing...',
    'checkout.success': 'Order placed successfully!',
    'checkout.thankYou': 'Thank you for your order',
    'checkout.orderConfirmation': 'Confirmation has been sent to your email',
    'checkout.backToShop': 'Back to Shop',
    'checkout.validation.required': 'This field is required',
    'checkout.validation.emailInvalid': 'Invalid email address',
    'checkout.validation.phoneMin': 'Phone number must be at least 9 digits',
    'checkout.validation.postalCodeFormat': 'Postal code format: XX-XXX',
    'checkout.validation.minLength': 'Value too short',
    'checkout.validation.courierRequired': 'Please select a courier',
    'checkout.paymentBankTransferNote': 'Bank transfer details will be displayed after placing the order',
    'checkout.companyName': 'Company name',
    'checkout.companyNamePlaceholder': 'Company Ltd.',
    'checkout.nip': 'VAT Number',
    'checkout.nipPlaceholder': '1234567890',
    'checkout.vatInvoiceNote': '📄 VAT invoice will be included with the shipment',
    'checkout.acceptTerms': 'I accept the',
    'checkout.termsLink': 'terms and conditions',
    'checkout.acceptTermsRequired': 'You must accept the terms and conditions to place an order',
    'checkout.transfer.title': 'Bank Transfer Details',
    'checkout.transfer.description': 'Your order has been placed. Please make a transfer to the following bank account.',
    'checkout.transfer.recipient': 'Recipient name',
    'checkout.transfer.accountNumber': 'Account number',
    'checkout.transfer.amount': 'Amount',
    'checkout.transfer.title2': 'Transfer title',
    'checkout.transfer.confirmationTitle': 'Order confirmation',
    'checkout.transfer.confirmationText': 'After the transfer is credited, you will receive an email with confirmation and shipping details.',
    'checkout.transfer.understand': 'I understand',
    
    // Messages
    'error.title': 'Error',
    'error.addToCart': 'Failed to add product to cart',
    'error.updateQuantity': 'Failed to update quantity',
    'error.removeItem': 'Failed to remove product',
    'error.createOrder': 'Failed to create order',
    
    // Email
    'email.subject': 'Order Confirmation',
    'email.header.subtitle': 'Professional Milwaukee & Makita Tools',
    'email.orderAccepted': 'Order Accepted!',
    'email.thankYou': 'Thank you for shopping at Tools Shop',
    'email.orderDetails': 'Order Details',
    'email.orderNumber': 'Order number:',
    'email.orderDate': 'Order date:',
    'email.status': 'Status:',
    'email.statusPending': 'Awaiting payment',
    'email.orderedProducts': 'Ordered Products',
    'email.product': 'Product',
    'email.quantity': 'Quantity',
    'email.price': 'Price',
    'email.totalToPay': 'TOTAL TO PAY:',
    'email.shippingData': 'Shipping Information',
    'email.courier': 'Courier:',
    'email.fulfillmentTime': 'Fulfillment time: 5-10 business days from order placement. All products are sourced from EU and US.',
    'email.whatNext': 'What\'s Next?',
    'email.step1': 'We are waiting for payment',
    'email.step2': 'After payment confirmation, we will start order processing',
    'email.step3': 'You will receive shipping confirmation with tracking number',
    'email.step4': 'Courier will deliver the package to your address',
    'email.warranty': 'Warranty: All products come with 12-month Milwaukee/Makita warranty. Exhibition products in excellent technical condition.',
    'email.questions': 'Have questions? Contact us:',
    'email.contactChat': 'or via chat on website',
    'email.copyright': 'Tools Shop - Professional tools at attractive prices',
  }
};

export function translate(key: string, lang: Language): string {
  return translations[lang][key as keyof typeof translations['pl']] || key;
}
