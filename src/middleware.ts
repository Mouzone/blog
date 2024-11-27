import {type NextRequest, NextResponse} from "next/server";
import {headers} from "next/headers";
import { jwtVerify} from "jose";

export const config = {
    matcher: [
        '/api/posts/create',
        '/api/posts/:path*/delete',
        '/api/posts/:path*/update',
        '/api/posts/:path*/toggle-shown',
    ]
}

export async function middleware(request: NextRequest) {
    const headersList = await headers()
    const bearerHeader = headersList.get("authorization")

    if (typeof bearerHeader !== 'undefined' && bearerHeader) {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]

        try {
            const { payload } = await jwtVerify(
                bearerToken,
                new TextEncoder().encode(process.env["JWT_KEY"])
            )

            const response = NextResponse.next({
                request: {
                    headers: new Headers(request.headers)
                }
            })

            response.headers.set('accountId', payload["accountId"] as string)
            return response

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