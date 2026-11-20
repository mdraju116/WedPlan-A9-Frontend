import {
    BriefcaseBusiness,
    CalendarDays,
    Clock,
    DollarSign,
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
import { ArrowRight } from "lucide-react";
import { getCurrentUser } from "@/lib/getCurrentUser";

export default async function VendorDashboard() {
    const user = await getCurrentUser();



    const stats = [
        {
            title: "Total Services",
            value: "8",
            description: "Active services",
            icon: BriefcaseBusiness,
        },
        {
            title: "Total Bookings",
            value: "24",
            description: "All time bookings",
            icon: CalendarDays,
        },
        {
            title: "Pending Requests",
            value: "5",
            description: "Awaiting your response",
            icon: Clock,
        },
        {
            title: "Total Earnings",
            value: "৳1,25,000",
            description: "Total completed earnings",
            icon: DollarSign,
        },
    ];

    const recentBookings = [
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
            status: "Confirmed",
        },
        {
            id: "BK-103",
            customer: "Tanvir Hasan",
            service: "Wedding Catering",
            date: "Jan 05, 2027",
            amount: 50000,
            status: "Pending",
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

            {/* statistics cards */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
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

                        <h2 className="mt-3 text-2xl font-bold">{stat.value}</h2>

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
                                <TableRow key={booking.id}>
                                    <TableCell className="font-medium">
                                        {booking.id}
                                    </TableCell>

                                    <TableCell>{booking.customer}</TableCell>

                                    <TableCell>{booking.service}</TableCell>

                                    <TableCell>{booking.date}</TableCell>

                                    <TableCell>
                                        ৳{booking.amount.toLocaleString("en-BD")}
                                    </TableCell>

                                    <TableCell>
                                        <Badge
                                            variant={
                                                booking.status === "Confirmed"
                                                    ? "default"
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