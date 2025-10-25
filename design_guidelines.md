# Design Guidelines: Tools Shop - Polski Sklep Narzędzi

## Design Approach

**Selected Approach:** Reference-based e-commerce design inspired by premium tool retailers and modern e-commerce platforms (Shopify, specialized tool retailers), adapted to showcase professional tool brand identity and exhibition product nature.

**Key Design Principles:**
- Professional, trustworthy e-commerce experience for trade professionals
- Clear product hierarchy emphasizing exhibition product savings
- Bold, industrial aesthetic matching professional tool brands
- Seamless Polish-language shopping experience

---

## Typography System

**Font Families:**
- Primary: Inter (via Google Fonts) - clean, professional sans-serif for UI and body text
- Headings: Space Grotesk (via Google Fonts) - bold, industrial character for product names and hero text

**Type Scale:**
- Hero Headlines: text-5xl md:text-6xl lg:text-7xl, font-bold
- Section Headers: text-3xl md:text-4xl, font-bold
- Product Names: text-xl md:text-2xl, font-semibold
- Product Prices: text-2xl md:text-3xl, font-bold
- Body Text: text-base md:text-lg
- Labels/Badges: text-sm font-semibold uppercase tracking-wide
- Metadata: text-sm

---

## Layout & Spacing System

**Spacing Primitives:** Consistent use of Tailwind units: 2, 4, 6, 8, 12, 16, 20, 24

**Container Strategy:**
- Maximum content width: max-w-7xl mx-auto
- Section padding: px-4 md:px-6 lg:px-8
- Vertical section spacing: py-12 md:py-16 lg:py-20

**Grid Systems:**
- Product Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6
- Feature Grid: grid-cols-1 md:grid-cols-3 gap-8
- Product Detail: grid-cols-1 lg:grid-cols-2 gap-12

---

## Component Library

### Navigation Header
- Sticky top navigation with logo (left), main menu (center), cart icon with badge (right)
- Logo: Tools Shop in Milwaukee-inspired style with lightning bolt
- Secondary bar: Contact info, language selector, search functionality
- Categories mega-menu: "Wiertarki", "Szlifierki", "Klucze Udarowe", "Młoty", "Zestawy", "Wózki Narzędziowe"
- Mobile: Hamburger menu with slide-out navigation

### Hero Section
Large hero banner (70vh) featuring professional tools in workshop setting with:
- Headline: "Profesjonalne Narzędzia Milwaukee od Tools Shop" + "Produkty Powystawowe - Oszczędź do 40%"
- Primary CTA: "Zobacz Ofertę"
- Trust badges: "Gwarancja Producenta", "Darmowa Dostawa od 500 zł", "Bezpieczne Płatności"

### Product Cards
- Product image (square aspect ratio) with hover zoom effect
- Prominent "PRODUKT POWYSTAWOWY" badge (top-left corner)
- Product name and model number
- Original price (strikethrough) + Exhibition price (prominent)
- "Dodaj do koszyka" button
- Quick view icon for rapid product preview

### Product Detail Page
**Two-column layout:**
- Left: Large product image gallery with thumbnails, zoom on hover
- Right: Product info stack
  - "PRODUKT POWYSTAWOWY" badge
  - Product name (h1)
  - SKU and availability status
  - Price display (original strikethrough + exhibition price)
  - Quantity selector + "Dodaj do koszyka" button
  - "Bezpieczna Płatność" trust icons
  - Accordion sections: "Specyfikacja Techniczna", "Stan Produktu", "Gwarancja"

### Category Sections (Homepage)
- Section headers with "Zobacz wszystkie" links
- 4-column product grid showcasing top tool categories
- Each category gets 4-8 featured products

### Shopping Cart
- Slide-out cart panel (right side) with:
  - Cart items list with thumbnails, quantities, remove option
  - Subtotal calculation
  - "Kontynuuj Zakupy" and "Przejdź do Kasy" buttons
  - Free shipping progress bar

### Footer
Rich footer with:
- Newsletter signup: "Bądź na bieżąco z ofertami" with email input
- Column 1: O Nas, Produkty Powystawowe, Kontakt
- Column 2: Dostawa i Płatności, Zwroty i Reklamacje, Regulamin
- Column 3: Kontakt info (phone, email, address)
- Column 4: Social media icons
- Bottom bar: Copyright, payment method icons, SSL badge

### Trust Elements
- Free shipping threshold indicator
- Authorized retailer badge
- Secure payment icons (Visa, Mastercard, PayU, Przelewy24)
- Customer reviews/ratings section
- "Sprawdź Stan Produktu" detailed condition descriptions

### Forms
- Clean input fields with labels above
- Validation states with inline error messages
- Checkbox for newsletter subscription
- "Wyślij Wiadomość" button for contact form

---

## Icons & Assets

**Icons:** Font Awesome (solid and regular sets) via CDN
- Shopping cart, search, user account, menu
- Product categories (drill, grinder, wrench icons)
- Trust badges (shield, truck, lock)
- Social media icons

**Images Section:**
- **Hero Image:** Large industrial workshop scene with professional tools in action, professional tradesperson using power tools - warm, professional lighting
- **Category Headers:** Close-up product photography of professional tools on industrial backgrounds
- **Product Images:** Clean white background product shots showing tools from multiple angles
- **Trust Section:** Workshop/construction site imagery showing professionals at work
- **About Section:** Warehouse or showroom showing exhibition product displays

---

## Page-Specific Layouts

### Homepage Flow:
1. Hero with primary value proposition
2. Featured exhibition deals (4 products, 2x2 grid)
3. Category showcase (3 columns: Wiertarki, Szlifierki, Narzędzia Udarowe)
4. Trust/Benefits section (3 columns: Gwarancja, Darmowa Dostawa, Produkty Sprawdzone)
5. Newsletter signup
6. Footer

### Category Pages:
- Breadcrumb navigation
- Page header with category name
- Filter sidebar (left): Price range, tool type, voltage, battery included
- Product grid (right): 3-4 columns with sorting dropdown

### Checkout Flow:
- Multi-step indicator (Koszyk → Dostawa → Płatność → Potwierdzenie)
- Order summary sticky sidebar
- Clear form sections with progress saving

---

## Responsive Behavior

**Mobile (< 768px):**
- Single column layouts
- Stacked navigation
- Full-width product cards
- Collapsible filters

**Tablet (768px - 1024px):**
- 2-column product grids
- Simplified navigation

**Desktop (> 1024px):**
- Full multi-column layouts
- Hover interactions enabled
- Sticky elements active