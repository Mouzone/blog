import { findProfileByUsername } from "../../../../../prisma/profileQueries.ts";
import jwt, {type Secret} from "jsonwebtoken"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { username, password } = body

        const profile = await findProfileByUsername(username)
        if (!profile) {
            return Response.json({
                error: true,
                status: 404,
                message: 'Username does not exist'
            })
        }

        const isMatch = await Bun.password.verify(password, profile.password)
        if (!isMatch) {
            return Response.json({
                error: true,
                status: 401,
                message: 'Password is incorrect'
            })
        }

        try {
            const secret: Secret = process.env["JWT_KEY"] as Secret
            const token = jwt.sign({ id: profile.id }, secret, { expiresIn: '1h' })
            return Response.json({
                error: false,
                status: 200,
                token,
                message: "success"
            })
        } catch(error) {
            return Response.json({
                error: true,
                status: 503,
                message: `Error generating token ${error}`
            })
        }

    } catch (error) {
        console.error('Login error:', error)
        return Response.json({
            error: true,
            status: 500,
            message: 'Internal server error'
        })
    }
}