import {headers} from "next/headers";
import {findPost, updatePost} from "../../../../../prisma/postQueries.ts";

export async function GET({ params }: { params: Promise<{ postId: string }> }) {
    const headersList = await headers()
    const id = headersList.get("id")

    if (!id || isNaN(parseInt(id))) {
        return Response.json({
            error: true,
            status: 503,
            message: "Authentication Error"
        })
    }

    const postId = (await params).postId
    const post = await findPost(parseInt(postId))
    return Response.json({
        error: false,
        status: 200,
        post,
        message: "success"
    })
}

export async function POST(request: Request, { params }: { params: Promise<{ postId: string }> }) {
    const headersList = await headers()
    const id = headersList.get("id")

    if (!id || isNaN(parseInt(id))) {
        return Response.json({
            error: true,
            status: 503,
            message: "Authentication Error"
        })
    }

    const postId = (await params).postId
    const { text, content } = await request.json()
    await updatePost(parseInt(postId), text, content)
    return Response.json({
        error: false,
        status: 200,
        message: "success"
    })
}