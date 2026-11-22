"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { getClientToken } from "@/lib/access-jwt-at-client-component";

export default function SubscriptionPortalButton() {
    const [loading, setLoading] = useState(false);

    const openPortal = async () => {
        setLoading(true);
        try {
            const token = await getClientToken();
            if (!token) throw new Error("Authentication required");
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/payments/portal`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            });
            const result = await response.json();
            if (!response.ok || !result.data?.url) throw new Error(result.message || "Unable to open subscription settings");
            window.location.assign(result.data.url);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Unable to open subscription settings");
            setLoading(false);
        }
    };

    return <Button type="button" variant="outline" className="mt-3 w-full" onClick={openPortal} disabled={loading}>{loading ? "Opening Stripe..." : "Manage or cancel subscription"}</Button>;
}
