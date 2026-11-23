"use client";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

export default function DashboardHeader({ title }: { title: string }) {
    const { isMobile, openMobile, state } = useSidebar();
    const sidebarOpen = isMobile ? openMobile : state === "expanded";
    const toggleLabel = sidebarOpen ? "Collapse sidebar" : "Expand sidebar";

    return (
        <header className="flex h-16 shrink-0 items-center gap-3 border-b px-4">
            <SidebarTrigger aria-label={toggleLabel} title={toggleLabel} />
            <div className="leading-tight">
                <h1 className="text-sm font-semibold">{title}</h1>
                <p className="text-xs text-muted-foreground">{toggleLabel}</p>
            </div>
        </header>
    );
}
