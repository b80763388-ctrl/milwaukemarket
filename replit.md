# Milwaukee Tools - Sklep z Narzędziami Powystawowymi

## Overview
This project is a professional, bilingual (Polish/English) e-commerce store offering original Milwaukee exhibition tools at attractive prices. All products come with a 12-month warranty. The platform aims to provide a seamless shopping experience for customers looking for high-quality tools, featuring a modern UI, real-time chat support, and a robust e-commerce workflow.

**Key Capabilities:**
- Bilingual support (PL/EN) with automatic IP-based language detection.
- E-commerce functionalities: product display, cart management, checkout, order placement.
- Real-time customer support via a live chat system.
- Admin panel for managing orders and customer chats.
- Responsive design for optimal viewing on various devices.
- Focus on "exhibition products" with clear pricing and warranty information.

## User Preferences
I want the agent to use simple language and provide detailed explanations when necessary. I prefer an iterative development approach, where I can review changes frequently. The agent should ask for confirmation before making any major architectural changes or introducing new dependencies.

## System Architecture

### UI/UX Decisions
- **Color Scheme:** Milwaukee Red (`hsl(0, 72%, 42%)`) as primary, with black/white foreground and subtle card backgrounds. Destructive elements use red for emphasis (e.g., "PRODUKT POWYSTAWOWY" badge).
- **Typography:** Space Grotesk for headings (bold, industrial) and Inter for body text (clean, professional).
- **Component Library:** Shadcn UI components with custom color theming.
- **Responsiveness:** Full support for mobile (< 768px), tablet (768-1024px), and desktop (> 1024px) with an elevation system for interactive elements.
- **Pages:**
    - **Public:** Homepage (hero, featured products, categories), All Products, Category, Product Detail, Checkout, Terms, Privacy.
    - **Admin:** Login, Dashboard (orders, revenue, chats), Chat Management.
- **Components:** Sticky Header with logo, categories dropdown, cart, language switcher; Product Cards with pricing and discount badges; Cart Sidebar with quantity management and free delivery progress; Footer with newsletter, links, contact, social media, and payment icons; LiveChat widget.

### Technical Implementations
- **Frontend:** React, TypeScript, TailwindCSS, Shadcn UI, i18n for internationalization. Uses `localStorage` for cart and admin token, React Query for data fetching, and toast notifications.
- **Backend:** Express, TypeScript. Provides REST API for products, cart, orders, and chat sessions.
- **Real-time Communication:** WebSocket server (`/ws`) for live chat functionality, supporting `join`, `message`, and `typing` events. Automatically creates chat sessions for new customers and broadcasts messages between customers and admins.
- **Data Model:**
    - **Product:** `id`, `name`, `slug`, `category`, `description`, `originalPrice`, `exhibitionPrice`, `image`, `sku`, `voltage`, `batteryIncluded`, `inStock`, `condition`, `warranty`, `features`.
    - **CartItem:** `id`, `sessionId`, `productId`, `quantity`.
    - **Order:** `id`, `firstName`, `lastName`, `email`, `phone`, `address`, `city`, `postalCode`, `courier`, `orderItems`, `totalAmount`, `createdAt`.
    - **ChatSession:** `id`, `customerName`, `customerEmail`, `status`, `createdAt`, `lastMessageAt`.
    - **ChatMessage:** `id`, `sessionId`, `sender`, `message`, `createdAt`.
- **Storage:** In-memory `MemStorage` for products, orders, chat sessions, and messages (note: data is ephemeral and lost on server restart, needs migration to persistent storage like PostgreSQL for production).

