import AdminSidebar from "@/components/dashboard/AdminSidebar";
import { getDashboardPaths } from "@/lib/getDashboardPaths";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await getDashboardPaths(["Admin"]);

    return (
        <SidebarProvider>
            <AdminSidebar />

            <SidebarInset>
                <DashboardHeader title="Admin Dashboard" />

                <main className="flex-1 p-4 md:p-6">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
