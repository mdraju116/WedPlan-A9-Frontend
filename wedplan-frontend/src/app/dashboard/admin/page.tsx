
import { getServerToken } from "@/lib/access-jwt-at-server-component";

type RecentBooking = {
    _id: string;
    customerName: string;
    serviceTitle: string;
    eventDate: string;
    amount: number;
    status: string;
};

type AdminDashboardData = {
    stats: {
        totalUsers: number;
        totalCustomers: number;
        totalVendors: number;
        totalServices: number;
        totalBookings: number;
        totalTransactions: number;
    };
    recentBookings: RecentBooking[];
};

const AdminDashboard = async () => {
    const token = await getServerToken();

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/dashboard/admin`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch admin dashboard data");
    }

    const result = await response.json();
    const data: AdminDashboardData = result.data;

    const stats = [
        { title: "Total Users", value: data.stats.totalUsers },
        { title: "Customers", value: data.stats.totalCustomers },
        { title: "Vendors", value: data.stats.totalVendors },
        { title: "Total Services", value: data.stats.totalServices },
        { title: "Total Bookings", value: data.stats.totalBookings },
        { title: "Transactions", value: data.stats.totalTransactions },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                    Overview of your wedding planning platform.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((item) => (
                    <div
                        key={item.title}
                        className="rounded-xl border bg-card p-5"
                    >
                        <p className="text-sm text-muted-foreground">
                            {item.title}
                        </p>
                        <h2 className="mt-2 text-2xl font-bold">
                            {item.value}
                        </h2>
                    </div>
                ))}
            </div>

            <div className="rounded-xl border bg-card p-5">
                <h2 className="mb-4 text-lg font-semibold">
                    Recent Bookings
                </h2>

                {data.recentBookings.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        No bookings found.
                    </p>
                ) : (
                    <div className="space-y-4">
                        {data.recentBookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="flex flex-col justify-between gap-2 border-b pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center"
                            >
                                <div>
                                    <p className="font-medium">
                                        {booking.serviceTitle}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {booking.customerName} ·{" "}
                                        {new Date(
                                            booking.eventDate
                                        ).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="font-medium">
                                        ৳{booking.amount.toLocaleString()}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        {booking.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
