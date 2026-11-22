import { getServerToken } from "@/lib/access-jwt-at-server-component";
import { Badge } from "@/components/ui/badge";

type RecentBooking = {
    _id: string;
    customerName: string;
    serviceTitle: string;
    vendorName?: string;
    createdAt?: string;
    eventDate: string;
    eventLocation?: string;
    amount: number;
    status: string;
};

type AdminDashboardData = {
    stats: {
        totalUsers: number;
        totalCustomers: number;
        totalVendors: number;
        totalServices: number;
        pendingServices: number;
        totalBookings: number;
        pendingBookings: number;
        totalTransactions: number;
    };
    recentBookings: RecentBooking[];
};

const AdminDashboard = async () => {
    const token = await getServerToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/dashboard/admin`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
    });

    if (!response.ok) throw new Error("Failed to fetch admin dashboard data");

    const result = await response.json();
    const data: AdminDashboardData = result.data;
    const stats = [
        { title: "Total Users", value: data.stats.totalUsers },
        { title: "Customers", value: data.stats.totalCustomers },
        { title: "Vendors", value: data.stats.totalVendors },
        { title: "Total Transactions", value: data.stats.totalTransactions },
        { title: "Total Services", value: data.stats.totalServices },
        { title: "Pending Services", value: data.stats.pendingServices },
        { title: "Total Bookings", value: data.stats.totalBookings },
        { title: "Pending Bookings", value: data.stats.pendingBookings },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Overview of your wedding planning platform.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => (
                    <div key={item.title} className={`rounded-xl border p-5 ${item.title.startsWith("Pending") ? "border-amber-200 bg-amber-50/60" : "bg-card"}`}>
                        <p className="text-sm text-muted-foreground">{item.title}</p>
                        <h2 className="mt-2 text-2xl font-bold">{item.value}</h2>
                    </div>
                ))}
            </div>

            <div className="rounded-xl border bg-card p-5">
                <h2 className="mb-4 text-lg font-semibold">Recent Bookings</h2>
                {data.recentBookings.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No bookings found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[920px] table-fixed text-left text-xs">
                            <thead>
                                <tr className="border-b bg-muted/40 text-[10px] uppercase tracking-wide text-muted-foreground">
                                    <th scope="col" className="px-2 py-3 font-medium">Customer</th>
                                    <th scope="col" className="px-2 py-3 font-medium">Service</th>
                                    <th scope="col" className="px-2 py-3 font-medium">Vendor</th>
                                    <th scope="col" className="px-2 py-3 font-medium">Requested</th>
                                    <th scope="col" className="px-2 py-3 font-medium">Event date</th>
                                    <th scope="col" className="px-2 py-3 font-medium">Location</th>
                                    <th scope="col" className="px-2 py-3 font-medium">Amount</th>
                                    <th scope="col" className="px-2 py-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.recentBookings.map((booking) => (
                                    <tr key={booking._id} className="border-b last:border-0">
                                        <td className="break-words px-2 py-3">{booking.customerName}</td>
                                        <td className="break-words px-2 py-3 font-medium">{booking.serviceTitle}</td>
                                        <td className="break-words px-2 py-3">{booking.vendorName || "—"}</td>
                                        <td className="whitespace-nowrap px-2 py-3 text-muted-foreground">
                                            {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : "—"}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-3 text-muted-foreground">{new Date(booking.eventDate).toLocaleDateString()}</td>
                                        <td className="break-words px-2 py-3">{booking.eventLocation || "—"}</td>
                                        <td className="whitespace-nowrap px-2 py-3 font-medium">
                                            ৳{booking.amount.toLocaleString("en-BD")}
                                        </td>
                                        <td className="px-2 py-3">
                                            <Badge className="px-1.5 py-0.5 text-[10px]" variant={booking.status === "Accepted" || booking.status === "Confirmed" ? "default" : booking.status === "Rejected" || booking.status === "Cancelled" ? "destructive" : "secondary"}>
                                                {booking.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
