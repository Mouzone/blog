import {createPost} from "../../../../../prisma/postQueries.ts";

export async function POST(request: Request) {
    const { title, content } = await request.json()

    const {id} = await createPost(title, content)
    return Response.json({
        error: false,
        postId: id,
        status: 200,
        message: "success"
    })
}