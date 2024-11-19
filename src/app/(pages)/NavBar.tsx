"use client"
import { Disclosure } from '@headlessui/react'
import {useEffect, useState} from "react";

function classNames(...classes: Array<string | undefined | null | boolean>) {
    return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
    return (
        <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {/*todo: make this logic work*/}
                    <a
                        key="Posts"
                        href="#"
                        aria-current={true ? 'page' : undefined}
                        className={classNames(
                            true ? 'bg-purple-900 text-white' : 'text-gray-300 hover:bg-purple-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                    >
                        Posts
                    </a>
                    <UserActions/>
                </div>
            </div>
        </Disclosure>
    )
}

{/* Profile dropdown */}
function UserActions() {
    // if authenticated show "new post" and "sign out"
    // if not authenticated show "log-in"
    const [isAuthenticated, setIsAuthenticated] = useState("false")

    useEffect(() => {
        const value = localStorage.getItem("accessToken") ? "true" : "false"
        setIsAuthenticated(value)
    }, [])

    return <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        {isAuthenticated === "true"
            ? <button type="button" className="text-white bg-purple-900 rounded-md px-3 py-2 text-sm font-medium"> New Post </button>
            : <button type="button" className="text-white bg-purple-900 rounded-md px-3 py-2 text-sm font-medium"> Sign Up </button>
        }
    </div>
}