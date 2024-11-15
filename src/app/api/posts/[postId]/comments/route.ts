import {headers} from "next/headers";
import {createComment, findComments} from "../../../../../../prisma/commentQueries.ts";

export async function GET(_request: Request, { params }: { params: Promise<{ postId: string }> }) {
    const postId = (await params).postId
    const comments = await findComments(parseInt(postId))

    return Response.json({
        error: false,
        status: 200,
        comments,
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
    const { content }= await request.json()

    await createComment(parseInt(id), parseInt(postId), content)
}