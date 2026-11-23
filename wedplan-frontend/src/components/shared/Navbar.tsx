"use client";

import Link from "next/link";
import Image from "next/image";
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
        <nav className="sticky top-0 z-40 w-full border-b border-[#351044]/10 bg-[#E9E0D6] text-[#351044]">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">

                <Link href="/" aria-label="WedPlan home" className="block w-56 shrink-0">
                    <Image src="/assets/wedplan-navbar-logo-transparent.png" alt="WedPlan" width={1052} height={258} sizes="224px" className="h-auto w-full object-contain" priority />
                </Link>

                <div className="hidden items-center gap-6 md:flex">
                    {navLinks.map((item) => (
                        <Link
                            key={item.link}
                            href={item.link}
                            className="text-sm font-medium text-[#51454F] hover:text-[#9B6B13]"
                        >
                            {item.label}
                        </Link>
                    ))}

                    {!isPending && dashboardLink && (
                        <Link
                            href={dashboardLink}
                            className="text-sm font-medium text-[#51454F] hover:text-[#9B6B13]"
                        >
                            Dashboard
                        </Link>
                    )}
                </div>

                <UserMenu />

                <button type="button" aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)} className="rounded-md p-2 text-[#351044] hover:bg-[#351044]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden">
                    {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                </button>

            </div>
            {mobileOpen && <div className="absolute inset-x-0 top-full border-b border-[#351044]/10 bg-[#E9E0D6] p-4 text-[#351044] shadow-lg md:hidden">
                <div className="mx-auto flex max-w-7xl flex-col gap-1">
                    {navLinks.map((item) => <Link key={item.link} href={item.link} onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-[#351044]/5">{item.label}</Link>)}
                    {!isPending && dashboardLink && <Link href={dashboardLink} onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-[#351044]/5">Dashboard</Link>}
                </div>
            </div>}
        </nav>
    );
};

export default Navbar;
