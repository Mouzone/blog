import {
    countPostsAll,
    countPostsShown,
    findPostsAll,
    findPostsShown,
} from "../../../../prisma/postQueries.ts"
import { headers } from "next/headers"
import { jwtVerify } from "jose"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    const headersList = await headers()
    const bearerHeader = headersList.get("authorization")

    const searchParams = request.nextUrl.searchParams
    const accountIdParam = searchParams.get("accountId")
    const skipParam = searchParams.get("skip")
    const takeParam = searchParams.get("take")

    if (!skipParam || !takeParam) {
        return Response.json({
            error: true,
            status: 500,
            message: `Invalid params`,
        })
    }

    const skip = parseInt(skipParam)
    const take = parseInt(takeParam)

    const handleAuthorizedRequest = async (bearerAccountId: number) => {
        if (accountIdParam) {
            const accountId = parseInt(accountIdParam)

            if (bearerAccountId === accountId) {
                const posts = await findPostsAll(accountId, skip, take)
                const totalPosts = await countPostsAll(accountId)

                return Response.json({
                    error: false,
                    status: 200,
                    posts,
                    totalPosts,
                    message: "Retrieved all posts",
                })
            } else {
                const posts = await findPostsShown(accountId, skip, take)
                const totalPosts = await countPostsShown(accountId)

                return Response.json({
                    error: false,
                    status: 200,
                    posts,
                    totalPosts,
                    message: "Retrieved all shown posts",
                })
            }
        } else {
            const posts = await findPostsAll(bearerAccountId, skip, take)
            const totalPosts = await countPostsAll(bearerAccountId)

            return Response.json({
                error: false,
                status: 200,
                posts,
                totalPosts,
                message: "Retrieved all posts",
            })
        }
    }

    const handleUnauthorizedRequest = async () => {
        if (accountIdParam) {
            const accountId = parseInt(accountIdParam)
            const posts = await findPostsShown(accountId, skip, take)
            const totalPosts = await countPostsShown(accountId)

            return Response.json({
                error: false,
                status: 200,
                posts,
                totalPosts,
                message: "Retrieved shown posts",
            })
        } else {
            return Response.json({
                error: true,
                status: 403,
                message: "No credentials and no target",
            })
        }
    }

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]

        if (!bearerToken || bearerToken === "undefined") {
            return handleUnauthorizedRequest()
        }

        const { payload }: { payload: { accountId: string } } = await jwtVerify(
            bearerToken,
            new TextEncoder().encode(process.env["JWT_KEY"])
        )

        const bearerAccountId = parseInt(payload["accountId"])
        return handleAuthorizedRequest(bearerAccountId)
    } else {
        return handleUnauthorizedRequest()
    }
}