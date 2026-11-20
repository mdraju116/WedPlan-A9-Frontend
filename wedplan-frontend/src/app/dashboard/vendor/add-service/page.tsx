import AddServiceForm from "@/components/dashboard/AddServiceForm";


export default function AddServicePage() {

    

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Add New Service</h1>
                <p className="text-sm text-muted-foreground">
                    Create a new wedding service listing for your customers.
                </p>
            </div>

            <div className="max-w-3xl rounded-xl border p-6">
                <AddServiceForm />
            </div>
        </div>
    );
}