import {findPost, updateIsShown} from "../../../../../../../prisma/postQueries.ts";
import {headers} from "next/headers";

export async function POST(request: Request, { params }: { params: Promise<{ postId: string }> }) {
    try {
        const headersList = await headers()
        const accountId = headersList.get("accountId")

        const postId = (await params).postId
        const { isShown } = await request.json()

        const post = await findPost(parseInt(postId))

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

        await updateIsShown(parseInt(postId), isShown)

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