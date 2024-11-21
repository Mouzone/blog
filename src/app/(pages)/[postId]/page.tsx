export default async function Post({ params }) {
    const postId = (await params).postId
    const response = await fetch(`http://localhost:3000/api/posts/${postId}`)
    const data = await response.json()
    // error check here
    const post = data["post"]
    return <>
        {post.title}
        {post.description}
        {post.content}
        {post.createdAt}
        <Comments values={post.comments}/>
    </>
}

function Comments({ values }: { values: [ value: object ] }) {
    console.log(values)
    return <>
        {values.map(value => {
            return <Comment key={value.id} value={value}/>
        })}
    </>
}

function Comment({ value }: { value: { content: string, createdAt: string } }) {
    return <>
        {value.content}
        {value.createdAt}
    </>
}