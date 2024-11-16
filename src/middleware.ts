import {NextResponse} from "next/server";
import {headers} from "next/headers";
import { jwtVerify} from "jose";

export const config = {
    matcher: [
        '/api/posts/create',
        '/api/posts/:path*/delete',
        '/api/posts/:path*/update',
        '/api/comments/create'
    ]
}

export async function middleware() {
    const headersList = await headers()
    const bearerHeader = headersList.get("authorization")

    if (typeof bearerHeader !== 'undefined' && bearerHeader) {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]

        try {
            await jwtVerify(
                bearerToken,
                new TextEncoder().encode(process.env["JWT_KEY"])
            )

            return NextResponse.next()

        } catch(error) {
            return NextResponse.json({
                error: true,
                status: 403,
                message: `Cannot verify token ${error}`
            })
        }
    } else {
        return NextResponse.json({
            error: true,
            status: 401,
            message: "Not authorized"
        })
    }
}