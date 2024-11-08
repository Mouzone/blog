import { findByUsername } from "../../../../../prisma/profileQueries"
import * as dotenv from "dotenv"
import jwt, { SignOptions } from 'jsonwebtoken'

dotenv.config()

interface Account {
    id: number,
    email: string,
    username: string,
    password: string,
    isAuthor: boolean
}

interface User {
    id: number,
}

export async function POST(request: Request) {
    const formData = await request.formData()
    const username = formData.get("username")
    const password = formData.get("password")

    const account: Account | null = await findByUsername(username)

    if (!account || account.password !== password) {
        return Response.json({
            error: true,
            message: "Invalid username or password",
            status: 401,
        })
    }

    const user: User = { id: account.id }
    const options: SignOptions = { expiresIn: '1h'}
    const secretKey = process.env.JWT_KEY
    const token = jwt.sign(user, secretKey, options)

    return Response.json( { token })
}