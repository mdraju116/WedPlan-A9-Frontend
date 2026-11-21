
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getClientToken } from "@/lib/access-jwt-at-client-component";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

type Service = {
    _id: string;
    title: string;
    category: string;
    price: number;
    image: string;
    vendorName: string;
};

const BookingPage = () => {
    const params = useParams<{ id: string }>();
    const router = useRouter();

    const [service, setService] = useState<Service | null>(null);
    const [eventDate, setEventDate] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const loadService = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/services/${params.id}`,
                    { cache: "no-store" }
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || "Service not found");
                }

                setService(result.data);
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? error.message
                        : "Failed to load service"
                );
            } finally {
                setLoading(false);
            }
        };

        loadService();
    }, [params.id]);

    const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!eventDate) {
            toast.error("Please select your event date");
            return;
        }

        try {
            setSubmitting(true);

            const token = await getClientToken();

            if (!token) {
                throw new Error("Please sign in to book a service");
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/bookings`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        serviceId: params.id,
                        eventDate,
                        message,
                    }),
                }
            );

            const result = await response.json();

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
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-75 items-center justify-center gap-2">
                <Loader2 className="animate-spin" />
                <p>Loading service...</p>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="py-16 text-center">
                <h2 className="text-xl font-semibold">
                    Service not found
                </h2>
                <Button
                    className="mt-4"
                    onClick={() => router.push("/services")}
                >
                    Browse Services
                </Button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-2xl space-y-6 px-4 py-10">
            <div>
                <h1 className="text-3xl font-bold">Book a Service</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Submit your booking request to the service provider.
                </p>
            </div>

            <div className="rounded-xl border bg-card p-5">
                <p className="text-sm text-muted-foreground">
                    Selected Service
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                    {service.title}
                </h2>

                <p className="text-sm text-muted-foreground">
                    {service.category} · By {service.vendorName}
                </p>

                <p className="mt-3 text-2xl font-bold text-primary">
                    ৳{service.price.toLocaleString()}
                </p>
            </div>

            <form
                onSubmit={handleBooking}
                className="space-y-5 rounded-xl border p-6"
            >
                <div className="space-y-2">
                    <Label htmlFor="eventDate">Event Date</Label>
                    <Input
                        id="eventDate"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="message">
                        Additional Message (Optional)
                    </Label>
                    <Textarea
                        id="message"
                        placeholder="Tell the vendor about your requirements..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    disabled={submitting}
                >
                    {submitting ? (
                        <>
                            <Loader2 className="animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        "Submit Booking Request"
                    )}
                </Button>
            </form>
        </div>
    );
};

export default BookingPage;
