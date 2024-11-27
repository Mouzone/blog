import {countComments, findComments} from "../../../../../prisma/commentQueries.ts";
import type {NextRequest} from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
    try {
        const postId = (await params).postId

        const searchParams = request.nextUrl.searchParams
        const skipParam = searchParams.get("skip")
        const takeParam = searchParams.get("take")

        if (!skipParam || !takeParam) {
            return Response.json({
                error: true,
                status: 500,
                message: `Invalid params`
            });
        }

        const skip = parseInt(skipParam)
        const take = parseInt(takeParam)
        const comments = await findComments(parseInt(postId), skip, take)
        const totalComments = await countComments(parseInt(postId))

        return Response.json({
            error: false,
            status: 200,
            comments,
            totalComments,
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