
"use client";

import { useEffect, useState } from "react";
import { getClientToken } from "@/lib/access-jwt-at-client-component";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Loader2, ShieldCheck, ShieldBan } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type User = {
    _id: string;
    name: string;
    email: string;
    image?: string;
    role: "Customer" | "Vendor" | "Admin";
    isBlocked: boolean;
    subscriptionPlan?: "Free" | "Premium";
    createdAt: string;
};

const ManageUsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            const token = await getClientToken();

            if (!token) {
                throw new Error("Authentication required");
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    cache: "no-store",
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to fetch users");
            }

            setUsers(result.data);
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const loadUsers = async () => {
            await fetchUsers();
        };

        loadUsers();
    }, []);


    const handleBlockToggle = async (user: User) => {
        const action = user.isBlocked ? "unblock" : "block";

        try {
            setUpdatingId(user._id);

            const token = await getClientToken();

            if (!token) {
                throw new Error("Authentication required");
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/${user._id}/block`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        isBlocked: !user.isBlocked,
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || `Failed to ${action} user`);
            }

            setUsers((previousUsers) =>
                previousUsers.map((item) =>
                    item._id === user._id
                        ? { ...item, isBlocked: !item.isBlocked }
                        : item
                )
            );

            toast.success(`User ${action}ed successfully`);
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Something went wrong"
            );
        } finally {
            setUpdatingId(null);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-75 items-center justify-center gap-2">
                <Loader2 className="animate-spin" />
                <p>Loading users...</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl space-y-6">
            <div >

                <h1 className="text-2xl font-bold">Manage Users</h1>
                <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">
                        View, manage, and control user accounts.
                    </p>

                    <Badge variant="secondary" className="h-fit px-3 py-1">
                        Total Users: {users.length}
                    </Badge>
                </div>




            </div>

            <div className="overflow-x-auto rounded-xl border">
                <table className="w-full min-w-150 text-sm">
                    <thead className="bg-muted/50">
                        <tr className="text-left">
                            <th className="p-4">User</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Subscription</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-t">
                                <td className="p-4">
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-muted-foreground">
                                        {user.email}
                                    </p>
                                </td>

                                <td className="p-4">{user.role}</td>

                                <td className="p-4">
                                    {user.subscriptionPlan || "Free"}
                                </td>

                                <td className="p-4">
                                    <span
                                        className={
                                            user.isBlocked
                                                ? "text-destructive"
                                                : "text-green-600"
                                        }
                                    >
                                        {user.isBlocked ? "Blocked" : "Active"}
                                    </span>
                                </td>

                                <td className="p-4">
                                    {user.role === "Admin" ? (
                                        <span className="text-muted-foreground">
                                            Protected
                                        </span>
                                    ) : (
                                        <Button
                                            size="sm"
                                            variant={
                                                user.isBlocked
                                                    ? "outline"
                                                    : "destructive"
                                            }
                                            disabled={updatingId === user._id}
                                            onClick={() =>
                                                handleBlockToggle(user)
                                            }
                                        >
                                            {updatingId === user._id ? (
                                                <Loader2 className="animate-spin" />
                                            ) : user.isBlocked ? (
                                                <ShieldCheck />
                                            ) : (
                                                <ShieldBan />
                                            )}
                                            {user.isBlocked ? "Unblock" : "Block"}
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}

                        {users.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="p-8 text-center text-muted-foreground"
                                >
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default ManageUsersPage;
