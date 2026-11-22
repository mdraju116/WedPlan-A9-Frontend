
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "@/lib/auth-client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SocialSignInButtons } from "@/components/auth/Social-signIn-buttons";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";


export default function SignInPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    

    const searchParams = useSearchParams();
    const toastShown = useRef(false);

    useEffect(() => {
        if (
            searchParams.get("message") === "login-required" &&
            !toastShown.current
        ) {
            toastShown.current = true;
            toast.info("Please sign in to access this page.");
        }
    }, [searchParams]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            setLoading(true);

            const { data, error } = await signIn.email({
                email,
                password,
            });

            if (error) {
                setError(error.message || "Invalid email or password.");
                return;
            }

            const role = data?.user?.role;

            if (role === "Admin") {
                router.push("/dashboard/admin");
            } else if (role === "Vendor") {
                router.push("/dashboard/vendor");
            } else if (role === "Customer") {
                router.push("/dashboard/customer");
            } else {
                setError("Unable to identify your account role.");
            }

            toast.success("SignIn successfull");

        } catch (error) {
            console.error("Sign in error:", error);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };




    return (
        <main className="flex min-h-screen items-center justify-center p-6">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-5"
            >
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">
                        Welcome Back
                    </h1>
                    <p className="text-muted-foreground">
                        Sign in to continue to WedPlan.
                    </p>
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
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <p className="text-sm text-red-500">
                        {error}
                    </p>
                )}

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                >
                    {loading ? "Signing in..." : "Sign In"}
                </Button>
                <SocialSignInButtons />

                {/* Sign Up Link */}
                <p className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/sign-up"
                        className="font-medium text-primary hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

            </form>
        </main>
    );
}
