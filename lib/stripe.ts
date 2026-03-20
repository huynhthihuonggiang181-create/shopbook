// =============================================================
// ShopBook - Stripe Client (Mock-Ready)
// =============================================================

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock", {
    apiVersion: "2026-02-25.clover",
    typescript: true,
});

// Create a checkout session for an order
export async function createCheckoutSession(params: {
    orderId: string;
    amount: number;
    customerEmail: string;
}) {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        customer_email: params.customerEmail,
        line_items: [
            {
                price_data: {
                    currency: "vnd",
                    product_data: {
                        name: `Đơn hàng #${params.orderId}`,
                    },
                    unit_amount: params.amount,
                },
                quantity: 1,
            },
        ],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
        metadata: {
            orderId: params.orderId,
        },
    });

    return session;
}
