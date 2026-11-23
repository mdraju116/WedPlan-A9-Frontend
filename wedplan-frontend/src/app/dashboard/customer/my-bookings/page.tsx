"use client";

import BookingList, { type Booking, } from "@/components/dashboard/BookingList";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { getClientToken } from "@/lib/access-jwt-at-client-component";
import { toast } from "react-toastify";

const MyBookingsPage = () => {

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [cancelBookingId, setCancelBookingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = await getClientToken();

                if (!token) return;

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/bookings/my-bookings`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch bookings");
                }

                const result = await response.json();

                const formattedBookings: Booking[] = result.data.map(
                    (booking: {
                        _id: string;
                        serviceId: string;
                        serviceTitle: string;
                        vendorName: string;
                        createdAt?: string;
                        eventDate: string;
                        eventLocation: string;
                        amount: number;
                        status: Booking["status"];
                    }) => ({
                        id: booking._id,
                        serviceId: booking.serviceId,
                        service: booking.serviceTitle,
                        vendor: booking.vendorName,
                        eventLocation: booking.eventLocation,
                        bookingDate: booking.createdAt
                            ? new Date(booking.createdAt).toLocaleDateString("en-BD", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })
                            : "—",
                        eventDate: new Date(booking.eventDate).toLocaleDateString(
                            "en-BD",
                            {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            }
                        ),
                        amount: booking.amount,
                        status: booking.status,
                    })
                );

                setBookings(formattedBookings);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false)
            }
        };

        fetchBookings();
    }, []);

    const handleCancelBooking = async () => {
        if (!cancelBookingId) return;

        try {
            const token = await getClientToken();
            if (!token) return;
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/bookings/${cancelBookingId}/cancel`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to cancel booking");
            }

            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking.id === cancelBookingId
                        ? { ...booking, status: "Cancelled" }
                        : booking
                )
            );

            setCancelBookingId(null);
            toast.success("Booking cancelled successfully!");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to cancel booking");
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Heading */}
            <div>
                <h1 className="text-2xl font-bold">My Bookings</h1>
                <p className="text-sm text-muted-foreground">
                    Manage and track all your wedding service bookings.
                </p>
            </div>

            {/* Booking Tabs */}
            <Tabs defaultValue="all">
                <TabsList>
                    <TabsTrigger value="all">All Bookings</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="accepted">Accepted</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                    {loading ? (
                        <p className="py-10 text-center text-muted-foreground">
                            Loading bookings...
                        </p>
                    ) : (
                        <BookingList
                            bookings={bookings}
                            status="all"
                            onCancel={setCancelBookingId}
                        />
                    )}
                </TabsContent>


                <TabsContent value="pending">
                    {loading ? (
                        <p className="py-10 text-center text-muted-foreground">
                            Loading bookings...
                        </p>
                    ) : (
                        <BookingList
                            bookings={bookings}
                            status="pending"
                            onCancel={setCancelBookingId}
                        />
                    )}
                </TabsContent>

                <TabsContent value="accepted">
                    {loading ? (
                        <p className="py-10 text-center text-muted-foreground">
                            Loading bookings...
                        </p>
                    ) : (
                        <BookingList
                            bookings={bookings}
                            status="accepted"
                            onCancel={setCancelBookingId}
                        />
                    )}
                </TabsContent>

                <TabsContent value="completed">
                    {loading ? (
                        <p className="py-10 text-center text-muted-foreground">
                            Loading bookings...
                        </p>
                    ) : (
                        <BookingList
                            bookings={bookings}
                            status="completed"
                            onCancel={setCancelBookingId}
                        />
                    )}
                </TabsContent>

                <TabsContent value="cancelled">
                    {loading ? (
                        <p className="py-10 text-center text-muted-foreground">
                            Loading bookings...
                        </p>
                    ) : (
                        <BookingList
                            bookings={bookings}
                            status="cancelled"
                            onCancel={setCancelBookingId}
                        />
                    )}
                </TabsContent>
            </Tabs>

            {/* Cancel Booking Confirmation */}
            <AlertDialog
                open={!!cancelBookingId}
                onOpenChange={(open) => {
                    if (!open) setCancelBookingId(null);
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Cancel Booking?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            Are you sure you want to cancel this booking?
                            This action will change the booking status to
                            Cancelled.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Keep Booking
                        </AlertDialogCancel>

                        <AlertDialogAction
                            onClick={handleCancelBooking}
                            className="bg-destructive text-white hover:bg-destructive/90"
                        >
                            Yes, Cancel Booking
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default MyBookingsPage;
