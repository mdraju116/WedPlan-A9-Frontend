
"use client";

import * as React from "react";
import { Pencil, Save, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { ImagePlus } from "lucide-react";


export type Service = {
    id: string;
    title: string;
    category: string;
    price: number;
    bookings: number;
    status: "Active" | "Inactive";
    image: string;
};

type UpdateServiceProps = {
    service: Service;
    onUpdate: (updatedService: Service) => void;
};



const UpdateService = ({ service, onUpdate }: UpdateServiceProps) => {
    const [open, setOpen] = React.useState(false);
    const [saving, setSaving] = React.useState(false);
    const [imageFile, setImageFile] = React.useState<File | null>(null);
    const [imagePreview, setImagePreview] = React.useState(service.image);

    const [form, setForm] = React.useState({
        title: service.title,
        category: service.category,
        price: service.price,
        status: service.status,
        image: service.image,
    });

    const uploadImage = async (file: File) => {
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json();

        if (!data.success) {
            throw new Error("Image upload failed");
        }

        return data.data.display_url as string;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSaving(true);

    try {
        const imageUrl = imageFile
            ? await uploadImage(imageFile)
            : service.image;

        onUpdate({
            ...service,
            ...form,
            image: imageUrl,
        });

        setImageFile(null);
        setOpen(false);
    } catch (error) {
        console.error("Service update failed:", error);
        alert(error instanceof Error ? error.message : "Something went wrong");
    } finally {
        setSaving(false);
    }
};

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
                if (nextOpen) {
                    setForm({
                        title: service.title,
                        category: service.category,
                        price: service.price,
                        status: service.status,
                        image: service.image
                    });
                }

                setOpen(nextOpen);
            }}
        >
            <DialogTrigger render={<Button variant="outline" size="sm" />}>
                <Pencil className="size-4" />
                Edit
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Service</DialogTitle>
                    <DialogDescription>
                        Update your wedding service details.
                    </DialogDescription>
                </DialogHeader>


                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Service Name</Label>
                        <Input
                            id="title"
                            value={form.title}
                            onChange={(e) =>
                                setForm((prev) => ({ ...prev, title: e.target.value }))
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                            value={form.category}
                            onValueChange={(value) =>
                                setForm((prev) => ({ ...prev, category: value ?? "" }))
                            }
                        >
                            <SelectTrigger id="category" className="w-full">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Photography">Photography</SelectItem>
                                <SelectItem value="Decoration">Decoration</SelectItem>
                                <SelectItem value="Catering">Catering</SelectItem>
                                <SelectItem value="Venue">Venue</SelectItem>
                                <SelectItem value="Makeup">Makeup</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="price">Price (৳)</Label>
                        <Input
                            id="price"
                            type="number"
                            min="0"
                            value={form.price}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    price: Number(e.target.value),
                                }))
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Service Image</Label>

                        <div className="flex items-center gap-4">
                            <div className="relative size-24 shrink-0 overflow-hidden rounded-lg border bg-muted">
                                {imagePreview ? (
                                    <Image
                                        src={imagePreview}
                                        alt="Service preview"
                                        fill
                                        unoptimized
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center">
                                        <ImagePlus className="size-8 text-muted-foreground" />
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    className="max-w-56"
                                    onChange={handleImageChange}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Select an image from your device.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                            value={form.status}
                            onValueChange={(value) =>
                                setForm((prev) => ({
                                    ...prev,
                                    status: value as "Active" | "Inactive",
                                }))
                            }
                        >
                            <SelectTrigger id="status" className="w-full">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            <X className="size-4" />
                            Cancel
                        </Button>
                        <Button type="submit" disabled={saving}>
                            <Save className="size-4" />
                            {saving ? "Uploading..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateService;