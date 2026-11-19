import { toast } from "react-toastify";
import { authClient } from "./auth-client";

export const getClientToken = async () => {
    const { data, error } = await authClient.token();
    if (error || !data?.token) {
        toast.error("Error accessing JWT token")
        return
    }
    const jwtToken = data.token;
    //console.log(jwtToken);
    return jwtToken;
}