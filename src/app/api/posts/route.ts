import {countPostsAll, countsPostsShown, findPostsAll, findPostsShown} from "../../../../prisma/postQueries.ts";
import { headers } from "next/headers";
import { jwtVerify } from "jose";
import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
    const headersList = await headers()
    const bearerHeader = headersList.get("authorization")

    const searchParams = request.nextUrl.searchParams
    const accountIdParam = searchParams.get("accountId")
    const skipParam = searchParams.get("skip")
    const takeParam = searchParams.get("take")

    if (!skipParam || !takeParam || ! accountIdParam) {
        return Response.json({
            error: true,
            status: 500,
            message: `Invalid params`
        });
    }

    const accountId = parseInt(accountIdParam)
    const skip = parseInt(skipParam)
    const take = parseInt(takeParam)
    try {
        // No token case
        if (!bearerHeader) {
            const posts = await findPostsShown(accountId, skip, take)
            const totalPosts = await countsPostsShown(accountId)
            return Response.json({
                error: false,
                status: 200,
                posts,
                totalPosts,
                message: "Retrieved public posts"
            })
        }

        // Token parsing
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]

        try {
            // Verify token
            const { payload }: { payload: { accountId: string} } = await jwtVerify(
                bearerToken,
                new TextEncoder().encode(process.env["JWT_KEY"])
            )

            // Token valid - return all posts
            if (parseInt(payload["accountId"]) === accountId) {
                const posts = await findPostsAll(accountId, skip, take)
                const totalPosts = await countPostsAll(accountId)
                return Response.json({
                    error: false,
                    status: 200,
                    posts,
                    totalPosts,
                    message: "Retrieved all posts"
                })
            } else {
                throw new Error("Access restricted")
            }

        } catch(tokenError) {
            // Invalid token - return public posts
            const posts = await findPostsShown(accountId, skip, take)
            const totalPosts = await countsPostsShown(accountId)
            return Response.json({
                error: false,
                status: 200,
                posts,
                totalPosts,
                message: `Retrieved public posts due to invalid token: ${tokenError}`
            })
        }

    } catch(error) {
        // Unexpected error
        return Response.json({
            error: true,
            status: 500,
            message: `Unexpected error retrieving posts: ${error}`
        })
    }
}