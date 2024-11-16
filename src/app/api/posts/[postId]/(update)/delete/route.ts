import {deletePost} from "../../../../../../../prisma/postQueries.ts";

export async function POST(_request: Request, { params }: Promise<{ postId: string }>) {
    try {
        const postId = (await params).postId
        await deletePost(postId)

        return Response.json({
            error: false,
            status: 200,
            message: "success",
        })
    } catch (error) {
        return Resposne.json({
            error: true,
            status: 503,
            message: `Error deleting ${error}`
        })
    }
}