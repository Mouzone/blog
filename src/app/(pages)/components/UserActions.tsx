"use client"
import {useRouter} from "next/navigation";
import React, {useContext, useState, useEffect} from "react";
import {StyledLink} from "@/app/(pages)/[postId]/components/StyledLink.tsx";
import Cookies from "js-cookie"
import {LoginContext} from "@/app/(pages)/components/LoginContextProvider.tsx"

export function UserActions() {
    const router = useRouter()
    const {accessToken, setAccessToken} = useContext(LoginContext);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return <div
        className="absolute inset-y-0 right-0 flex items-center gap-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        {accessToken !== undefined
            ? <>
                <StyledLink href="/post-form" text="New Post"/>
                <button
                    className="text-white bg-purple-900 rounded-md px-3 py-2 text-sm font-medium"
                    onClick={() => {
                        Cookies.remove("accessToken")
                        setAccessToken(undefined)
                        router.push("/")
                    }}
                >
                    Log Out
                </button>
            </>
            : <>
                <StyledLink href="/signup" text="Sign up"/>
                <StyledLink href="/login" text="Log In"/>
            </>
        }
    </div>
}