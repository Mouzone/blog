import {findComments} from "../../../../../prisma/commentQueries.ts";

export async function GET(_request: Request, { params }: { params: Promise<{ postId: string }> }) {
    try {
        const postId = (await params).postId
        const comments = await findComments(parseInt(postId))

        return Response.json({
            error: false,
            status: 200,
            comments,
            message: "success"
        })
    } catch(error) {
        return Response.json({
            error: true,
            status: 503,
            message: `Error retrieving comments ${error}`
        })
    }
}