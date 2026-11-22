import VendorSidebar from "@/components/dashboard/VendorSidebar";
import { getDashboardPaths } from "@/lib/getDashboardPaths";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";



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
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger />
                    <h1 className="font-semibold">Vendor Dashboard</h1>
                </header>

                <main className="flex-1 p-4 md:p-6">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
