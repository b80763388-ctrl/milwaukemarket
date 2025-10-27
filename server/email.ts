import { Resend } from 'resend';
import type { Order } from '@shared/schema';

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderEmailData {
  order: Order;
  products: Array<{
    name: string;
    quantity: number;
    price: string;
  }>;
}

export async function sendOrderConfirmationEmail(data: OrderEmailData): Promise<void> {
  const { order, products } = data;
  
  // Format products list for email
  const productsHtml = products.map(p => `
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 12px 8px;">${p.name}</td>
      <td style="padding: 12px 8px; text-align: center;">${p.quantity}</td>
      <td style="padding: 12px 8px; text-align: right; font-weight: 600;">${p.price} zł</td>
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
          <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.9;">Profesjonalne narzędzia Milwaukee & Makita</p>
        </div>

        <!-- Main Content -->
        <div style="background: #ffffff; padding: 30px 20px; border: 1px solid #e5e7eb; border-top: none;">
          <!-- Success Message -->
          <div style="background: #d1fae5; border: 2px solid #10b981; border-radius: 8px; padding: 20px; margin-bottom: 30px; text-align: center;">
            <h2 style="color: #065f46; margin: 0 0 8px 0; font-size: 24px;">✓ Zamówienie Przyjęte!</h2>
            <p style="color: #047857; margin: 0; font-size: 16px;">Dziękujemy za zakupy w Tools Shop</p>
          </div>

          <!-- Order Info -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #b91c1c; margin: 0 0 16px 0; font-size: 18px; border-bottom: 2px solid #b91c1c; padding-bottom: 8px;">Szczegóły Zamówienia</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Numer zamówienia:</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600; font-family: monospace;">#${order.id.substring(0, 8).toUpperCase()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Data złożenia:</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600;">${new Date(order.createdAt).toLocaleDateString('pl-PL', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Status:</td>
                <td style="padding: 8px 0; text-align: right;">
                  <span style="background: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">Oczekuje na płatność</span>
                </td>
              </tr>
            </table>
          </div>

          <!-- Products -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #b91c1c; margin: 0 0 16px 0; font-size: 18px; border-bottom: 2px solid #b91c1c; padding-bottom: 8px;">Zamówione Produkty</h3>
            <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 8px;">
              <thead>
                <tr style="background: #f9fafb; border-bottom: 2px solid #e5e7eb;">
                  <th style="padding: 12px 8px; text-align: left; font-weight: 600; color: #374151;">Produkt</th>
                  <th style="padding: 12px 8px; text-align: center; font-weight: 600; color: #374151;">Ilość</th>
                  <th style="padding: 12px 8px; text-align: right; font-weight: 600; color: #374151;">Cena</th>
                </tr>
              </thead>
              <tbody>
                ${productsHtml}
              </tbody>
              <tfoot>
                <tr style="background: #f9fafb; border-top: 2px solid #b91c1c;">
                  <td colspan="2" style="padding: 16px 8px; font-weight: 600; font-size: 16px;">RAZEM DO ZAPŁATY:</td>
                  <td style="padding: 16px 8px; text-align: right; font-weight: bold; font-size: 18px; color: #b91c1c;">${order.totalAmount} zł</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <!-- Delivery Info -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #b91c1c; margin: 0 0 16px 0; font-size: 18px; border-bottom: 2px solid #b91c1c; padding-bottom: 8px;">Dane Do Wysyłki</h3>
            <div style="background: #f9fafb; padding: 16px; border-radius: 8px; border-left: 4px solid #b91c1c;">
              <p style="margin: 0 0 4px 0; font-weight: 600; font-size: 16px;">${order.firstName} ${order.lastName}</p>
              <p style="margin: 4px 0; color: #6b7280;">${order.address}</p>
              <p style="margin: 4px 0; color: #6b7280;">${order.postalCode} ${order.city}</p>
              <p style="margin: 4px 0; color: #6b7280;">Tel: ${order.phone}</p>
              <p style="margin: 4px 0; color: #6b7280;">Kurier: <strong>${order.courier.toUpperCase()}</strong></p>
            </div>
          </div>

          <!-- Fulfillment Time Warning -->
          <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 4px; margin-bottom: 30px;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>⏰ Czas realizacji:</strong> 7-14 dni roboczych od momentu złożenia zamówienia. Wszystkie produkty są sprowadzane ze Stanów Zjednoczonych (US).
            </p>
          </div>

          <!-- Next Steps -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #b91c1c; margin: 0 0 16px 0; font-size: 18px; border-bottom: 2px solid #b91c1c; padding-bottom: 8px;">Co Dalej?</h3>
            <ol style="margin: 0; padding-left: 20px; color: #374151;">
              <li style="margin-bottom: 12px;">Oczekujemy na płatność za zamówienie</li>
              <li style="margin-bottom: 12px;">Po zaksięgowaniu płatności rozpoczniemy proces realizacji</li>
              <li style="margin-bottom: 12px;">Otrzymasz potwierdzenie wysyłki z numerem przesyłki</li>
              <li style="margin-bottom: 12px;">Kurier dostarczy paczkę w ciągu 7-14 dni roboczych</li>
            </ol>
          </div>

          <!-- Warranty Info -->
          <div style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 4px; margin-bottom: 20px;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              <strong>🛡️ Gwarancja:</strong> Wszystkie produkty objęte są 12-miesięczną gwarancją Milwaukee/Makita. Produkty powystawowe w bardzo dobrym stanie technicznym.
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f9fafb; padding: 20px; text-align: center; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px;">Masz pytania? Skontaktuj się z nami:</p>
          <p style="margin: 0; color: #b91c1c; font-weight: 600;">
            📧 sklep@tools-shop.pl | ☎️ +48 123 456 789
          </p>
          <p style="margin: 16px 0 0 0; color: #9ca3af; font-size: 12px;">
            © ${new Date().getFullYear()} Tools Shop - Profesjonalne narzędzia w atrakcyjnych cenach
          </p>
        </div>
      </body>
    </html>
  `;

  try {
    await resend.emails.send({
      from: 'Tools Shop <onboarding@resend.dev>', // W przyszłości zmień na własną domenę
      to: order.email,
      subject: `✓ Potwierdzenie zamówienia #${order.id.substring(0, 8).toUpperCase()} - Tools Shop`,
      html: htmlContent,
    });

    console.log(`[EMAIL] Order confirmation sent to ${order.email} for order ${order.id}`);
  } catch (error) {
    console.error('[EMAIL] Failed to send order confirmation:', error);
    // Nie rzucamy błędu - zamówienie zostało złożone, email jest nice-to-have
  }
}
