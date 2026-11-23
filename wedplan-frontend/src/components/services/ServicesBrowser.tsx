"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type ServiceListing = {
    _id: string;
    title: string;
    category: string;
    price: number;
    image?: string;
    images?: string[];
    vendorName: string;
    description: string;
    location?: string;
};

const categories = [
    "Photography & Videography",
    "Wedding Venues",
    "Decoration & Florists",
    "Catering Services",
    "Makeup & Styling",
    "Wedding Fashion",
];

const categoryAliases: Record<string, string[]> = {
    "Photography & Videography": ["Photography", "Photographer", "Videography", "Videographer", "Photography and Videography"],
    "Wedding Venues": ["Venue", "Venues", "Wedding Venue", "Wedding Venues"],
    "Decoration & Florists": ["Decoration", "Decor", "Florist", "Florists", "Flower", "Decoration and Florists"],
    "Catering Services": ["Catering", "Caterer", "Food"],
    "Makeup & Styling": ["Makeup", "Make-up", "Styling", "Stylist", "Makeup and Styling"],
    "Wedding Fashion": ["Fashion", "Dress", "Attire", "Wedding Wear"],
};

function normalizeCategory(value: string) {
    return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, " ").trim();
}

function categoryMatches(serviceCategory: string, selectedCategory: string) {
    const serviceName = normalizeCategory(serviceCategory);
    const accepted = [selectedCategory, ...(categoryAliases[selectedCategory] || [])]
        .map(normalizeCategory);
    return accepted.some((name) => serviceName === name || serviceName.includes(name));
}

export default function ServicesBrowser({
    services,
    initialCategory = "",
}: {
    services: ServiceListing[];
    initialCategory?: string;
}) {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState(initialCategory);
    const [location, setLocation] = useState("");
    const [sort, setSort] = useState("recent");

    useEffect(() => {
        setCategory(initialCategory);
    }, [initialCategory]);

    const categoryOptions = categories;

    const filtered = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        const normalizedLocation = location.trim().toLowerCase();
        const result = services.filter((service) => {
            const matchesQuery = !normalizedQuery || [
                service.title,
                service.description,
                service.vendorName,
            ].some((value) => value?.toLowerCase().includes(normalizedQuery));
            const matchesCategory = !category || categoryMatches(service.category, category);
            const matchesLocation = !normalizedLocation || service.location?.toLowerCase().includes(normalizedLocation);
            return matchesQuery && matchesCategory && matchesLocation;
        });

        if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
        if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
        return result;
    }, [services, query, category, location, sort]);

    return (
        <>
            <section aria-label="Search and filter services" className="grid gap-3 rounded-2xl border bg-card p-4 md:grid-cols-2 xl:grid-cols-4">
                <label className="relative block">
                    <span className="sr-only">Search services</span>
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name or vendor" className="h-11 w-full rounded-md border bg-background pl-9 pr-3 text-sm" />
                </label>
                <label>
                    <span className="sr-only">Filter by category</span>
                    <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-11 w-full rounded-md border bg-background px-3 text-sm">
                        <option value="">All categories</option>
                        {categoryOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                </label>
                <label>
                    <span className="sr-only">Filter by location</span>
                    <input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Filter by location" className="h-11 w-full rounded-md border bg-background px-3 text-sm" />
                </label>
                <label>
                    <span className="sr-only">Sort services</span>
                    <select value={sort} onChange={(event) => setSort(event.target.value)} className="h-11 w-full rounded-md border bg-background px-3 text-sm">
                        <option value="recent">Most recent</option>
                        <option value="price-asc">Price: low to high</option>
                        <option value="price-desc">Price: high to low</option>
                    </select>
                </label>
            </section>

            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Available Services</h2>
                <Badge variant="secondary">{filtered.length} Services</Badge>
            </div>

            {filtered.length === 0 ? (
                <div className="rounded-xl border py-16 text-center">
                    <h3 className="text-lg font-semibold">No matching services</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Try changing your search or filters.</p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((service) => {
                        const image = service.images?.[0] || service.image;
                        return (
                            <article key={service._id} className="overflow-hidden rounded-xl border bg-card">
                                <div className="relative h-52 w-full bg-muted">
                                    {image && <Image src={image} alt={service.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />}
                                </div>
                                <div className="space-y-3 p-5">
                                    <div className="flex items-center justify-between gap-2">
                                        <Badge variant="secondary">{service.category}</Badge>
                                        <p className="font-semibold">৳{service.price.toLocaleString("en-BD")}</p>
                                    </div>
                                    <h3 className="text-lg font-semibold">{service.title}</h3>
                                    <p className="text-sm text-muted-foreground">By {service.vendorName}</p>
                                    <p className="text-sm text-muted-foreground">{service.location || "Location not listed"}</p>
                                    <p className="line-clamp-2 text-sm text-muted-foreground">{service.description}</p>
                                    <Button className="w-full" nativeButton={false} render={<Link href={`/services/${service._id}`} />}>View Details</Button>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </>
    );
}
