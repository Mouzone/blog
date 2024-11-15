import {findPost, updatePostShow} from "../../../../../../../prisma/postQueries.ts";

export async function POST(_request: Request, { params }: { params: Promise<{ postId: string }> }) {
    const postId = parseInt((await params).postId)

    const post = await findPost(postId)
    if (post) {
        await updatePostShow(postId, !(post.isShown))
        return Response.json({
            error: false,
            status: 200,
            message: "success",
        })
    }
    return Response.json({
        error: true,
        status: 200,
        message: "Post not found",
    })
}