### Feature Specifications
- **Exhibition Products:** Products clearly marked with a "PRODUKT POWYSTAWOWY" badge and 12-month warranty.
- **Discount System:** Displays savings between original and exhibition prices.
- **Cart Management:** Sidebar with quantity controls, subtotal, and free delivery progress bar (threshold 500 PLN).
- **Product Catalog:** 37 prawdziwych produktów Milwaukee z dokładnymi specyfikacjami technicznymi z oficjalnych źródeł (2024-2025), podzielonych na 8 kategorii: wiertarki (M18/M12 FUEL), klucze udarowe, młoty (SDS-Plus/SDS-Max), piły (tarczowe/łańcuchowe/szablaste), szlifierki, zestawy, akcesoria, wózki narzędziowe (36"-72" workbenches).
- **Navigation:** Dropdown category menus in the header for desktop and mobile.
- **Payment Icons:** VISA, Mastercard, BLIK displayed in the footer.
- **Live Chat:** Real-time WebSocket chat system. Floating widget (customer-side) available from 12:00-20:00 with online indicator. Admin interface for managing chat sessions and responding to customers in real-time.
- **SEO:** Meta tags, Polish language support, descriptive titles.
- **Multilingualism:** Automatic IP-based language detection (PL/EN) and a language switcher.
- **Currency System:** Automatic currency conversion based on user's country (PLN, EUR, USD/GBP) with Frankfurter API integration and 1-hour cache.
- **Legal Pages:** Dedicated pages for Terms and Privacy, linked from the footer.
- **Checkout:** Shipping form with courier selection (InPost, DPD, DHL), dynamic courier availability based on product size, order summary, and success screen.
- **Admin Panel:** Secure admin panel with password authentication (default: admin123, configurable via ADMIN_PASSWORD env variable).
  - **Dashboard:** Overview with total orders, total revenue, list of recent orders with customer details.
  - **Chat Management:** Real-time chat interface with list of active sessions, conversation window, and ability to respond to customers via WebSocket.
  - **Authentication:** Simple token-based authentication stored in localStorage.
  - **Bilingual:** Full PL/EN support in admin panel.

## Recent Changes

**2025-10-26 (Latest):** Wózki Narzędziowe - 9 Professional Workbenches Added
- **New Category**: Added "wózki" (tool workbenches/storage) category with 9 Milwaukee professional mobile workbenches
- **New Products**: 9 high-capacity workbenches ranging from 36" to 72":
  - 72" High Capacity 18-drawer mobile workbench (48-22-8572) - 7999 PLN → 5499 PLN
  - 52" High Capacity 12-drawer mobile workbench (48-22-8559) - 6999 PLN → 4699 PLN
  - 52" High Capacity 11-drawer mobile workbench (48-22-8553) - 4599 PLN → 3099 PLN
  - 46" Steel Storage Combo (48-22-8500) - 7699 PLN → 5199 PLN
  - 46" 8-drawer steel cabinet (48-22-8520) - 5499 PLN → 3699 PLN
  - 60" Mobile Work Station with pegboard (48-22-8560) - 3199 PLN → 2099 PLN
  - 40" 6-drawer stainless steel top (48-22-8540) - 3599 PLN → 2399 PLN
  - 40" 6-drawer wood top (48-22-8539) - 2799 PLN → 1899 PLN
  - 36" High Capacity combo (48-22-8536) - 6799 PLN → 4599 PLN
- **Product Features**: All workbenches include detailed dimensions, weight capacity, soft-close drawer specs, power centers, and storage capacity
- **Polish Descriptions**: Professional translations with complete technical specifications from official Milwaukee documentation
- **Images**: User-provided authentic Milwaukee product images for all 9 workbenches
- **Total Catalog**: Expanded to 37 products across 8 categories

**2025-10-26 (Earlier):** Product Catalog Completion - 28 Products with Professional Images
- **Missing Products Fixed**: Re-added 4 products that were accidentally removed during previous edits:
  - M12 FUEL młotowiertarka SDS-Plus (młoty) - SKU M12FUEL-CH-0
  - M12 FUEL Pilarka tarczowa 140mm (piły) - SKU M12FUEL-CS140-0
  - M12 FUEL Szlifierka kątowa 100mm (szlifierki) - SKU M12FUEL-CAG100-0
  - Zestaw combo M12 FUEL 2 narzędzia (zestawy) - SKU M12FPP2A-202B
- **Product Images**: Generated 21 professional product photography images total (17 previous + 4 new). All 28 products now have high-quality product photos.
- **Image Quality**: Professional studio-style product photography with clean white backgrounds, proper lighting, and accurate Milwaukee red/black color scheme.
- **Complete Coverage**: Every product in the catalog now displays a professional image on product cards and detail pages.
- **Verified Counts**: Confirmed all categories have correct product counts (wiertarki-3, klucze-3, młoty-4, piły-6, szlifierki-4, zestawy-4, akcesoria-4)

