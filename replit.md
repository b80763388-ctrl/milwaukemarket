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
- **Real-time Communication:** WebSocket server (`/ws`) for live chat, supporting `join`, `message`, and `typing` events.
- **Data Model:** Core entities include `Product`, `CartItem`, `Order`, `ChatSession`, and `ChatMessage`.
- **Storage:** Currently uses in-memory `MemStorage` (ephemeral; requires migration to persistent storage).
- **Admin Security:** Admin password secured via Replit Secrets.

### Feature Specifications
- **Product Display:** Products clearly marked as "Exhibition" with discount and warranty, featuring image galleries with thumbnail navigation. Includes a comprehensive catalog of 45 products across 11 categories.
- **Cart & Checkout:** Sidebar with quantity controls, free delivery progress, and a multi-step checkout process with courier selection. Prominent fulfillment time notice (5-10 business days).
- **Live Chat:** Floating widget for customers and a dedicated admin interface for managing real-time chat sessions.
- **Internationalization:** Bilingual (PL/EN) support with language/currency synchronization. Language change auto-refreshes page to update prices. Automatic email notifications for order confirmations.
- **Admin Panel:** Password-protected access to dashboard (orders, revenue) and chat management functionalities.
- **Customer Reviews:** Carousel of authentic 5-star customer reviews on the homepage.

## External Dependencies
- **Frankfurter API:** For real-time currency exchange rates.
- **ipapi.co:** For IP-based user country and language detection.
- **react-icons/si:** For various icons.
- **Shadcn UI:** Re-usable UI components.
- **Zod:** For schema validation.
- **Resend API:** For sending order confirmation emails.

## Recent Changes

**2025-10-28 (Latest):** Checkout Summary Translation Keys Fixed
- **Issue Resolved**:
  - Fixed missing translation keys in checkout summary section
  - Added `checkout.summary.*` keys to i18n.ts for both PL and EN
  - Keys added: title, quantity, subtotal, shipping, free, total
  - Checkout summary now displays properly translated text instead of translation keys
- **Files Changed**: `client/src/lib/i18n.ts`
- **Result**: Checkout summary section now fully bilingual with proper translations

**2025-10-28 (Earlier):** Terms & Privacy Pages Readability Improved
- **Enhanced Text Visibility**:
  - Changed from dark gray text (`text-muted-foreground`) to bright white/gray
  - Headings: `text-white` for maximum contrast
  - Body text: `text-gray-300` for excellent readability
  - Dates: `text-gray-400` for subtle contrast
  - Added gradient background: `from-slate-900 via-gray-900 to-zinc-900`
  - Contact cards: Semi-transparent slate background with border
- **Files Changed**: `client/src/pages/TermsPage.tsx`, `client/src/pages/PrivacyPage.tsx`
- **Result**: Terms and Privacy pages now have excellent readability on dark background

**2025-10-28 (Earlier):** GLS & UPS Couriers Added + Company Checkout Translation
- **New Courier Options Added**:
  - Added GLS and UPS to available courier options
  - Total of 5 couriers: InPost, DPD, DHL, GLS, UPS
  - Courier logos displayed on checkout page
  - Fully bilingual support (PL/EN)
  - Database schema updated to support new couriers
- **Files Changed**: `shared/schema.ts`, `client/src/lib/i18n.ts`, `client/src/pages/CheckoutPage.tsx`
- **Assets Added**: GLS logo (`image_1761659833145.png`), UPS logo (`image_1761659857194.png`)
- **Result**: Customers now have more delivery options with professional courier services

**2025-10-28 (Earlier):** Company Checkout Translation + Terms Page EUR Update
- **Company Fields Fully Translated on Checkout**:
  - "Nazwa firmy" / "Company name" with proper placeholders
  - "NIP" (Poland) / "VAT Number" (International) - appropriate for EU customers
  - VAT invoice note: "Faktura VAT zostanie dołączona do przesyłki" / "VAT invoice will be included with the shipment"
  - Validation messages translated using i18n keys
  - Removed NIP length restriction (was 10 digits) to support international VAT numbers
- **Terms Page Currency Updated**:
  - English version: Changed from "Polish zloty (PLN)" to "Euro (EUR)"
  - Aligns with international customer base
  - Polish version remains PLN
- **Files Changed**: `client/src/lib/i18n.ts`, `client/src/pages/CheckoutPage.tsx`, `client/src/pages/TermsPage.tsx`
- **Result**: Complete bilingual support for B2B checkout with proper EU VAT number handling

**2025-10-28 (Earlier):** Fulfillment Time Updated to 5-10 Days Site-Wide
- **Email Template Updated**:
  - Polish: "Czas realizacji: 5-10 dni roboczych"
  - English: "Fulfillment time: 5-10 business days"
  - Updated in order confirmation emails
- **Terms Page Updated**:
  - Polish: "Standardowy czas realizacji zamówienia wynosi od 5 do 10 dni roboczych"
  - English: "Standard order fulfillment time is 5 to 10 business days"
  - Updated in §5 Delivery section
- **Files Changed**: `server/email.ts`, `client/src/pages/TermsPage.tsx`
- **Result**: All fulfillment time references now consistently show 5-10 business days across entire site

**2025-10-28 (Earlier):** Terms Acceptance + Mobile Hero Optimization
- **Terms and Conditions Checkbox Added to Checkout**:
  - Required checkbox with link to terms page (/regulamin)
  - User must accept terms before placing order
  - Submit button disabled until terms accepted
  - Error message if form submitted without accepting terms
  - Fully bilingual: "Akceptuję regulamin sklepu" / "I accept the terms and conditions"
- **Mobile Hero Section Fully Optimized**:
  - Increased mobile height to 85vh (from 70vh) to prevent text cutoff
  - Reduced all text sizes for mobile: title from text-4xl to text-2xl
  - Reduced badge, subtitle, icons, and trust badges sizes on mobile
  - Smaller margins and padding throughout hero section
  - Full-width buttons on mobile, inline on tablet+
  - All content (badge, title, subtitle, buttons, trust badges) now fits perfectly without cutoff
- **Files Changed**: `client/src/pages/CheckoutPage.tsx`, `client/src/lib/i18n.ts`, `client/src/pages/HomePage.tsx`