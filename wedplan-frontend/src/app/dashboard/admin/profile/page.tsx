
import { getServerToken } from "@/lib/access-jwt-at-server-component";
import ProfileForm from "@/components/dashboard/ProfileForm";
import GetToken from "@/components/auth/GetToken";

type AdminProfile = {
    name: string;
    email: string;
    image?: string | null;
};

async function getAdminProfile(): Promise<AdminProfile | null> {
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
            throw new Error("Failed to fetch admin profile.");
        }

        const result = await response.json();

        return result.data;
    } catch (error) {
        console.error("Admin profile fetch error:", error);
        return null;
    }
}

export default async function AdminProfilePage() {
    const user = await getAdminProfile();

    if (!user) return null;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Profile Settings</h1>
                <p className="text-sm text-muted-foreground">
                    Manage your personal information and account details.
                </p>
            </div>

            <div className="max-w-3xl rounded-xl border p-6">
                <ProfileForm
                    user={{
                        name: user.name,
                        email: user.email,
                        image: user.image,
                    }}
                />
            </div>

            <GetToken />
        </div>
    );
}
