import {headers} from "next/headers";
import {createPost, findPosts} from "../../../../prisma/postQueries.ts";

export async function GET(){
    const headersList = await headers()
    const id = headersList.get("id")

    if (!id || isNaN(parseInt(id))) {
        return Response.json({
            error: true,
            status: 503,
            message: "Authentication Error"
        })
    }

    const posts = await findPosts(parseInt(id))
    return Response.json({
        error: false,
        status: 200,
        posts,
        message: "success"
    })
}

export async function POST(request: Request) {
    const headersList = await headers()
    const { title, content } = await request.json()
    const id = headersList.get("id")

    if (!id || isNaN(parseInt(id))) {
        return Response.json({
            error: true,
            status: 503,
            message: "Authentication Error"
        })
    }

    await createPost(parseInt(id), title, content)
    return Response.json({
        error: false,
        status: 200,
        message: "success"
    })
}