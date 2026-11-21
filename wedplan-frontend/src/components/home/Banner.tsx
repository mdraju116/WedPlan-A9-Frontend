
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const Banner = () => {
    return (
        <main className="min-h-screen bg-[#F8F5F0]">
            <section
                className="relative flex min-h-screen items-center overflow-hidden bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=90&w=2200&auto=format&fit=crop')",
                }}
            >
                {/* Background Overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/40 to-black/10" />

                {/* Hero Content */}
                <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 sm:px-10 lg:px-16">
                    <div className="max-w-3xl">
                        <p className="mb-8 flex items-center gap-4 text-xs font-medium tracking-[0.35em] text-[#E5C99D] uppercase">
                            <span className="h-px w-12 bg-[#E5C99D]" />
                            Your Day. Your Story. Our Passion.
                        </p>

                        <h1 className="font-serif text-5xl leading-[1.15] text-white sm:text-6xl md:text-7xl lg:text-8xl">
                            A Celebration
                            <span className="block font-normal italic text-[#E5C99D]">
                                to Remember.
                            </span>
                        </h1>

                        <p className="mt-8 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
                            Every love story deserves an extraordinary
                            celebration. Find the perfect people, services,
                            and inspiration to make your wedding unforgettable.
                        </p>

                        <div className="mt-10 flex flex-wrap items-center gap-6">
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-3 bg-[#C4A477] px-8 py-4 text-sm font-semibold tracking-wide text-white transition hover:bg-[#A98A5D]"
                            >
                                EXPLORE SERVICES
                                <ArrowUpRight className="size-4" />
                            </Link>

                            <Link
                                href="/sign-up"
                                className="border-b border-white/70 pb-2 text-sm font-medium tracking-widest text-white transition hover:border-[#E5C99D] hover:text-[#E5C99D]"
                            >
                                GET STARTED
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Label */}
                <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/20">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10 lg:px-16">
                        <p className="text-xs tracking-[0.25em] text-white/70 uppercase">
                            WedPlan — Made for Moments
                        </p>

                        <p className="font-serif text-lg italic text-[#E5C99D]">
                            Plan beautifully.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Banner;
