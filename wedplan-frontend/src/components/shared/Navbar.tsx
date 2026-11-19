"use client";

import Link from "next/link";
import UserMenu from "../auth/UserMenu";
import { useSession } from "@/lib/auth-client";

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

    const role = session?.user?.role;
    const dashboardLink = role
        ? dashboardPaths[role as keyof typeof dashboardPaths]
        : null;

    return (
        <nav className="w-full border-b bg-background">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">

                <Link href="/" className="text-xl font-bold">
                    WedPlan
                </Link>

                <div className="flex items-center gap-6">
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

            </div>
        </nav>
    );
};

export default Navbar;