import {createContext, useEffect, useState} from "react";
import axios from "axios";

type AuthContext = {
    loggedUserId: string
}

export const AuthContext = createContext<AuthContext>({
    loggedUserId: ""
})

type AuthContextProviderProps = {
    children: React.ReactNode
}

type AppUserResponse = {
    id: string,
    username: string
}

export default function AuthContextProvider({children}: AuthContextProviderProps) {
    const [loggedUserId, setLoggedUserId] = useState<string>("")

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.get("api/auth/me")
                if (response.status === 200) {
                    const appUserResponse: AppUserResponse = await response.data
                    setLoggedUserId(appUserResponse.id)
                }
            } catch (err) {
                console.log(err)
            }
        }


        fetchUserData()
    }, [loggedUserId]);

    const ctxValue = {
        loggedUserId
    }

    return (
        <AuthContext.Provider value={ctxValue}>
            {children}
        </AuthContext.Provider>
    )
}