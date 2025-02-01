import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

export const app = fastify();

const prisma = new PrismaClient()

prisma.user.create({
    data: {
        id: '1',
        name: 'Ricardo Passinho',
        email: 'passocurto@gmail.com',
        password: '123456'
    }
})
