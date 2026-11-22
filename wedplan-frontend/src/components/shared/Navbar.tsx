"use client";

import Link from "next/link";
import UserMenu from "../auth/UserMenu";
import { useSession } from "@/lib/auth-client";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
    { label: "Home", link: "/" },
    { label: "Services", link: "/services" },
];

const dashboardPaths = {
    Customer: "/dashboard/customer",
    Vendor: "/dashboard/vendor",
    Admin: "/dashboard/admin",
};

const Navbar = () => {
    const { data: session, isPending } = useSession();
    const [mobileOpen, setMobileOpen] = useState(false);

    const role = session?.user?.role;
    const dashboardLink = role
        ? dashboardPaths[role as keyof typeof dashboardPaths]
        : null;

    return (
        <nav className="relative z-40 w-full border-b bg-background">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">

                <Link href="/" className="text-xl font-bold">
                    WedPlan
                </Link>

                <div className="hidden items-center gap-6 md:flex">
                    {navLinks.map((item) => (
                        <Link
                            key={item.link}
                            href={item.link}
                            className="text-sm font-medium text-muted-foreground hover:text-primary"
                        >
                            {item.label}
                        </Link>
                    ))}

                    {!isPending && dashboardLink && (
                        <Link
                            href={dashboardLink}
                            className="text-sm font-medium text-muted-foreground hover:text-primary"
                        >
                            Dashboard
                        </Link>
                    )}
                </div>

                <UserMenu />

                <button type="button" aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)} className="rounded-md p-2 text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden">
                    {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                </button>

            </div>
            {mobileOpen && <div className="absolute inset-x-0 top-full border-b bg-background p-4 shadow-lg md:hidden">
                <div className="mx-auto flex max-w-7xl flex-col gap-1">
                    {navLinks.map((item) => <Link key={item.link} href={item.link} onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">{item.label}</Link>)}
                    {!isPending && dashboardLink && <Link href={dashboardLink} onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">Dashboard</Link>}
                </div>
            </div>}
        </nav>
    );
};

export default Navbar;
