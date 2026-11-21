import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
    return (
        <section className="relative overflow-hidden bg-[#332B25] px-6 py-24 text-center md:px-12">
            <div className="absolute -left-24 -top-24 size-72 rounded-full border border-[#B89562]/20" />
            <div className="absolute -bottom-32 -right-20 size-96 rounded-full border border-[#B89562]/20" />

            <div className="relative mx-auto max-w-3xl">
                <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-[#D5B783]">
                    Your Dream Wedding Starts Here
                </p>

                <h2 className="font-serif text-4xl leading-tight text-[#F8F5F0] md:text-6xl">
                    Let&apos;s Make Your
                    <span className="block italic text-[#D5B783]">
                        Special Day
                    </span>
                    Unforgettable.
                </h2>

                <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#D1C8BE] md:text-base">
                    Discover trusted wedding professionals, explore beautiful
                    services, and bring every detail of your celebration together.
                </p>

                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                    <Link
                        href="/services"
                        className="inline-flex items-center justify-center gap-2 bg-[#C5A16E] px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-[#B38D5A]"
                    >
                        Explore Services
                        <ArrowRight size={17} />
                    </Link>

                    <Link
                        href="/sign-up"
                        className="inline-flex items-center justify-center border border-[#D5B783]/50 px-8 py-4 text-sm font-medium text-[#F8F5F0] transition-colors hover:bg-white/10"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </section>
    );
}