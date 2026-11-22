
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Save } from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";

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

import { getClientToken } from "@/lib/access-jwt-at-client-component";
import { uploadImage } from "@/lib/uploadImage";

const AddServiceForm = () => {
    const router = useRouter();

    const [form, setForm] = useState({
        title: "",
        category: "",
        price: "",
        location: "",
        description: "",
    });

    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [saving, setSaving] = useState(false);
    const [limitReached, setLimitReached] = useState(false);

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
        const files = Array.from(e.target.files ?? []);
        setImageFiles(files);
        setImagePreviews(files.map((file) => URL.createObjectURL(file)));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (imageFiles.length === 0) {
            toast.error("Please select at least one service image");
            return;
        }

        if (!form.category) {
            toast.error("Please select a service category");
            return;
        }

        setSaving(true);

        try {
            const token = await getClientToken();

            if (!token) {
                throw new Error("Authentication required");
            }

            const imageUrls = await Promise.all(imageFiles.map(uploadImage));

            // Create service
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/services`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        ...form,
                        price: Number(form.price),
                        images: imageUrls,
                        image: imageUrls[0],
                    }),
                }
            );

            const result = await response.json();

            // Check Free Service Limit
            if (response.status === 403) {
                setLimitReached(true);
                return;
            }

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to create service"
                );
            }

            toast.success("Service submitted for admin review.");

            router.push("/dashboard/vendor/my-services");
            router.refresh();
        } catch (error) {
            console.error("Service creation failed:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to add service"
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">

            {/* Premium Upgrade Message */}
            {limitReached && (
                <div className="space-y-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-5">
                    <div>
                        <h3 className="font-semibold text-amber-600">
                            Free Service Limit Reached
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            You have already added 3 free services.
                            Upgrade to Premium to add unlimited services.
                        </p>
                    </div>

                    <Button
                        type="button"
                        className="w-full"
                        onClick={() => router.push("/checkout")}
                    >
                        Upgrade to Premium — $20/month
                    </Button>
                </div>
            )}

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
                            <SelectItem value="Photography & Videography">Photography &amp; Videography</SelectItem>
                            <SelectItem value="Wedding Venues">Wedding Venues</SelectItem>
                            <SelectItem value="Decoration & Florists">Decoration &amp; Florists</SelectItem>
                            <SelectItem value="Catering Services">Catering Services</SelectItem>
                            <SelectItem value="Makeup & Styling">Makeup &amp; Styling</SelectItem>
                            <SelectItem value="Wedding Fashion">Wedding Fashion</SelectItem>
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
                <Label htmlFor="location">Location</Label>
                <Input
                    id="location"
                    name="location"
                    placeholder="e.g. Dhaka, Bangladesh"
                    value={form.location}
                    onChange={handleChange}
                    required
                />
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
                <Label htmlFor="images">Service Images</Label>
                <div className="flex flex-wrap items-center gap-3">
                    {imagePreviews.map((preview, index) => (
                        <div key={preview} className="relative size-20 overflow-hidden rounded-lg border bg-muted">
                            <Image src={preview} alt={`Service preview ${index + 1}`} fill unoptimized className="object-cover" />
                        </div>
                    ))}
                    {imagePreviews.length === 0 && <ImagePlus className="size-8 text-muted-foreground" />}
                    <Input
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        className="max-w-72"
                        onChange={handleImageChange}
                        required
                    />
                </div>

                <p className="text-xs text-muted-foreground">
                    Choose one or more images. The first image is used on service cards.
                </p>
            </div>

            <div className="flex justify-end border-t pt-5">
                <Button
                    type="submit"
                    disabled={saving || limitReached}
                >
                    <Save className="size-4" />
                    {saving ? "Saving..." : "Add Service"}
                </Button>
            </div>
        </form>
    );
};

export default AddServiceForm;
