"use client";

import Link from "next/link";
import UserMenu from "../auth/UserMenu";

const navLinks = [
    { label: "Home", link: "/" },
    { label: "Services", link: "/services" },
    { label: "Dashboard", link: "/dashboard" },
];

const Navbar = () => {
    return (
        <nav className="w-full border-b bg-background">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">

                {/* Logo */}
                <Link href="/" className="text-xl font-bold">
                    WedPlan
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-6">
                    {navLinks.map((item) => (
                        <Link
                            key={item.link}
                            href={item.link}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* User Menu */}
                <UserMenu />

            </div>
        </nav>
    );
};

export default Navbar;