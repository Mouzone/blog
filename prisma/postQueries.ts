import { PrismaClient } from "prisma/prisma-client"
const prisma = new PrismaClient()

export function createPost(accountId: number, title: string, description: string, content: string) {
    return prisma.post.create({
        data: {
            accountId,
            title,
            description,
            content
        }
    })
}

export function findPostsAll(accountId: number, skip: number, take: number) {
    return prisma.post.findMany({
        skip,
        take,
        where: {
            accountId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export function findPostsShown(accountId: number, skip: number, take: number) {
    return prisma.post.findMany({
        skip,
        take,
        where: {
            accountId,
            isShown: true,
        },
        orderBy: {
            createdAt: 'desc'
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

export function countPostsAll(accountId: number) {
    return prisma.post.count({
        where: {
            accountId,
        }
    })
}

export function countsPostsShown(accountId: number) {
    return prisma.post.count({
        where: {
            accountId,
            isShown: true
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

export function updateIsShown(id: number, isShown: boolean) {
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