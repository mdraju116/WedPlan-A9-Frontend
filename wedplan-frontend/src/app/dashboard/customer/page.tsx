import { getCurrentUser } from "@/lib/getCurrentUser";
import { CalendarDays, Clock, CheckCircle2, PartyPopper, } from "lucide-react";
import { ArrowRight, Search, CalendarCheck } from "lucide-react";
import Link from "next/link";



export default async function CustomerDashboard() {
    const user = await getCurrentUser();

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


            {/*  */}
            <div className="mt-10">
                <h2 className="text-lg font-semibold">Quick Actions</h2>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <Link
                        href="/services"
                        className="group flex items-center justify-between rounded-xl border p-5 transition-colors hover:bg-muted/50"
                    >
                        <div className="flex items-center gap-4">
                            <div className="rounded-lg bg-primary/10 p-3 text-primary">
                                <Search className="size-6" />
                            </div>

                            <div>
                                <h3 className="font-semibold">Browse Services</h3>
                                <p className="text-sm text-muted-foreground">
                                    Find services for your wedding
                                </p>
                            </div>
                        </div>

                        <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <Link
                        href="/dashboard/customer/mybookings"
                        className="group flex items-center justify-between rounded-xl border p-5 transition-colors hover:bg-muted/50"
                    >
                        <div className="flex items-center gap-4">
                            <div className="rounded-lg bg-primary/10 p-3 text-primary">
                                <CalendarCheck className="size-6" />
                            </div>

                            <div>
                                <h3 className="font-semibold">My Bookings</h3>
                                <p className="text-sm text-muted-foreground">
                                    Track your wedding service bookings
                                </p>
                            </div>
                        </div>

                        <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>



        </div>
    );
}