"use client"
import {useAuth} from "@/app/hooks/useAuth.ts";
import {Posts} from "@/app/(pages)/components/Posts.tsx";

export default function Overhead() {
    const { token } = useAuth()
    return <Posts token={token}/>
}

