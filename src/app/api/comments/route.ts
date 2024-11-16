import {findComments} from "../../../../prisma/commentQueries.ts";

export async function GET(request: Request) {
    try {
        const { id } = await request.json()
        const comments = await findComments(parseInt(id))

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