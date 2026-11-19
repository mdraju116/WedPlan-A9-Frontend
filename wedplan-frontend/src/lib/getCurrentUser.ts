import { headers } from "next/headers";
import { auth } from "./auth";

// getSession() is used to retrive user session of server component 
export async function getCurrentUser() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return session?.user ?? null;
}