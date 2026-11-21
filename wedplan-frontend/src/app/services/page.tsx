
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Service = {
    _id: string;
    title: string;
    category: string;
    price: number;
    image: string;
    vendorName: string;
    description: string;
};

async function getServices(): Promise<Service[]> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/services`,
            {
                cache: "no-store",
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch services");
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error("Services fetch error:", error);
        return [];
    }
}

const ServicesPage = async () => {
    const services = await getServices();

    return (
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-10">
            <div className="text-center">
                <h1 className="text-3xl font-bold md:text-4xl">
                    Explore Wedding Services
                </h1>
                <p className="mt-3 text-muted-foreground">
                    Find the perfect vendors to make your special day
                    unforgettable.
                </p>
            </div>

            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Available Services</h2>
                <Badge variant="secondary">
                    {services.length} Services
                </Badge>
            </div>

            {services.length === 0 ? (
                <div className="rounded-xl border py-16 text-center">
                    <h3 className="text-lg font-semibold">
                        No services available
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Please check back later for available services.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <div
                            key={service._id}
                            className="overflow-hidden rounded-xl border bg-card"
                        >
                            <div className="relative h-52 w-full bg-muted">
                                {service.image && (
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                )}
                            </div>

                            <div className="space-y-3 p-5">
                                <div className="flex items-center justify-between gap-2">
                                    <Badge variant="secondary">
                                        {service.category}
                                    </Badge>
                                    <p className="font-semibold">
                                        ৳{service.price.toLocaleString()}
                                    </p>
                                </div>

                                <h3 className="text-lg font-semibold">
                                    {service.title}
                                </h3>

                                <p className="text-sm text-muted-foreground">
                                    By {service.vendorName}
                                </p>

                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                    {service.description}
                                </p>

                                <Button

                                    className="w-full "
                                    nativeButton={false}
                                    render={<Link href={`/services/${service._id}`} />}
                                >
                                    View Details
                                </Button>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ServicesPage;
