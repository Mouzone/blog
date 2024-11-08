import { findByUsername } from "../../../../../prisma/profileQueries"
import * as dotenv from "dotenv"
import jwt, { SignOptions } from 'jsonwebtoken';
dotenv.config()

export async function POST(request: Request) {
    const formData = await request.formData()
    const username = formData.get("username")
    const password = formData.get("password")

    const account = await findByUsername(username as string)

    if (!account || account.password !== password) {
        return Response.json({
            "error": true,
            "message": "Invalid username or password",
            "status": 401,
        })
    }

    const user = { id: account.id }
    const options: SignOptions = { expiresIn: '1h'}
    const token = jwt.sign(user, process.env.JWT_KEY as string, options)

    return Response.json( { token })
}