"use client"
import React, {type FormEvent, Suspense, useContext, useEffect, useState} from "react";
import {LoginContext} from "@/app/(pages)/components/LoginContextProvider.tsx";
import {useRouter, useSearchParams} from "next/navigation";
import Cookies from "js-cookie";
import Inputs from "@/app/(pages)/post-form/components/Inputs.tsx";
import PostButtons from "@/app/(pages)/post-form/components/PostButtons.tsx";

export default function PostForm() {
    const { accessToken } = useContext(LoginContext)

    const router = useRouter()
    const searchParams = useSearchParams()
    const postId = searchParams.get('postId')

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [content, setContent] = useState("")

    useEffect(() => {
        if (!accessToken) {
            router.push("/account/own")
        }

        async function fetchPost() {
            const response = await fetch(`/api/posts/${postId}`)
            const { post } = await response.json()

            setTitle(post.title)
            setDescription(post.description)
            setContent(post.content)
        }

        if (postId) {
            fetchPost()
        }
    }, [postId, accessToken, router])

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch(
                postId
                    ? `/api/posts/${postId}/update`
                    : `/api/posts/create`,
                {
                    method: "POST",
                    headers: {
                        authorization: `Bearer ${Cookies.get("accessToken")}`
                    },
                    body: JSON.stringify({
                        title,
                        description,
                        content
                    })
                })
            const data = await response.json()
            if (data["error"]) {
                throw new Error("Error creating new point")
            }
            router.push("/account/own")
        } catch(error) {
            console.error("Error sending request", error)
        }
    }

    return (
        <form onSubmit={onSubmit} className="mx-12">
            <Suspense>
                <Inputs
                    title={title} setTitle={setTitle}
                    description={description} setDescription={setDescription}
                    content={content} setContent={setContent}
                />
            </Suspense>

            <PostButtons text={postId ? "Update": "Submit"}/>
        </form>
    )
}
