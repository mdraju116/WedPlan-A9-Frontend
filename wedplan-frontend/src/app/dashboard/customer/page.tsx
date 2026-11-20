import { getCurrentUser } from "@/lib/getCurrentUser";
import { CalendarDays, Clock, CheckCircle2, PartyPopper, } from "lucide-react";
// import { ArrowRight, Search, CalendarCheck } from "lucide-react";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";


export default async function CustomerDashboard() {
    const user = await getCurrentUser();


    const recentBookings = [
        {
            id: "BK-001",
            service: "Wedding Photography",
            vendor: "Dream Photography",
            date: "Dec 15, 2026",
            amount: 25000,
            status: "Confirmed",
        },
        {
            id: "BK-002",
            service: "Wedding Decoration",
            vendor: "Royal Decorators",
            date: "Dec 20, 2026",
            amount: 35000,
            status: "Pending",
        },
        {
            id: "BK-003",
            service: "Catering Service",
            vendor: "Food Paradise",
            date: "Jan 05, 2027",
            amount: 50000,
            status: "Completed",
        },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold">
                Welcome, {user?.name}!
            </h1>

            <p className="mt-2 text-muted-foreground">
                Manage your wedding plans and bookings from here.
            </p>

            {/* statistics card */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-xl border p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Total Bookings</p>
                        <CalendarDays className="size-5 text-primary" />
                    </div>
                    <h2 className="mt-3 text-2xl font-bold">12</h2>
                </div>

                <div className="rounded-xl border p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Pending Bookings</p>
                        <Clock className="size-5 text-yellow-600" />
                    </div>
                    <h2 className="mt-3 text-2xl font-bold">4</h2>
                </div>

                <div className="rounded-xl border p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Confirmed Bookings</p>
                        <CheckCircle2 className="size-5 text-green-600" />
                    </div>
                    <h2 className="mt-3 text-2xl font-bold">6</h2>
                </div>

                <div className="rounded-xl border p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Completed Bookings</p>
                        <PartyPopper className="size-5 text-purple-600" />
                    </div>
                    <h2 className="mt-3 text-2xl font-bold">2</h2>
                </div>
            </div>



            {/* Recent Bookings */}

            <div className="mt-10">
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold">Recent Bookings</h2>
                        <p className="text-sm text-muted-foreground">
                            Keep track of your recent wedding service bookings.
                        </p>
                    </div>

                    <Link
                        href="/dashboard/customer/my-bookings"
                        className="text-sm font-medium text-primary hover:underline"
                    >
                        View All
                    </Link>
                </div>

                <div className="rounded-xl border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Service</TableHead>
                                <TableHead>Vendor</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {recentBookings.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell className="font-medium">
                                        {booking.service}
                                    </TableCell>
                                    <TableCell>{booking.vendor}</TableCell>
                                    <TableCell>{booking.date}</TableCell>
                                    <TableCell>
                                        ৳{booking.amount.toLocaleString("en-BD")}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                booking.status === "Confirmed"
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