import { getCurrentUser } from "@/lib/getCurrentUser";
import { CalendarDays, Clock, CheckCircle2, PartyPopper, } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getServerToken } from "@/lib/access-jwt-at-server-component";

type RecentBooking = {
    _id: string;
    serviceTitle: string;
    vendorName: string;
    eventDate: string;
    amount: number;
    status: "Pending" | "Accepted" | "Rejected" | "Cancelled" | "Completed";
};

export default async function CustomerDashboard() {
    const user = await getCurrentUser();
    const token = await getServerToken();

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/dashboard/customer`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch customer dashboard");
    }

    const result = await response.json();

    const { stats, recentBookings } = result.data as {
        stats: {
            totalBookings: number;
            pendingBookings: number;
            acceptedBookings: number;
            completedBookings: number;
        };
        recentBookings: RecentBooking[];
    };

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
                    <h2 className="mt-3 text-2xl font-bold">{stats.totalBookings}</h2>
                </div>

                <div className="rounded-xl border p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Pending Bookings</p>
                        <Clock className="size-5 text-yellow-600" />
                    </div>
                    <h2 className="mt-3 text-2xl font-bold">{stats.pendingBookings}</h2>
                </div>

                <div className="rounded-xl border p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Accepted Bookings</p>
                        <CheckCircle2 className="size-5 text-green-600" />
                    </div>
                    <h2 className="mt-3 text-2xl font-bold">{stats.acceptedBookings}</h2>
                </div>

                <div className="rounded-xl border p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Completed Bookings</p>
                        <PartyPopper className="size-5 text-purple-600" />
                    </div>
                    <h2 className="mt-3 text-2xl font-bold">{stats.completedBookings}</h2>
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
                                <TableRow key={booking._id}>
                                    <TableCell className="font-medium">
                                        {booking.serviceTitle}
                                    </TableCell>
                                    <TableCell>{booking.vendorName}</TableCell>
                                    <TableCell>
                                        {new Date(booking.eventDate).toLocaleDateString("en-BD", {
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