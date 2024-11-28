import {findPost} from "../../../../../prisma/postQueries.ts";
import {headers} from "next/headers";

export async function GET(_request: Request, { params }: { params: Promise<{ postId: string }> }) {
    try{
        const headersList = await headers()
        const accountId = headersList.get("accountId")
        const postId = (await params).postId
        const post = await findPost(parseInt(postId))
        if (!post) {
            return Response.json({
                error: true,
                status: 403,
                message: "Invalid postId"
            })
        }
        
        if (post.isShown) {
            return Response.json({
                error: false,
                status: 200,
                post,
                message: "success"
            })
        } else {
            if (!accountId || parseInt(accountId) !== post.accountId) {
                return Response.json({
                    error: false,
                    status: 200,
                    post,
                    message: "success"
                })
            } else {
                return Response.json({
                    error: false,
                    status: 200,
                    post,
                    message: "success"
                })
            }
        }
    } catch(error) {
        return Response.json({
            error: true,
            status: 403,
            message: `Error retrieving post ${error}`
        })
    }
}