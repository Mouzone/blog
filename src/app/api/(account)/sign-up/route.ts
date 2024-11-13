import { createAccount } from "../../../../../prisma/accountQueries";

export async function POST(request: Request) {
    const body = await request.json()
    const username = body.username
    const email = body.email
    const password = body.password

    try {
        await createAccount(username, email, password)
    } catch(error) {
        return Response.json({
            error: true,
            status: 503,
            message: error,
        })
    }

    return Response.json({
        error: false,
        status: 200,
        message: "success"
    })
}