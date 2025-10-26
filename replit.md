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
- **Product Catalog:** 100 products across 10 categories.
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

**2025-10-26 (Latest):** WebSocket Chat System Optimization & Bug Fixes
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