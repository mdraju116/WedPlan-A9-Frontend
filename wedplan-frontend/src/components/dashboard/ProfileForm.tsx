
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Camera, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getClientToken } from "@/lib/access-jwt-at-client-component";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

type ProfileFormProps = {
    user: {
        name: string;
        email: string;
        image?: string | null;
        businessName?: string;
    };
};

const ProfileForm = ({ user }: ProfileFormProps) => {
    const router = useRouter();

    const [name, setName] = useState(user.name);
    const [imagePreview, setImagePreview] = useState(user.image || "");
    const [image, setImage] = useState<File | null>(null);
    const [businessName, setBusinessName] = useState(user.businessName || "");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageChange = (file?: File) => {
        if (!file) return;

        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true);

        try {
            let imageUrl = user.image || "";

            // Upload a new profile image if selected
            if (image) {
                const formData = new FormData();
                formData.append("image", image);

                const response = await fetch(
                    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                const data = await response.json();

                if (!response.ok || !data.success) {
                    throw new Error("Image upload failed.");
                }

                imageUrl = data.data.display_url;
            }

            // Get authentication token
            const token = await getClientToken();

            if (!token) {
                throw new Error("Unable to access authentication token.");
            }

            // Update profile through backend API
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/profile`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name,
                        image: imageUrl,
                        ...(user.businessName !== undefined && {
                            businessName,
                        }),
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to update profile.");
            }

            // Synchronize Better Auth session
            const { error: authError } = await authClient.updateUser({
                name,
                image: imageUrl || undefined,
                ...(user.businessName !== undefined && { businessName }),
            });

            if (authError) {
                console.error("Session update error:", authError);
            }

            toast.success("Profile updated successfully!");

            router.refresh();
        } catch (error) {
            console.error(error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to update profile."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image */}
            <div className="flex items-center gap-5">
                <div className="relative size-24 overflow-hidden rounded-full border bg-muted">
                    {imagePreview ? (
                        <Image
                            src={imagePreview}
                            alt="Profile"
                            fill
                            unoptimized
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <UserRound className="size-10 text-muted-foreground" />
                        </div>
                    )}
                </div>

                <div>
                    <Label
                        htmlFor="profile-image"
                        className="inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium hover:bg-accent"
                    >
                        <Camera className="size-4" />
                        Change Photo
                    </Label>

                    <Input
                        id="profile-image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                            handleImageChange(e.target.files?.[0])
                        }
                    />

                    <p className="mt-2 text-xs text-muted-foreground">
                        JPG, PNG or WebP.
                    </p>
                </div>
            </div>

            {/* Personal Information */}
            <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        required
                    />
                </div>

                {user.businessName !== undefined && (
                    <div className="space-y-2">
                        <Label htmlFor="businessName">
                            Your Business Name
                        </Label>
                        <Input
                            id="businessName"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            placeholder="Enter your business name"
                        />
                    </div>
                )}

                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        value={user.email}
                        disabled
                    />
                    <p className="text-xs text-muted-foreground">
                        Email address cannot be changed.
                    </p>
                </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </form>
    );
};

export default ProfileForm;
