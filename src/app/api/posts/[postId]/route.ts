import {deletePost, findPost} from "../../../../../prisma/postQueries.ts";
import {deleteComments} from "../../../../../prisma/commentQueries.ts";

export async function GET(_request: Request, { params }: { params: Promise<{ postId: string }> }) {
    const postId = (await params).postId
    const post = await findPost(parseInt(postId))
    return Response.json({
        error: false,
        status: 200,
        post,
        message: "success"
    })
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ postId: string }> }) {
    const postId = (await params).postId
    if (!postId || isNaN(parseInt(postId))) {
        return Response.json({
            error: true,
            status: 403,
            message: "Post id invalid"
        })
    }

    try {
        await deleteComments(parseInt(postId))
        const deletedPost = await deletePost(parseInt(postId))
        if (!deletedPost) {
            return Response.json({
                error: true,
                status: 403,
                message: "Post not found"
            })
        }
    } catch(error) {
        return Response.json({
            error: true,
            status: 503,
            message: `Error deleting post ${error}`
        })
    }


    return Response.json({
        error: false,
        status: 200,
        message: "success"
    })
}