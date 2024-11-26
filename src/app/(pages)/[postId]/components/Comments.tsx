interface Comment {
    id: string,
    content: string,
    createdAt: string,
    postId: string,
}
import { CreateComment } from './CreateComment.tsx'
import { Comment } from './Comment.tsx'

export default async function Comments({postId}: { postId: string }) {
    const response = await fetch(`/api/comments/${postId}`)
    const data = await response.json()
    const comments: Comment[] = data["comments"]

    return (
        <div>
            <CreateComment postId={postId}/>
            {comments.map(comment => (
                <Comment key={comment.id} comment={comment}/>
            ))}
        </div>
    )
}