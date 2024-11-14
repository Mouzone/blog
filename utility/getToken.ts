import {type JWTPayload, SignJWT} from "jose";

export async function getToken(payload: JWTPayload, expiry?: string){
    const signJWT = new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })

    if (expiry) {
        signJWT.setExpirationTime(expiry)
    }

    return await signJWT.sign(
        new TextEncoder().encode(process.env["JWT_KEY"])
    )
}