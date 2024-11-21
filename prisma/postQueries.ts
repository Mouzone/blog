import { PrismaClient } from "prisma/prisma-client"
const prisma = new PrismaClient()

export function createPost(title: string, description: string, content: string) {
    return prisma.post.create({
        data: {
            title,
            description,
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
        },
        include: {
            comments: true,
        }
    })
}

export function updatePost(id: number, title: string, description: string, content: string, isShown: boolean) {
    return prisma.post.update({
        where: {
            id,
        },
        data: {
            title,
            description,
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