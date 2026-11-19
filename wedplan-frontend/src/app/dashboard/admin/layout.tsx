import { dashboardPaths } from "@/lib/dashboardPaths";

export default async function CustomerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await dashboardPaths(["Admin"]);

    return <>{children}</>;
}