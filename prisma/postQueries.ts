import { PrismaClient } from "prisma/prisma-client"
const prisma = new PrismaClient()

export function createPost(title: string, content: string) {
    return prisma.post.create({
        data: {
            title,
            content
        }
    })
}

export function findPosts() {
    return prisma.post.findMany()
}

export function findPost(id: number) {
    return prisma.post.findUnique({
        where: {
            id
        }
    })
}

export function updatePost(id: number, title: string, content: string, isShown: boolean) {
    return prisma.post.update({
        where: {
            id,
        },
        data: {
            title,
            content,
            isShown,
        }
    })
}

export function deletePost(id: number) {
    return prisma.post.delete({
        where: {
            id
        }
    })
}