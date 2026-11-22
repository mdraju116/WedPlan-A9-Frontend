import ServicesBrowser, { type ServiceListing } from "@/components/services/ServicesBrowser";

async function getServices(): Promise<ServiceListing[]> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/services`, { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to fetch services");
        const result = await response.json();
        return Array.isArray(result.data) ? result.data : [];
    } catch (error) {
        console.error("Services fetch error:", error);
        return [];
    }
}

export default async function ServicesPage({ searchParams }: PageProps<"/services">) {
    const [{ category }, services] = await Promise.all([searchParams, getServices()]);
    const initialCategory = Array.isArray(category) ? category[0] : category || "";

    return (
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-10">
            <div className="text-center">
                <h1 className="text-3xl font-bold md:text-4xl">Explore Wedding Services</h1>
                <p className="mt-3 text-muted-foreground">Find the perfect vendors to make your special day unforgettable.</p>
            </div>
            <ServicesBrowser services={services} initialCategory={initialCategory} />
        </div>
    );
}
