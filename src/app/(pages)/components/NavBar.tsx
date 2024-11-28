import { Disclosure } from '@headlessui/react'
import React from "react";
import {UserActions} from "@/app/(pages)/components/UserActions.tsx";
import {StyledLink} from "@/app/(pages)/post/[postId]/components/StyledLink.tsx";
export default function NavBar() {
    return (
        <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <StyledLink href="/posts" text="Posts"/>
                    <UserActions/>
                </div>
            </div>
        </Disclosure>
    )
}