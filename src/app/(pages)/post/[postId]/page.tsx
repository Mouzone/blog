interface Post {
    id: string,
    title: string,
    description: string,
    content: string,
    createdAt: string,
    comments: [ Comment ]
}

import Comments from "@/app/(pages)/post/[postId]/components/Comments.tsx"
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
    return <div className="mx-32 mt-10">
        <div className="border-b-2 pb-5 mb-5">
            <h1 className="text-5xl font-bold">{post.title}</h1>
            <p className="text-xs">{formatted}</p>
            <h3 className="text-gray-500">{post.description}</h3>
            <p className="text-xl">{post.content}</p>
            <div className="divider"></div>
        </div>
        <Comments postId={ postId }/>
    </div>
}