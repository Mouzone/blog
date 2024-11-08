import { PrismaClient } from "prisma/prisma-client"
const prisma = new PrismaClient()

export function findComment(id: number) {
    return prisma.comment.findUnique(
        {
            where: {
                id
            }
        }
    )
}

export function updateContent(id: number, content: string) {
    return prisma.comment.update({
        where: {
            id,
        },
        data: {
            content
        }
    })
}