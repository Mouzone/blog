<<<<<<< HEAD
import { findProfileByUsername } from "../../../../../prisma/profileQueries.ts";
=======
import { findAccountByUsername } from "../../../../../prisma/accountQueries.ts";
>>>>>>> f054e6069bc7470000590410056967d3c53bc794

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { username, password } = body

<<<<<<< HEAD
        const account = await findProfileByUsername(username)
=======
        const account = await findAccountByUsername(username)
>>>>>>> f054e6069bc7470000590410056967d3c53bc794
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