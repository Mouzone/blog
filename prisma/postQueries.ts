import { PrismaClient } from "prisma/prisma-client"
const prisma = new PrismaClient()

export function findPosts(profileId: number) {
    return prisma.post.findMany({
        where: {
            profileId
        }
    })
}