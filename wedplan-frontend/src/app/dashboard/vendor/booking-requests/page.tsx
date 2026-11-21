"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type BookingRequest = {
    id: string;
    customer: string;
    service: string;
    date: string;
    amount: number;
    status: "Pending" | "Confirmed" | "Rejected";
};

const initialRequests: BookingRequest[] = [
    {
        id: "BK-101",
        customer: "Rahim Ahmed",
        service: "Wedding Photography",
        date: "Dec 15, 2026",
        amount: 25000,
        status: "Pending",
    },
    {
        id: "BK-102",
        customer: "Nusrat Jahan",
        service: "Wedding Decoration",
        date: "Dec 20, 2026",
        amount: 35000,
        status: "Pending",
    },
    {
        id: "BK-103",
        customer: "Tanvir Hasan",
        service: "Wedding Catering",
        date: "Jan 05, 2027",
        amount: 50000,
        status: "Confirmed",
    },
];

export default function BookingRequestsPage() {
    const [requests, setRequests] =
        useState<BookingRequest[]>(initialRequests);

    const handleStatusChange = (
        bookingId: string,
        status: "Confirmed" | "Rejected"
    ) => {
        setRequests((prevRequests) =>
            prevRequests.map((request) =>
                request.id === bookingId
                    ? { ...request, status }
                    : request
            )
        );
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Booking Requests</h1>
                <p className="text-sm text-muted-foreground">
                    Manage booking requests from your customers.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border p-5">
                    <p className="text-sm text-muted-foreground">
                        Total Requests
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">
                        {requests.length}
                    </h2>
                </div>

                <div className="rounded-xl border p-5">
                    <p className="text-sm text-muted-foreground">
                        Pending Requests
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">
                        {requests.filter(
                            (request) => request.status === "Pending"
                        ).length}
                    </h2>
                </div>

                <div className="rounded-xl border p-5">
                    <p className="text-sm text-muted-foreground">
                        Confirmed Requests
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">
                        {requests.filter(
                            (request) => request.status === "Confirmed"
                        ).length}
                    </h2>
                </div>
            </div>

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
                            {requests.map((request) => (
                                <div
                                    key={request.id}
                                    className="flex items-center gap-4 px-4 py-4"
                                >
                                    <div className="min-w-25 text-sm font-medium">
                                        {request.id}
                                    </div>

                                    <div className="min-w-35 text-sm">
                                        {request.customer}
                                    </div>

                                    <div className="min-w-40 text-sm font-medium">
                                        {request.service}
                                    </div>

                                    <div className="min-w-30 text-sm">
                                        {request.date}
                                    </div>

                                    <div className="min-w-25 font-semibold">
                                        ৳{request.amount.toLocaleString("en-BD")}
                                    </div>

                                    <div className="min-w-25">
                                        <Badge
                                            variant={
                                                request.status === "Confirmed"
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
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            request.id,
                                                            "Confirmed"
                                                        )
                                                    }
                                                >
                                                    <Check className="size-4" />
                                                    Accept
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="text-destructive hover:text-destructive"
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
                            ))}
                        </div>

                        {requests.length === 0 && (
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