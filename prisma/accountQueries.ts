import { PrismaClient } from "prisma/prisma-client"
const prisma = new PrismaClient()

export function createAccount(username: string, email: string, password: string){
    return prisma.profile.create({
        data: {
            username,
            email,
            password
        }
    })
}