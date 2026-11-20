"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { useState } from "react";
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

import UpdateService, { type Service, } from "@/components/dashboard/UpdateService";
import Image from "next/image";


export default function MyServicesPage() {

    const [deleteServiceId, setDeleteServiceId] = useState<string | null>(null);

    const [services, setServices] = useState<Service[]>(() => {
        const defaultServices: Service[] = [
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

        if (typeof window === "undefined") {
            return defaultServices;
        }

        const savedServices: Service[] = JSON.parse(
            localStorage.getItem("wedplan-services") || "[]"
        );

        return [
            ...defaultServices,
            ...savedServices.filter(
                (saved) => !defaultServices.some(
                    (service) => service.id === saved.id
                )
            ),
        ];
    });


    const handleDeleteService = () => {
        if (!deleteServiceId) return;

        setServices((prevServices) =>
            prevServices.filter((service) => service.id !== deleteServiceId)
        );

        setDeleteServiceId(null);
    };

    const handleUpdateService = (updatedService: Service) => {
        console.log("Updated service:", updatedService);

        setServices((prevServices) =>
            prevServices.map((service) =>
                service.id === updatedService.id ? updatedService : service
            )
        );
    };

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
                            className="bg-destructive text-white hover:bg-destructive/90"
                        >
                            Yes, Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    );
}