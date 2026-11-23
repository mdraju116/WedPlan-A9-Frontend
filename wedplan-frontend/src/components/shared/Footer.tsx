import Link from "next/link";
import Image from "next/image";
import { Heart, Mail, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const footerLinks = {
    explore: [
        { label: "Home", href: "/" },
        { label: "Browse Services", href: "/services" },
        { label: "Sign In", href: "/sign-in" },
        { label: "Get Started", href: "/sign-up" },
    ],
    categories: [
        { label: "Photography & Videography", href: "/services?category=Photography%20%26%20Videography" },
        { label: "Decoration & Florists", href: "/services?category=Decoration%20%26%20Florists" },
        { label: "Catering Services", href: "/services?category=Catering%20Services" },
        { label: "Wedding Venues", href: "/services?category=Wedding%20Venues" },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-[#241F1B] px-6 pt-10 text-[#D1C8BE] md:px-12 lg:px-20">
            <div className="mx-auto grid max-w-7xl gap-8 pb-8 md:grid-cols-2 lg:grid-cols-4">
                <div>
                    <Link
                        href="/"
                        aria-label="WedPlan home"
                        className="relative block h-20 w-56"
                    >
                        <Image src="/assets/wedplan-footer-logo-light.png" alt="WedPlan — Plan, Book, Celebrate" fill sizes="224px" className="object-contain object-left" />
                    </Link>

                    <p className="mt-3 max-w-64 text-sm leading-6 text-[#A99F95]">
                        Bringing your wedding dreams to life with trusted
                        professionals and effortless planning.
                    </p>


                </div>

                <div>
                    <h3 className="mb-4 font-serif text-lg text-[#F8F5F0]">
                        Explore
                    </h3>
                    <ul className="space-y-3 text-sm">
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
                    <h3 className="mb-4 font-serif text-lg text-[#F8F5F0]">
                        Services
                    </h3>
                    <ul className="space-y-3 text-sm">
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
                    <h3 className="mb-4 font-serif text-lg text-[#F8F5F0]">
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
                    <div className="mt-4 flex gap-4">
                         <Link
                            href="https://www.facebook.com/"
                            aria-label="Facebook"
                            target="_blank"
                            rel="noreferrer"
                            className="transition-colors hover:text-[#D5B783]"
                        >
                            <FaFacebookF size={19} />
                        </Link>
                        <Link
                            href="https://www.instagram.com/"
                            aria-label="Instagram"
                            target="_blank"
                            rel="noreferrer"
                            className="transition-colors hover:text-[#D5B783]"
                        >
                            <FaInstagram size={19} />
                        </Link>
                       
                    </div>
                </div>
            </div>

            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 border-t border-white/10 py-4 text-center text-xs text-[#8F857B] sm:flex-row sm:text-left">
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
