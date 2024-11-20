"use client"
import { Disclosure } from '@headlessui/react'
import Link from "next/link"
import {useAuth} from "@/hooks/useAuth.ts";
import React from "react";
import {useRouter} from "next/navigation";

export default function NavBar() {
    return (
        <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <StyledLink href="/" text="Posts"/>
                    <UserActions/>
                </div>
            </div>
        </Disclosure>
    )
}

function UserActions() {
    // if authenticated show "new post" and "sign out"
    // if not authenticated show "log-in"
    const { isAuthenticated, setAuthenticated } = useAuth()

    const router = useRouter()

    return (
        isAuthenticated ? (
            <div className="absolute inset-y-0 right-0 flex items-center gap-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <StyledLink href="/new-post" text="New Post"/>
                <button
                    className="text-white bg-purple-900 rounded-md px-3 py-2 text-sm font-medium"
                    onClick={() => {
                        localStorage.removeItem("accessToken")
                        setAuthenticated(false)
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

function StyledLink({ href, text }: { href: string, text: string }) {
    return <Link
        href={ href }
        className="text-white bg-purple-900 rounded-md px-3 py-2 text-sm font-medium"
    >
        { text }
    </Link>
}