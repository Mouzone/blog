import {updatePost} from "../../../../../../../prisma/postQueries.ts";

export async function POST(request: Request, { params }: { params: Promise<{ postId: string }> }) {
    try {
        const postId = (await params).postId
        const { title, description, content, isShown } = await request.json()
        await updatePost(parseInt(postId), title, description, content, isShown)

        return Response.json({
            error: false,
            status: 200,
            message: "success"
        })
    } catch(error) {
        return Response.json({
            error: true,
            status: 503,
            message: `Error updating post ${error}`
        })
    }
}