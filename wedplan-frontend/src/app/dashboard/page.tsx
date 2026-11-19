import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/getCurrentUser";

export default async function DashboardPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/sign-in");
    }

    if (user.role === "Customer") {
        redirect("/dashboard/customer");
    }

    if (user.role === "Vendor") {
        redirect("/dashboard/vendor");
    }

    if (user.role === "Admin") {
        redirect("/dashboard/admin");
    }

    redirect("/");
}