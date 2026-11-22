
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
    Plus,
    BriefcaseBusiness,
    Trash2,
    Eye,
} from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import UpdateService, {
    type Service,
} from "@/components/dashboard/UpdateService";

import { getClientToken } from "@/lib/access-jwt-at-client-component";

export default function MyServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteServiceId, setDeleteServiceId] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    // Fetch Vendor Services
    useEffect(() => {
        const fetchMyServices = async () => {
            try {
                const token = await getClientToken();

                if (!token) return;

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/services/my-services`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch services");
                }

                const result = await response.json();

                const formattedServices: Service[] = result.data.map(
                    (service: {
                        _id: string;
                        title: string;
                        category: string;
                        price: number;
                        bookings: number;
                        status: "Pending" | "Active" | "Inactive" | "Rejected";
                        image: string;
                        images?: string[];
                        location?: string;
                    }) => ({
                        id: service._id,
                        title: service.title,
                        category: service.category,
                        price: service.price,
                        bookings: service.bookings,
                        status: service.status,
                        image: service.image,
                        images: service.images ?? (service.image ? [service.image] : []),
                        location: service.location ?? "",
                    })
                );

                setServices(formattedServices);
            } catch (error) {
                console.error("Error fetching vendor services:", error);
                toast.error("Failed to load services");
            } finally {
                setLoading(false);
            }
        };

        fetchMyServices();
    }, []);

    const handleDeleteService = async () => {
        if (!deleteServiceId) return;

        setDeleting(true);

        try {
            const token = await getClientToken();

            if (!token) {
                throw new Error("Authentication required");
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/services/${deleteServiceId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to delete service");
            }

            setServices((prevServices) =>
                prevServices.filter(
                    (service) => service.id !== deleteServiceId
                )
            );

            setDeleteServiceId(null);
            toast.success("Service deleted successfully!");
        } catch (error) {
            console.error("Service deletion failed:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to delete service"
            );
        } finally {
            setDeleting(false);
        }
    };

    // Update Service (Local State - API Integration Next)
    const handleUpdateService = (updatedService: Service) => {
        setServices((prevServices) =>
            prevServices.map((service) =>
                service.id === updatedService.id ? updatedService : service
            )
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
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

            {/* Service Listing */}
            {loading ? (
                <div className="py-16 text-center text-muted-foreground">
                    Loading services...
                </div>
            ) : services.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="overflow-hidden rounded-xl border bg-card"
                        >
                            {/* Image */}
                            <div className="relative h-48 w-full overflow-hidden rounded-lg bg-muted">
                                {service.image ? (
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center">
                                        <BriefcaseBusiness className="size-12 text-muted-foreground" />
                                    </div>
                                )}
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
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {service.location || "Location not listed"}
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

                            {/* Actions */}
                            <div className="flex items-center justify-center gap-2 border-t py-4">
                                <Button variant="outline" size="sm" render={<Link href={`/services/${service.id}`} />}>
                                    <Eye className="size-4" />
                                    View Details
                                </Button>

                                <UpdateService
                                    service={service}
                                    onUpdate={handleUpdateService}
                                />

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-destructive hover:text-destructive"
                                    onClick={() => setDeleteServiceId(service.id)}
                                >
                                    <Trash2 className="size-4" />
                                    Delete
                                </Button>
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

            {/* Delete Confirmation */}
            <AlertDialog
                open={!!deleteServiceId}
                onOpenChange={(open) => {
                    if (!open) setDeleteServiceId(null);
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Service?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this service?
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Keep Service
                        </AlertDialogCancel>

                        <AlertDialogAction
                            onClick={handleDeleteService}
                            disabled={deleting}
                        >
                            {deleting ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
