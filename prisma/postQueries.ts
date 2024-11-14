import { PrismaClient } from "prisma/prisma-client"
const prisma = new PrismaClient()

export function createPost(profileId: number, title: string, content: string) {
    return prisma.post.create({
        data: {
            profileId,
            title,
            content
        }
    })
}

export function findPosts(profileId: number) {
    return prisma.post.findMany({
        where: {
            profileId
        }
    })
}