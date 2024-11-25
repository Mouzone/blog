"use client"
import React, {createContext, type ReactNode, useState} from "react";
import Cookies from "js-cookie";

export const LoginContext = createContext({
    accessToken: undefined as string | undefined,
    setAccessToken: (() => {}) as React.Dispatch<React.SetStateAction<string | undefined>>
});

export function LoginContextProvider({ children }: { children: ReactNode}) {
    const [accessToken, setAccessToken] = useState(Cookies.get("accessToken"));

    return (
        <LoginContext.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </LoginContext.Provider>
    );
}