import {createPost} from "../../../../../prisma/postQueries.ts";
import {headers} from "next/headers";

export async function POST(request: Request) {
    const headersList = await headers()
    const accountId = headersList.get("accountId")
    if (!accountId) {
        return Response.json({
            error: true,
            status: 403,
            message: "Missing account details"
        })
    }

    const { title, description, content } = await request.json()

    const {id} = await createPost(parseInt(accountId), title, description, content)
    return Response.json({
        error: false,
        postId: id,
        status: 200,
        message: "success"
    })
}