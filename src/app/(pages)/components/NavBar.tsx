"use client"

import { Disclosure } from '@headlessui/react'
import React, {useContext, useEffect, useState} from "react";
import {UserActions} from "@/app/(pages)/components/UserActions.tsx";
import {StyledLink} from "@/app/(pages)/post/[postId]/components/StyledLink.tsx";
import {LoginContext} from "@/app/(pages)/components/LoginContextProvider.tsx";
import Search from "@/app/(pages)/components/Search.tsx";

export default function NavBar() {
    const {accessToken} = useContext(LoginContext)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) return null

    return (
        <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    { accessToken ? <StyledLink href="/account/own" text="Posts"/> : <StyledLink href="/" text="Home"/> }
                    <Search/>
                    <UserActions/>
                </div>
            </div>
        </Disclosure>
    )
}