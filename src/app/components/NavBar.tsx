"use client"
import { Disclosure } from '@headlessui/react'
import Link from "next/link"
import {useAuth} from "@/hooks/useAuth.ts";

export default function NavBar() {
    const { isAuthenticated } = useAuth()
    return (
        <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <Link
                        key="Posts"
                        href="/"
                    >
                        Posts
                    </Link>
                    <UserActions isAuthenticated={isAuthenticated}/>
                </div>
            </div>
        </Disclosure>
    )
}

function UserActions({isAuthenticated} : {isAuthenticated: boolean}) {
    // if authenticated show "new post" and "sign out"
    // if not authenticated show "log-in"

    return (
        isAuthenticated ? (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button type="button" className="text-white bg-purple-900 rounded-md px-3 py-2 text-sm font-medium">
                    New Post
                </button>
                <button type="button" className="text-white bg-purple-900 rounded-md px-3 py-2 text-sm font-medium">
                    Log Out
                </button>
            </div>
        ) : (
            <Link
                key="Login"
                href="/login"
                className="text-white bg-purple-900 rounded-md px-3 py-2 text-sm font-medium"
            >
                Log In
            </Link>
        )
    )
}