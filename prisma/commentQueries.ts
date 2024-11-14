import {PrismaClient} from "prisma/prisma-client";
const prisma = new PrismaClient()

export function createComment(profileId: number, postId: number, content: string) {
    return prisma.comment.create({
        data: {
            profileId,
            postId,
            content,
        }
    })
}

export function findComment(id: number) {
    return prisma.comment.findUnique({
        where: {
            id
        }
    })
}

export function findComments(postId: number) {
    return prisma.comment.findMany({
        where: {
            postId
        }
    })
}