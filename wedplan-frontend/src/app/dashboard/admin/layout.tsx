import { getDashboardPaths } from "@/lib/getDashboardPaths";

export default async function CustomerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await getDashboardPaths(["Admin"]);

    return <>{children}</>;
}