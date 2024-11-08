import {PrismaClient} from "prisma/prisma-client"
const prisma = new PrismaClient()

export function findByUsername(username: string) {
    return prisma.profile.findUnique({
        where: {
            username,
        }
    })
}

export function findByEmail(email: string) {
    return prisma.profile.findUnique({
        where: {
            email,
        }
    })
}

export function createProfile(username: string, email: string, password: string, isAuthor?: boolean) {
    return prisma.profile.create({
        data: {
            username,
            email,
            password,
            isAuthor,
        }
    })
}