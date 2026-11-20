"use client";

import { useState } from "react";
import { ImagePlus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";


const AddServiceForm = () => {

    const [form, setForm] = useState({
        title: "",
        category: "",
        price: "",
        description: "",
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState("");
    const [saving, setSaving] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

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

        if (!imageFile) {
            return;
        }

        setSaving(true);

        try {
            const imageUrl = await uploadImage(imageFile);

            const newService = {
                id: crypto.randomUUID(),
                ...form,
                price: Number(form.price),
                image: imageUrl,
                status: "Active" as const,
                bookings: 0,
            };

            const existingServices = JSON.parse(
                localStorage.getItem("wedplan-services") || "[]"
            );

            localStorage.setItem(
                "wedplan-services",
                JSON.stringify([...existingServices, newService])
            );

            alert("Service added successfully!");

            console.log("New service:", newService);
        } catch (error) {
            console.error("Service creation failed:", error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
                <Label htmlFor="title">Service Name</Label>
                <Input
                    id="title"
                    name="title"
                    placeholder="e.g. Wedding Photography"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                        value={form.category}
                        onValueChange={(value) =>
                            setForm((prev) => ({
                                ...prev,
                                category: value ?? "",
                            }))
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
                            <SelectItem value="Entertainment">Entertainment</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="price">Price (৳)</Label>
                    <Input
                        id="price"
                        name="price"
                        type="number"
                        min="1"
                        placeholder="e.g. 25000"
                        value={form.price}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your wedding service..."
                    value={form.description}
                    onChange={handleChange}
                    rows={5}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="image">Service Image</Label>
                <div className="flex items-center gap-4">
                    <div className="relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted">
                        {imagePreview ? (
                            <Image
                                src={imagePreview}
                                alt="Service preview"
                                fill
                                unoptimized
                                className="object-cover"
                            />
                        ) : (
                            <ImagePlus className="size-8 text-muted-foreground" />
                        )}
                    </div>

                    <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="max-w-56"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <p className="text-xs text-muted-foreground">
                    Select an image from your device.
                </p>
            </div>

            <div className="flex justify-end border-t pt-5">
                <Button type="submit" disabled={saving}>
                    <Save className="size-4" />
                    {saving ? "Uploading..." : "Add Service"}
                </Button>
            </div>
        </form>
    );
};

export default AddServiceForm;