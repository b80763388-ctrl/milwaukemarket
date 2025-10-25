# Milwaukee Tools - Sklep z Narzędziami Powystawowymi

## Przegląd Projektu

Profesjonalny dwujęzyczny (polski/angielski) sklep internetowy e-commerce oferujący oryginalne narzędzia Milwaukee w atrakcyjnych cenach. Wszystkie produkty to urządzenia powystawowe z 12-miesięczną gwarancją.

**Języki:** Polski (pl), Angielski (en) - automatyczna detekcja na podstawie IP
**Technologie:** React, TypeScript, Express, TailwindCSS, Shadcn UI, i18n
**Storage:** In-memory (MemStorage)

## Data Model

### Product (Produkt)
- `id`: UUID - unikalny identyfikator
- `name`: string - nazwa produktu
- `slug`: string - SEO-friendly URL
- `category`: string - kategoria (10 kategorii: "wiertarki", "szlifierki", "klucze", "młoty", "wózki", "zestawy", "piły", "oświetlenie", "akcesoria", "zestawy-specjalistyczne")
- `description`: string - opis produktu
- `originalPrice`: decimal - cena katalogowa
- `exhibitionPrice`: decimal - cena powystawowa (obniżona)
- `image`: string - ścieżka do obrazu produktu
- `sku`: string - numer SKU
- `voltage`: string (optional) - napięcie (np. "18V")
- `batteryIncluded`: boolean - czy bateria w zestawie
- `inStock`: boolean - dostępność
- `condition`: string - stan produktu
- `warranty`: string - informacje o gwarancji
- `features`: string[] - lista cech technicznych

### CartItem (Element koszyka)
- `id`: UUID - identyfikator elementu koszyka
- `sessionId`: string - ID sesji użytkownika
- `productId`: string - ID produktu
- `quantity`: number - ilość

### CartItemWithProduct
- Rozszerzenie CartItem z pełnymi danymi produktu

## Architektura Projektu

### Frontend (Client)
**Strony:**
- `/` - HomePage: Hero z obrazem warsztatu, wyróżnione produkty, kategorie, sekcja zaufania
- `/produkty` - AllProductsPage: Wszystkie produkty w układzie siatki
- `/kategoria/:category` - CategoryPage: Produkty według kategorii
- `/produkt/:slug` - ProductDetailPage: Szczegóły produktu z akordeonem specyfikacji

**Komponenty:**
- `Header`: Sticky navigation z logo Milwaukee, dropdown menu kategorii, koszyk z licznikiem, przełącznik języka
- `LanguageSwitcher`: Dropdown z ikoną Globe do wyboru języka (Polski/English)
- `ProductCard`: Karta produktu z badge "PRODUKT POWYSTAWOWY", zniżką, cenami
- `CartSidebar`: Slide-out panel koszyka z zarządzaniem ilością, podsumowaniem, progress bar darmowej dostawy
- `Footer`: Newsletter, linki, kontakt, social media, ikony płatności (VISA, Mastercard, BLIK)
- `LiveChat`: Floating widget w prawym dolnym rogu z informacją o godzinach dostępności (12:00-20:00)

**Stan:**
- Koszyk zarządzany w localStorage
- React Query do fetchu produktów
- Toast notifications dla akcji koszyka

### Backend (Server)
**API Endpoints:**
- `GET /api/products` - Wszystkie produkty
- `GET /api/products/:id` - Pojedynczy produkt
- `POST /api/cart` - Dodaj do koszyka
- `PUT /api/cart/:id` - Aktualizuj ilość
- `DELETE /api/cart/:id` - Usuń z koszyka

**Storage:**
- MemStorage dla produktów (preloaded z danymi Milwaukee)
- localStorage dla koszyka (frontend)

## Design System

### Kolorystyka Milwaukee
- **Primary:** Czerwony Milwaukee (`hsl(0, 72%, 42%)`)
- **Foreground:** Czarny/biały zależnie od trybu
- **Card:** Subtelne tło dla kart produktów
- **Destructive:** Czerwony dla badge'ów "PRODUKT POWYSTAWOWY"

