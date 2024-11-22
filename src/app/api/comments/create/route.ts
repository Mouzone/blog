import {createComment} from "../../../../../prisma/commentQueries.ts";

export async function POST(request: Request) {
    try {
        const data = await request.formData()
        const postId = data.get("postId")
        const content = data.get("content")

        if (!postId || !content || typeof content !== "string") {
            throw new Error("Invalid form data")
        }

        // Parse and validate postId
        const parsedPostId = parseInt(postId.toString())
        if (isNaN(parsedPostId)) {
            throw new Error("Invalid postId")
        }


        await createComment(parsedPostId, content)
        return Response.json({
            error: false,
            status: 200,
            message: "success"
        })
    } catch(error) {
        return Response.json({
            error: true,
            status: 503,
            message: `Error creating comments ${error}`
        })
    }
}