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

export function findPost(id: number) {
    return prisma.post.findUnique({
        where: {
            id
        }
    })
}

export function updatePostTitle(id: number, title: string) {
    return prisma.post.update({
        where: {
            id,
        },
        data: {
            title,
        }
    })
}

export function updatePostContent(id: number, content: string) {
    return prisma.post.update({
        where: {
            id,
        },
        data: {
            content,
        }
    })
}

export function updatePostShow(id: number, isShown: boolean) {
    return prisma.post.update({
        where: {
            id,
        },
        data: {
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