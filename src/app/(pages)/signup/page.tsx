"use client"
import React, {type FormEvent, useState} from "react";
import { useRouter } from 'next/navigation'
import Header from "@/app/(pages)/components/Header.tsx";
import Input from "@/app/(pages)/components/Input.tsx";

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
                {
                    error && <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl shadow-md flex items-center space-x-3">
                        <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                  clipRule="evenodd"/>
                        </svg>
                        <span className="font-medium">{error}</span>
                    </div>
                }
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                >
                Sign Up
                </button>
            </form>
        </div>
    </div>
}