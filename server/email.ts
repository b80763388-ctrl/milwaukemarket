import { Resend } from 'resend';
import type { Order } from '@shared/schema';

const resend = new Resend(process.env.RESEND_API_KEY);

type Language = 'pl' | 'en';
type Currency = 'PLN' | 'EUR';

const emailTranslations = {
  pl: {
    subject: 'Potwierdzenie zamówienia',
    headerSubtitle: 'Profesjonalne narzędzia Milwaukee & Makita',
    orderAccepted: 'Zamówienie Przyjęte!',
    thankYou: 'Dziękujemy za zakupy w Tools Shop',
    orderDetails: 'Szczegóły Zamówienia',
    orderNumber: 'Numer zamówienia:',
    orderDate: 'Data złożenia:',
    status: 'Status:',
    statusPending: 'Oczekuje na płatność',
    orderedProducts: 'Zamówione Produkty',
    product: 'Produkt',
    quantity: 'Ilość',
    price: 'Cena',
    totalToPay: 'RAZEM DO ZAPŁATY:',
    shippingData: 'Dane Do Wysyłki',
    courier: 'Kurier:',
    fulfillmentTime: '⏰ Czas realizacji: 7-14 dni roboczych od momentu złożenia zamówienia. Wszystkie produkty są sprowadzane z EU oraz US.',
    whatNext: 'Co Dalej?',
    step1: 'Oczekujemy na płatność',
    step2: 'Po zaksięgowaniu płatności rozpoczniemy proces realizacji',
    step3: 'Otrzymasz potwierdzenie wysyłki z numerem przesyłki',
    step4: 'Kurier dostarczy paczkę na wyznaczony adres',
    warranty: '🛡️ Gwarancja: Wszystkie produkty objęte są 12-miesięczną gwarancją Milwaukee/Makita. Produkty powystawowe w bardzo dobrym stanie technicznym.',
    questions: 'Masz pytania? Skontaktuj się z nami:',
    contactInfo: '📧 sklep@tools-shop.pl | ☎️ +48 123 456 789 lub przez chat na stronie',
    copyright: 'Tools Shop - Profesjonalne narzędzia w atrakcyjnych cenach',
  },
  en: {
    subject: 'Order Confirmation',
    headerSubtitle: 'Professional Milwaukee & Makita Tools',
    orderAccepted: 'Order Accepted!',
    thankYou: 'Thank you for shopping at Tools Shop',
    orderDetails: 'Order Details',
    orderNumber: 'Order number:',
    orderDate: 'Order date:',
    status: 'Status:',
    statusPending: 'Awaiting payment',
    orderedProducts: 'Ordered Products',
    product: 'Product',
    quantity: 'Quantity',
    price: 'Price',
    totalToPay: 'TOTAL TO PAY:',
    shippingData: 'Shipping Information',
    courier: 'Courier:',
    fulfillmentTime: '⏰ Fulfillment time: 7-14 business days from order placement. All products are sourced from EU and US.',
    whatNext: 'What\'s Next?',
    step1: 'We are waiting for payment',
    step2: 'After payment confirmation, we will start order processing',
    step3: 'You will receive shipping confirmation with tracking number',
    step4: 'Courier will deliver the package to your address',
    warranty: '🛡️ Warranty: All products come with 12-month Milwaukee/Makita warranty. Exhibition products in excellent technical condition.',
    questions: 'Have questions? Contact us:',
    contactInfo: '📧 sklep@tools-shop.pl | ☎️ +48 123 456 789 or via chat on website',
    copyright: 'Tools Shop - Professional tools at attractive prices',
  },
};

interface OrderEmailData {
  order: Order;
  products: Array<{
    name: string;
    quantity: number;
    price: string;
  }>;
  language?: Language;
  currency?: Currency;
}

