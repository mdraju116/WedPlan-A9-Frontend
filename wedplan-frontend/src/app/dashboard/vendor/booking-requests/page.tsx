
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

    // Fetch vendor booking requests
    useEffect(() => {
        const fetchBookingRequests = async () => {
            try {
                const token = await getClientToken();

                if (!token) return;

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/bookings/vendor-requests`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message || "Failed to fetch booking requests"
                    );
                }

                const formattedRequests: BookingRequest[] = result.data.map(
                    (booking: {
                        _id: string;
                        customerName: string;
                        serviceTitle: string;
                        eventDate: string;
                        eventLocation: string;
                        amount: number;
                        status: BookingRequest["status"];
                    }) => ({
                        id: booking._id,
                        customer: booking.customerName,
                        service: booking.serviceTitle,
                        date: new Date(booking.eventDate).toLocaleDateString(
                            "en-BD",
                            {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            }
                        ),
                        eventLocation: booking.eventLocation,
                        amount: booking.amount,
                        status: booking.status,
                    })
                );

                setRequests(formattedRequests);
            } catch (error) {
                console.error("Error fetching booking requests:", error);
                toast.error(
                    error instanceof Error
                        ? error.message
                        : "Failed to load booking requests"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchBookingRequests();
    }, []);

    // Accept or reject booking request
    const handleStatusChange = async (
        bookingId: string,
        status: "Accepted" | "Rejected"
    ) => {
        setUpdatingId(bookingId);

        try {
            const token = await getClientToken();

            if (!token) {
                throw new Error("Authentication required");
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/bookings/${bookingId}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ status }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to update booking status"
                );
            }

            setRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request.id === bookingId
                        ? { ...request, status }
                        : request
                )
            );

            toast.success(
                `Booking ${status === "Accepted" ? "accepted" : "rejected"} successfully!`
            );
        } catch (error) {
            console.error("Booking status update failed:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to update booking status"
            );
        } finally {
            setUpdatingId(null);
        }
    };

    const totalRequests = requests.length;

    const pendingRequests = requests.filter(
        (request) => request.status === "Pending"
    ).length;

    const acceptedRequests = requests.filter(
        (request) => request.status === "Accepted"
    ).length;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Booking Requests</h1>
                <p className="text-sm text-muted-foreground">
                    Manage booking requests from your customers.
                </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border p-5">
                    <p className="text-sm text-muted-foreground">
                        Total Requests
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">
                        {totalRequests}
                    </h2>
                </div>

                <div className="rounded-xl border p-5">
                    <p className="text-sm text-muted-foreground">
                        Pending Requests
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">
                        {pendingRequests}
                    </h2>
                </div>

                <div className="rounded-xl border p-5">
                    <p className="text-sm text-muted-foreground">
                        Accepted Requests
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">
                        {acceptedRequests}
                    </h2>
                </div>
            </div>

            {/* Booking Requests Table */}
            <div className="rounded-xl border">
                <div className="border-b p-4">
                    <h2 className="font-semibold">All Booking Requests</h2>
                </div>

                <div className="overflow-x-auto">
                    <div className="min-w-225">
                        <div className="flex items-center gap-4 border-b px-4 py-3 text-sm font-semibold text-muted-foreground">
                            <div className="min-w-25">Booking ID</div>
                            <div className="min-w-35">Customer</div>
                            <div className="min-w-40">Service</div>
                            <div className="min-w-30">Booking Date</div>
                            <div className="min-w-25">Amount</div>
                            <div className="min-w-25">Status</div>
                            <div className="min-w-35">Action</div>
                        </div>

                        <div className="divide-y">
                            {loading ? (
                                <p className="py-10 text-center text-muted-foreground">
                                    Loading booking requests...
                                </p>
                            ) : (
                                requests.map((request) => (
                                    <div
                                        key={request.id}
                                        className="flex items-center gap-4 px-4 py-4"
                                    >
                                        <div
                                            className="min-w-25 max-w-25 truncate text-sm font-medium"
                                            title={request.id}
                                        >
                                            {request.id.slice(0, 8)}...
                                        </div>

                                        <div className="min-w-35 text-sm">
                                            {request.customer}
                                        </div>

                                        <div className="min-w-40 text-sm font-medium">
                                            {request.service}
                                        </div>

                                        <div className="min-w-30 text-sm">
                                            <div>{request.date}</div>
                                            <div className="text-xs text-muted-foreground">{request.eventLocation}</div>
                                        </div>

                                        <div className="min-w-25 font-semibold">
                                            ৳{request.amount.toLocaleString("en-BD")}
                                        </div>

                                        <div className="min-w-25">
                                            <Badge
                                                variant={
                                                    request.status === "Accepted"
                                                        ? "default"
                                                        : request.status === "Rejected"
                                                          ? "destructive"
                                                          : "outline"
                                                }
                                            >
                                                {request.status}
                                            </Badge>
                                        </div>

                                        <div className="flex min-w-35 items-center gap-2">
                                            {request.status === "Pending" ? (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        disabled={updatingId !== null}
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                request.id,
                                                                "Accepted"
                                                            )
                                                        }
                                                    >
                                                        <Check className="size-4" />
                                                        {updatingId === request.id &&
                                                        updatingId !== null
                                                            ? "Updating..."
                                                            : "Accept"}
                                                    </Button>

                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="text-destructive hover:text-destructive"
                                                        disabled={updatingId !== null}
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                request.id,
                                                                "Rejected"
                                                            )
                                                        }
                                                    >
                                                        <X className="size-4" />
                                                        Reject
                                                    </Button>
                                                </>
                                            ) : (
                                                <span className="text-sm text-muted-foreground">
                                                    No actions
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {!loading && requests.length === 0 && (
                            <p className="py-10 text-center text-muted-foreground">
                                No booking requests found.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
