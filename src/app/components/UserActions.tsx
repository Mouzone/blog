"use client"
import {useRouter} from "next/navigation";
import React from "react";
import {useAuth} from "@/hooks/useAuth.ts";
import {StyledLink} from "@/app/components/StyledLink.tsx";

export function UserActions() {
    // if authenticated show "new post" and "sign out"
    // if not authenticated show "log-in"
    const { token, setToken } = useAuth()

    const router = useRouter()

    return (
        token ? (
            <div className="absolute inset-y-0 right-0 flex items-center gap-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <StyledLink href="/new-post" text="New Post"/>
                <button
                    className="text-white bg-purple-900 rounded-md px-3 py-2 text-sm font-medium"
                    onClick={() => {
                        localStorage.removeItem("accessToken")
                        setToken(null)
                        router.push("/")
                    }}
                >
                    Log Out
                </button>
            </div>
        ) : (
            <StyledLink href="/login" text="Log In"/>
        )
    )
}