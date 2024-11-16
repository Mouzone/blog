import {deletePost} from "../../../../../../../prisma/postQueries.ts";
import {deleteComments} from "../../../../../../../prisma/commentQueries.ts";

export async function POST(_request: Request, { params }: { params: Promise<{ postId: string }>}) {
    try {
        const postId = parseInt((await params).postId)
        await deleteComments(postId)
        await deletePost(postId)

        return Response.json({
            error: false,
            status: 200,
            message: "success",
        })
    } catch (error) {
        return Response.json({
            error: true,
            status: 503,
            message: `Error deleting ${error}`
        })
    }
}