interface Post {
    id: string,
    title: string,
    description: string,
    content: string,
    createdAt: string,
    comments: [ Comment ]
}

interface Comment {
    id: string,
    content: string,
    createdAt: string,
    postId: string,
}

export default async function Post({ params }:{ params: Promise<{ postId: string }> }) {
    const postId = (await params).postId
    const response = await fetch(`http://localhost:3000/api/posts/${postId}`)
    const data = await response.json()
    // error check here
    const post: Post = data["post"]
    const date = new Date(post.createdAt)
    const formatted = date.toLocaleDateString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    return <div className="flex-col mx-32 mt-10">
        <div className="border-b-2 pb-5 mb-5">
            <h1 className="text-5xl font-bold">{post.title}</h1>
            <p className="text-xs">{formatted}</p>
            <h3 className="text-gray-500">{post.description}</h3>
            <p className="text-xl">{post.content}</p>
            <div className="divider"></div>
        </div>
        <Comments comments={post.comments}/>
    </div>
}

function Comments({comments}: { comments: [ Comment] }) {
    return <div className="flex-col">
        {
            comments.map(comment =>
                <Comment key={comment.id} comment={comment}/>
            )
        }
    </div>
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
    return <div className="flex-col max-w-96 border-2 p-3 rounded-2xl mx-auto">
        <p>{comment.content}</p>
        <p className="text-xs text-right">{formatted}</p>
    </div>
}