import {findAllAccounts} from "../../../../prisma/accountQueries.ts";

export async function GET(){
    try {
        const accounts = await findAllAccounts()
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