import { Check, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDashboardPaths } from "@/lib/getDashboardPaths";
import { getServerToken } from "@/lib/access-jwt-at-server-component";
import SubscriptionPortalButton from "@/components/dashboard/SubscriptionPortalButton";

export default async function CustomerSubscriptionPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string }>;
}) {
    const { session_id: sessionId } = await searchParams;
    let customer = await getDashboardPaths(["Customer"]);
    const isPremiumActive = () => customer.subscriptionPlan === "Premium" && customer.subscriptionExpiresAt && new Date(customer.subscriptionExpiresAt) > new Date();

    if (!isPremiumActive() && process.env.NEXT_PUBLIC_SERVER_BASE_URL) {
        try {
            const token = await getServerToken();

            if (sessionId) {
                const confirmation = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/payments/confirm`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ sessionId }),
                    cache: "no-store",
                });
                if (confirmation.ok) {
                    customer = await getDashboardPaths(["Customer"]);
                }
            }

            if (!isPremiumActive()) {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/payments/refresh-subscription`, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                    cache: "no-store",
                });
                if (response.ok) {
                    customer = await getDashboardPaths(["Customer"]);
                }
            }
        } catch (error) {
            console.error("Subscription refresh error:", error);
        }
    }

    const premiumActive = customer.subscriptionPlan === "Premium" && customer.subscriptionExpiresAt && new Date(customer.subscriptionExpiresAt) > new Date();

    return (
        <div className="mx-auto max-w-4xl space-y-8">
            <header>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Customer plan</p>
                <h1 className="mt-2 text-3xl font-bold">Subscription</h1>
                <p className="mt-2 text-muted-foreground">Choose the plan that fits your wedding planning.</p>
            </header>
            <div className="grid gap-5 md:grid-cols-2">
                <section className={`rounded-2xl border p-6 ${!premiumActive ? "border-amber-400 bg-amber-50/50" : "bg-card"}`}>
                    <h2 className="text-xl font-semibold">Free</h2>
                    <p className="mt-2 text-3xl font-bold">$0<span className="text-sm font-normal text-muted-foreground"> / month</span></p>
                    <ul className="mt-6 space-y-3 text-sm">{["Browse wedding services", "Book up to 3 services", "Customer dashboard"].map((feature) => <li key={feature} className="flex items-center gap-2"><Check className="size-4 text-emerald-700" />{feature}</li>)}</ul>
                    {!premiumActive && <p className="mt-6 rounded-lg bg-muted p-3 text-sm font-medium">Your current plan</p>}
                </section>
                <section className={`rounded-2xl border p-6 ${premiumActive ? "border-amber-400 bg-amber-50/50" : "bg-card"}`}>
                    <div className="flex items-center gap-2"><Crown className="size-5 text-amber-600" /><h2 className="text-xl font-semibold">Premium</h2></div>
                    <p className="mt-2 text-3xl font-bold">$20<span className="text-sm font-normal text-muted-foreground"> / month</span></p>
                    <ul className="mt-6 space-y-3 text-sm">{["Unlimited service bookings", "Keep planning without booking limits", "Everything in Free"].map((feature) => <li key={feature} className="flex items-center gap-2"><Check className="size-4 text-emerald-700" />{feature}</li>)}</ul>
                    {premiumActive ? <><p className="mt-6 rounded-lg bg-emerald-50 p-3 text-sm font-medium text-emerald-800">Premium is active{customer.subscriptionExpiresAt ? ` through ${new Date(customer.subscriptionExpiresAt).toLocaleDateString()}` : ""}.</p><SubscriptionPortalButton /></> : <form action="/api/checkout_sessions" method="POST" className="mt-6"><Button type="submit" className="w-full">Upgrade to Premium</Button></form>}
                </section>
            </div>
            <p className="text-sm text-muted-foreground">If a recent payment has not appeared yet, this page checks Stripe again when it loads.</p>
        </div>
    );
}
