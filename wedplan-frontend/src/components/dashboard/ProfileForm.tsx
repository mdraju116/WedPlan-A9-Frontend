"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ProfileFormProps = {
    user: {
        name: string;
        email: string;
        image?: string | null;
    };
};

const ProfileForm = ({ user }: ProfileFormProps) => {
    const [name, setName] = useState(user.name);
    const [imagePreview, setImagePreview] = useState(user.image || "");
    const [image, setImage] = useState<File | null>(null);

    const handleImageChange = (file?: File) => {
        if (!file) return;

        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Profile update will be connected to the backend later.
        console.log({ name, image });
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

            <div className="flex justify-end">
                <Button type="submit">Save Changes</Button>
            </div>
        </form>
    );
};

export default ProfileForm;