export async function sendOrderConfirmationEmail(data: OrderEmailData): Promise<void> {
  const { order, products, language = 'pl', currency = 'PLN' } = data;
  const t = emailTranslations[language];
  
  // Currency symbol
  const currencySymbol = currency === 'PLN' ? 'zł' : '€';
  const locale = language === 'pl' ? 'pl-PL' : 'en-US';
  
  // Format products list for email
  const productsHtml = products.map(p => `
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 12px 8px;">${p.name}</td>
      <td style="padding: 12px 8px; text-align: center;">${p.quantity}</td>
      <td style="padding: 12px 8px; text-align: right; font-weight: 600;">${p.price} ${currencySymbol}</td>
    </tr>
  `).join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">TOOLS SHOP</h1>
          <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.9;">${t.headerSubtitle}</p>
        </div>

        <!-- Main Content -->
        <div style="background: #ffffff; padding: 30px 20px; border: 1px solid #e5e7eb; border-top: none;">
          <!-- Success Message -->
          <div style="background: #d1fae5; border: 2px solid #10b981; border-radius: 8px; padding: 20px; margin-bottom: 30px; text-align: center;">
            <h2 style="color: #065f46; margin: 0 0 8px 0; font-size: 24px;">✓ ${t.orderAccepted}</h2>
            <p style="color: #047857; margin: 0; font-size: 16px;">${t.thankYou}</p>
          </div>

          <!-- Order Info -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #b91c1c; margin: 0 0 16px 0; font-size: 18px; border-bottom: 2px solid #b91c1c; padding-bottom: 8px;">${t.orderDetails}</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">${t.orderNumber}</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600; font-family: monospace;">#${order.id.substring(0, 8).toUpperCase()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">${t.orderDate}</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600;">${new Date(order.createdAt).toLocaleDateString(locale, { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">${t.status}</td>
                <td style="padding: 8px 0; text-align: right;">
                  <span style="background: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">${t.statusPending}</span>
                </td>
              </tr>
            </table>
          </div>

          <!-- Products -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #b91c1c; margin: 0 0 16px 0; font-size: 18px; border-bottom: 2px solid #b91c1c; padding-bottom: 8px;">${t.orderedProducts}</h3>
            <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 8px;">
              <thead>
                <tr style="background: #f9fafb; border-bottom: 2px solid #e5e7eb;">
                  <th style="padding: 12px 8px; text-align: left; font-weight: 600; color: #374151;">${t.product}</th>
                  <th style="padding: 12px 8px; text-align: center; font-weight: 600; color: #374151;">${t.quantity}</th>
                  <th style="padding: 12px 8px; text-align: right; font-weight: 600; color: #374151;">${t.price}</th>
                </tr>
              </thead>
              <tbody>
                ${productsHtml}
              </tbody>
              <tfoot>
                <tr style="background: #f9fafb; border-top: 2px solid #b91c1c;">
                  <td colspan="2" style="padding: 16px 8px; font-weight: 600; font-size: 16px;">${t.totalToPay}</td>
                  <td style="padding: 16px 8px; text-align: right; font-weight: bold; font-size: 18px; color: #b91c1c;">${order.totalAmount} ${currencySymbol}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <!-- Delivery Info -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #b91c1c; margin: 0 0 16px 0; font-size: 18px; border-bottom: 2px solid #b91c1c; padding-bottom: 8px;">${t.shippingData}</h3>
            <div style="background: #f9fafb; padding: 16px; border-radius: 8px; border-left: 4px solid #b91c1c;">
              <p style="margin: 0 0 4px 0; font-weight: 600; font-size: 16px;">${order.firstName} ${order.lastName}</p>
              <p style="margin: 4px 0; color: #6b7280;">${order.address}</p>
              <p style="margin: 4px 0; color: #6b7280;">${order.postalCode} ${order.city}</p>
              <p style="margin: 4px 0; color: #6b7280;">Tel: ${order.phone}</p>
              <p style="margin: 4px 0; color: #6b7280;">${t.courier} <strong>${order.courier.toUpperCase()}</strong></p>
            </div>
          </div>

          <!-- Fulfillment Time Warning -->
          <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 4px; margin-bottom: 30px;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>${t.fulfillmentTime}</strong>
            </p>
          </div>

          <!-- Next Steps -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #b91c1c; margin: 0 0 16px 0; font-size: 18px; border-bottom: 2px solid #b91c1c; padding-bottom: 8px;">${t.whatNext}</h3>
            <ol style="margin: 0; padding-left: 20px; color: #374151;">
              <li style="margin-bottom: 12px;">${t.step1}</li>
              <li style="margin-bottom: 12px;">${t.step2}</li>
              <li style="margin-bottom: 12px;">${t.step3}</li>
              <li style="margin-bottom: 12px;">${t.step4}</li>
            </ol>
          </div>

          <!-- Warranty Info -->
          <div style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 4px; margin-bottom: 20px;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              <strong>${t.warranty}</strong>
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f9fafb; padding: 20px; text-align: center; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px;">${t.questions}</p>
          <p style="margin: 0; color: #b91c1c; font-weight: 600;">
            ${t.contactInfo}
          </p>
          <p style="margin: 16px 0 0 0; color: #9ca3af; font-size: 12px;">
            © ${new Date().getFullYear()} ${t.copyright}
          </p>
        </div>
      </body>
    </html>
  `;

  try {
    const result = await resend.emails.send({
      from: 'Tools Shop <zamowienia@tools-shop-sretensky.com>',
      to: order.email,
      subject: `✓ ${t.subject} #${order.id.substring(0, 8).toUpperCase()} - Tools Shop`,
      html: htmlContent,
    });

    console.log(`[EMAIL] ✅ Order confirmation sent successfully!`);
    console.log(`[EMAIL]    → To: ${order.email}`);
    console.log(`[EMAIL]    → Order: ${order.id}`);
    console.log(`[EMAIL]    → Resend ID: ${result.data?.id || 'N/A'}`);
  } catch (error: any) {
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('[EMAIL] ❌ FAILED to send order confirmation email');
    console.error('[EMAIL]    → To:', order.email);
    console.error('[EMAIL]    → Order:', order.id);
    console.error('[EMAIL]    → Error:', error?.message || error);
    console.error('[EMAIL]    → Full error:', JSON.stringify(error, null, 2));
    
    if (error?.message?.includes('API key')) {
      console.error('[EMAIL] ⚠️  RESEND_API_KEY missing or invalid!');
      console.error('[EMAIL]    → Add RESEND_API_KEY in deployment secrets');
    }
    
    if (error?.message?.includes('sandbox') || error?.statusCode === 403) {
      console.error('[EMAIL] ⚠️  SANDBOX MODE - Can only send to verified addresses!');
      console.error('[EMAIL]    → Solution 1: Verify your domain at https://resend.com/domains');
      console.error('[EMAIL]    → Solution 2: Add test emails at https://resend.com/audiences');
      console.error('[EMAIL]    → Solution 3: Upgrade to paid plan');
    }
    
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    // Nie rzucamy błędu - zamówienie zostało złożone, email jest nice-to-have
  }
}
