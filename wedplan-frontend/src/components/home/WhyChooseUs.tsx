
import {
    Heart,
    ShieldCheck,
    Sparkles,
    CalendarCheck,
} from "lucide-react";

const features = [
    {
        icon: Heart,
        number: "01",
        title: "Personalized Planning",
        description:
            "Find wedding services that match your style, preferences, and vision for your special day.",
    },
    {
        icon: ShieldCheck,
        number: "02",
        title: "Trusted Professionals",
        description:
            "Connect with service providers and explore their offerings before making your decision.",
    },
    {
        icon: Sparkles,
        number: "03",
        title: "Everything in One Place",
        description:
            "Discover venues, decorations, photography, and more without searching multiple platforms.",
    },
    {
        icon: CalendarCheck,
        number: "04",
        title: "Effortless Booking",
        description:
            "Submit booking requests, track their status, and keep your wedding plans organized.",
    },
];

const WhyChooseUs = () => {
    return (
        <section className="bg-white px-4 py-20 sm:px-6 md:py-28 lg:px-8">
            <div className="mx-auto max-w-7xl">

                <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">

                    {/* Left Content */}
                    <div className="lg:sticky lg:top-28 lg:self-start">
                        <p className="mb-5 text-xs font-semibold tracking-[0.3em] text-[#B49360] uppercase">
                            Why Choose WedPlan
                        </p>

                        <h2 className="font-serif text-4xl leading-tight text-[#302820] sm:text-5xl">
                            Making Your
                            <span className="block mt-2 italic text-[#B49360]">
                                Dream Wedding
                            </span>
                            Effortlessly Beautiful.
                        </h2>

                        <p className="mt-6 max-w-lg text-base leading-8 text-[#766D63]">
                            Your wedding should be filled with beautiful
                            memories, not endless planning stress. WedPlan
                            brings everything together to make your journey
                            simpler, smoother, and more meaningful.
                        </p>
                    </div>

                    {/* Right Features */}
                    <div className="grid gap-0 sm:grid-cols-2">
                        {features.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.number}
                                    className="border-t border-[#E9E0D4] px-5 py-8 first:border-t sm:even:border-l sm:even:pl-8"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex size-12 items-center justify-center bg-[#F7F3ED] text-[#B49360]">
                                            <Icon className="size-5" />
                                        </div>

                                        <span className="font-serif text-sm text-[#B9A58E]">
                                            {feature.number}
                                        </span>
                                    </div>

                                    <h3 className="mt-6 font-serif text-xl text-[#302820]">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-[#81776D]">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
