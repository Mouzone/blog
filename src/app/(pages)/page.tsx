interface Post {
    id: string,
    title: string,
    description: string,
    createdAt: string,
    isShown: string,
}
export default async function Posts() {
    const response = await fetch("http://localhost:3000/api/posts")
    const data: { posts: Post[] } = await response.json()
    const posts = data["posts"]

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">My Blog</h2>
                </div>
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {posts.map((post) => {
                        const date = new Date(post.createdAt)
                        const formatted = date.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })
                        return <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                                <div className="flex items-center gap-x-4 text-xs">
                                    <time dateTime={formatted} className="text-gray-500">
                                        {formatted}
                                    </time>
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                                        <a href={post.title}>
                                            <span className="absolute inset-0"/>
                                            {post.title}
                                        </a>
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{post.description}</p>
                                </div>
                            </article>
                        }
                    )}
                </div>
            </div>
        </div>
    )
}
