
"use client";

import { useEffect, useState } from "react";
import { getClientToken } from "@/lib/access-jwt-at-client-component";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

type BookingStatus =
    | "Pending"
    | "Accepted"
    | "Rejected"
    | "Cancelled"


type Booking = {
    _id: string;
    customerName: string;
    vendorName: string;
    serviceTitle: string;
    eventDate: string;
    eventLocation?: string;
    amount: number;
    status: BookingStatus;
};

const ManageBookingsPage = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const fetchBookings = async () => {
        try {
            const token = await getClientToken();

            if (!token) {
                throw new Error("Authentication required");
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/bookings/admin/all`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    cache: "no-store",
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to fetch bookings");
            }

            setBookings(result.data);
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadBookings = async () => {
            await fetchBookings();
        };

        loadBookings();
    }, []);

    const handleStatusUpdate = async (
        bookingId: string,
        status: BookingStatus
    ) => {
        try {
            setUpdatingId(bookingId);

            const token = await getClientToken();

            if (!token) {
                throw new Error("Authentication required");
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/bookings/${bookingId}/admin/status`,
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
                throw new Error(result.message || "Failed to update booking");
            }

            setBookings((previousBookings) =>
                previousBookings.map((booking) =>
                    booking._id === bookingId
                        ? { ...booking, status }
                        : booking
                )
            );

            toast.success("Booking status updated successfully");
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Something went wrong"
            );
        } finally {
            setUpdatingId(null);
        }
    };

    const getStatusVariant = (status: BookingStatus) => {
        switch (status) {
            case "Accepted":
                return "default";
            case "Rejected":
            case "Cancelled":
                return "destructive";
            default:
                return "secondary";
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-75 items-center justify-center gap-2">
                <Loader2 className="animate-spin" />
                <p>Loading bookings...</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold">Manage Bookings</h1>
                    <p className="text-sm text-muted-foreground">
                        View and manage all customer bookings.
                    </p>
                </div>

                <Badge variant="secondary" className="h-fit px-3 py-1">
                    Total Bookings: {bookings.length}
                </Badge>
            </div>

            <div className="overflow-x-auto rounded-xl border">
                <table className="w-full min-w-225 text-sm">
                    <thead className="bg-muted/50">
                        <tr className="text-left">
                            <th className="p-4">Customer</th>
                            <th className="p-4">Service</th>
                            <th className="p-4">Vendor</th>
                            <th className="p-4">Event Date</th>
                            <th className="p-4">Event Location</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Update Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id} className="border-t">
                                <td className="p-4">
                                    {booking.customerName}
                                </td>

                                <td className="p-4 font-medium">
                                    {booking.serviceTitle}
                                </td>

                                <td className="p-4">
                                    {booking.vendorName}
                                </td>

                                <td className="p-4 whitespace-nowrap">
                                    {new Date(
                                        booking.eventDate
                                    ).toLocaleDateString()}
                                </td>

                                <td className="p-4">{booking.eventLocation || "—"}</td>

                                <td className="p-4 whitespace-nowrap">
                                    ৳{booking.amount.toLocaleString()}
                                </td>

                                <td className="p-4">
                                    <Badge
                                        variant={getStatusVariant(booking.status)}
                                    >
                                        {booking.status}
                                    </Badge>
                                </td>

                                <td className="p-4">
                                    <Select
                                        value={booking.status}
                                        onValueChange={(value) =>
                                            handleStatusUpdate(
                                                booking._id,
                                                value as BookingStatus
                                            )
                                        }
                                        disabled={updatingId === booking._id}
                                    >
                                        <SelectTrigger className="w-35">
                                            {updatingId === booking._id ? (
                                                <Loader2 className="size-4 animate-spin" />
                                            ) : (
                                                <SelectValue placeholder="Status" />
                                            )}
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="Pending">
                                                Pending
                                            </SelectItem>
                                            <SelectItem value="Accepted">
                                                Accepted
                                            </SelectItem>
                                            <SelectItem value="Rejected">
                                                Rejected
                                            </SelectItem>
                                            <SelectItem value="Cancelled">
                                                Cancelled
                                            </SelectItem>

                                        </SelectContent>
                                    </Select>
                                </td>
                            </tr>
                        ))}

                        {bookings.length === 0 && (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="p-8 text-center text-muted-foreground"
                                >
                                    No bookings found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBookingsPage;
