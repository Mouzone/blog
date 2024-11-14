import {NextRequest, NextResponse} from "next/server";
import {headers} from "next/headers";
import jwt, {type Secret} from "jsonwebtoken"

export const config = {
    matcher: ['/api/comments', '/api/posts', '/api/comments/:path*', "/api/posts/:path*"],
}

interface JwtPayload {
    id: string,
}

export async function middleware(request: NextRequest) {
    const headersList = await headers()
    const bearerHeader = headersList.get("authorization")

    if (typeof bearerHeader !== 'undefined' && bearerHeader) {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]

        const secret: Secret = process.env["JWT_KEY"] as Secret
        try {
            const decoded = jwt.verify(bearerToken, secret) as JwtPayload
            const requestHeaders = new Headers(request.headers)
            requestHeaders.set('id', decoded.id)

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
        NextResponse.redirect('/log-in')
    }
}