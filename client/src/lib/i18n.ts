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
    'products.featured.title': 'Wyróżnione Produktu Powystawowe',
    'products.exhibitionBadge': 'PRODUKT POWYSTAWOWY',
    'products.addToCart': 'Dodaj do koszyka',
    'products.viewDetails': 'Zobacz szczegóły',
    'products.save': 'Oszczędzasz',
    'products.originalPrice': 'Cena katalogowa:',
    'products.exhibitionPrice': 'Cena powystawowa:',
    'products.available': 'Dostępny - wysyłka w 24h',
    
    // Categories
    'category.wiertarki': 'Wiertarki',
    'category.szlifierki': 'Szlifierki',
    'category.klucze': 'Klucze Udarowe',
    'category.mloty': 'Młoty',
    'category.wozki': 'Wózki Narzędziowe',
    'category.zestawy': 'Zestawy',
    'category.pily': 'Piły',
    'category.oswietlenie': 'Oświetlenie',
    'category.akcesoria': 'Akcesoria',
    'category.zestawy-specjalistyczne': 'Zestawy Specjalistyczne',
    
    // Cart
    'cart.title': 'Koszyk',
    'cart.empty': 'Twój koszyk jest pusty',
    'cart.emptyText': 'Dodaj produkty do koszyka aby kontynuować zakupy',
    'cart.shipping': 'Dostawa',
    'cart.freeShipping': 'Darmowa dostawa',
    'cart.freeShippingFrom': 'Darmowa dostawa od',
    'cart.shippingCost': 'Koszt dostawy',
    'cart.total': 'Razem',
    'cart.checkout': 'Przejdź do kasy',
    'cart.remove': 'Usuń',
    'cart.addedToCart': 'Dodano do koszyka',
    'cart.removedFromCart': 'Usunięto z koszyka',
    
    // Footer
    'footer.newsletter.title': 'Bądź na bieżąco z ofertami',
    'footer.newsletter.text': 'Zapisz się do newslettera i otrzymuj informacje o najnowszych produktach powystawowych',
    'footer.newsletter.email': 'Twój adres e-mail',
    'footer.newsletter.submit': 'Zapisz się',
    'footer.about': 'Profesjonalne narzędzia w atrakcyjnych cenach. Produkty powystawowe z pełną gwarancją producenta.',
    'footer.products': 'Produkty',
    'footer.allProducts': 'Wszystkie produkty',
    'footer.categories': 'Kategorie',
    'footer.newArrivals': 'Nowości',
    'footer.customer': 'Obsługa Klienta',
    'footer.contact': 'Kontakt',
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
    'product.description': 'Opis',
    'product.specifications': 'Specyfikacja',
    'product.features': 'Cechy',
    
    // Checkout
    'checkout.title': 'Finalizacja zamówienia',
    'checkout.shippingDetails': 'Dane do wysyłki',
    'checkout.firstName': 'Imię',
    'checkout.lastName': 'Nazwisko',
    'checkout.email': 'Adres e-mail',
    'checkout.phone': 'Numer telefonu',
    'checkout.address': 'Adres (ulica i numer)',
    'checkout.city': 'Miasto',
    'checkout.postalCode': 'Kod pocztowy',
    'checkout.courier': 'Wybierz kuriera',
    'checkout.courierInpost': 'InPost Kurier',
    'checkout.courierDpd': 'DPD',
    'checkout.courierDhl': 'DHL',
    'checkout.courierNotAvailable': 'InPost niedostępny dla dużych produktów (wózki, zestawy)',
    'checkout.orderSummary': 'Podsumowanie zamówienia',
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
    
    // Messages
    'error.title': 'Błąd',
    'error.addToCart': 'Nie udało się dodać produktu do koszyka',
    'error.updateQuantity': 'Nie udało się zaktualizować ilości',
    'error.removeItem': 'Nie udało się usunąć produktu',
    'error.createOrder': 'Nie udało się złożyć zamówienia',
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
    'trust.shipping': 'Free shipping from 500 PLN',
    'trust.verified': 'Verified products',
    
    // Products
    'products.featured': 'SPECIAL OFFERS',
    'products.featured.title': 'Featured Exhibition Products',
    'products.exhibitionBadge': 'EXHIBITION PRODUCT',
    'products.addToCart': 'Add to Cart',
    'products.viewDetails': 'View Details',
    'products.save': 'You save',
    'products.originalPrice': 'Original price:',
    'products.exhibitionPrice': 'Exhibition price:',
    'products.available': 'Available - ships in 24h',
    
    // Categories
    'category.wiertarki': 'Drills',
    'category.szlifierki': 'Grinders',
    'category.klucze': 'Impact Wrenches',
    'category.mloty': 'Hammers',
    'category.wozki': 'Tool Carts',
    'category.zestawy': 'Sets',
    'category.pily': 'Saws',
    'category.oswietlenie': 'Lighting',
    'category.akcesoria': 'Accessories',
    'category.zestawy-specjalistyczne': 'Specialized Sets',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.emptyText': 'Add products to cart to continue shopping',
    'cart.shipping': 'Shipping',
    'cart.freeShipping': 'Free shipping',
    'cart.freeShippingFrom': 'Free shipping from',
    'cart.shippingCost': 'Shipping cost',
    'cart.total': 'Total',
    'cart.checkout': 'Proceed to Checkout',
    'cart.remove': 'Remove',
    'cart.addedToCart': 'Added to cart',
    'cart.removedFromCart': 'Removed from cart',
    
    // Footer
    'footer.newsletter.title': 'Stay updated with offers',
    'footer.newsletter.text': 'Subscribe to newsletter and receive information about new exhibition products',
    'footer.newsletter.email': 'Your email address',
    'footer.newsletter.submit': 'Subscribe',
    'footer.about': 'Professional tools at attractive prices. Exhibition products with full manufacturer warranty.',
    'footer.products': 'Products',
    'footer.allProducts': 'All products',
    'footer.categories': 'Categories',
    'footer.newArrivals': 'New arrivals',
    'footer.customer': 'Customer Service',
    'footer.contact': 'Contact',
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
    'product.shipping.from': 'From 500 PLN',
    'product.description': 'Description',
    'product.specifications': 'Specifications',
    'product.features': 'Features',
    
    // Checkout
    'checkout.title': 'Checkout',
    'checkout.shippingDetails': 'Shipping Details',
    'checkout.firstName': 'First Name',
    'checkout.lastName': 'Last Name',
    'checkout.email': 'Email Address',
    'checkout.phone': 'Phone Number',
    'checkout.address': 'Address (street and number)',
    'checkout.city': 'City',
    'checkout.postalCode': 'Postal Code',
    'checkout.courier': 'Select Courier',
    'checkout.courierInpost': 'InPost Courier',
    'checkout.courierDpd': 'DPD',
    'checkout.courierDhl': 'DHL',
    'checkout.courierNotAvailable': 'InPost not available for large products (carts, sets)',
    'checkout.orderSummary': 'Order Summary',
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
    
    // Messages
    'error.title': 'Error',
    'error.addToCart': 'Failed to add product to cart',
    'error.updateQuantity': 'Failed to update quantity',
    'error.removeItem': 'Failed to remove product',
    'error.createOrder': 'Failed to create order',
  }
};

export function translate(key: string, lang: Language): string {
  return translations[lang][key as keyof typeof translations['pl']] || key;
}
