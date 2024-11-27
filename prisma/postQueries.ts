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

export function findPostsAll(skip: number, take: number) {
    return prisma.post.findMany({
        skip,
        take,
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export function findPostsShown(skip: number, take: number) {
    return prisma.post.findMany({
        skip,
        take,
        where: {
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

export function countPostsAll() {
    return prisma.post.count()
}

export function countsPostsShown() {
    return prisma.post.count({
        where: {
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