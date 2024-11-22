'use client'

import { type FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

export function CreateComment({ postId }: { postId: string }) {
    const router = useRouter()
    const [content, setContent] = useState('')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('postId', postId)
        formData.append('content', content)

        try {
            const response = await fetch('/api/comments/create', {
                method: 'POST',
                body: formData
            })

            const result = await response.json()

            if (!result.error) {
                router.refresh()
                setContent('')
            }
        } catch (error) {
            console.error('Error creating comment', error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex-col mx-auto">
            <input
                id="content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <input
                type="hidden"
                name="postId"
                value={postId}
            />
            <button type="submit">
                Comment
            </button>
        </form>
    )
}
