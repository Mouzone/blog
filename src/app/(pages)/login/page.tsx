"use client"
import React, {type FormEvent, useContext, useEffect, useState} from "react";
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import {LoginContext} from "@/app/(pages)/components/LoginContextProvider.tsx";
import Header from "@/app/(pages)/components/Header.tsx";
import Input from "@/app/(pages)/components/Input.tsx";

export default function Login() {
    const router = useRouter()
    const { accessToken, setAccessToken } = useContext(LoginContext);

    useEffect(() => {
        if (accessToken) {
            router.push("/")
        }
    }, [accessToken, router])

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch(
                '/api/log-in',
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                }
            )

            const data = await response.json()

            if (!data.status) {
                throw new Error(data.error)
            }

            if (!data["accessToken"]) {
                throw new Error(`Invalid credentials`)
            }

            Cookies.set('accessToken', data["accessToken"])
            if (!accessToken) {
                setAccessToken(data["accessToken"])
            }
            router.push("/")
        } catch(error) {
            console.error("Login failed", error)
        }
    }
    return <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Header text="Log in to your account"/>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input type="username" value={username} update={setUsername}/>
                <Input type="password" value={password} update={setPassword}/>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                >
                    Log in
                </button>
            </form>
        </div>
    </div>
}