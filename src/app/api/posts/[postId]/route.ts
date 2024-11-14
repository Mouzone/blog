import {findPost} from "../../../../../prisma/postQueries.ts";

export async function GET({ params }: { params: Promise<{ postId: string }> }) {
    const postId = (await params).postId
    const post = await findPost(parseInt(postId))
    return Response.json({
        error: false,
        status: 200,
        post,
        message: "success"
    })
}