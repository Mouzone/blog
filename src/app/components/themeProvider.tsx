'use client'
import React, {createContext, useState} from 'react'

type AuthContextType = {
    isAuthenticated: boolean;
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThemeContext = createContext<AuthContextType | undefined>(undefined);

export default function ThemeProvider({
                                          children,
                                      }: {
    children: React.ReactNode
}) {
    const [isAuthenticated, setAuthenticated] = useState(localStorage.getItem("accessToken") !== null)
    return <ThemeContext.Provider value={{ isAuthenticated, setAuthenticated }}>{children}</ThemeContext.Provider>
}