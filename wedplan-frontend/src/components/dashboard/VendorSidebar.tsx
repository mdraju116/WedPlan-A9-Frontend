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
    BriefcaseBusiness,
    Plus,
    ClipboardList,
    Settings,
    LogOut,
    CalendarDays,
    ChevronsUpDown,
    CreditCard,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";


const VendorSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();

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
            <SidebarHeader>
                {/* WedPlan Branding */}
                <div className="flex items-center gap-2 px-2 py-2">
                    <CalendarDays className="size-6 shrink-0 text-primary" />
                    <span className="text-xl font-bold text-primary">
                        WedPlan
                    </span>
                </div>

                {/* Vendor Account Card */}
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
                                        alt={user.name || "Vendor"}
                                        fill
                                        sizes="64px"
                                        priority
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-lg font-semibold group-data-[collapsible=icon]:text-sm">
                                        {user?.name?.charAt(0).toUpperCase() || "V"}
                                    </div>
                                )}
                            </div>

                            <div className="grid min-w-0 flex-1 gap-1 text-left leading-tight">
                                <span className="truncate text-sm font-semibold">
                                    {user?.name || "Vendor"}
                                </span>

                                <span className="truncate text-xs text-muted-foreground">
                                    {user?.email || ""}
                                </span>

                                <Badge
                                    variant="secondary"
                                    className="h-4 w-fit rounded border border-green-200 bg-green-100 px-1.5 text-[10px] font-medium text-green-700 hover:bg-green-100"
                                >
                                    Vendor
                                </Badge>
                            </div>

                            <ChevronsUpDown className="ml-auto size-4 shrink-0" />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {/* Overview */}
                <SidebarGroup>
                    <SidebarGroupLabel>Overview</SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={pathname === "/dashboard/vendor"}
                                    tooltip="Dashboard"
                                    render={<Link href="/dashboard/vendor" />}
                                >
                                    <LayoutDashboard />
                                    <span>Dashboard</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Service Management */}
                <SidebarGroup>
                    <SidebarGroupLabel>Service Management</SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={pathname === "/dashboard/vendor/my-services"}
                                    tooltip="My Services"
                                    render={<Link href="/dashboard/vendor/my-services" />}
                                >
                                    <BriefcaseBusiness />
                                    <span>My Services</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={pathname === "/dashboard/vendor/add-service"}
                                    tooltip="Add Service"
                                    render={<Link href="/dashboard/vendor/add-service" />}
                                >
                                    <Plus />
                                    <span>Add Service</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={pathname === "/dashboard/vendor/booking-requests"}
                                    tooltip="Booking Requests"
                                    render={<Link href="/dashboard/vendor/booking-requests" />}
                                >
                                    <ClipboardList />
                                    <span>Booking Requests</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={pathname === "/dashboard/vendor/subscription"}
                                    tooltip="Subscription"
                                    render={<Link href="/dashboard/vendor/subscription" />}
                                >
                                    <CreditCard />
                                    <span>Subscription</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>


                <SidebarGroup>
                    <SidebarContent>
                        <SidebarGroupLabel>Account</SidebarGroupLabel>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    tooltip="Profile Settings"
                                    isActive={pathname.startsWith("/dashboard/vendor/profile")}
                                    render={<Link href="/dashboard/vendor/profile" />}
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
                    </SidebarContent>
                </SidebarGroup>

            </SidebarContent>

            <SidebarRail />
        </Sidebar>
    );
};

export default VendorSidebar;
