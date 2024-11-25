"use client"
import React, {createContext, type ReactNode, useState} from "react";
import Cookies from "js-cookie";

export const LoginContext = createContext({
    loggedIn: false,
    setLoggedIn: (() => {}) as React.Dispatch<React.SetStateAction<boolean>>
});

export function LoginContextProvider({ children }: { children: ReactNode}) {
    const [loggedIn, setLoggedIn] = useState(Cookies.get("accessToken") !== undefined);

    return (
        <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </LoginContext.Provider>
    );
}