"use client";

import * as React from "react";
import Image from "next/image";
import { Pencil, Save, X } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getClientToken } from "@/lib/access-jwt-at-client-component";
import { uploadImage } from "@/lib/uploadImage";

export type Service = {
    id: string;
    title: string;
    category: string;
    price: number;
    bookings: number;
    status: "Pending" | "Active" | "Inactive" | "Rejected";
    image: string;
    images: string[];
    location: string;
};

export default function UpdateService({ service, onUpdate }: { service: Service; onUpdate: (updatedService: Service) => void }) {
    const [open, setOpen] = React.useState(false);
    const [saving, setSaving] = React.useState(false);
    const [files, setFiles] = React.useState<File[]>([]);
    const [newImagePreviews, setNewImagePreviews] = React.useState<string[]>([]);
    const [form, setForm] = React.useState({ title: service.title, category: service.category, price: service.price, location: service.location || "" });
    const existingImages = service.images?.length ? service.images : [service.image];

    const clearNewImages = () => {
        newImagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
        setFiles([]);
        setNewImagePreviews([]);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSaving(true);
        try {
            const token = await getClientToken();
            if (!token) throw new Error("Authentication required");
            const uploadedImages = await Promise.all(files.map(uploadImage));
            const images = [...existingImages, ...uploadedImages];
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/services/${service.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ ...form, price: Number(form.price), images, image: images[0] }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to update service");
            onUpdate({ ...service, ...form, images, image: images[0] });
            clearNewImages();
            setOpen(false);
            toast.success("Service updated successfully!");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Something went wrong");
        } finally {
            setSaving(false);
        }
    };

    const reset = () => {
        setForm({ title: service.title, category: service.category, price: service.price, location: service.location || "" });
        clearNewImages();
    };

    return (
        <Dialog open={open} onOpenChange={(next) => { if (next) reset(); setOpen(next); }}>
            <DialogTrigger render={<Button variant="outline" size="sm" />}><Pencil className="size-4" />Edit</DialogTrigger>
            <DialogContent>
                <DialogHeader><DialogTitle>Update Service</DialogTitle><DialogDescription>Update your wedding service details.</DialogDescription></DialogHeader>
                <form onSubmit={handleSubmit} className="max-h-[75vh] space-y-4 overflow-y-auto px-1">
                    <div className="space-y-2"><Label htmlFor="edit-title">Service Name</Label><Input id="edit-title" required value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} /></div>
                    <div className="space-y-2"><Label htmlFor="edit-category">Category</Label><select id="edit-category" required className="h-10 w-full rounded-md border bg-background px-3 text-sm" value={form.category} onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}>
                        {["Photography & Videography", "Wedding Venues", "Decoration & Florists", "Catering Services", "Makeup & Styling", "Wedding Fashion"].map((item) => <option key={item} value={item}>{item}</option>)}
                    </select></div>
                    <div className="space-y-2"><Label htmlFor="edit-location">Location</Label><Input id="edit-location" required value={form.location} onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))} /></div>
                    <div className="space-y-2"><Label htmlFor="edit-price">Price (৳)</Label><Input id="edit-price" type="number" min="1" required value={form.price} onChange={(e) => setForm((prev) => ({ ...prev, price: Number(e.target.value) }))} /></div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-images">Service Images</Label>
                        <div className="flex flex-wrap gap-2">
                            {existingImages.map((src, index) => (
                                <div key={`current-${src}-${index}`} className="relative size-20 overflow-hidden rounded border">
                                    <Image src={src} alt={`Current service photo ${index + 1}`} fill unoptimized className="object-cover" />
                                </div>
                            ))}
                            {newImagePreviews.map((src, index) => (
                                <div key={`new-${index}`} className="relative size-20 overflow-hidden rounded border border-amber-500">
                                    <Image src={src} alt={`New service photo ${index + 1}`} fill unoptimized className="object-cover" />
                                </div>
                            ))}
                        </div>
                        <Input
                            id="edit-images"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(event) => {
                                const selected = Array.from(event.target.files ?? []);
                                newImagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
                                setFiles(selected);
                                setNewImagePreviews(selected.map((file) => URL.createObjectURL(file)));
                                event.target.value = "";
                            }}
                        />
                        <p className="text-xs text-muted-foreground">
                            New images are added to the current gallery.
                        </p>
                    </div>
                    <div className="flex justify-end gap-2 pt-2"><Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={saving}><X className="size-4" />Cancel</Button><Button type="submit" disabled={saving}><Save className="size-4" />{saving ? "Saving..." : "Save Changes"}</Button></div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
