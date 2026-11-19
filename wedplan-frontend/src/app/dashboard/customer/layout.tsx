import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar";

import CustomerSidebar from "@/components/dashboard/CustomerSidebar";

export default function CustomerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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