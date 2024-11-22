interface Comment {
    id: string,
    content: string,
    createdAt: string,
    postId: string,
}

export default async function Comments({postId}: { postId: string }) {
    const response = await fetch(`http://localhost:3000/api/comments/${postId}`)
    const data = await response.json()
    const comments: [ Comment ] = data["comments"]
    return <div className="flex-col">
        <CreateComment postId={postId}/>
        {
            comments.map(comment =>
                <Comment key={comment.id} comment={comment}/>
            )
        }
    </div>
}

function CreateComment({ postId }: { postId: string }) {
    // todo: on success rerender the page
    return <form action="/api/comments/create" method="POST" className="flex-col mx-auto">
        <input id="content" name="content"/>
        <input type="hidden" name="postId" value={postId}/>
        <button type="submit">
            Comment
        </button>
    </form>
}

function Comment({comment}: { comment: Comment }) {
    const date = new Date(comment.createdAt)
    const formatted = date.toLocaleDateString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    return <div className="flex-col max-w-96 border-2 p-3 rounded-2xl mx-auto mb-5">
        <p>{comment.content}</p>
        <p className="text-xs text-right">{formatted}</p>
    </div>
}