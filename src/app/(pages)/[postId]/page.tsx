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
    return <>
        {post.title}
        {post.description}
        {post.content}
        {post.createdAt}
        <Comments comments={post.comments}/>
    </>
}

function Comments({ comments }: { comments: [ Comment ]}) {
    return <>
        {comments.map(comment => {
            return <Comment key={comment.id} comment={comment}/>
        })}
    </>
}

function Comment({ comment }: { comment: Comment }) {
    return <>
        {comment.content}
        {comment.createdAt}
    </>
}