import { prisma } from "@/lib/prisma"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { hash } from "bcryptjs"
import { RegisterUseCase } from "@/use-cases/register"
import { PrimaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { UserAlreadyExistsError } from "@/use-cases/erros/use-already-exists-error"

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySschema =
        z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6)
        })

    const { name, email, password } = registerBodySschema.parse(request.body)


    try {
        const UsersRepository = new PrimaUsersRepository()
        const registerUseCase = new RegisterUseCase(UsersRepository)

        await registerUseCase.execute({
            name,
            email,
            password
        })

    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: err.message }) // TODO fix me
        }

        throw err

    }


    return reply.status(201).send()

}