import {NextRequest, NextResponse} from "next/server";
import {headers} from "next/headers";
import jwt, {type Secret} from "jsonwebtoken"
import {type JWTPayload, jwtVerify} from "jose";

export const config = {
    matcher: ['/api/comments', '/api/posts', '/api/comments/:path*', "/api/posts/:path*"],
}

interface payload extends JWTPayload {
    id: string,
}

export async function middleware(request: NextRequest) {
    const headersList = await headers()
    const bearerHeader = headersList.get("authorization")

    if (typeof bearerHeader !== 'undefined' && bearerHeader) {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]

        try {
            const { payload } = await  jwtVerify(
                bearerToken,
                new TextEncoder().encode(process.env["JWT_KEY"])
            )
            const requestHeaders = new Headers(request.headers)
            requestHeaders.set('id', payload.id)

            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            })

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