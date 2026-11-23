import { headers } from "next/headers";
import { auth, ensureAuthDbConnection } from "./auth";

// getSession() is used to retrive user session of server component 
export async function getCurrentUser() {
    await ensureAuthDbConnection();
    const session = await auth.api.getSession({
        headers: await headers(),
        query: {
            disableCookieCache: true,
        },
    });

    return session?.user ?? null;
}
