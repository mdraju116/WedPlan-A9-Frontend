import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function MyServicesPage() {


    const services = [
        {
            id: "SRV-001",
            title: "Wedding Photography",
            category: "Photography",
            price: 25000,
            bookings: 12,
            status: "Active",
            image: "https://i.ibb.co/placeholder1.jpg",
        },
        {
            id: "SRV-002",
            title: "Wedding Decoration",
            category: "Decoration",
            price: 35000,
            bookings: 8,
            status: "Active",
            image: "https://i.ibb.co/placeholder2.jpg",
        },
        {
            id: "SRV-003",
            title: "Wedding Catering",
            category: "Catering",
            price: 50000,
            bookings: 4,
            status: "Inactive",
            image: "https://i.ibb.co/placeholder3.jpg",
        },
    ];
    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">My Services</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your wedding services and their listings.
                    </p>
                </div>

                <Button render={<Link href="/dashboard/vendor/add-service" />}>
                    <Plus className="size-4" />
                    Add New Service
                </Button>
            </div>

            {/* Service listing will go here */}
            {services.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="overflow-hidden rounded-xl border bg-card"
                        >
                            {/* Image Placeholder */}
                            <div className="flex h-44 items-center justify-center bg-muted">
                                <BriefcaseBusiness className="size-12 text-muted-foreground" />
                            </div>

                            {/* Service Information */}
                            <div className="space-y-4 p-5">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h2 className="font-semibold">
                                            {service.title}
                                        </h2>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {service.category}
                                        </p>
                                    </div>

                                    <Badge
                                        variant={
                                            service.status === "Active"
                                                ? "default"
                                                : "secondary"
                                        }
                                    >
                                        {service.status}
                                    </Badge>
                                </div>

                                <div className="flex items-center justify-between border-t pt-4">
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Starting Price
                                        </p>
                                        <p className="font-bold">
                                            ৳{service.price.toLocaleString("en-BD")}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-xs text-muted-foreground">
                                            Total Bookings
                                        </p>
                                        <p className="font-semibold">
                                            {service.bookings}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border border-dashed py-16 text-center">
                    <BriefcaseBusiness className="mx-auto size-10 text-muted-foreground" />
                    <h3 className="mt-3 font-semibold">No Services Yet</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Start by adding your first wedding service.
                    </p>
                </div>
            )}
        </div>
    );
}