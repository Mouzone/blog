import {createAccount} from "../../../../prisma/accountQueries.ts";

export default async function POST(request: Request) {
    const {username, password} = await request.json()
    const account = await createAccount(username, password)

}