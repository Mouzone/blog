import {findAllAccounts} from "../../../../prisma/accountQueries.ts";
import {headers} from "next/headers";

export async function GET(){
    try {
        const headersList = await headers()
        const accountId = headersList.get("accountId")
        if (!accountId) {
            throw new Error("Missing credentials")
        }

        const accounts = await findAllAccounts(parseInt(accountId))
        return Response.json({
            error: false,
            status: 200,
            accounts,
            message: "Success"
        })
    } catch(error) {
        return Response.json({
            error: false,
            status: 503,
            message: `Error retrieving accounts ${error}`
        })
    }
}