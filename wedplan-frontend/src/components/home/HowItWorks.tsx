
import Link from "next/link";
import {
    Search,
    CalendarCheck,
    HeartHandshake,
    ArrowRight,
} from "lucide-react";

const steps = [
    {
        number: "01",
        icon: Search,
        title: "Discover Services",
        description:
            "Explore wedding services, compare available options, and find the perfect professionals for your celebration.",
    },
    {
        number: "02",
        icon: CalendarCheck,
        title: "Book Your Vendor",
        description:
            "Choose your preferred service, submit your event details, and send a booking request to the vendor.",
    },
    {
        number: "03",
        icon: HeartHandshake,
        title: "Celebrate Your Day",
        description:
            "Get your booking confirmed, prepare for your special occasion, and enjoy every beautiful moment.",
    },
];

const HowItWorks = () => {
    return (
        <section className="bg-[#F3F0EA] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-[#B49360] uppercase">
                        Simple & Stress-Free
                    </p>

                    <h2 className="font-serif text-4xl text-[#302820] sm:text-5xl">
                        How It
                        <span className="ml-3 italic text-[#B49360]">
                            Works
                        </span>
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-[#766D63] sm:text-base">
                        Planning your dream wedding doesn&apos;t have to be
                        complicated. Follow three simple steps to get started.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid gap-10 md:grid-cols-3">
                    {steps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <div key={step.number} className="relative text-center">
                                <div className="relative mx-auto flex size-20 items-center justify-center rounded-full border border-[#D6C3A5] bg-[#FAF8F4] text-[#B49360]">
                                    <Icon className="size-8" />

                                    <span className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full bg-[#B49360] text-xs font-semibold text-white">
                                        {step.number}
                                    </span>
                                </div>

                                <h3 className="mt-7 font-serif text-2xl text-[#302820]">
                                    {step.title}
                                </h3>

                                <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-[#81776D]">
                                    {step.description}
                                </p>

                                {index !== steps.length - 1 && (
                                    <div className="absolute right-0 top-10 hidden -translate-y-1/2 translate-x-1/2 text-[#C8B18E] lg:block">
                                        <ArrowRight className="size-6" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-3 bg-[#B49360] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#967747]"
                    >
                        Start Planning
                        <ArrowRight className="size-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
