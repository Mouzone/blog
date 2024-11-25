"use client"
import {useRouter} from "next/navigation";
import React, {useContext, useState, useEffect} from "react";
import {StyledLink} from "@/app/(pages)/[postId]/components/StyledLink.tsx";
import Cookies from "js-cookie"
import {LoginContext} from "@/app/(pages)/components/LoginContextProvider.tsx"

export function UserActions() {
    const router = useRouter()
    const { loggedIn, setLoggedIn } = useContext(LoginContext);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        loggedIn ? (
            <div className="absolute inset-y-0 right-0 flex items-center gap-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <StyledLink href="/new-post" text="New Post"/>
                <button
                    className="text-white bg-purple-900 rounded-md px-3 py-2 text-sm font-medium"
                    onClick={() => {
                        Cookies.remove("accessToken")
                        setLoggedIn(false)
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