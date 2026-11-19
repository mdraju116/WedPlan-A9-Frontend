"use client";

import Link from "next/link";
import UserMenu from "../auth/UserMenu";
import { useSession } from "@/lib/auth-client";

const navLinks = [
    { label: "Home", link: "/" },
    { label: "Services", link: "/services" },
];

const Navbar = () => {
    const { data: session, isPending } = useSession();

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

                    {!isPending && session?.user && (
                        <Link
                            href="/dashboard"
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