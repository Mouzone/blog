import {createAccount, findAccountByUsername} from "../../../../prisma/accountQueries.ts";

export default async function POST(request: Request) {
    try {
        const {username, password} = await request.json()
        if (!await findAccountByUsername(username)) {
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