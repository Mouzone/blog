"use client"
import React, {createContext, useState} from 'react'

type AuthContextType = {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const ThemeContext = createContext<AuthContextType | undefined>(undefined);

export default function ThemeProvider({
                                          children,
                                      }: {
    children: React.ReactNode
}) {
    const [token, setToken] = useState(localStorage.getItem("accessToken") || null)
    return <ThemeContext.Provider value={{ token, setToken }}>{children}</ThemeContext.Provider>
}