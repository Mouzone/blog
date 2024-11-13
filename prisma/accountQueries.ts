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

export function findAccountByUsername(username: string) {
    return prisma.profile.findUnique({
        where:{
            username
        }
    })
}

export function findAccountByEmail(email: string) {
    return prisma.profile.findUnique({
        where: {
            email
        }
    })
}