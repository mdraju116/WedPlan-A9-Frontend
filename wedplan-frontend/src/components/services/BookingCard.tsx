
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { getClientToken } from "@/lib/access-jwt-at-client-component";

type Props = {
    serviceId: string;
    price: number;
};

const BookingCard = ({ serviceId, price }: Props) => {
    const router = useRouter();

    const [eventDate, setEventDate] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [limitReached, setLimitReached] = useState(false);

    const today = new Date().toISOString().split("T")[0];

    const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setIsSubmitting(true);

            const token = await getClientToken();

            if (!token) return;

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/bookings`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        serviceId,
                        eventDate,
                        eventLocation,
                        message,
                    }),
                }
            );

            const result = await response.json();

            if (response.status === 403) {
                setLimitReached(true);
                return;
            }

            if (!response.ok) {
                throw new Error(result.message || "Booking failed");
            }

            toast.success("Booking request submitted successfully!");
            router.push("/dashboard/customer/my-bookings");
            router.refresh();
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Something went wrong"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Book This Service</h2>

            <div className="mt-4 border-b pb-4">
                <p className="text-sm text-muted-foreground">Service Price</p>
                <p className="text-3xl font-bold text-primary">
                    ৳{price.toLocaleString()}
                </p>
            </div>

            {limitReached ? (
                <div className="mt-5 space-y-4">
                    <p className="text-sm text-destructive">
                        You have reached the free booking limit. Upgrade to
                        Premium for unlimited bookings.
                    </p>

                    <Button
                        className="w-full"
                        nativeButton={false}
                        render={<Link href="/checkout" />}
                    >
                        Upgrade to Premium
                    </Button>
                </div>
            ) : (
                <form onSubmit={handleBooking} className="mt-5 space-y-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="eventDate"
                            className="text-sm font-medium"
                        >
                            Event Date
                        </label>

                        <input
                            id="eventDate"
                            type="date"
                            min={today}
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            required
                            className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="eventLocation" className="text-sm font-medium">Event Location</label>
                        <input
                            id="eventLocation"
                            value={eventLocation}
                            onChange={(e) => setEventLocation(e.target.value)}
                            placeholder="City or venue for your event"
                            required
                            className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="message"
                            className="text-sm font-medium"
                        >
                            Additional Message
                            <span className="ml-1 text-muted-foreground">
                                (Optional)
                            </span>
                        </label>

                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tell us about your requirements..."
                            rows={4}
                            className="w-full resize-none rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Book Now"}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                        Submit your booking request to the service vendor.
                    </p>
                </form>
            )}
        </div>
    );
};

export default BookingCard;
