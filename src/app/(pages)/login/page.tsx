"use client"
import React, {type FormEvent, useContext, useEffect, useState} from "react";
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import {LoginContext} from "@/app/(pages)/components/LoginContextProvider.tsx";
import Header from "@/app/(pages)/components/Header.tsx";
import Input from "@/app/(pages)/components/Input.tsx";
import Error from "@/app/(pages)/components/Error.tsx";
import AccountButton from "@/app/(pages)/components/AccountButton.tsx";

export default function Login() {
    const router = useRouter()
    const { accessToken, setAccessToken } = useContext(LoginContext);

    useEffect(() => {
        if (accessToken) {
            router.push("/account/own")
        }
    }, [accessToken, router])

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

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
                setError(data.error)
            }

            if (!data["accessToken"]) {
                setError(`Invalid credentials`)
                setUsername('')
                setPassword('')
                return
            }

            Cookies.set('accessToken', data["accessToken"])
            setAccessToken(data["accessToken"])

            return router.push("/account/own")
        } catch(error) {
            setError(`${error}`)
            setUsername('')
            setPassword('')
        }
    }
    return <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Header text="Log in to your account"/>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input type="username" value={username} update={setUsername}/>
                <Input type="password" value={password} update={setPassword}/>
                <Error error={error}/>
                <AccountButton text="Log in"/>
            </form>
        </div>
    </div>
}