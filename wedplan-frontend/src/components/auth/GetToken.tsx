"use client";

import { authClient } from "@/lib/auth-client";

export default function GetToken() {
    const handleGetToken = async () => {
        const { data, error } = await authClient.token();

        if (error) {
            console.error("Token error:", error);
            return;
        }

        console.log("JWT:", data.token);
    };

    return (
        <button onClick={handleGetToken}>
            Get JWT
        </button>
    );
}