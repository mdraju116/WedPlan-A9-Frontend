"use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { toast } from "react-toastify";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getClientToken } from "@/lib/access-jwt-at-client-component";

type BookingRequest = {
    id: string;
    customer: string;
    service: string;
    date: string;
    eventLocation: string;
    amount: number;
    status: "Pending" | "Accepted" | "Rejected" | "Cancelled" | "Completed";
};

export default function BookingRequestsPage() {
    const [requests, setRequests] = useState<BookingRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookingRequests = async () => {
            try {
                const token = await getClientToken();
                if (!token) throw new Error("Authentication required");

                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/bookings/vendor-requests`, {
                    headers: { Authorization: `Bearer ${token}` },
                    cache: "no-store",
                });
                const result = await response.json();
                if (!response.ok) throw new Error(result.message || "Failed to fetch booking requests");

                const formattedRequests: BookingRequest[] = result.data.map((booking: {
                    _id: string;
                    customerName: string;
                    serviceTitle: string;
                    eventDate: string;
                    eventLocation?: string;
                    amount: number;
                    status: BookingRequest["status"];
                }) => ({
                    id: booking._id,
                    customer: booking.customerName,
                    service: booking.serviceTitle,
                    date: new Date(booking.eventDate).toLocaleDateString("en-BD", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    }),
                    eventLocation: booking.eventLocation || "",
                    amount: booking.amount,
                    status: booking.status,
                }));

                setRequests(formattedRequests);
            } catch (error) {
                console.error("Error fetching booking requests:", error);
                toast.error(error instanceof Error ? error.message : "Failed to load booking requests");
            } finally {
                setLoading(false);
            }
        };

        void fetchBookingRequests();
    }, []);

    const handleStatusChange = async (bookingId: string, status: "Accepted" | "Rejected") => {
        setUpdatingId(bookingId);
        try {
            const token = await getClientToken();
            if (!token) throw new Error("Authentication required");

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/bookings/${bookingId}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ status }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to update booking status");

            setRequests((previous) => previous.map((request) => request.id === bookingId ? { ...request, status } : request));
            toast.success(`Booking ${status === "Accepted" ? "accepted" : "rejected"} successfully!`);
        } catch (error) {
            console.error("Booking status update failed:", error);
            toast.error(error instanceof Error ? error.message : "Failed to update booking status");
        } finally {
            setUpdatingId(null);
        }
    };

    const pendingRequests = requests.filter((request) => request.status === "Pending").length;
    const acceptedRequests = requests.filter((request) => request.status === "Accepted").length;

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold">Booking Requests</h1>
                <p className="text-sm text-muted-foreground">Manage booking requests from your customers.</p>
            </header>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                    ["Total Requests", requests.length],
                    ["Pending Requests", pendingRequests],
                    ["Accepted Requests", acceptedRequests],
                ].map(([label, value]) => (
                    <div key={label} className="rounded-xl border p-5">
                        <p className="text-sm text-muted-foreground">{label}</p>
                        <h2 className="mt-2 text-2xl font-bold">{value}</h2>
                    </div>
                ))}
            </div>

            <div className="overflow-hidden rounded-xl border bg-card">
                <div className="border-b p-4">
                    <h2 className="font-semibold">All Booking Requests</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px] table-fixed text-left text-sm">
                        <thead>
                            <tr className="border-b bg-muted/40 text-[11px] uppercase tracking-wide text-muted-foreground">
                                <th scope="col" className="w-[10%] px-3 py-3 font-semibold">Booking ID</th>
                                <th scope="col" className="w-[14%] px-3 py-3 font-semibold">Customer</th>
                                <th scope="col" className="w-[22%] px-3 py-3 font-semibold">Service</th>
                                <th scope="col" className="w-[17%] px-3 py-3 font-semibold">Event details</th>
                                <th scope="col" className="w-[11%] px-3 py-3 font-semibold">Amount</th>
                                <th scope="col" className="w-[9%] px-3 py-3 font-semibold">Status</th>
                                <th scope="col" className="w-[17%] px-3 py-3 font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {loading ? (
                                <tr><td colSpan={7} className="py-10 text-center text-muted-foreground">Loading booking requests...</td></tr>
                            ) : requests.map((request) => (
                                <tr key={request.id} className="align-middle">
                                    <td className="truncate px-3 py-4 text-xs font-medium" title={request.id}>{request.id.slice(0, 8)}...</td>
                                    <td className="break-words px-3 py-4">{request.customer}</td>
                                    <td className="break-words px-3 py-4 font-medium">{request.service}</td>
                                    <td className="px-3 py-4">
                                        <p className="whitespace-nowrap">{request.date}</p>
                                        <p className="mt-0.5 truncate text-xs text-muted-foreground" title={request.eventLocation}>{request.eventLocation || "Location not listed"}</p>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 font-semibold">৳{request.amount.toLocaleString("en-BD")}</td>
                                    <td className="px-3 py-4">
                                        <Badge variant={request.status === "Accepted" ? "default" : request.status === "Rejected" ? "destructive" : "outline"} className="text-xs">
                                            {request.status}
                                        </Badge>
                                    </td>
                                    <td className="px-3 py-4">
                                        {request.status === "Pending" ? (
                                            <div className="flex flex-wrap gap-1.5">
                                                <Button size="sm" className="h-8 px-2 text-xs" disabled={updatingId !== null} onClick={() => handleStatusChange(request.id, "Accepted")}>
                                                    <Check className="size-3.5" />{updatingId === request.id ? "Updating" : "Accept"}
                                                </Button>
                                                <Button size="sm" variant="outline" className="h-8 px-2 text-xs text-destructive hover:text-destructive" disabled={updatingId !== null} onClick={() => handleStatusChange(request.id, "Rejected")}>
                                                    <X className="size-3.5" />Reject
                                                </Button>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">No actions</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {!loading && requests.length === 0 && (
                                <tr><td colSpan={7} className="py-10 text-center text-muted-foreground">No booking requests found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
