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

**2025-10-27 (Latest):** Live Chat Close - Real-time Customer Notification + Duplicate Connection Fix
- **Real-time Chat Close Broadcast**: When admin closes chat, customer receives immediate WebSocket notification:
  - Backend broadcasts `chat_closed` event to all session participants
  - Customer sees warning: "⚠️ Chat został zamknięty - Administrator zamknął tę konwersację"
  - "Rozpocznij nowy chat" button allows customer to start fresh conversation
  - Input/send button immediately disabled on closed state
  - Prevents customers from unknowingly sending messages to closed sessions
- **Duplicate WebSocket Connection Fix**: Resolved multiple WebSocket connections on chat reset:
  - Added `manualReconnectTimeoutRef` to track manual reconnects
  - `isManualResetRef` flag prevents auto-reconnect during manual reset
  - Both timers cleared before scheduling new reconnect
  - Guarantees single active WebSocket connection
- **WebSocket Architecture**: Moved `connections` Map to top of registerRoutes for shared access:
  - HTTP endpoints can broadcast to WebSocket clients
  - Single source of truth for all active session connections
  - Admin close endpoint broadcasts to all participants immediately

**2025-10-27 (Earlier):** Admin Chat Management - Close & Auto-cleanup + Secure Password
- **Admin Chat Close Feature**: Admins can now close chat sessions with "Zamknij chat" button:
  - Separate tabs: "Aktywne" / "Zamknięte" for better organization
  - Closed chats show closure timestamp: "Zamknięto: [date]"
  - Backend API: POST /api/chat/sessions/:id/close (now with WebSocket broadcast)
  - Schema: Added closedAt timestamp field to chatSessions
- **Auto-cleanup Old Chats**: DELETE /api/chat/cleanup?days=N endpoint deletes closed chats older than N days (default: 2)
  - Storage method: deleteOldClosedChats() removes both sessions and their messages
  - Prevents database bloat from old conversations
- **Secure Admin Password**: 
  - Removed visible password hint from login page
  - Admin password now securely stored in Replit Secrets (ADMIN_PASSWORD)
  - Password hidden during typing with show/hide toggle
- **Battery Product Images Updated**: Replaced images for 3 Milwaukee REDLITHIUM battery products with authentic product photos:
  - M18 FORGE HD12.0 Starter Kit (999 PLN): Battery + Rapid Charger
  - M18 FORGE XC8.0 Battery (469 PLN): Single battery with clear branding
  - M18 HIGH OUTPUT XC6.0 Batteries 2-pack (799 PLN): Two batteries without charger
- **Terms & Conditions Delivery Update**: Updated delivery information in §5 Dostawa:
  - Standard fulfillment: 7-14 business days
  - Maximum delivery time: up to 28 days from shipment date
  - Delivery time points moved to end of §5 for better flow
  - Professional, clear language for customer transparency
- **Payment Icons Expanded**: Added Google Pay and Apple Pay logos to footer alongside existing Visa, Mastercard, and BLIK
- **Header Contact Improvements**: Phone and email icons in header are now clickable popovers:
  - Phone popover displays: +48 123 456 789 with business hours (Pn-Pt: 8:00-18:00)
  - Email popover displays: sklep@tools-shop.pl as clickable mailto link
- **Social Media Cleanup**: Removed Facebook, Instagram, and YouTube icons from footer
- **Tool Cart Weights Added**: All 6 Milwaukee tool carts now display accurate weights from official specifications:
  - 72" Industrial 18-drawer: 278 kg (613 lbs)
  - 52" Industrial 12-drawer: 178 kg (393 lbs)
  - 52" High Capacity 11-drawer: 157 kg (346 lbs)
  - 60" Mobile Work Station: 182 kg (402 lbs)
  - 46" Combo High Capacity: 278 kg (614 lbs)
  - 41" Industrial 18-drawer: 227 kg (501 lbs)
- **Cart Notification Removed**: Removed "Dodano do koszyka" toast notification that was blocking checkout buttons
- **Shipping Information Updated**:
  - Removed "wysyłka w 24h" text from product availability (now shows only "Dostępny")
  - Changed shipping region from Poland to Europe ("na terenie całej europy" / "throughout Europe")
  - Updated delivery time to "7-14 dni roboczych" (fulfillment time instead of total delivery time)
