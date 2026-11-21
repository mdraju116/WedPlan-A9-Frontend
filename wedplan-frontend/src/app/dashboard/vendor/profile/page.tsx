
import { getServerToken } from "@/lib/access-jwt-at-server-component";
import ProfileForm from "@/components/dashboard/ProfileForm";
import GetToken from "@/components/auth/GetToken";

type VendorProfile = {
    name: string;
    email: string;
    image?: string | null;
    businessName?: string;
};

async function getVendorProfile(): Promise<VendorProfile | null> {
    try {
        const token = await getServerToken();

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/profile`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                cache: "no-store",
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch vendor profile.");
        }

        const result = await response.json();

        return result.data;
    } catch (error) {
        console.error("Vendor profile fetch error:", error);
        return null;
    }
}

export default async function VendorProfilePage() {
    const user = await getVendorProfile();

    if (!user) return null;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Profile Settings</h1>
                <p className="text-sm text-muted-foreground">
                    Manage your personal information and business details.
                </p>
            </div>

            <div className="max-w-3xl rounded-xl border p-6">
                <ProfileForm
                    user={{
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        businessName: user.businessName || "",
                    }}
                />
            </div>

            <GetToken />
        </div>
    );
}
