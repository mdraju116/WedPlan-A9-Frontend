import {
    BriefcaseBusiness,
    CalendarDays,
    Clock,
    DollarSign,
    ArrowRight,
} from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";

import { getCurrentUser } from "@/lib/getCurrentUser";
import { getServerToken } from "@/lib/access-jwt-at-server-component";


type RecentBooking = {
    _id: string;
    customerName: string;
    serviceTitle: string;
    eventDate: string;
    amount: number;
    status: "Pending" | "Accepted" | "Rejected" | "Cancelled" | "Completed";
};

type VendorDashboardData = {
    stats: {
        totalServices: number;
        totalBookings: number;
        pendingRequests: number;
        totalEarnings: number;
    };
    recentBookings: RecentBooking[];
};


export default async function VendorDashboard() {
    const user = await getCurrentUser();

    // Get JWT token
    const token = await getServerToken();

    // Fetch vendor dashboard data
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/dashboard/vendor`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch vendor dashboard");
    }

    const result = await response.json();

    const { stats, recentBookings } = result.data as VendorDashboardData;


    // Statistics cards
    const dashboardStats = [
        {
            title: "Total Services",
            value: stats.totalServices.toLocaleString("en-BD"),
            description: "Active services",
            icon: BriefcaseBusiness,
        },
        {
            title: "Total Bookings",
            value: stats.totalBookings.toLocaleString("en-BD"),
            description: "All time bookings",
            icon: CalendarDays,
        },
        {
            title: "Pending Requests",
            value: stats.pendingRequests.toLocaleString("en-BD"),
            description: "Awaiting your response",
            icon: Clock,
        },
        {
            title: "Total Earnings",
            value: `৳${stats.totalEarnings.toLocaleString("en-BD")}`,
            description: "Total accepted earnings",
            icon: DollarSign,
        },
    ];


    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">
                    Welcome, {user?.name}!
                </h1>

                <p className="text-sm text-muted-foreground">
                    Your Business: {user?.businessName || "Business name not set"}
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {dashboardStats.map((stat) => (
                    <div
                        key={stat.title}
                        className="rounded-xl border bg-card p-5"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </p>

                            <stat.icon className="size-5 text-muted-foreground" />
                        </div>

                        <h2 className="mt-3 text-2xl font-bold">
                            {stat.value}
                        </h2>

                        <p className="mt-1 text-xs text-muted-foreground">
                            {stat.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* Recent Booking Requests */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold">
                            Recent Booking Requests
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Latest bookings from your customers.
                        </p>
                    </div>

                    <Link
                        href="/dashboard/vendor/booking-requests"
                        className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                        View All
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                <div className="rounded-xl border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Booking ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Service</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {recentBookings.map((booking) => (
                                <TableRow key={booking._id}>
                                    <TableCell className="font-medium">
                                        {booking._id.slice(0, 8)}...
                                    </TableCell>

                                    <TableCell>
                                        {booking.customerName}
                                    </TableCell>

                                    <TableCell>
                                        {booking.serviceTitle}
                                    </TableCell>

                                    <TableCell>
                                        {new Date(
                                            booking.eventDate
                                        ).toLocaleDateString("en-BD", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </TableCell>

                                    <TableCell>
                                        ৳{booking.amount.toLocaleString("en-BD")}
                                    </TableCell>

                                    <TableCell>
                                        <Badge
                                            variant={
                                                booking.status === "Accepted"
                                                    ? "default"
                                                    : booking.status === "Completed"
                                                        ? "secondary"
                                                        : "outline"
                                            }
                                        >
                                            {booking.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}