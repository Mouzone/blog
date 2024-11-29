"use client"
interface Comment {
    id: string,
    content: string,
    createdAt: string,
    postId: string,
}
import { CreateComment } from './CreateComment.tsx'
import { Comment } from './Comment.tsx'
import {useEffect, useState} from 'react'

export default function Comments({postId}: { postId: string }) {
    const [comments, setComments] = useState<Comment[]>([])
    const [totalComments, setTotalComments] = useState(0)
    const [skip, setSkip] = useState(0)

    useEffect(() => {
        async function fetchComments() {
            const response = await fetch(`http://localhost:3000/api/comments/${postId}?skip=${skip}&take=5`)
            const data = await response.json()

            setComments(data.comments)
            setTotalComments(data.totalComments)
        }

        fetchComments()
    }, [comments, postId, skip])


    return (
        <div>
            <CreateComment postId={postId}/>
            {comments.map(comment => (
                <Comment key={comment.id} comment={comment}/>
            ))}
            <div className="mx-auto max-w-2xl pt-10 flex justify-between">
                <button
                    className="text-white bg-purple-900 rounded-md px-3 py-2 text-sm font-medium
                                    disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500"
                    onClick={() => setSkip(skip - 5)}
                    disabled={skip === 0}
                >
                    Prev
                </button>
                <button
                    className="text-white bg-purple-900 rounded-md px-3 py-2 text-sm font-medium
                                    disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500"
                    onClick={() => setSkip(skip + 5)}
                    disabled={totalComments <= skip + 5}
                >
                    Next
                </button>
            </div>
        </div>
    )
}