import {headers} from "next/headers";
import {findPost} from "../../../../../prisma/postQueries.ts";

export async function GET({ params }: { params: Promise<{ postId: string }> }) {
    const headersList = await headers()
    const id = headersList.get("id")
    const postId = (await params).postId

    if (!id || isNaN(parseInt(id))) {
        return Response.json({
            error: true,
            status: 503,
            message: "Authentication Error"
        })
    }

    const post = await findPost(parseInt(postId))
    return Response.json({
        error: false,
        status: 200,
        post,
        message: "success"
    })
}