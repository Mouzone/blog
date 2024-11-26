import {PrismaClient} from "prisma/prisma-client";
const prisma = new PrismaClient()

export function createComment(postId: number, content: string) {
    return prisma.comment.create({
        data: {
            postId,
            content,
        }
    })
}

export function findComments(postId: number) {
    return prisma.comment.findMany({
        where: {
            postId,
        },
        orderBy: {
            createdAt: "asc",
        }
    })
}

export function deleteComments(postId: number) {
    return prisma.comment.deleteMany({
        where: {
            postId,
        }
    })
}