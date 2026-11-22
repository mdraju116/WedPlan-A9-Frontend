import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function POST() {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: "Please sign in first" },
                { status: 401 }
            );
        }

        if (user.role !== "Customer") {
            return NextResponse.json(
                { error: "Only customers can purchase Premium" },
                { status: 403 }
            );
        }

        if (
            user.subscriptionPlan === "Premium" &&
            user.subscriptionExpiresAt &&
            new Date(user.subscriptionExpiresAt) > new Date()
        ) {
            return NextResponse.json(
                { error: "You already have an active subscription" },
                { status: 400 }
            );
        }

        const priceId = process.env.STRIPE_PREMIUM_PRICE_ID;
        const appUrl = process.env.BETTER_AUTH_URL;

        if (!priceId || !appUrl) {
            throw new Error("Stripe configuration is missing");
        }

        const session = await stripe.checkout.sessions.create({
            mode: "subscription",

            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],

            customer_email: user.email,
            client_reference_id: user.id,

            metadata: {
                userId: user.id,
            },

            subscription_data: {
                metadata: {
                    userId: user.id,
                },
            },

            success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${appUrl}/checkout?canceled=true`,
        });

        if (!session.url) {
            throw new Error("Checkout URL unavailable");
        }

        return NextResponse.redirect(session.url, 303);

    } catch (error) {
        console.error("Checkout error:", error);

        return NextResponse.json(
            { error: "Unable to create checkout session" },
            { status: 500 }
        );
    }
}