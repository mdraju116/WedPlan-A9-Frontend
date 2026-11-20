
import Link from "next/link";
import { Eye, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type Booking = {
    id: string;
    serviceId: string;
    service: string;
    vendor: string;
    date: string;
    amount: number;
    status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
};

type BookingListProps = {
    bookings: Booking[];
    status: string;
    onCancel: (bookingId: string) => void;
};

const BookingList = ({ bookings,status,onCancel,}: BookingListProps) => {
    const filteredBookings =
        status === "all"
            ? bookings
            : bookings.filter(
                  (booking) => booking.status.toLowerCase() === status
              );

    if (filteredBookings.length === 0) {
        return (
            <p className="py-10 text-center text-muted-foreground">
                No bookings found.
            </p>
        );
    }

    return (
        <div className="overflow-x-auto">
            <div className="min-w-212.5">
                {/* Column Headings */}
                <div className="flex items-center gap-4 border-b px-4 py-3 text-sm font-semibold text-muted-foreground">
                    <div className="min-w-30 flex-1">Service Name</div>
                    <div className="min-w-30">Vendor</div>
                    <div className="min-w-30">Booking Date</div>
                    <div className="min-w-25">Booking ID</div>
                    <div className="min-w-25">Amount</div>
                    <div className="min-w-25">Status</div>
                    <div className="min-w-20">Action</div>
                </div>

                {/* Booking Rows */}
                <div className="grid gap-3 pt-3">
                    {filteredBookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="flex items-center gap-4 rounded-lg border p-4"
                        >
                            <div className="min-w-30 flex-1">
                                <p className="font-semibold">
                                    {booking.service}
                                </p>
                            </div>

                            <div className="min-w-30">
                                <p className="text-sm">{booking.vendor}</p>
                            </div>

                            <div className="min-w-30">
                                <p className="text-sm">{booking.date}</p>
                            </div>

                            <div className="min-w-25">
                                <p className="text-sm font-medium">
                                    {booking.id}
                                </p>
                            </div>

                            <div className="min-w-25">
                                <p className="font-semibold">
                                    ৳{booking.amount.toLocaleString("en-BD")}
                                </p>
                            </div>

                            <div className="min-w-25">
                                <Badge
                                    variant={
                                        booking.status === "Confirmed"
                                            ? "default"
                                            : booking.status === "Completed" ||
                                                booking.status === "Cancelled"
                                              ? "secondary"
                                              : "outline"
                                    }
                                >
                                    {booking.status}
                                </Badge>
                            </div>

                            {/* Actions */}
                            <div className="flex min-w-20 items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    title="View Details"
                                    aria-label="View Details"
                                    render={
                                        <Link
                                            href={`/services/${booking.serviceId}`}
                                        />
                                    }
                                >
                                    <Eye className="size-4" />
                                </Button>

                                {booking.status === "Pending" && (
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        title="Cancel Booking"
                                        aria-label="Cancel Booking"
                                        className="text-destructive hover:text-destructive"
                                        onClick={() => onCancel(booking.id)}
                                    >
                                        <X className="size-4" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookingList;
