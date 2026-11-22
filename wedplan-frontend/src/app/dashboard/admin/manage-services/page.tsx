"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Loader2, Trash2, X } from "lucide-react";
import { toast } from "react-toastify";
import { getClientToken } from "@/lib/access-jwt-at-client-component";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

type ServiceStatus = "Pending" | "Active" | "Inactive" | "Rejected";
type Service = { _id: string; title: string; category: string; location?: string; price: number; image?: string; images?: string[]; vendorName: string; status: ServiceStatus; bookings: number; createdAt: string };

export default function ManageServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => {
        void (async () => {
            try {
                const token = await getClientToken();
                if (!token) throw new Error("Authentication required");
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/services/admin/all`, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
                const result = await response.json();
                if (!response.ok) throw new Error(result.message || "Failed to fetch services");
                setServices(Array.isArray(result.data) ? result.data : []);
            } catch (error) {
                toast.error(error instanceof Error ? error.message : "Failed to load services");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const updateStatus = async (service: Service, status: ServiceStatus) => {
        setUpdatingId(service._id);
        try {
            const token = await getClientToken();
            if (!token) throw new Error("Authentication required");
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/services/${service._id}/status`, {
                method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ status }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to update service");
            setServices((items) => items.map((item) => item._id === service._id ? { ...item, status } : item));
            toast.success(`Service ${status.toLowerCase()}.`);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to update service");
        } finally {
            setUpdatingId(null);
        }
    };

    const deleteService = async () => {
        if (!deleteId) return;
        setUpdatingId(deleteId);
        try {
            const token = await getClientToken();
            if (!token) throw new Error("Authentication required");
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/services/admin/${deleteId}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to delete service");
            setServices((items) => items.filter((item) => item._id !== deleteId));
            toast.success("Service deleted.");
            setDeleteId(null);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to delete service");
        } finally {
            setUpdatingId(null);
        }
    };

    const visibleServices = useMemo(() => services.filter((service) => {
        const text = `${service.title} ${service.vendorName} ${service.category} ${service.location || ""}`.toLowerCase();
        return text.includes(query.trim().toLowerCase()) && (statusFilter === "All" || service.status === statusFilter);
    }), [services, query, statusFilter]);

    if (loading) return <div className="flex min-h-75 items-center justify-center gap-2"><Loader2 className="animate-spin" /><p>Loading services...</p></div>;

    return (
        <div className="w-full space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Manage Services</h1>
                <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-muted-foreground">Review vendor submissions and manage published listings.</p>
                    <Badge variant="secondary">{services.length} Services</Badge>
                </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-[1fr_12rem]">
                <input aria-label="Search services" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search services, vendors, or location" className="h-11 rounded-md border bg-background px-3 text-sm" />
                <select aria-label="Filter services by status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="h-11 rounded-md border bg-background px-3 text-sm">
                    {["All", "Pending", "Active", "Inactive", "Rejected"].map((status) => <option key={status}>{status}</option>)}
                </select>
            </div>
            <div className="overflow-x-auto rounded-xl border">
                <table className="w-full min-w-225 text-sm">
                    <thead className="bg-muted/50"><tr className="text-left"><th className="p-4">Service</th><th className="p-4">Vendor</th><th className="p-4">Category</th><th className="p-4">Location</th><th className="p-4">Price</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr></thead>
                    <tbody>
                        {visibleServices.map((service) => <tr key={service._id} className="border-t">
                            <td className="p-4 font-medium">{service.title}</td><td className="p-4">{service.vendorName}</td><td className="p-4">{service.category}</td><td className="p-4">{service.location || "—"}</td><td className="p-4">৳{service.price.toLocaleString("en-BD")}</td>
                            <td className="p-4"><Badge variant={service.status === "Active" ? "default" : "secondary"}>{service.status}</Badge></td>
                            <td className="p-4"><div className="flex flex-wrap gap-2">
                                {service.status === "Pending" ? <>
                                    <Button size="sm" disabled={updatingId === service._id} onClick={() => void updateStatus(service, "Active")}><Check />Approve</Button>
                                    <Button size="sm" variant="outline" disabled={updatingId === service._id} onClick={() => void updateStatus(service, "Rejected")}><X />Reject</Button>
                                </> : service.status === "Active" ? <Button size="sm" variant="outline" disabled={updatingId === service._id} onClick={() => void updateStatus(service, "Inactive")}>Deactivate</Button> : service.status === "Inactive" ? <Button size="sm" disabled={updatingId === service._id} onClick={() => void updateStatus(service, "Active")}>Activate</Button> : <Button size="sm" variant="outline" disabled={updatingId === service._id} onClick={() => void updateStatus(service, "Pending")}>Re-review</Button>}
                                <Button size="sm" variant="destructive" disabled={updatingId === service._id} aria-label={`Delete ${service.title}`} onClick={() => setDeleteId(service._id)}><Trash2 className="size-4" />Delete</Button>
                            </div></td>
                        </tr>)}
                        {visibleServices.length === 0 && <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No services match these filters.</td></tr>}
                    </tbody>
                </table>
            </div>
            <AlertDialog open={Boolean(deleteId)} onOpenChange={(open) => { if (!open && !updatingId) setDeleteId(null); }}>
                <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete this service?</AlertDialogTitle><AlertDialogDescription>This permanently removes the listing from the marketplace.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel disabled={Boolean(updatingId)}>Cancel</AlertDialogCancel><AlertDialogAction disabled={Boolean(updatingId)} onClick={(event) => { event.preventDefault(); void deleteService(); }}>{updatingId ? "Deleting..." : "Delete service"}</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
