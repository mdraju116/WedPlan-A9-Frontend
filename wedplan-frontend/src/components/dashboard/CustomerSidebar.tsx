"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
} from "@/components/ui/sidebar";

import {
    LayoutDashboard,
    Search,
    CalendarDays,
    Settings,
    LogOut,
} from "lucide-react";


import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";



const CustomerSidebar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const { data: session } = useSession();
    const user = session?.user;

    const handleSignOut = async () => {
        const { error } = await signOut();

        if (error) {
            toast.error("Failed to sign out. Please try again.");
            return;
        }

        toast.success("Signed out successfully!");
        router.push("/sign-in");
        router.refresh();
    };

    return (
        <Sidebar collapsible="icon">
            {/* 1 */}
            <SidebarHeader>
                {/* WedPlan Branding */}
                <div className="flex items-center gap-2 px-2 py-2 group-data-[collapsible=icon]:justify-center">
                    <span className="text-xl font-bold text-primary group-data-[collapsible=icon]:hidden">
                        WedPlan
                    </span>
                    <CalendarDays className="size-6 shrink-0 text-primary" />
                </div>

                {/* Customer Account Card */}
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            tooltip="Account"
                            className="h-auto py-2"
                        >
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:rounded-full">
                                {user?.image ? (
                                    <Image
                                        src={user.image}
                                        alt={user.name || "User"}
                                        fill
                                        sizes="64px"
                                        priority
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-lg font-semibold group-data-[collapsible=icon]:text-sm">
                                        {user?.name?.charAt(0).toUpperCase() || "C"}
                                    </div>
                                )}
                            </div>
                            {/* userInfo */}
                            <div className="grid min-w-0 flex-1 gap-1 text-left leading-tight">
                                <span className="truncate text-sm font-semibold">
                                    {user?.name || "Customer"}
                                </span>

                                <span className="truncate text-xs text-muted-foreground">
                                    {user?.email || ""}
                                </span>

                                <Badge variant="secondary" className="h-4 w-fit rounded border border-green-200 bg-green-100 px-1.5 text-[10px] font-medium text-green-700 hover:bg-green-100"   >
                                    Customer
                                </Badge>
                            </div>

                            <ChevronsUpDown className="ml-auto size-4 shrink-0" />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* 2 */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Overview</SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={pathname === "/dashboard/customer"}
                                    tooltip="Dashboard"
                                    render={<Link href="/dashboard/customer" />}
                                >
                                    <LayoutDashboard />
                                    <span>Dashboard</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Wedding Planning</SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={pathname === "/services"}
                                    tooltip="Browse Services"
                                    render={<Link href="/services" />}
                                >
                                    <Search />
                                    <span>Browse Services</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={pathname.startsWith("/dashboard/customer/my-bookings")}
                                    tooltip="My Bookings"
                                    render={<Link href="/dashboard/customer/my-bookings" />}
                                >
                                    <CalendarDays />
                                    <span>My Bookings</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>


                {/* 3 */}

                <SidebarGroup>
                    <SidebarGroupLabel>Account</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    tooltip="Profile Settings"
                                    isActive={pathname.startsWith("/dashboard/customer/profile")}
                                    render={<Link href="/dashboard/customer/profile" />}
                                >
                                    <Settings />
                                    <span>Profile Settings</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    tooltip="Logout"
                                    onClick={handleSignOut}
                                >
                                    <LogOut />
                                    <span>Logout</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>

            <SidebarRail />
        </Sidebar>
    );
};

export default CustomerSidebar;