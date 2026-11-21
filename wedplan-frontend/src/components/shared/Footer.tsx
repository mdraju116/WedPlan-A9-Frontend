import Link from "next/link";
import { Heart,  Mail, MapPin } from "lucide-react";

const footerLinks = {
    explore: [
        { label: "Home", href: "/" },
        { label: "Browse Services", href: "/services" },
        { label: "Sign In", href: "/sign-in" },
        { label: "Get Started", href: "/sign-up" },
    ],
    categories: [
        { label: "Photography", href: "/services" },
        { label: "Decoration", href: "/services" },
        { label: "Catering", href: "/services" },
        { label: "Venues", href: "/services" },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-[#241F1B] px-6 pt-16 text-[#D1C8BE] md:px-12 lg:px-20">
            <div className="mx-auto grid max-w-7xl gap-12 pb-12 md:grid-cols-2 lg:grid-cols-4">
                <div>
                    <Link
                        href="/"
                        className="font-serif text-3xl font-semibold text-[#F8F5F0]"
                    >
                        Wed<span className="text-[#C5A16E]">Plan</span>
                    </Link>

                    <p className="mt-5 max-w-64 text-sm leading-7 text-[#A99F95]">
                        Bringing your wedding dreams to life with trusted
                        professionals and effortless planning.
                    </p>

                    <div className="mt-6 flex gap-4">
                        <Link
                            href="/"
                            aria-label="Instagram"
                            className="transition-colors hover:text-[#D5B783]"
                        >
                            {/* <Instagram size={19} /> */}
                        </Link>
                        <Link
                            href="/"
                            aria-label="Facebook"
                            className="transition-colors hover:text-[#D5B783]"
                        >
                            {/* <Facebook size={19} /> */}
                        </Link>
                    </div>
                </div>

                <div>
                    <h3 className="mb-6 font-serif text-lg text-[#F8F5F0]">
                        Explore
                    </h3>
                    <ul className="space-y-4 text-sm">
                        {footerLinks.explore.map((link) => (
                            <li key={link.label}>
                                <Link
                                    href={link.href}
                                    className="transition-colors hover:text-[#D5B783]"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="mb-6 font-serif text-lg text-[#F8F5F0]">
                        Services
                    </h3>
                    <ul className="space-y-4 text-sm">
                        {footerLinks.categories.map((link) => (
                            <li key={link.label}>
                                <Link
                                    href={link.href}
                                    className="transition-colors hover:text-[#D5B783]"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="mb-6 font-serif text-lg text-[#F8F5F0]">
                        Get in Touch
                    </h3>

                    <div className="space-y-4 text-sm">
                        <p className="flex items-center gap-3">
                            <Mail size={17} className="shrink-0 text-[#C5A16E]" />
                            hello@wedplan.com
                        </p>
                        <p className="flex items-center gap-3">
                            <MapPin size={17} className="shrink-0 text-[#C5A16E]" />
                            Bangladesh
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-center text-xs text-[#8F857B] sm:flex-row sm:text-left">
                <p>
                    © {new Date().getFullYear()} WedPlan. All rights reserved.
                </p>

                <p className="flex items-center gap-1.5">
                    Made with
                    <Heart size={13} className="fill-[#C5A16E] text-[#C5A16E]" />
                    for your special moments
                </p>
            </div>
        </footer>
    );
}