
import { headers } from "next/headers";
import { auth, ensureAuthDbConnection } from "./auth";

export const getServerToken = async () => {
    await ensureAuthDbConnection();
    const fetchToken = await auth.api.getToken({
        headers: await headers(),
    });

    if (!fetchToken?.token) {
        throw new Error("Unable to retrieve JWT token");
    }

    return fetchToken.token;
};
