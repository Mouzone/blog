"use client";

import React, {useState, useEffect, useContext} from 'react';
import Card from "../../components/Card.tsx"
import {LoginContext} from "@/app/(pages)/components/LoginContextProvider.tsx";
import {useParams} from "next/navigation";

interface Post {
    id: string,
    title: string,
    description: string,
    createdAt: string,
    isShown: boolean,
}

export default function Posts() {
    const params = useParams()
    const accountId = params["accountId"] === "own" ? "" : params["accountId"]
    const [posts, setPosts] = useState<Post[]>([])
    const [totalPosts, setTotalPosts] = useState(0)
    const [toDelete, setToDelete] = useState("")
    const [skip, setSkip] = useState(0)

    const {accessToken} = useContext(LoginContext)

    useEffect(() => {
        async function fetchPosts() {
            if (toDelete) {
                await fetch(`/api/posts/${toDelete}/delete`, {
                    headers: {
                        authorization: `Bearer ${accessToken}`
                    }
                })
                setToDelete("")
            }
            const response = await fetch(`/api/posts?accountId=${accountId}&skip=${skip}&take=5`, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            })

            if (!response.ok) {
                throw new Error("Failed to fetch posts")
            }

            const data: { posts: Post[], totalPosts: number } = await response.json()
            setPosts(data.posts)
            setTotalPosts(data.totalPosts)
        }

        fetchPosts()
    }, [skip, accessToken, toDelete])


    return (
        <div className="bg-white py-24 sm:pt-12 pb-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                        My Blog
                    </h2>
                </div>
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 border-t border-gray-200 pt-6 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    { posts && posts.map(({ id, title, description, createdAt, isShown}) => (
                        <Card
                            key={id}
                            id={id}
                            title={title}
                            description={description}
                            createdAt={createdAt}
                            isShown={isShown}
                            setToDelete = {setToDelete}
                        />
                    ))}
                </div>
                <div className="mx-auto max-w-2xl pt-10 flex justify-between">
                    <button
                        className="text-white bg-purple-900 rounded-md px-3 py-2 text-sm font-medium
                                    disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500"
                        onClick={() => setSkip(skip - 5)}
                        disabled = {skip === 0}
                    >
                        Prev
                    </button>
                    <button
                        className="text-white bg-purple-900 rounded-md px-3 py-2 text-sm font-medium
                                    disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500"
                        onClick={() => setSkip(skip + 5)}
                        disabled={ totalPosts <= skip + 5 }
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}