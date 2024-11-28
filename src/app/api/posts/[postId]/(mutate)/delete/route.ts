import {deletePost, findPost} from "../../../../../../../prisma/postQueries.ts";
import {deleteComments} from "../../../../../../../prisma/commentQueries.ts";
import {headers} from "next/headers";

export async function POST(_request: Request, { params }: { params: Promise<{ postId: string }>}) {
    try {
        const headersList = await headers()
        const accountId = headersList.get("accountId")

        const postId = parseInt((await params).postId)
        const post = await findPost(postId)

        if (!post) {
            return Response.json({
                error: true,
                status: 403,
                message: `Invalid post`
            })
        }

        if (!accountId || parseInt(accountId) !== post.accountId) {
            return Response.json({
                error: true,
                status: 403,
                message: `Invalid Credentials`
            })
        }

        await deleteComments(postId)
        await deletePost(postId)

        return Response.json({
            error: false,
            status: 200,
            message: "success",
        })
    } catch (error) {
        return Response.json({
            error: true,
            status: 503,
            message: `Error deleting ${error}`
        })
    }
}