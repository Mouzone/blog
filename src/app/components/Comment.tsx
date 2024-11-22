interface Comment {
    id: string,
    content: string,
    createdAt: string,
    postId: string,
}

export function Comment({comment}: { comment: Comment }) {
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