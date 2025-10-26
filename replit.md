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
- **Components:** Features a sticky header, product cards, cart sidebar, footer, and a LiveChat widget.

### Technical Implementations
- **Frontend:** React, TypeScript, TailwindCSS, Shadcn UI, i18n, React Query for data fetching, localStorage for cart and admin token.
- **Backend:** Express, TypeScript, providing REST APIs for core e-commerce and chat functionalities.
- **Real-time Communication:** WebSocket server (`/ws`) for live chat, handling `join`, `message`, and `typing` events, facilitating communication between customers and admins.
- **Data Model:** Core entities include `Product`, `CartItem`, `Order`, `ChatSession`, and `ChatMessage`.
- **Storage:** Currently uses in-memory `MemStorage` (ephemeral; requires migration to persistent storage for production).

### Feature Specifications
- **Product Display:** "Exhibition products" clearly marked with discount and warranty information.
- **Cart & Checkout:** Sidebar with quantity controls, free delivery progress, and a multi-step checkout process with courier selection.
- **Product Catalog:** Comprehensive catalog of 42 Milwaukee tools across 9 categories, with detailed specifications.
- **Navigation:** Category dropdowns in header.
- **Live Chat:** Floating widget for customers and a dedicated admin interface for managing real-time chat sessions, including unread message indicators.
- **Internationalization:** Bilingual (PL/EN) support with IP-based language detection and a currency conversion system.
- **Admin Panel:** Password-protected access to dashboard (orders, revenue) and chat management.

## External Dependencies
- **Frankfurter API:** For real-time currency exchange rates.
- **ipapi.co:** For IP-based user country and language detection.
- **react-icons/si:** For various icons (e.g., payment icons).
- **Shadcn UI:** Re-usable UI components.
- **Zod:** For schema validation.