import {
    SidebarProvider,
    SidebarInset,
} from "@/components/ui/sidebar";

import CustomerSidebar from "@/components/dashboard/CustomerSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { getDashboardPaths } from "@/lib/getDashboardPaths";

export default async function CustomerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await getDashboardPaths(["Customer"]);

    return (
        <SidebarProvider>
            <CustomerSidebar />

            <SidebarInset>
                <DashboardHeader title="Customer Dashboard" />

                <main className="flex-1 p-6">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
