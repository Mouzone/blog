import {PrismaClient} from "prisma/prisma-client"
const prisma = new PrismaClient()

export function findByUsername(username: string) {
    return prisma.profile.findUnique({
        where: {
            username,
        }
    })
}