### Typography
- **Heading Font:** Space Grotesk (bold, industrial)
- **Body Font:** Inter (clean, professional)

### Komponenty UI
- Wszystkie z shadcn/ui z customizacją kolorów
- Elevation system (hover-elevate, active-elevate-2)
- Responsywne breakpoints: mobile < 768px, tablet 768-1024px, desktop > 1024px

## Kluczowe Funkcje

1. **Produkty Powystawowe:** Każdy produkt oznaczony badge "PRODUKT POWYSTAWOWY" z 12-miesięczną gwarancją
2. **System Zniżek:** Pokazywane oszczędności (cena katalogowa vs powystawowa)
3. **Koszyk:** Sidebar z zarządzaniem ilością, podsumowaniem, progress bar darmowej dostawy (500 zł)
4. **Katalog:** 100 produktów w 10 kategoriach (Wiertarki, Szlifierki, Klucze, Młoty, Wózki, Zestawy, Piły, Oświetlenie, Akcesoria, Zestawy Specjalistyczne)
5. **Nawigacja:** Dropdown menu kategorii w header (desktop i mobile)
6. **Płatności:** Ikony VISA, Mastercard (react-icons/si) i BLIK badge w footer
7. **Live Chat:** Floating widget dostępny 12:00-20:00 z pulsującym wskaźnikiem online
8. **Responsywność:** Pełne wsparcie mobile/tablet/desktop
9. **SEO:** Meta tags, polski język, opisowe tytuły
10. **Wielojęzyczność:** Automatyczna detekcja języka na podstawie IP (ipapi.co), przełącznik PL/EN, tłumaczenia dla całego UI

## Struktura Plików

```
client/
  src/
    components/
      Header.tsx - Nawigacja sticky z dropdown kategorii
      LanguageSwitcher.tsx - Przełącznik języka (Globe icon)
      ProductCard.tsx - Karta produktu z cenami
      CartSidebar.tsx - Panel boczny koszyka
      Footer.tsx - Stopka z newsletter i ikonami płatności
      LiveChat.tsx - Floating chat widget
      ui/ - Komponenty shadcn
    contexts/
      LanguageContext.tsx - Kontekst języka z wykrywaniem IP
    lib/
      i18n.ts - System tłumaczeń (PL/EN)
    pages/
      HomePage.tsx - Strona główna z hero
      ProductDetailPage.tsx - Szczegóły produktu
      CategoryPage.tsx - Lista produktów w kategorii
      AllProductsPage.tsx - Wszystkie produkty
    App.tsx - Routing i zarządzanie koszykiem
    
server/
  routes.ts - API endpoints
  storage.ts - MemStorage interface i implementacja
  
shared/
  schema.ts - Typy TypeScript i Drizzle schemas
```

## Workflow

**Start application:**
- Command: `npm run dev`
- Uruchamia Express backend + Vite frontend na tym samym porcie

## Zmiany Ostatnie

**2025-10-25:** Naprawa błędnych specyfikacji technicznych produktów
- Poprawiono błędne specyfikacje na podstawie oficjalnych danych Milwaukee:
  - **M18 FUEL Wiertarko-wkrętarka udarowa (M18FPD3):** moment obrotowy 135 Nm → **158 Nm**, SKU zaktualizowane na M18FPD3-0X
  - **M18 FUEL Klucz udarowy 1/2" (M18FHIWF12):** dodano moment zrywający **1898 Nm**, zaktualizowano tryby DRIVE CONTROL™
  - **M18 FUEL Młot udarowo-obrotowy SDS-Plus (M18FHX):** energia uderzenia 2.1J → **2.5J**, SKU zaktualizowane na M18FHX-0X
  - **M18 FUEL Wiertarko-wkrętarka 13mm (M18FDD3):** moment obrotowy 60 Nm → **158 Nm**, SKU zaktualizowane na M18FDD3-0X
