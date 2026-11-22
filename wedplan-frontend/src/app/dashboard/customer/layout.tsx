import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar";

import CustomerSidebar from "@/components/dashboard/CustomerSidebar";
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
                <header className="flex h-14 items-center border-b px-4">
                    <SidebarTrigger />
                </header>

                <main className="flex-1 p-6">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
