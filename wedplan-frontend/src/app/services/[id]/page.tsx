
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BookingCard from "@/components/services/BookingCard";
import { getCurrentUser } from "@/lib/getCurrentUser";

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

type Props = {
    params: Promise<{ id: string }>;
};

async function getService(id: string): Promise<Service | null> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/services/${id}`,
            {
                cache: "no-store",
            }
        );

        if (response.status === 404) {
            return null;
        }

        if (!response.ok) {
            throw new Error("Failed to fetch service");
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error("Service fetch error:", error);
        return null;
    }
}

const ServiceDetailsPage = async ({ params }: Props) => {
    const { id } = await params;

    const [service, user] = await Promise.all([
        getService(id),
        getCurrentUser(),
    ]);

    if (!service) {
        notFound();
    }

    const serviceImages = (service.images?.length ? service.images : [service.image]).filter(Boolean).slice(0, 3);

    return (
        <div className="mx-auto max-w-5xl space-y-8 px-4 py-10">

            <Button variant="ghost" nativeButton={false} render={<Link href="/services" />} className="-ml-3 w-fit gap-2">
                <ArrowLeft aria-hidden="true" className="size-4" />
                Back to services
            </Button>

            {/* Service Overview */}
            <div className="grid items-stretch gap-4 md:grid-cols-2">

                {/* Service Image */}
                <div className="grid h-80 grid-cols-2 grid-rows-2 gap-2 md:h-[34rem]">
                    {serviceImages.map((src, index) => (
                        <div key={`${src}-${index}`} className={`relative min-h-0 overflow-hidden rounded-xl bg-muted ${index === 0 ? (serviceImages.length === 1 ? "col-span-2 row-span-2" : "row-span-2") : serviceImages.length === 2 ? "row-span-2" : ""}`}>
                            <Image src={src} alt={`${service.title} photo ${index + 1}`} fill priority={index === 0} className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                        </div>
                    ))}
                </div>

                {/* Service Details */}
                <div className="flex flex-col justify-center overflow-y-auto rounded-2xl border border-amber-200/60 bg-amber-50/50 p-6 shadow-sm md:h-[34rem] md:p-8">
                    <Badge
                        variant="secondary"
                        className="mb-4 w-fit bg-amber-100 text-amber-800"
                    >
                        {service.category}
                    </Badge>

                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-700">
                        Make Your Day Special
                    </p>

                    <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight text-foreground md:text-4xl">
                        {service.title}
                    </h1>

                    <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Provided by</span>
                        <span className="font-semibold text-foreground">
                            {service.vendorName}
                        </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">Location: {service.location || "Not listed"}</p>

                    <div className="my-6 rounded-xl border border-amber-200/70 bg-white/70 p-4">
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Starting Price
                        </p>
                        <p className="mt-1 text-3xl font-bold text-amber-700">
                            ৳{service.price.toLocaleString()}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h2 className="font-serif text-xl font-semibold">
                            About This Service
                        </h2>
                        <p className="text-sm leading-7 text-muted-foreground">
                            {service.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Booking Section - Customers Only */}
            {user?.role === "Customer" && (
                <div className="mx-auto w-full max-w-2xl">
                    <BookingCard
                        serviceId={service._id}
                        price={service.price}
                    />
                </div>
            )}

        </div>
    );
};

export default ServiceDetailsPage;
