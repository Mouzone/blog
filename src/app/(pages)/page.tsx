import {Card} from "@/app/(pages)/components/Card.tsx";
import Cookies from "js-cookie"

interface Post {
    id: string,
    title: string,
    description: string,
    createdAt: string,
    isShown: boolean,
}

export default async function Posts() {
    const response = await fetch("http://localhost:3000/api/posts", {
        headers: {
            authorization: `Bearer ${Cookies.get("accessToken")}`
        }
    })
    const data: { posts: Post[] } = await response.json()
    const posts = data["posts"]

    return (
        <div className="bg-white py-24 sm:pt-12 pb-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">My Blog</h2>
                </div>
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 border-t border-gray-200 pt-6 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {
                        posts.map(({ id, title, description, createdAt, isShown}) => (
                            <Card
                                key={id}
                                id={id}
                                title={title}
                                description={description}
                                createdAt={createdAt}
                                isShown={isShown}
                            />
                            )
                        )
                    }
                </div>
            </div>
        </div>
    )
}

