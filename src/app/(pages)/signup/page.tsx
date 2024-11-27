"use client"
import React, {type FormEvent, useState} from "react";
import { useRouter } from 'next/navigation'
import Header from "@/app/(pages)/components/Header.tsx";
import Input from "@/app/(pages)/components/Input.tsx";
import Error from "@/app/(pages)/components/Error.tsx";
import AccountButton from "@/app/(pages)/components/AccountButton.tsx";

export default function Signup() {
    const router = useRouter()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setError(`Mismatched passwords`)
            return
        }
        try {
            const response = await fetch(
                '/api/sign-up',
                {
                    method: "POST",
                    body: JSON.stringify({ username, password }),
                }
            )
            const data = await response.json()

            if (data.status !== 200) {
                setError(data.message)
                setUsername('')
                setPassword('')
                setConfirmPassword('')
            } else {
                router.push("/login")
            }

        } catch(error) {
            setError(`${error}`)
            setUsername('')
            setPassword('')
            setConfirmPassword('')
        }
    }

    return <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Header text="Sign up for a new account"/>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input type="username" value={username} update={setUsername}/>
                <Input type="password" value={password} update={setPassword}/>
                <Input type="password" value={confirmPassword} update={setConfirmPassword}/>
                <Error error={error}/>
                <AccountButton text="Sign up"/>
            </form>
        </div>
    </div>
}