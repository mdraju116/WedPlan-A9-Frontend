
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { auth, ensureAuthDbConnection } from "@/lib/auth";

export async function POST() {
    try {
        await ensureAuthDbConnection();
        // Get fresh user session without cookie cache
        const session = await auth.api.getSession({
            headers: await headers(),
            query: {
                disableCookieCache: true,
            },
        });

        const user = session?.user;

        if (!user) {
            return NextResponse.json(
                { error: "Please sign in first" },
                { status: 401 }
            );
        }

        // Allow only Customers and Vendors
        if (user.role !== "Customer" && user.role !== "Vendor") {
            return NextResponse.json(
                { error: "Only customers and vendors can purchase Premium" },
                { status: 403 }
            );
        }

        // Check active subscription
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

        const sessionData = await stripe.checkout.sessions.create({
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

        if (!sessionData.url) {
            throw new Error("Checkout URL unavailable");
        }

        return NextResponse.redirect(sessionData.url, 303);

    } catch (error) {
        console.error("Checkout error:", error);

        return NextResponse.json(
            { error: "Unable to create checkout session" },
            { status: 500 }
        );
    }
}
