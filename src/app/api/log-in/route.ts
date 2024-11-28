import { getToken } from "../../../../utility/getToken.ts";
import {findAccountByUsernameAndPassword} from "../../../../prisma/accountQueries.ts";

export async function POST(request: Request) {
    const { username, password } = await request.json()
    const account = await findAccountByUsernameAndPassword(username, password)
    if (!account) {
        return Response.json({
            error: true,
            status: 401,
            message: 'Invalid credentials'
        })
    }

    try {
        const accessToken = await getToken({ accountId: account.id })

        return Response.json({
            error: false,
            status: 200,
            accessToken,
            message: "success"
        })
    } catch(error) {
        return Response.json({
            error: true,
            status: 503,
            message: `Error generating token ${error}`
        })
    }
}