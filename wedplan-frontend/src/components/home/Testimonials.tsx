import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Sarah & James",
        location: "Dhaka, Bangladesh",
        review:
            "WedPlan made our wedding planning journey so much easier. We found amazing vendors and everything came together beautifully.",
    },
    {
        name: "Nusrat & Ahmed",
        location: "Rajshahi, Bangladesh",
        review:
            "From finding the perfect decoration team to booking our photographer, the entire experience was smooth and stress-free.",
    },
    {
        name: "Ayesha & Rahim",
        location: "Chattogram, Bangladesh",
        review:
            "We loved how easy it was to explore services and manage our bookings. WedPlan helped make our special day unforgettable.",
    },
];

export default function Testimonials() {
    return (
        <section className="bg-white px-6 py-20 md:px-12 lg:px-20">
            <div className="mx-auto max-w-7xl">
                <div className="mb-14 text-center">
                    <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-[#B89562]">
                        Kind Words
                    </p>

                    <h2 className="font-serif text-3xl text-[#332B25] md:text-5xl">
                        Love Stories, Happy Memories
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#81766D] md:text-base">
                        Every celebration has a story. Here are a few words from
                        couples who trusted us with theirs.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((item) => (
                        <div
                            key={item.name}
                            className="border border-[#EAE2D8] bg-[#F8F5F0] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="mb-6 flex gap-1 text-[#B89562]">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <Star
                                        key={index}
                                        size={16}
                                        fill="currentColor"
                                    />
                                ))}
                            </div>

                            <p className="min-h-28 text-sm leading-7 text-[#6F655C]">
                                “{item.review}”
                            </p>

                            <div className="mt-7 border-t border-[#E5DACE] pt-5">
                                <h3 className="font-serif text-lg text-[#332B25]">
                                    {item.name}
                                </h3>
                                <p className="mt-1 text-xs text-[#A09589]">
                                    {item.location}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}