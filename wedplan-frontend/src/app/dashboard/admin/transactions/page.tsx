import { getServerToken } from "@/lib/access-jwt-at-server-component";
import { getDashboardPaths } from "@/lib/getDashboardPaths";

type Transaction = {
    _id: string;
    vendorId: string;
    vendorEmail?: string;
    plan: string;
    amount: number;
    currency: string;
    status: string;
    createdAt: string;
};

async function getTransactions(): Promise<Transaction[]> {
    const token = await getServerToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/payments/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Could not load transactions");
    return Array.isArray(result.data) ? result.data : [];
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
            <header><h1 className="text-2xl font-bold">Transactions</h1><p className="mt-1 text-sm text-muted-foreground">Verified Premium subscription payments.</p></header>
            {error ? <div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{error}</div> : <div className="overflow-x-auto rounded-xl border">
                <table className="w-full min-w-175 text-sm"><thead className="bg-muted/50"><tr className="text-left"><th className="p-4">Vendor</th><th className="p-4">Plan</th><th className="p-4">Amount</th><th className="p-4">Status</th><th className="p-4">Date</th></tr></thead>
                    <tbody>{transactions.map((transaction) => <tr key={transaction._id} className="border-t"><td className="p-4">{transaction.vendorEmail || transaction.vendorId}</td><td className="p-4">{transaction.plan}</td><td className="p-4">{new Intl.NumberFormat("en", { style: "currency", currency: transaction.currency || "USD" }).format(transaction.amount)}</td><td className="p-4">{transaction.status}</td><td className="p-4">{new Date(transaction.createdAt).toLocaleDateString()}</td></tr>)}
                        {transactions.length === 0 && <tr><td colSpan={5} className="p-10 text-center text-muted-foreground">No verified transactions have been recorded yet.</td></tr>}
                    </tbody>
                </table>
            </div>}
        </div>
    );
}
