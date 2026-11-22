
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
    vendorName?: string;
    serviceTitle: string;
    createdAt?: string;
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
                <table className="w-full min-w-[1000px] table-fixed text-left text-xs">
                    <thead>
                        <tr className="border-b bg-muted/40 text-[10px] uppercase tracking-wide text-muted-foreground">
                            <th scope="col" className="px-2 py-3 font-medium">Customer</th>
                            <th scope="col" className="px-2 py-3 font-medium">Service</th>
                            <th scope="col" className="px-2 py-3 font-medium">Vendor</th>
                            <th scope="col" className="px-2 py-3 font-medium">Requested</th>
                            <th scope="col" className="px-2 py-3 font-medium">Event date</th>
                            <th scope="col" className="px-2 py-3 font-medium">Location</th>
                            <th scope="col" className="px-2 py-3 font-medium">Amount</th>
                            <th scope="col" className="px-2 py-3 font-medium">Status</th>
                            <th scope="col" className="px-2 py-3 font-medium">Update</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id} className="border-b last:border-0">
                                <td className="break-words px-2 py-3">
                                    {booking.customerName}
                                </td>

                                <td className="break-words px-2 py-3 font-medium">
                                    {booking.serviceTitle}
                                </td>

                                <td className="break-words px-2 py-3">
                                    {booking.vendorName || "—"}
                                </td>

                                <td className="whitespace-nowrap px-2 py-3 text-muted-foreground">
                                    {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : "—"}
                                </td>

                                <td className="whitespace-nowrap px-2 py-3 text-muted-foreground">
                                    {new Date(
                                        booking.eventDate
                                    ).toLocaleDateString()}
                                </td>

                                <td className="break-words px-2 py-3">{booking.eventLocation || "—"}</td>

                                <td className="whitespace-nowrap px-2 py-3">
                                    ৳{booking.amount.toLocaleString("en-BD")}
                                </td>

                                <td className="px-2 py-3">
                                    <Badge
                                        variant={getStatusVariant(booking.status)}
                                    >
                                        {booking.status}
                                    </Badge>
                                </td>

                                <td className="px-2 py-3">
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
                                        <SelectTrigger className="h-8 w-28 px-2 text-xs">
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
                                    colSpan={9}
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
