import { findProfileByUsername } from "../../../../../prisma/profileQueries.ts";

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { username, password } = body

        const account = await findProfileByUsername(username)
        if (!account) {
            return Response.json({
                error: true,
                status: 404,
                message: 'Username does not exist'
            })
        }

        const isMatch = await Bun.password.verify(password, account.password)
        if (!isMatch) {
            return Response.json({
                error: true,
                status: 401,
                message: 'Password is incorrect'
            })
        }

        return Response.json({
            error: false,
            status: 200,
            message: 'success',
        })

    } catch (error) {
        console.error('Login error:', error)
        return Response.json({
            error: true,
            status: 500,
            message: 'Internal server error'
        })
    }
}