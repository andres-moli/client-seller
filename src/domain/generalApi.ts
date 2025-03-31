
import Cookies from "js-cookie";
import { publicGraphqlFetcher } from "./api.config";
import { AuthResponse } from "./graphql";
import { LOGIN, VERIFY_JWT } from "./graphql/documentNodes/auth.gql";

export const urlGrouper = import.meta.env.VITE_APP_GRAPH

export const homeEndpoints = {
    // graph

    loginUser: (data: { signinInput: { email: string; password: string; } }) => publicGraphqlFetcher<{ signin: AuthResponse }>(LOGIN, data),


    verifyJWT: () => {
        const tokenCookie = Cookies.get(import.meta.env.VITE_APP_KEY_COOKIE_SESSION)
        if (tokenCookie) return publicGraphqlFetcher(VERIFY_JWT, { token: tokenCookie })
        return false
    }
}

