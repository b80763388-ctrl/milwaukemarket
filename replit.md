# Milwaukee Tools - Sklep z Narzędziami Powystawowymi

## Overview
This project is a professional, bilingual (Polish/English) e-commerce store specializing in original Milwaukee exhibition tools with a 12-month warranty. It aims to provide a modern, seamless shopping experience through advanced UI, real-time customer support, and comprehensive e-commerce functionalities. The platform targets customers seeking high-quality tools at attractive prices, emphasizing a strong market presence for specialized equipment.

**Key Capabilities:**
- Bilingual support (PL/EN) with IP-based language detection and currency conversion.
- Full e-commerce workflow: product display, cart management, secure checkout, order placement.
- Real-time customer support via live chat with admin management.
- Responsive design ensuring accessibility across all devices.
- Admin panel for order and chat management.

## User Preferences
I want the agent to use simple language and provide detailed explanations when necessary. I prefer an iterative development approach, where I can review changes frequently. The agent should ask for confirmation before making any major architectural changes or introducing new dependencies.

## System Architecture

### UI/UX Decisions
- **Color Scheme:** Primary Milwaukee Red (`hsl(0, 72%, 42%)`), with black/white foreground and subtle card backgrounds.
- **Typography:** Space Grotesk for headings, Inter for body text.
- **Component Library:** Shadcn UI with custom theming.
- **Responsiveness:** Optimized for mobile, tablet, and desktop views.
- **Pages:** Includes public-facing (Homepage, Products, Category, Product Detail, Checkout, Legal) and admin pages (Login, Dashboard, Chat Management).
- **Components:** Sticky header with flag-based language/region switcher, product cards with image galleries, cart sidebar, footer, and a LiveChat widget.
- **Language Switcher:** Dual implementation using flag icons (PL/US) and a globe icon for language/currency selection.

### Technical Implementations
- **Frontend:** React, TypeScript, TailwindCSS, Shadcn UI, i18n, React Query for data fetching, localStorage for cart and admin token.
- **Backend:** Express, TypeScript, providing REST APIs for e-commerce and chat functionalities.
- **Real-time Communication:** WebSocket server (`/ws`) for live chat, supporting `join`, `message`, and `typing` events between customers and admins.
- **Data Model:** Core entities include `Product`, `CartItem`, `Order`, `ChatSession`, and `ChatMessage`.
- **Storage:** Currently uses in-memory `MemStorage` (ephemeral; requires migration to persistent storage).
- **Admin Security:** Admin password secured via Replit Secrets.

### Feature Specifications
- **Product Display:** Products clearly marked as "Exhibition" with discount and warranty information, featuring image galleries with thumbnail navigation.
- **Product Catalog:** Comprehensive catalog of 45 products (Milwaukee and Makita) across 11 categories, with detailed specifications and realistic pricing.
- **Navigation:** Category dropdowns in header including: wiertarki, szlifierki, klucze, młoty, wózki, zestawy, piły, lasery, akcesoria, zestawy specjalistyczne, zestawy makita.
- **Cart & Checkout:** Sidebar with quantity controls, free delivery progress, and a multi-step checkout process with courier selection. Prominent fulfillment time notice (7-14 business days).
- **Live Chat:** Floating widget for customers with mandatory name input, and a dedicated admin interface for managing real-time chat sessions (active/closed tabs, unread indicators, chat closing functionality).
- **Internationalization:** Bilingual (PL/EN) support with IP-based language detection and real-time currency conversion.
- **Admin Panel:** Password-protected access to dashboard (orders, revenue) and chat management functionalities, including automatic cleanup of old chat sessions.
- **Customer Reviews:** Carousel of authentic 5-star customer reviews on the homepage with first names only and no photos.

## Recent Changes

**2025-10-27 (Latest):** M12 FUEL Stubby Photo Fix + Milwaukee Specialized Sets + Price Updates
- **M12 FUEL Stubby Photo Fix**: 
  - Swapped main product image with gallery image for M12 FUEL Stubby 1/2" (SKU: 2563-20) - correct thumbnail now displayed
  - Added new main image for M12 FUEL Stubby 3/8" (SKU: 2562-20) with gallery support (2 images total)
