import { useState } from "react";
import { useColorStore } from "../store/useColorStore";
import { useUserStore } from "../store/useUserStore";
import { fetchLogin } from "../utils/fetchAuth";
import { AlertError } from "../helpers/AlertError";

const useAuthMutations = () => {
    const { setAccount, user } = useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const { colors } = useColorStore();

    // login
    const useLogin = async (loginData: { username: string; password: string }) => {
        try {
            setIsLoading(true);
            const newUser: Record<string, string> = await fetchLogin(loginData);
            setAccount!({ ...user, ...newUser, });
            return
        } catch (error) {
            AlertError("Invalid credentials. Please try again.", colors.mode);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };
    return {
        useLogin,
        isLoading,
    };
}

export default useAuthMutations