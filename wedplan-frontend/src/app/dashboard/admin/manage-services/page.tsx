
"use client";

import { useEffect, useState } from "react";
import { getClientToken } from "@/lib/access-jwt-at-client-component";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";
import { Loader2, Check, X } from "lucide-react";

type Service = {
    _id: string;
    title: string;
    category: string;
    price: number;
    image: string;
    vendorName: string;
    status: "Active" | "Inactive";
    bookings: number;
    createdAt: string;
};

const ManageServicesPage = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const fetchServices = async () => {
        try {
            const token = await getClientToken();

            if (!token) {
                throw new Error("Authentication required");
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/services/admin/all`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    cache: "no-store",
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to fetch services");
            }

            setServices(result.data);
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadServices = async () => {
            await fetchServices();
        };

        loadServices();
    }, []);

    const handleStatusUpdate = async (
        service: Service,
        status: "Active" | "Inactive"
    ) => {
        try {
            setUpdatingId(service._id);

            const token = await getClientToken();

            if (!token) {
                throw new Error("Authentication required");
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/services/${service._id}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ status }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to update status");
            }

            setServices((previousServices) =>
                previousServices.map((item) =>
                    item._id === service._id ? { ...item, status } : item
                )
            );

            toast.success(`Service ${status.toLowerCase()} successfully`);
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Something went wrong"
            );
        } finally {
            setUpdatingId(null);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-75 items-center justify-center gap-2">
                <Loader2 className="animate-spin" />
                <p>Loading services...</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl space-y-6">

            <div>
                <h1 className="text-2xl font-bold">Manage Services</h1>
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-muted-foreground">
                        Review and manage vendor service listings.
                    </p>
                    <Badge variant="secondary" className="h-fit px-3 py-1">
                        Total Services: {services.length}
                    </Badge>
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border">
                <table className="w-full min-w-150 text-sm">
                    <thead className="bg-muted/50">
                        <tr className="text-left">
                            <th className="p-4">Service</th>
                            <th className="p-4">Vendor</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {services.map((service) => (
                            <tr key={service._id} className="border-t">
                                <td className="p-4 font-medium">
                                    {service.title}
                                </td>

                                <td className="p-4">{service.vendorName}</td>

                                <td className="p-4">{service.category}</td>

                                <td className="p-4">
                                    ৳{service.price.toLocaleString()}
                                </td>

                                <td className="p-4">
                                    <Badge
                                        variant={
                                            service.status === "Active"
                                                ? "default"
                                                : "secondary"
                                        }
                                    >
                                        {service.status}
                                    </Badge>
                                </td>

                                <td className="p-4">
                                    <Button
                                        size="sm"
                                        variant={
                                            service.status === "Active"
                                                ? "destructive"
                                                : "outline"
                                        }
                                        disabled={updatingId === service._id}
                                        onClick={() =>
                                            handleStatusUpdate(
                                                service,
                                                service.status === "Active"
                                                    ? "Inactive"
                                                    : "Active"
                                            )
                                        }
                                    >
                                        {updatingId === service._id ? (
                                            <Loader2 className="animate-spin" />
                                        ) : service.status === "Active" ? (
                                            <X />
                                        ) : (
                                            <Check />
                                        )}

                                        {service.status === "Active"
                                            ? "Deactivate"
                                            : "Activate"}
                                    </Button>
                                </td>
                            </tr>
                        ))}

                        {services.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="p-8 text-center text-muted-foreground"
                                >
                                    No services found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageServicesPage;
