import { redirect } from "next/navigation";
import { getCurrentUser } from "./getCurrentUser";

type UserRole = "Customer" | "Vendor" | "Admin";

export async function dashboardPaths(allowedRoles: UserRole[]) {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/sign-in");
    }

    if (!allowedRoles.includes(user.role as UserRole)) {
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

    return user;
}