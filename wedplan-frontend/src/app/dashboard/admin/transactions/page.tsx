import { getServerToken } from "@/lib/access-jwt-at-server-component";
import { getDashboardPaths } from "@/lib/getDashboardPaths";
import { Badge } from "@/components/ui/badge";

type Transaction = {
    _id: string;
    vendorId: string;
    vendorEmail?: string;
    role: "Customer" | "Vendor" | "Admin" | "Unknown";
    plan: string;
    amount: number;
    currency: string;
    status: string;
    createdAt: string;
};

async function getTransactions(): Promise<Transaction[]> {
    const token = await getServerToken();
    const headers = { Authorization: `Bearer ${token}` };
    const [transactionResponse, userResponse] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/payments/transactions`, {
            headers,
            cache: "no-store",
        }),
        fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users`, {
            headers,
            cache: "no-store",
        }),
    ]);

    const result = await transactionResponse.json();
    if (!transactionResponse.ok) throw new Error(result.message || "Could not load transactions");

    const userResult = userResponse.ok ? await userResponse.json() : { data: [] };
    const usersById = new Map<string, { role: Transaction["role"]; email: string }>(
        (Array.isArray(userResult.data) ? userResult.data : []).map((user: {
            _id: string;
            email: string;
            role: Transaction["role"];
        }) => [user._id, { role: user.role, email: user.email }] as const)
    );

    return (Array.isArray(result.data) ? result.data : []).map((transaction: Omit<Transaction, "role"> & { userId?: string }) => {
        const user = usersById.get(transaction.userId || transaction.vendorId)
            || [...usersById.values()].find((candidate) => candidate.email === transaction.vendorEmail);
        return { ...transaction, role: user?.role || "Unknown" };
    });
}

export default async function TransactionsPage() {
    await getDashboardPaths(["Admin"]);
    let transactions: Transaction[] = [];
    let error = "";
    try {
        transactions = await getTransactions();
    } catch (cause) {
        error = cause instanceof Error ? cause.message : "Could not load transactions";
    }

    return (
        <div className="space-y-6">
            <header className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold">Transactions</h1>
                    <p className="mt-1 text-sm text-muted-foreground">Verified Premium subscription payments.</p>
                </div>
                {!error && <Badge variant="secondary" className="h-fit px-3 py-1">Total Transactions: {transactions.length}</Badge>}
            </header>
            {error ? <div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{error}</div> : <div className="overflow-x-auto rounded-xl border">
                <table className="w-full min-w-190 text-sm"><thead className="bg-muted/50"><tr className="text-left"><th className="p-4">Account</th><th className="p-4">Role</th><th className="p-4">Plan</th><th className="p-4">Amount</th><th className="p-4">Status</th><th className="p-4">Payment Date</th></tr></thead>
                    <tbody>{transactions.map((transaction) => <tr key={transaction._id} className="border-t"><td className="p-4">{transaction.vendorEmail || transaction.vendorId}</td><td className="p-4">{transaction.role}</td><td className="p-4">{transaction.plan}</td><td className="p-4">{new Intl.NumberFormat("en", { style: "currency", currency: transaction.currency || "USD" }).format(transaction.amount)}</td><td className="p-4">{transaction.status}</td><td className="p-4">{new Date(transaction.createdAt).toLocaleDateString()}</td></tr>)}
                        {transactions.length === 0 && <tr><td colSpan={6} className="p-10 text-center text-muted-foreground">No verified transactions have been recorded yet.</td></tr>}
                    </tbody>
                </table>
            </div>}
        </div>
    );
}
