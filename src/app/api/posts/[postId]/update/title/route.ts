import {updatePostTitle} from "../../../../../../../prisma/postQueries.ts";

export async function POST(request: Request, { params }: { params: Promise<{ postId: string }> }) {
    const postId = (await params).postId
    const { title } = await request.json()
    await updatePostTitle(parseInt(postId), title)

    return Response.json({
        error: false,
        status: 200,
        message: "success"
    })
}