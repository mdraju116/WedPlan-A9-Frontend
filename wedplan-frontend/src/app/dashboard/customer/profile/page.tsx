import { getCurrentUser } from "@/lib/getCurrentUser";
import ProfileForm from "@/components/dashboard/ProfileForm";
import GetToken from "@/components/auth/GetToken";



export default async function CustomerProfilePage() {
    const user = await getCurrentUser();

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

            {/* to get token for postman, click the btn, and  copy the token from console */}
            <GetToken />

        </div>
    );
}