# Milwaukee Tools - Sklep z Narzędziami Powystawowymi

## Overview
This project is a professional, bilingual (Polish/English) e-commerce store offering original Milwaukee exhibition tools with a 12-month warranty. The platform aims to provide a seamless shopping experience through a modern UI, real-time chat support, and robust e-commerce functionalities, targeting customers seeking high-quality tools at attractive prices.

**Key Capabilities:**
- Bilingual support (PL/EN) with automatic IP-based language detection.
- Full e-commerce workflow: product display, cart, checkout, order placement.
- Real-time customer support via live chat.
- Admin panel for managing orders and customer chats.
- Responsive design across devices.

## User Preferences
I want the agent to use simple language and provide detailed explanations when necessary. I prefer an iterative development approach, where I can review changes frequently. The agent should ask for confirmation before making any major architectural changes or introducing new dependencies.

## System Architecture

### UI/UX Decisions
- **Color Scheme:** Milwaukee Red (`hsl(0, 72%, 42%)`) as primary, with black/white foreground and subtle card backgrounds.
- **Typography:** Space Grotesk for headings, Inter for body text.
- **Component Library:** Shadcn UI with custom theming.
- **Responsiveness:** Optimized for mobile, tablet, and desktop.
- **Pages:** Includes public-facing pages (Homepage, Products, Category, Product Detail, Checkout, Legal) and admin pages (Login, Dashboard, Chat Management).
- **Components:** Features a sticky header with flag-based language/region switcher, product cards with image galleries, cart sidebar, footer, and a LiveChat widget.
- **Language Switcher:** Dual implementation - flag icons (PL/US) in top white bar for visual language/currency selection, plus globe icon for alternative access.

### Technical Implementations
- **Frontend:** React, TypeScript, TailwindCSS, Shadcn UI, i18n, React Query for data fetching, localStorage for cart and admin token.
- **Backend:** Express, TypeScript, providing REST APIs for core e-commerce and chat functionalities.
- **Real-time Communication:** WebSocket server (`/ws`) for live chat, handling `join`, `message`, and `typing` events, facilitating communication between customers and admins.
- **Data Model:** Core entities include `Product`, `CartItem`, `Order`, `ChatSession`, and `ChatMessage`.
- **Storage:** Currently uses in-memory `MemStorage` (ephemeral; requires migration to persistent storage for production).

### Feature Specifications
- **Product Display:** "Exhibition products" clearly marked with discount and warranty information.
- **Cart & Checkout:** Sidebar with quantity controls, free delivery progress, and a multi-step checkout process with courier selection.
- **Product Catalog:** Comprehensive catalog of 45 products (42 Milwaukee + 3 Makita combo sets) across 10 categories, with detailed specifications. Realistic prices based on market research (Milwaukee workbenches 5499-8999 PLN, Makita combos 1799-3799 PLN). All products support image galleries with thumbnail navigation.
- **Navigation:** Category dropdowns in header including: wiertarki, szlifierki, klucze, młoty, wózki, zestawy, piły, lasery, akcesoria, zestawy specjalistyczne, makita.
- **Live Chat:** Floating widget for customers and a dedicated admin interface for managing real-time chat sessions, including unread message indicators.
- **Internationalization:** Bilingual (PL/EN) support with IP-based language detection and a currency conversion system.
- **Admin Panel:** Password-protected access to dashboard (orders, revenue) and chat management.

## External Dependencies
- **Frankfurter API:** For real-time currency exchange rates.
- **ipapi.co:** For IP-based user country and language detection.
- **react-icons/si:** For various icons (e.g., payment icons).
- **Shadcn UI:** Re-usable UI components.
- **Zod:** For schema validation.

## Recent Changes

**2025-10-26 (Latest):** Laser Category + Flag-based Language Switcher + Image Galleries
- **New Category "lasery"**: Replaced "oswietlenie" (lighting) category with professional laser tools:
  - M12™ Zielony laser 3-płaszczyznowy 360° z automatycznym wypoziomowaniem i odbiornikiem - 2799 → 1899 PLN
  - M18™ Zielony laser obrotowy wewnętrzny z pilotem/odbiornikiem i uchwytem ściennym - 3999 → 2699 PLN
  - M12™ Zielony laser 3-płaszczyznowy 360° - zestaw - 2299 → 1549 PLN
- **Flag-based Language/Region Switcher**: Added PL 🇵🇱 and US 🇺🇸 flags in top white bar for intuitive language and currency selection:
  - 🇵🇱 = Polski + PLN (prices in złoty)
  - 🇺🇸 = English + USD (automatic currency conversion via Frankfurter API)
  - Visual feedback with ring border for active flag, smooth hover animations
  - Dual language switcher maintained (flags + globe icon) for user preference
- **Product Image Galleries**: Extended schema to support multiple images per product with `images` array field:
  - Frontend components (ProductCard, ProductDetailPage) now display image galleries with thumbnail navigation
  - Graceful fallback to single image for legacy products
  - All new laser and tool cart products feature 2-3 image galleries

**2025-10-26 (Earlier):** Makita Category + Realistic Pricing + Review Updates
- **New Category "makita"**: Added 3 authentic Makita 18V LXT combo sets:
  - DLX2283TJ: 2-piece (drill+impact driver) 2599 → 1799 PLN
  - DLX2153TJ1: 2-piece (SDS hammer+grinder) 2799 → 1899 PLN  
  - DLX4084T: 4-piece complete set 5499 → 3799 PLN
- **Realistic Workbench Pricing**: Updated Milwaukee workbench prices based on market research (US prices + import):
  - 72" 18-drawer: 12999 → 8999 PLN (was 7999 → 5499)
  - 52" 12-drawer: 9999 → 6799 PLN (was 6999 → 4699)
  - 52" 11-drawer: 7999 → 5499 PLN (was 4599 → 3099)
- **Review Improvements**: Removed specific delivery times ("dostawa w 2 dni" → "szybka dostawa")
- **Product Images**: All products use authentic user-provided images from Milwaukee.com screenshots
- **Total Products**: 45 across 10 categories (42 Milwaukee + 3 Makita)

**2025-10-26 (Earlier):** Customer Reviews + Expanded Milwaukee Catalog
- **Customer Reviews Section**: Added authentic 5-star customer reviews carousel on homepage with professional customer portraits
- **5 New Milwaukee Products**:
  - MX FUEL ROCKET Lampa wieżowa (MXF040-1XC) - 4999 → 3299 PLN
  - M18 ROVER Lampa robocza (2368-20) - 899 → 599 PLN
  - M18 FORGE HD12.0 Zestaw (48-59-1300) - 1499 → 999 PLN
  - M18 FORGE XC8.0 Bateria (48-11-1881) - 699 → 469 PLN
  - M18 XC6.0 Baterie 2szt (48-11-1862) - 1199 → 799 PLN
- **9 Milwaukee Workbenches**: 36"-72" professional mobile workbenches