- **Payment Icons Unified**: ShippingPaymentModal now uses same payment method icons as footer (Visa, Mastercard, BLIK, Google Pay, Apple Pay) for consistent branding
- **Checkout Fulfillment Time Added**: Added prominent fulfillment time notice (7-14 business days) on checkout page below courier selection
- **Total Authentic Images**: 27 products now have authentic Milwaukee product photography (24 tools/combos/accessories + 3 battery products)

**2025-10-26 (Earlier):** Shipping Info Updates + Payment Icons Unified
- **Live Chat Name Requirement**: Added mandatory name input before starting chat - prevents empty/ghost sessions in admin panel
  - Name form displayed before chat interface loads
  - Customer name saved in localStorage for returning users
  - Chat session created only when first message is sent (not on connection)
  - Admin panel now shows only real conversations with messages
- **Footer Category Update**: Changed "Oświetlenie" to "Lasery" in footer navigation to match current product catalog

**2025-10-26 (Earlier):** Image Gallery Fix + Tool Cart Pricing Update
- **Image Gallery Display Fix**: Fixed gallery logic in both ProductDetailPage and ProductCard to always display `product.image` as the first/main image, preventing incorrect image order. Product cards (thumbnails) now consistently show the correct primary image. Additional images from `images` array are filtered to exclude duplicates in gallery view.
- **Tool Cart Pricing Restructure**: Updated all 7 Milwaukee tool cart prices based on size progression (999-2799 PLN):
  - 40" 6-drawer Work Cart: 1499 → 999 PLN (smallest, entry-level)
  - 41" Industrial 18-drawer: 1999 → 1299 PLN
  - 46" Combo High Capacity: 2399 → 1599 PLN
  - 52" High Capacity: 2799 → 1899 PLN
  - 52" Industrial 12-drawer: 3199 → 2199 PLN
  - 60" Mobile Work Station: 3699 → 2499 PLN
  - 72" Industrial 18-drawer: 4199 → 2799 PLN (largest, premium)
- **Price Increments**: Prices increase by 200-300 PLN per size tier, making the product range more accessible while maintaining 30-33% exhibition discounts.
- **Data Cleanup**: Removed duplicate images from storage.ts for 10 products (7 tool carts + 3 lasers) that had main image repeated in images array.

**2025-10-26 (Earlier):** Authentic Product Images Applied (24 Products)
- **Real Product Photos Implemented**: Replaced AI-generated placeholder images with authentic product photos for 24 Milwaukee products:
  - **Power Tools (17)**: M12/M18 FUEL drills, impact wrenches, hammers, circular saws, chainsaws, reciprocating saws, angle grinders, die grinder
  - **Combo Sets (4)**: M18 FUEL 2-tool, M18 FUEL 3-tool, M18 starter kit, M12 FUEL 2-tool
  - **Accessories (4)**: HSS-G drill bit set, SHOCKWAVE impact bit set, PACKOUT storage case, SDS-Plus drill bit set
- **Image Galleries**: Many products now feature multiple images (primary + gallery images) for better product visualization
- **Image Sources**: All photos sourced from attached user-provided images (image_1761512... to image_1761514... series)
- **Remaining AI Images**: 21 products still use AI-generated images (workbenches, lasers, batteries, Makita sets)

**2025-10-26 (Earlier):** SKU Verification + Product Cleanup

**2025-10-26 (Earlier):** Tool Cart Dimensions Added
- **Complete Dimensions for All 7 Milwaukee Tool Carts**: Added precise dimensions in centimeters (szer × gł × wys format) sourced from official Milwaukee specifications:
  - 72" 18-drawer Industrial: 182.9 × 55.9 × 107.4 cm
  - 52" 12-drawer Industrial: 132.1 × 55.9 × 104.9 cm
  - 52" 11-drawer High Capacity: 132.1 × 55.9 × 104.1 cm
  - 60" 11-drawer Mobile Work Station: 175.8 × 62 × 97 cm
  - 46" Combo 18-drawer: 116.8 × 55.9 × 150 cm
  - 41" Combo 18-drawer: 102.9 × 56.1 × 160 cm
  - 40" 6-drawer Work Cart: 114.3 × 56.1 × 99.1 cm
- **Display Format**: Dimensions appear as the first feature item in the product details, ensuring customers can quickly assess size requirements for workshop space planning.

**2025-10-26 (Earlier):** Laser Category + Flag-based Language Switcher + Image Galleries
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