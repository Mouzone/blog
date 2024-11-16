import {createComment} from "../../../../../prisma/commentQueries.ts";

export async function POST(request: Request) {
    try {
        const { id, content } = await request.json()
        await createComment(parseInt(id), content)
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