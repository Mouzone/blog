import {updatePostContent} from "../../../../../../../prisma/postQueries.ts";

export async function POST(request: Request, { params }: { params: Promise<{ postId: string }> }) {
    const postId = (await params).postId
    const { content } = await request.json()
    await updatePostContent(parseInt(postId), content)

    return Response.json({
        error: false,
        status: 200,
        message: "success"
    })
}