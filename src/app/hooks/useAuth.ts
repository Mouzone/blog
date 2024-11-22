import {ThemeContext} from "@/app/hooks/themeProvider.tsx";
import {useContext} from "react";

export function useAuth() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useAuth must be used within ThemeContext Provider');
    }
    return context;
}