import { createAccount } from "../../../../../prisma/accountQueries";

export async function POST(request: Request) {
    const body = await request.json()
    const username = body.username
    const email = body.email
    const password = body.password

    try {
        const bcryptHash = await Bun.password.hash(password, {
            algorithm: "bcrypt",
            cost: 10
        })
        await createAccount(username, email, bcryptHash)
    } catch(error) {
        return Response.json({
            error: true,
            status: 503,
            message: `Error creating account ${error}`,
        })
    }

    return Response.json({
        error: false,
        status: 200,
        message: "success"
    })
}