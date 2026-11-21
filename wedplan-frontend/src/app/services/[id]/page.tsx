
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Service = {
    _id: string;
    title: string;
    category: string;
    price: number;
    image: string;
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
    const service = await getService(id);

    if (!service) {
        notFound();
    }

    return (
        <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="grid gap-8 md:grid-cols-2">
                <div className="relative min-h-75 overflow-hidden rounded-xl bg-muted md:min-h-100">
                    {service.image && (
                        <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            priority
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    )}
                </div>

                <div className="flex flex-col justify-center space-y-5">
                    <Badge variant="secondary" className="w-fit">
                        {service.category}
                    </Badge>

                    <h1 className="text-3xl font-bold md:text-4xl">
                        {service.title}
                    </h1>

                    <p className="text-muted-foreground">
                        Provided by{" "}
                        <span className="font-medium text-foreground">
                            {service.vendorName}
                        </span>
                    </p>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Service Price
                        </p>
                        <p className="text-3xl font-bold text-primary">
                            ৳{service.price.toLocaleString()}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">
                            About This Service
                        </h2>
                        <p className="leading-7 text-muted-foreground">
                            {service.description}
                        </p>
                    </div>

                 
                    <Button
                        size="lg"
                        className="w-full sm:w-fit"
                        nativeButton={false}
                        render={<Link href={`/services/${service._id}/book`} />}
                    >
                        Book Now
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailsPage;
