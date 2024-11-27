import {PrismaClient } from "prisma/prisma-client"
const prisma = new PrismaClient()

export function createAccount(username: string, password: string) {
    return prisma.account.create({
        data: {
            username,
            password
        }
    })
}

export function findAccountByUsername(username: string) {
    return prisma.account.findUnique({
        where: {
            username
        }
    })
}