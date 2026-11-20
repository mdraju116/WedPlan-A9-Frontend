"use client";

import { useState } from "react";

import BookingList, {
    type Booking,
} from "@/components/dashboard/BookingList";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const MyBookingsPage = () => {
    const [bookings, setBookings] = useState<Booking[]>([
        {
            id: "BK-001",
            serviceId: "service-001",
            service: "Wedding Photography",
            vendor: "Dream Photography",
            date: "Dec 15, 2026",
            amount: 25000,
            status: "Confirmed",
        },
        {
            id: "BK-002",
            serviceId: "service-002",
            service: "Wedding Decoration",
            vendor: "Royal Decorators",
            date: "Dec 20, 2026",
            amount: 35000,
            status: "Pending",
        },
        {
            id: "BK-003",
            serviceId: "service-003",
            service: "Catering Service",
            vendor: "Food Paradise",
            date: "Jan 05, 2027",
            amount: 50000,
            status: "Completed",
        },
        {
            id: "BK-004",
            serviceId: "service-004",
            service: "Wedding Venue",
            vendor: "Grand Palace",
            date: "Jan 15, 2027",
            amount: 80000,
            status: "Pending",
        },
    ]);

    const [cancelBookingId, setCancelBookingId] = useState<string | null>(
        null
    );

    const handleCancelBooking = () => {
        if (!cancelBookingId) return;

        setBookings((prevBookings) =>
            prevBookings.map((booking) =>
                booking.id === cancelBookingId
                    ? { ...booking, status: "Cancelled" }
                    : booking
            )
        );

        setCancelBookingId(null);
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
                    <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                    <BookingList
                        bookings={bookings}
                        status="all"
                        onCancel={setCancelBookingId}
                    />
                </TabsContent>

                <TabsContent value="pending">
                    <BookingList
                        bookings={bookings}
                        status="pending"
                        onCancel={setCancelBookingId}
                    />
                </TabsContent>

                <TabsContent value="confirmed">
                    <BookingList
                        bookings={bookings}
                        status="confirmed"
                        onCancel={setCancelBookingId}
                    />
                </TabsContent>

                <TabsContent value="completed">
                    <BookingList
                        bookings={bookings}
                        status="completed"
                        onCancel={setCancelBookingId}
                    />
                </TabsContent>

                <TabsContent value="cancelled">
                    <BookingList
                        bookings={bookings}
                        status="cancelled"
                        onCancel={setCancelBookingId}
                    />
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
