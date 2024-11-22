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
        <form onSubmit={handleSubmit} className="flex flex-col mx-auto border-2 p-3 rounded-2xl mb-5 max-w-96">
            <textarea
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
            <div className="flex justify-end mt-2">
                <button
                    type="submit"
                    className="text-white bg-purple-900 rounded-md px-3 py-2 text-sm font-medium">
                    Comment
                </button>
            </div>
        </form>
    )
}
