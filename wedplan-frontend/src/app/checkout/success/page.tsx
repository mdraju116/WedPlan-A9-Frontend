import Link from "next/link";
import { Check } from "lucide-react";
import { stripe } from "@/lib/stripe";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { getServerToken } from "@/lib/access-jwt-at-server-component";

type Props = { searchParams: Promise<{ session_id?: string }> };

export default async function CheckoutSuccessPage({ searchParams }: Props) {
    const { session_id: sessionId } = await searchParams;
    if (!sessionId) {
        return <StatusCard message="We couldn't find the checkout session. Please contact support if your payment was charged." />;
    }

    let checkoutSession;
    try {
        checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);
    } catch {
        return <StatusCard message="We couldn't verify this checkout session. Please contact support if your payment was charged." />;
    }

    if (checkoutSession.status !== "complete" || checkoutSession.mode !== "subscription") {
        return <StatusCard message="Your checkout is not complete yet. Please wait a moment or return to services." />;
    }

    const user = await getCurrentUser();
    const supportedRole = user?.role === "Vendor" || user?.role === "Customer";
    const paymentConfirmed = checkoutSession.payment_status === "paid" || checkoutSession.payment_status === "no_payment_required";
    let planSynced = false;

    if (supportedRole && process.env.NEXT_PUBLIC_SERVER_BASE_URL) {
        try {
            const token = await getServerToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/payments/confirm`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ sessionId }),
                cache: "no-store",
            });
            planSynced = response.ok;
            if (!response.ok) {
                console.error(`Subscription confirmation returned HTTP ${response.status} for ${user.role}.`);
            }
        } catch {
            console.error(`Subscription confirmation request failed for ${user.role}.`);
        }
    }

    const subscriptionHref = user?.role === "Vendor"
        ? "/dashboard/vendor/subscription"
        : user?.role === "Customer"
            ? "/dashboard/customer/subscription"
            : "/services";
    const pendingSubscriptionHref = `${subscriptionHref}?session_id=${encodeURIComponent(sessionId)}`;

    return (
        <section className="flex min-h-[70vh] items-center justify-center bg-[#fbf7f1] px-4 py-12">
            <div className="w-full max-w-lg rounded-3xl border border-[#eadfd4] bg-white p-8 text-center shadow-xl sm:p-10">
                <div className={`mx-auto flex size-14 items-center justify-center rounded-full ${paymentConfirmed ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`} aria-hidden="true">
                    {paymentConfirmed ? <Check className="size-7" strokeWidth={2.5} /> : <span className="text-2xl">…</span>}
                </div>
                <h1 className="mt-5 font-serif text-3xl text-[#35213b]">
                    {paymentConfirmed ? "Payment successful" : "Checkout processing"}
                </h1>
                <p className="mt-3 text-sm leading-6 text-[#71646e]">
                    {planSynced
                        ? "Your payment is confirmed and your Premium plan is active."
                        : paymentConfirmed
                            ? "Your payment is confirmed. Open your subscription page to finish syncing and view your Premium status."
                            : "Stripe is still processing the checkout. Your subscription page will show your plan once it is confirmed."}
                </p>
                <Link
                    href={planSynced ? subscriptionHref : supportedRole ? pendingSubscriptionHref : "/services"}
                    className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#392340] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#513052]"
                >
                    {supportedRole ? "Go to subscription page" : "Explore services"}
                </Link>
            </div>
        </section>
    );
}

function StatusCard({ message }: { message: string }) {
    return (
        <section className="flex min-h-[70vh] items-center justify-center bg-[#fbf7f1] px-4 py-12">
            <div className="w-full max-w-lg rounded-3xl border border-[#eadfd4] bg-white p-8 text-center shadow-xl sm:p-10">
                <h1 className="font-serif text-3xl text-[#35213b]">Checkout status</h1>
                <p className="mt-3 text-sm leading-6 text-[#71646e]">{message}</p>
                <Link href="/services" className="mt-7 inline-flex rounded-full bg-[#392340] px-6 py-3 text-sm font-semibold text-white">Back to services</Link>
            </div>
        </section>
    );
}
