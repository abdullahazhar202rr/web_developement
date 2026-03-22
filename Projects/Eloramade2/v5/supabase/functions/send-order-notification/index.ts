import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderNotificationRequest {
  email: string;
  orderNumber: string;
  customerName: string;
  status: string;
  items: Array<{ name: string; price: number; quantity: number }>;
  totalAmount: number;
}

const statusMessages: Record<string, { subject: string; message: string }> = {
  confirmed: {
    subject: "Order Confirmed - EloraMate",
    message: "Great news! Your order has been confirmed and is being prepared.",
  },
  rejected: {
    subject: "Order Update - EloraMate",
    message: "We're sorry, but there was an issue with your order. Please contact us for more details.",
  },
  shipped: {
    subject: "Order Shipped - EloraMate",
    message: "Your order is on its way! You'll receive it soon.",
  },
  delivered: {
    subject: "Order Delivered - EloraMate",
    message: "Your order has been delivered. Thank you for shopping with EloraMate!",
  },
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, orderNumber, customerName, status, items, totalAmount }: OrderNotificationRequest = await req.json();

    if (!email || !orderNumber || !status) {
      throw new Error("Missing required fields");
    }

    const statusInfo = statusMessages[status];
    if (!statusInfo) {
      console.log(`No notification configured for status: ${status}`);
      return new Response(JSON.stringify({ message: "No notification sent" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const itemsList = items
      .map((item) => `${item.name} x${item.quantity} - PKR ${item.price * item.quantity}`)
      .join("\n");

    const emailBody = `
Dear ${customerName},

${statusInfo.message}

Order Details:
--------------
Order Number: ${orderNumber}
Status: ${status.charAt(0).toUpperCase() + status.slice(1)}

Items:
${itemsList}

Total: PKR ${totalAmount.toLocaleString()}

If you have any questions, please contact us via WhatsApp or Instagram.

Thank you for choosing EloraMate!

Best regards,
EloraMate Team
    `.trim();

    // For now, log the email (in production, integrate with Resend or similar)
    console.log("Email notification:");
    console.log("To:", email);
    console.log("Subject:", statusInfo.subject);
    console.log("Body:", emailBody);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Notification logged",
        email: email,
        subject: statusInfo.subject 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-order-notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);