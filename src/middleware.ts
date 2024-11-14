import { NextResponse } from "next/server";
import {headers} from "next/headers";
import jwt, {type Secret} from "jsonwebtoken"

export const config = {
    matcher: ['/comments/:path', "/posts/:path"],
}

export async function middleware() {
    const headersList = await headers()
    const bearerHeader = headersList.get("authentication")
    if (typeof bearerHeader !== 'undefined' && bearerHeader) {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]

        const secret: Secret = process.env["JWT_KEY"] as Secret
        jwt.verify(bearerToken, secret, (err, authData) => {
            if (err) {
                NextResponse.json({
                    error: true,
                    status: 403,
                    message: "Invalid token"
                })
            }
            const response =  NextResponse.next()
            response.headers.set("id", authData)
            return response
        })
    } else {
        NextResponse.redirect('/log-in')
    }
}