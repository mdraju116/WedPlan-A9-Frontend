import VendorSidebar from "@/components/dashboard/VendorSidebar";
import { getDashboardPaths } from "@/lib/getDashboardPaths";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";



export default async function VendorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await getDashboardPaths(["Vendor"]);

    return (
        <SidebarProvider>
            <VendorSidebar />

            <SidebarInset>
                <DashboardHeader title="Vendor Dashboard" />

                <main className="flex-1 p-4 md:p-6">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
