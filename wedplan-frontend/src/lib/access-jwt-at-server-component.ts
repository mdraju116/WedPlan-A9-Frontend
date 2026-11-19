
import { headers } from "next/headers";
import { auth } from "./auth";

export const getServerToken = async () => {
    const fetchToken = await auth.api.getToken({
        headers: await headers(),
    });

    if (!fetchToken?.token) {
        throw new Error("Unable to retrieve JWT token");
    }

    return fetchToken.token;
};