- **Category Renamed**: "Zestawy specjalistyczne" → **"Zestawy specjalistyczne Milwaukee"**
  - New slug: "zestawy-specjalistyczne-milwaukee"
  - Updated everywhere: HomePage, Header navigation, i18n translations (PL/EN)
  - Translations: "Zestawy specjalistyczne Milwaukee" (PL) / "Milwaukee Specialized Sets" (EN)
- **New Product: Milwaukee M18 FUEL Zestaw Combo 7 Narzędzi 3697-27**
  - Price: **2599 zł** (original 5199 zł, -50%)
  - 7 brushless FUEL tools with POWERSTATE motors
  - Includes: hammer drill, impact driver, SAWZALL, circular saw, grinder (8500 RPM), impact wrench (4-mode), LED light
  - 2x REDLITHIUM XC5.0 batteries (5.0Ah) + M18/M12 charger + 2 bags
  - 8 high-quality product images
  - SKU: 3697-27, compatible with 250+ M18 tools
- **New Product: Milwaukee M18 FORCE LOGIC Prasa do Rur 2773-22L**
  - Price: **2999 zł** (original 16399 zł, -82%)
  - Professional pipe pressing tool 1/2"-1" with adjustable stroke
  - 7,200 lbs crimping force, smallest extended-length press tool
  - REDLINK Intelligence: auto-cycle, pre-press battery check
  - 50,000 cycle calibration interval (longest in industry)
  - Includes: 3 IPS-IA jaws (1/2", 3/4", 1") + 2x XC 3.0Ah batteries + charger + case
  - Dimensions: 46.5cm length, 3.3kg weight
  - 2 product images
  - SKU: 2773-22L
- **Customer Review Fixed**: Removed delivery time mention from Krzysztof's review
  - Changed to focus on quality: "Świetny stosunek ceny do jakości!"

**2025-10-27 (Earlier):** Makita Products Update & Category Rename
- **Updated Makita Product Prices**:
  - Makita DLX2283TJ: 1299 zł → **689 zł** (2 images added)
  - Makita DLX2153TJ1: 2099 zł → **1399 zł** (1 image added)
- **Product Replacement**: Replaced Makita DLX4084T with **DLX4155TX1**
  - New 4-tool combo set with brushless motors and XPT technology
  - Includes: DDF486 drill (125Nm), DTD153 impact driver (175Nm), DGA504 grinder (125mm), DHR243 hammer + DX07 dust extraction + HEPA filter
  - Price: **1699 zł** (1 image)
  - 2x BL1850B 5.0Ah batteries + DC18RC charger + carrying bag
- **Category Renamed**: "Makita" → **"Zestawy Makita"** (Makita Sets)
  - Updated everywhere: HomePage, Header navigation, i18n translations (PL/EN)
  - All 3 Makita products now under "zestawy-makita" category
- **New Product Images**: Added 4 new product images from user upload

**2025-10-27 (Earlier):** Customer Reviews Privacy Update
- **Removed Customer Photos**: All profile pictures removed from review cards for enhanced privacy
- **First Names Only**: Customer names simplified to first names only (removed surnames):
  - "Paweł Kowalski" → "Paweł"
  - "Tomasz Wiśniewski" → "Tomasz"
  - "Jan Nowak" → "Jan"
  - "Anna Zawadzka" → "Anna"
  - "Michał Krawczyk" → "Michał"
- **Cleaner UI**: Review cards now display only name, role, rating (5 stars), and comment without avatars
- **Layout Updated**: Removed flex container with avatar image, simplified to vertical layout

**2025-10-27 (Earlier):** Live Chat Close - Real-time Customer Notification + Duplicate Connection Fix
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

## External Dependencies
- **Frankfurter API:** For real-time currency exchange rates.
- **ipapi.co:** For IP-based user country and language detection.
- **react-icons/si:** For various icons.
- **Shadcn UI:** Re-usable UI components.
- **Zod:** For schema validation.