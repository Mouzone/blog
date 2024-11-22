interface Comment {
    id: string,
    content: string,
    createdAt: string,
    postId: string,
}
import { CreateComment } from './CreateComment'
import { Comment } from './Comment'

export default async function Comments({postId}: { postId: string }) {
    const response = await fetch(`http://localhost:3000/api/comments/${postId}`, {
        cache: 'no-store' // Ensures fresh data on each request
    })
    const data = await response.json()
    const comments: Comment[] = data["comments"]

    return (
        <div className="flex-col">
            <CreateComment postId={postId}/>
            {comments.map(comment => (
                <Comment key={comment.id} comment={comment}/>
            ))}
        </div>
    )
}