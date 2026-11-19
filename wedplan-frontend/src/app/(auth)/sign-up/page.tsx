"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ImagePlus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, type FormEvent } from "react";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignUpPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"Customer" | "Vendor">("Customer");
    const [image, setImage] = useState<File | null>(null);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState("");

    const router = useRouter();

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

        if (!response.ok || !data.success) {
            throw new Error("Image upload failed");
        }

        return data.data.display_url;
    };


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
            setError("Password must contain uppercase and lowercase letters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            let imageUrl = "";

            if (image) {
                imageUrl = await uploadImage(image);
            }

            const { data, error } = await signUp.email({
                name,
                email,
                password,
                image: imageUrl || undefined,
                role,
            });

            if (error) {
                setError(error.message || "Registration failed.");
                return;
            }

            console.log("Registration successful:", data);

            router.push("/sign-in");

        } catch (error) {
            console.error(error);
            setError("Something went wrong while uploading the image.");
        } finally {
            setLoading(false);
        }


        console.log("Form validation successful!");
    };


    return (
        <main className="flex min-h-screen items-center justify-center p-6">
            <form
                className="w-full max-w-md space-y-4"
                onSubmit={handleSubmit}
            >
                <h1 className="text-2xl font-bold">Create an Account</h1>

                {/* Full Name */}
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Account Type & Profile Image */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* Account Type */}
                    <div className="space-y-2">
                        <Label>Account Type</Label>
                        <Select
                            value={role}
                            onValueChange={(value) =>
                                setRole(value as "Customer" | "Vendor")
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select account type" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="Customer">Customer</SelectItem>
                                <SelectItem value="Vendor">Vendor</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Profile Image */}
                    <div className="space-y-2">
                        <Label>Profile Image (Optional)</Label>

                        <label
                            htmlFor="image"
                            className="flex items-center gap-3 border rounded-md p-2 cursor-pointer hover:bg-muted/50 transition-colors"
                        >
                            <div className="w-16 h-16 shrink-0 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                                {imagePreview ? (
                                    <Image
                                        src={imagePreview}
                                        alt="Profile preview"
                                        width={64}
                                        height={64}
                                        className="w-full h-full object-cover"
                                        unoptimized
                                    />
                                ) : (
                                    <ImagePlus className="text-muted-foreground" size={24} />
                                )}
                            </div>

                            <div className="min-w-0">
                                <p className="text-sm font-medium">
                                    {image ? "Change Image" : "Choose Image"}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                    {image ? image.name : "Upload your profile photo"}
                                </p>
                            </div>
                        </label>

                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];

                                if (file) {
                                    setImage(file);

                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setImagePreview(reader.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </div>

                </div>

                {error && (
                    <p className="text-sm text-red-500">{error}</p>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Please wait..." : "Create Account"}
                </Button>
            </form>
        </main>
    );
}