**2025-10-26 (Earlier):** Replacement with Real Milwaukee Products
- **Product Update**: Replaced all 100 demo products with 28 real Milwaukee products sourced from official Milwaukee Tool documentation (2024-2025)
- **Detailed Specifications**: Each product now includes accurate technical data:
  - **M18 FUEL Tools**: Wiertarko-wkrętarka FPD3 (158 Nm, 175mm), Klucz udarowy 1/2\" (1100 ft-lbs), Młot SDS-Plus FHX (2.5J), Młot SDS-Max FHM (11J), Pilarka tarczowa 165mm FCS552, Pilarka łańcuchowa 20cm/35cm, Szlifierka 6\" (9000 RPM), Szlifierka 125mm
  - **M12 FUEL Tools**: Wiertarka 1/2\", Installation Drill 4-w-1, Stubby Impact Wrenches (1/2\", 3/8\"), Młotowiertarka SDS-Plus (1.1J), Piła HACKZALL, Szlifierka prosta 1/4\"
  - **Zestawy**: Combo 2/3 narzędzia, zestaw startowy z baterią
  - **Akcesoria**: Wiertła HSS-G (19szt), Bity SHOCKWAVE (56szt), Walizka PACKOUT, Wiertła SDS-Plus (7szt)
- **Categories**: Products organized into 7 categories - wiertarki, klucze, mloty, pily, szlifierki, zestawy, akcesoria
- **Real Specifications**: All products feature genuine manufacturer data including power ratings, dimensions, weights, performance metrics, battery compatibility, and safety features
- **Model Numbers**: Authentic SKU codes (e.g., M18FPD3-0, M12FUEL-2563-20, M18FHM-0C)

**2025-10-26 (Earlier):** WebSocket Chat System Optimization & Bug Fixes
- **Logo Implementation**: Using custom "TOOLS SHOP" + lightning bolt + "SRETENSKY" logo in Milwaukee red italic style (h-28/112px, header h-32/128px for prominent branding)
- **Chat Testing Mode**: Chat widget activated for testing (isActive = true), with commented code for production hours (12:00-20:00)
- **Read/Unread Message System**: 
  - Added `isRead` boolean field to ChatMessage schema (defaults to false)
  - New storage methods: `markMessagesAsRead()` and `getUnreadMessageCount()`
  - New API endpoint: POST `/api/chat/sessions/:id/mark-read` (admin only)
  - AdminChatPage automatically marks customer messages as read when admin opens session (500ms delay)
  - Unread message badges displayed on session list (red circular badge with count)
  - Mark-as-read optimization: now called only once per session (when sessionId changes)
- **WebSocket Bug Fixes**:
  - Fixed infinite reconnect loop in useChat hook caused by currentSessionId in dependencies
  - Changed to use sessionIdRef to prevent unnecessary reconnections
  - Optimized message marking to execute once per session instead of on every message
- **End-to-End Testing**: Verified bidirectional chat communication (customer ↔ admin) works correctly
- **Security**: All admin endpoints protected with adminAuth middleware

**2025-10-25:** Admin Panel & Real-time Chat Implementation
- Implemented full admin panel with authentication and order management:
  - **AdminLoginPage** (/admin/login): Password-protected login (ADMIN_PASSWORD env or default "admin123")
  - **AdminDashboardPage** (/admin/dashboard): Statistics dashboard showing total orders, total revenue, and list of recent 10 orders
  - **AdminChatPage** (/admin/chat): Real-time chat management interface with session list and conversation window
- Built WebSocket chat system:
  - **WebSocket Server** (/ws endpoint): Handles join, message, and typing events
  - **useChat Hook**: Custom React hook for WebSocket connection management (customer and admin modes)
  - **LiveChat Component**: Complete rewrite using WebSocket for real-time messaging
  - **Chat Storage**: ChatSession and ChatMessage models with full CRUD operations in MemStorage
- Added admin API endpoints:
  - GET /api/orders - list all orders
  - GET /api/orders/:id - get single order
  - GET /api/chat/sessions - list all chat sessions
  - GET /api/chat/sessions/:id - get session with messages
  - POST /api/chat/sessions/:id/close - close chat session
  - POST /api/admin/login - admin authentication
- Updated App.tsx routing:
  - Admin routes exclude Header, Footer, and CartSidebar
  - Conditional rendering based on route path
- All admin pages fully translated (PL/EN) using useLanguage hook
- ⚠️ **Note:** MemStorage is in-memory - all data (orders, chat sessions) is lost on server restart. Production deployment requires migration to PostgreSQL.

## External Dependencies
- **Frankfurter API:** Used for real-time currency exchange rates.
- **ipapi.co:** Used for automatic IP-based user country and language detection.
- **react-icons/si:** For various icons, including payment icons (VISA, Mastercard).
- **Shadcn UI:** A collection of re-usable components for building the UI.
- **Zod:** For schema validation, particularly for order data.