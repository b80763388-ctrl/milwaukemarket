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
- **Language Switcher:** Dual implementation using flag icons (PL/US) and a globe icon for language/currency selection. Each section/page has a unique color scheme.

### Technical Implementations
- **Frontend:** React, TypeScript, TailwindCSS, Shadcn UI, i18n, React Query for data fetching, localStorage for cart and admin token.
- **Backend:** Express, TypeScript, providing REST APIs for e-commerce and chat functionalities.
- **Real-time Communication:** WebSocket server (`/ws`) for live chat, supporting `join`, `message`, and `typing` events. Admin chat closure broadcasts `chat_closed` event to customers.
- **Data Model:** Core entities include `Product`, `CartItem`, `Order`, `ChatSession`, and `ChatMessage`.
- **Storage:** Currently uses in-memory `MemStorage` (ephemeral; requires migration to persistent storage).
- **Admin Security:** Admin password secured via Replit Secrets.

### Feature Specifications
- **Product Display:** Products clearly marked as "Exhibition" with discount and warranty, featuring image galleries with thumbnail navigation. Includes a comprehensive catalog of 45 products across 11 categories (Milwaukee, Makita).
- **Cart & Checkout:** Sidebar with quantity controls, free delivery progress, and a multi-step checkout process with courier selection. Prominent fulfillment time notice (7-14 business days).
- **Live Chat:** Floating widget for customers and a dedicated admin interface for managing real-time chat sessions.
- **Internationalization:** Bilingual (PL/EN) support with language/currency synchronization. Language change auto-refreshes page to update prices. Automatic email notifications for order confirmations.
- **Admin Panel:** Password-protected access to dashboard (orders, revenue) and chat management functionalities.
- **Customer Reviews:** Carousel of authentic 5-star customer reviews on the homepage, displaying first names only and no photos.

## External Dependencies
- **Frankfurter API:** For real-time currency exchange rates.
- **ipapi.co:** For IP-based user country and language detection.
- **react-icons/si:** For various icons.
- **Shadcn UI:** Re-usable UI components.
- **Zod:** For schema validation.
- **Resend API:** For sending order confirmation emails.