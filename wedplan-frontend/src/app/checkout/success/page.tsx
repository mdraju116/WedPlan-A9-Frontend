import Link from "next/link";
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
    let planSynced = false;
    if (user?.role === "Vendor" && process.env.NEXT_PUBLIC_SERVER_BASE_URL) {
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
        } catch (error) {
            console.error("Subscription confirmation failed:", error);
        }
    }

    return (
        <section className="flex min-h-[70vh] items-center justify-center bg-[#fbf7f1] px-4 py-12">
            <div className="w-full max-w-lg rounded-3xl border border-[#eadfd4] bg-white p-8 text-center shadow-xl sm:p-10">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-50 text-2xl text-emerald-700">✓</div>
                <h1 className="mt-5 font-serif text-3xl text-[#35213b]">Payment successful</h1>
                <p className="mt-3 text-sm leading-6 text-[#71646e]">
                    {planSynced
                        ? "Your Premium plan is active. You can manage your subscription from your vendor dashboard."
                        : "Your payment is confirmed. Your Premium plan is syncing and should appear in your vendor dashboard shortly."}
                </p>
                <Link
                    href={user?.role === "Vendor" ? "/dashboard/vendor/subscription" : "/services"}
                    className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#392340] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#513052]"
                >
                    {user?.role === "Vendor" ? "View subscription" : "Explore services"}
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
