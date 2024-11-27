import {createAccount, findAccountByUsername} from "../../../../prisma/accountQueries.ts";

export async function POST(request: Request) {

    const contentType = request.headers.get('content-type');
    if (contentType !== 'application/json') {
        return Response.json({
            error: true,
            status: 400,
            message: "Content-Type must be application/json"
        });
    }

    try {
        const {username, password} = await request.json()
        const account = await findAccountByUsername(username)
        if (account) {
            return Response.json({
                error: true,
                status: 503,
                message: "Username already taken"
            })
        }
        await createAccount(username, password)
        return Response.json({
            error: false,
            status: 200,
            message: "Success"
        })
    } catch(error) {
        return Response.json({
            error: true,
            status: 503,
            message: `Error creating account, ${error}`
        })
    }
}