import { findPostsAll, findPostsShown } from "../../../../prisma/postQueries.ts";
import { headers } from "next/headers";
import { jwtVerify } from "jose";

export async function GET() {
    const headersList = await headers()
    const bearerHeader = headersList.get("authorization")

    try {
        // No token case
        if (!bearerHeader) {
            const posts = await findPostsShown()
            return Response.json({
                error: false,
                status: 200,
                posts,
                message: "Retrieved public posts"
            })
        }

        // Token parsing
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]

        try {
            // Verify token
            await jwtVerify(
                bearerToken,
                new TextEncoder().encode(process.env["JWT_KEY"])
            )

            // Token valid - return all posts
            const posts = await findPostsAll()
            return Response.json({
                error: false,
                status: 200,
                posts,
                message: "Retrieved all posts"
            })

        } catch(tokenError) {
            // Invalid token - return public posts
            const posts = await findPostsShown()
            return Response.json({
                error: false,
                status: 200,
                posts,
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