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

export function findComments(postId: number, skip: number, take: number) {
    return prisma.comment.findMany({
        skip,
        take,
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