import { PrismaClient } from "prisma/prisma-client"
const prisma = new PrismaClient()

export function createProfile(username: string, email: string, password: string){
    return prisma.profile.create({
        data: {
            username,
            email,
            password
        }
    })
}

export function findProfileByUsername(username: string) {
    return prisma.profile.findUnique({
        where:{
            username
        }
    })
}

export function findProfileByEmail(email: string) {
    return prisma.profile.findUnique({
        where: {
            email
        }
    })
}

export function findProfile(id: number) {
    return prisma.profile.findUnique({
        where: {
            id
        }
    })
}