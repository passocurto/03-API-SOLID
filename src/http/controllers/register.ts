import { prisma } from "@/lib/prisma"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { hash } from "bcryptjs"
import { regiteruseCase } from "@/use-cases/register"

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySschema =
        z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6)
        })

    const { name, email, password } = registerBodySschema.parse(request.body)

    try {
        await regiteruseCase({
            name,
            email,
            password
        })

    } catch (err) {
        console.error(err)
        return reply.status(409).send()
    }

    return reply.status(201).send()

}