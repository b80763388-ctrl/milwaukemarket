# Milwaukee Tools - Sklep z Narzędziami Powystawowymi

## Przegląd Projektu

Profesjonalny polski sklep internetowy e-commerce oferujący oryginalne narzędzia Milwaukee w atrakcyjnych cenach. Wszystkie produkty to urządzenia powystawowe z pełną gwarancją producenta.

**Język:** Polski (pl)
**Technologie:** React, TypeScript, Express, TailwindCSS, Shadcn UI
**Storage:** In-memory (MemStorage)

## Data Model

### Product (Produkt)
- `id`: UUID - unikalny identyfikator
- `name`: string - nazwa produktu
- `slug`: string - SEO-friendly URL
- `category`: string - kategoria ("wiertarki", "szlifierki", "klucze", "mloty", "zestawy")
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
- `Header`: Sticky navigation z logo Milwaukee, menu kategorii, koszyk z licznikiem
- `ProductCard`: Karta produktu z badge "PRODUKT POWYSTAWOWY", zniżką, cenami
- `CartSidebar`: Slide-out panel koszyka z zarządzaniem ilością, podsumowaniem, progress bar darmowej dostawy
- `Footer`: Newsletter, linki, kontakt, social media

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

1. **Produkty Powystawowe:** Każdy produkt oznaczony badge "PRODUKT POWYSTAWOWY"
2. **System Zniżek:** Pokazywane oszczędności (cena katalogowa vs powystawowa)
3. **Koszyk:** Sidebar z zarządzaniem ilością, podsumowaniem, progress bar darmowej dostawy (500 zł)
4. **Kategorie:** Wiertarki, Szlifierki, Klucze Udarowe, Młoty, Zestawy
5. **Responsywność:** Pełne wsparcie mobile/tablet/desktop
6. **SEO:** Meta tags, polski język, opisowe tytuły

## Struktura Plików

```
client/
  src/
    components/
      Header.tsx - Nawigacja sticky z koszykiem
      ProductCard.tsx - Karta produktu z cenami
      CartSidebar.tsx - Panel boczny koszyka
      Footer.tsx - Stopka z newsletter
      ui/ - Komponenty shadcn
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

**2025-10-24:** Projekt utworzony
- Zaimplementowany pełny frontend z wszystkimi stronami
- Design system w kolorystyce Milwaukee
- Komponenty produktów, koszyka, nawigacji
- 6 wygenerowanych obrazów produktów Milwaukee
- Responsywny layout z hero section