- Wszystkie parametry techniczne zweryfikowane ze stroną producenta Milwaukee
- Prędkości obrotowe i inne specyfikacje zaktualizowane do najnowszych modeli

**2025-10-25:** Naprawa błędnych kategorii produktów
- Naprawiono błędne kategorie w bazie produktów:
  - **M18 FUEL Piła szablasta:** usunięto duplikat (produkt był 2 razy w bazie)
  - **M18 FUEL Wyrzynarka:** kategoria "wiertarki" → "pily"
  - **M18 FUEL Multi-Tool:** kategoria "szlifierki" → "akcesoria"
  - **M18 FUEL Frezarka:** kategoria "wiertarki" → "akcesoria"
- Zweryfikowano poprawność wszystkich 100 produktów w bazie
- Katalog produktów teraz poprawnie kategoryzowany w 10 kategoriach

**2025-10-25:** System walut, modale informacyjne, strony prawne
- Zaimplementowano system automatycznego przeliczania walut:
  - Automatyczna detekcja kraju użytkownika (PL→PLN, EU→EUR, inne→USD/GBP)
  - Integracja z Frankfurter API (darmowe, bez limitu zapytań)
  - Cache kursów walut (1 godzina) w localStorage
  - Funkcja formatPriceSync() dostępna w LanguageContext
  - Integracja w ProductCard (CartSidebar i ProductDetailPage do aktualizacji)
- Dodano modale informacyjne:
  - ExhibitionProductsModal: Informacje o produktach powystawowych, stan, gwarancja 12 miesięcy
  - ShippingPaymentModal: Dostawa kurierem (max 21 dni), płatności (karty Visa/Mastercard, BLIK)
  - Modale zintegrowane z HomePage (przyciski info) i Footer (linki)
- Dodano strony prawne:
  - TermsPage (/regulamin): Pełny regulamin sklepu zgodny z prawem polskim
  - PrivacyPage (/polityka-prywatnosci): Polityka prywatności zgodna z RODO
  - Routy dodane do App.tsx, linki w Footer
- Pobrano stock images narzędzi (wiertarki, szlifierki, klucze, piły, młoty)
  - **Uwaga:** Prawdziwe zdjęcia produktów Milwaukee wymagają licencji od producenta
  - Stock images reprezentują typy narzędzi, nie konkretne modele Milwaukee

**2025-10-25:** System wielojęzyczny i poprawki gwarancji
- Zamieniono "gwarancja producenta" na "gwarancja 12 miesięcy" we wszystkich produktach (100 produktów)
- Poprawiono kategoryzację produktów (piła tarczowa przeniesiona z "wiertarki" do "pily")
- Zaimplementowano pełny system wielojęzyczny (Polski/Angielski):
  - Automatyczne wykrywanie kraju użytkownika przez ipapi.co API
  - LanguageContext z detekcją IP i zapisem w localStorage
  - LanguageSwitcher z ikoną Globe (bez emoji, zgodnie z guidelines)
  - Tłumaczenia dla Header (desktop i mobile navigation)
  - Tłumaczenia dla HomePage (hero section, trust badges, kategorie)
  - System i18n z pełnym wsparciem dla PL i EN

**2025-10-25:** Rozszerzenie funkcjonalności
- Rozszerzono katalog do 100 produktów w 10 kategoriach
- Dodano dropdown menu dla kategorii w nawigacji
- Dodano ikony płatności: VISA, Mastercard (SVG z react-icons/si), BLIK
- Zamieniono PayU na BLIK
- Zaimplementowano LiveChat widget z godzinami dostępności 12:00-20:00
- LiveChat z pulsującym wskaźnikiem online i automatyczną detekcją statusu
- Wszystkie komponenty przetestowane e2e z Playwright

**2025-10-24:** Projekt utworzony
- Zaimplementowany pełny frontend z wszystkimi stronami
- Design system w kolorystyce Milwaukee
- Komponenty produktów, koszyka, nawigacji
- Responsywny layout z hero section
