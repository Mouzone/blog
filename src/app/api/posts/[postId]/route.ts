import {findPost} from "../../../../../prisma/postQueries.ts";

export async function GET(_request: Request, { params }: { params: Promise<{ postId: string }> }) {
    try{
        const postId = (await params).postId
        const post = await findPost(parseInt(postId))
        if (!post) {
            return Response.json({
                error: true,
                status: 403,
                message: "Invalid postId"
            })
        }
        return Response.json({
            error: false,
            status: 200,
            post,
            message: "success"
        })
    } catch(error) {
        return Response.json({
            error: true,
            status: 403,
            message: `Error retrieving post ${error}`
        })
    }
}