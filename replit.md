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

## Recent Changes

**2025-10-28 (Latest):** Complete UI Internationalization + Reviews Translation
- **"View All Products" Button Fixed**:
  - Changed from invisible outline variant to prominent red button
  - Now clearly visible with Milwaukee red background and shadow
  - Matches hero section CTA styling
- **Currency Conversion Throughout Site**:
  - Changed all hardcoded "500 PLN" references to "€115" in English version
  - Updated: trust badges, shipping modal, terms page, customer reviews
  - Free shipping threshold properly converts: PL→500 zł, EN→€115
  - Added helper function `getFreeShippingThreshold()` for dynamic conversion
- **Checkout Page Full Translation**:
  - "Order Summary" / "Podsumowanie Zamówienia"
  - "Quantity:" / "Ilość:"
  - "Subtotal" / "Suma częściowa"
  - "Shipping" / "Dostawa"
  - "FREE" / "DARMOWA"
  - "Total" / "Suma"
  - All summary fields now properly translate based on language selection
- **Customer Reviews Professions Translated**:
  - All reviewer roles now bilingual (Construction Worker, Carpenter, Electrician, etc.)
  - Reviews component uses `review.role[language]` for proper translation
  - 9 professions translated: Budowlanka→Construction Worker, Stolarz→Carpenter, Elektryk→Electrician, etc.
- **Files Changed**: `client/src/pages/HomePage.tsx`, `client/src/lib/i18n.ts`, `client/src/components/ShippingPaymentModal.tsx`, `client/src/pages/TermsPage.tsx`, `client/src/components/Reviews.tsx`, `client/src/pages/CheckoutPage.tsx`
- **Result**: Complete bilingual experience - all UI elements, currency amounts, and professional titles properly translate

**2025-10-28 (Earlier):** Email Template Internationalization + Language/Currency Support
- **Email Template Redesigned**:
  - Updated to exact format requested by user (table layout, clear sections)
  - Added "lub przez chat na stronie" / "or via chat on website" to contact info
  - Changed fulfillment message from "US only" to "EU oraz US" / "EU and US"
  - Professional layout matching brand style (Milwaukee red gradient header)
- **Bilingual Email System**:
  - Email automatically sent in user's selected language (PL/EN)
  - All email content translated: subject, headers, product table, shipping info, warranty
  - Date formatting adapts to language (Polish: "28 października 2025", English: "October 28, 2025")
  - Currency symbols match language selection (PLN → zł, EUR → €)
- **Language/Currency Integration**:
  - Added `language` and `currency` fields to Orders schema
  - CheckoutPage now sends user's language and currency with order
  - Backend passes language/currency to email sending function
  - Email template uses correct locale and currency formatting
- **Email Translations Include**:
  - Order confirmation messages, product details, shipping information
  - "What's Next?" steps, warranty information, contact details
  - All status labels, table headers, and call-to-action text
- **Files Changed**: `server/email.ts`, `server/routes.ts`, `client/src/pages/CheckoutPage.tsx`, `client/src/lib/i18n.ts`, `shared/schema.ts`
- **Database Updated**: Added `language` and `currency` columns to `orders` table
- **Result**: Complete bilingual email system - customers receive order confirmation in their chosen language with correct currency formatting

**2025-10-28 (Earlier):** ProductDetailPage Full Internationalization + Currency Conversion + Visibility Fix
- **Full Translation of Product Detail Page**:
  - All UI elements translated: breadcrumbs, buttons ("Add to Cart", "Back to Home"), labels
  - Product info: "Available", "Out of stock", "Original price", "Exhibition price", "You save"
  - Trust icons: "Warranty" / "12 months", "Free shipping" / "From €115"
  - Section headings: "Product Description", "Technical Specifications", "Product Condition", "Warranty"
  - Accordion content: condition text and warranty text fully translated
  - "Includes battery and charger" message translated
  - "Product Dimensions" section with "width × depth × height" label translated
- **Dynamic Currency Conversion**:
  - Prices automatically convert based on selected language/currency
  - Polish (PL) → PLN (zł), English (EN) → EUR (€)
  - Real-time conversion using Frankfurter API
  - All prices on product detail page: original, exhibition, savings - all properly converted
  - Loading state (..."..") while conversion happens
- **Improved Text Visibility**:
  - Trust icons text: changed from `text-muted-foreground` to `text-white/80` (was invisible on dark background)
  - "12 miesięcy" / "12 months" now clearly visible
  - "Od 500 zł" / "From €115" now clearly visible  
  - All labels changed to `text-white` for better contrast
  - Section headings use `text-white` with `hover:text-white`
- **Files Changed**: `client/src/pages/ProductDetailPage.tsx`, `client/src/lib/i18n.ts`
- **Result**: Complete bilingual product detail experience with automatic currency conversion and perfect visibility

**2025-10-28 (Earlier):** Full Product Catalog Translation + Breadcrumbs Fix + Footer/HomePage Translations
- **ALL 43 Products Fully Translated**:
  - Added `descriptionEn` field to Product schema (server/storage.ts and shared/schema.ts)
  - ALL 43 products now have professional English translations for names (nameEn) and descriptions (descriptionEn)
  - Product categories covered: Drills, Impact Wrenches, Hammers, Saws, Grinders, Combo Kits, Accessories, Workshop Carts, Lasers, Makita Sets, Milwaukee Specialty Sets
  - Technical specifications, voltages, torque values, and model numbers preserved exactly
  - Subagent systematically translated entire product catalog maintaining technical accuracy
- **ProductDetailPage Internationalization**:
  - Added useLanguage hook to ProductDetailPage.tsx
  - Product name displays in correct language: breadcrumb, page title, image alt texts, thumbnail alt texts
  - Product description displays in correct language (descriptionEn when EN, description when PL)
  - All 43 products now display correctly in both Polish and English on detail pages
- **Breadcrumbs Visibility Fixed**:
  - Changed breadcrumb color from `text-muted-foreground` to `text-white/70` in CategoryPage.tsx and ProductDetailPage.tsx
  - Breadcrumbs now clearly visible on dark gradient backgrounds
  - Hover states updated to `text-white` for better UX
- **HomePage & Footer Fully Translated**:
  - Featured Products section: badge, title, subtitle, "View all products" button all use t() translations
  - Newsletter section: title, text, email placeholder, submit button, success messages all translated
  - Footer columns: Products (11 categories), Information, Contact - all links and headings translated
  - Copyright, payment labels, contact hours all bilingual
- **ProductCard Already Supported Translations**:
  - Verified ProductCard component already uses `language === 'en' && product.nameEn ? product.nameEn : product.name`
  - Product names in card lists automatically display in selected language
- **Database Schema Updated**:
  - Added `descriptionEn` column to products table via db:push
  - Schema changes synchronized without data loss
- **Email Sender Fixed**: Changed from `onboarding@resend.dev` to `zamowienia@tools-shop-sretensky.com` (verified domain)
- **Result**: Complete bilingual e-commerce experience - homepage, product catalog, product details, footer, cart all fully available in Polish and English
- **Files Changed**: `shared/schema.ts`, `server/storage.ts` (all 43 products), `client/src/pages/ProductDetailPage.tsx`, `client/src/pages/CategoryPage.tsx`, `client/src/lib/i18n.ts`, `client/src/components/Footer.tsx`, `client/src/pages/HomePage.tsx`, `client/src/pages/CheckoutPage.tsx`