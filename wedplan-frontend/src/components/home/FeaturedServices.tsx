
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type Service = {
    _id: string;
    title: string;
    category: string;
    price: number;
    image: string;
    description: string;
    vendorName: string;
};

async function getFeaturedServices(): Promise<Service[]> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/services`,
            { cache: "no-store" }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch services");
        }

        const result = await response.json();

        return Array.isArray(result.data) ? result.data.slice(0, 3) : [];
    } catch (error) {
        console.error("Featured services error:", error);
        return [];
    }
}

const FeaturedServices = async () => {
    const services = await getFeaturedServices();

    return (
        <section className="bg-[#FAF8F4] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Section Heading */}
                <div className="mb-14 text-center">
                    <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-[#B49360] uppercase">
                        Discover Our Services
                    </p>

                    <h2 className="font-serif text-4xl text-[#302820] sm:text-5xl">
                        Everything for Your
                        <span className="block mt-2 italic text-[#B49360]">
                            Perfect Day
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#766D63] sm:text-base">
                        From breathtaking decorations to unforgettable
                        celebrations, discover everything you need to make
                        your wedding truly special.
                    </p>
                </div>

                {/* Service Cards */}
                {services.length > 0 ? (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => (
                            <article
                                key={service._id}
                                className="group overflow-hidden border border-[#E9E0D4] bg-white"
                            >
                                <Link
                                    href={`/services/${service._id}`}
                                    className="block"
                                >
                                    <div className="relative aspect-4/3 overflow-hidden">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        <span className="absolute left-4 top-4 bg-[#FAF8F4] px-4 py-2 text-xs font-medium tracking-wide text-[#8D7048]">
                                            {service.category}
                                        </span>
                                    </div>

                                    <div className="space-y-4 p-6">
                                        <div>
                                            <h3 className="font-serif text-2xl text-[#302820] transition-colors group-hover:text-[#B49360]">
                                                {service.title}
                                            </h3>

                                            <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#81776D]">
                                                {service.description}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between border-t border-[#E9E0D4] pt-4">
                                            <div>
                                                <p className="text-xs text-[#968A7D]">
                                                    Starting from
                                                </p>
                                                <p className="mt-1 font-semibold text-[#8D7048]">
                                                    ৳{service.price.toLocaleString("en-BD")}
                                                </p>
                                            </div>

                                            <span className="flex size-10 items-center justify-center rounded-full border border-[#DCCCB5] text-[#8D7048] transition-colors group-hover:bg-[#B49360] group-hover:text-white">
                                                <ArrowUpRight className="size-5" />
                                            </span>
                                        </div>

                                        <p className="text-xs text-[#968A7D]">
                                            Provided by {service.vendorName}
                                        </p>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="border border-dashed border-[#DCCCB5] py-16 text-center">
                        <p className="font-serif text-2xl text-[#514538]">
                            Services Coming Soon
                        </p>
                        <p className="mt-3 text-sm text-[#81776D]">
                            We&apos;re preparing something special for you.
                        </p>
                    </div>
                )}

                {/* View All */}
                <div className="mt-12 flex justify-center">
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-3 border border-[#B49360] px-7 py-3.5 text-sm font-semibold text-[#8D7048] transition hover:bg-[#B49360] hover:text-white"
                    >
                        Explore All Services
                        <ArrowRight className="size-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedServices;
