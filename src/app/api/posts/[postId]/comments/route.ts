import {headers} from "next/headers";
import {findPostWithComments} from "../../../../../../prisma/postQueries.ts";

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
    const comments = await findPostWithComments(parseInt(postId))

    return Response.json({
        error: false,
        status: 200,
        comments,
        message: "success"
    })
}