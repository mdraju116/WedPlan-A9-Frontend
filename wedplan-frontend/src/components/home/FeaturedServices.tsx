
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type Service = {
    _id: string;
    title: string;
    category: string;
    price: number;
    image: string;
    images?: string[];
    location?: string;
    description: string;
    vendorName: string;
};

const categoryAliases = [
    ["Photography & Videography", "Photography", "Videography"],
    ["Wedding Venues", "Venue", "Venues"],
    ["Decoration & Florists", "Decoration", "Florist", "Florists"],
    ["Catering Services", "Catering"],
    ["Makeup & Styling", "Makeup", "Styling"],
    ["Wedding Fashion", "Fashion"],
];

function selectFeaturedServices(services: Service[]): Service[] {
    const selected = categoryAliases.flatMap((aliases) => {
        const match = services.find((service) => aliases.some(
            (category) => service.category.trim().toLowerCase() === category.toLowerCase(),
        ));
        return match ? [match] : [];
    });
    const selectedIds = new Set(selected.map((service) => service._id));
    return [...selected, ...services.filter((service) => !selectedIds.has(service._id))].slice(0, 6);
}

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

        return Array.isArray(result.data) ? selectFeaturedServices(result.data) : [];
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
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => (
                            <article
                                key={service._id}
                                className="group overflow-hidden border border-[#E9E0D4] bg-white"
                            >
                                <Link
                                    href={`/services/${service._id}`}
                                    className="block"
                                >
                                    <div className="relative aspect-video overflow-hidden">
                                        <Image
                                            src={service.images?.[0] || service.image}
                                            alt={service.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                    </div>

                                    <div className="space-y-3 p-4">
                                        <div className="flex items-start justify-between gap-3">
                                            <h3 className="min-w-0 flex-1 line-clamp-1 font-serif text-xl text-[#302820] transition-colors group-hover:text-[#B49360]">
                                                {service.title}
                                            </h3>
                                            <span className="max-w-[55%] shrink-0 whitespace-nowrap rounded-full border border-[#E9D8BD] bg-[#FAF4E9] px-2.5 py-1 text-center text-[11px] font-semibold leading-4 text-[#8D7048]">
                                                {service.category}
                                            </span>
                                        </div>
                                        <div className="flex min-h-12 items-start justify-between gap-3">
                                            <p className="min-w-0 flex-1 line-clamp-2 text-sm leading-6 text-[#81776D]">
                                                {service.description}
                                            </p>
                                            <div className="shrink-0 text-right">
                                                <p className="text-xs text-[#968A7D]">Starting from</p>
                                                <p className="mt-1 font-semibold text-[#8D7048]">
                                                    {`৳${service.price.toLocaleString("en-BD")}`}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between border-t border-[#E9E0D4] pt-3">
                                            <div className="min-w-0 flex-1 text-xs leading-5 text-[#968A7D]">
                                                <p className="truncate">Provided by {service.vendorName}</p>
                                                <p className="truncate">{service.location || "Location not listed"}</p>
                                            </div>

                                            <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#DCCCB5] text-[#8D7048] transition-colors group-hover:bg-[#B49360] group-hover:text-white">
                                                <ArrowUpRight className="size-5" />
                                            </span>
                                        </div>

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
