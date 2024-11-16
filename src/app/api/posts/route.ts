import {findPosts} from "../../../../prisma/postQueries.ts";

export async function GET(){
    try {
        const posts = await findPosts()

        return Response.json({
            error: false,
            status: 200,
            posts,
            message: "success"
        })
    } catch(error) {
        return Response.json({
            error: true,
            status: 503,
            message: `Error retrieving posts ${error}`
        })
    }
}