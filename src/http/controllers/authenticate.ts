
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "@/use-cases/authenticate"
import { InvalidCredintialsError } from "@/use-cases/erros/Invalid-credencials-error"

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySschema =
        z.object({
            email: z.string().email(),
            password: z.string().min(6)
        })

    const { email, password } = authenticateBodySschema.parse(request.body)


    try {
        const UsersRepository = new PrismaUsersRepository()
        const authenticateUseCase = new AuthenticateUseCase(UsersRepository)

        await authenticateUseCase.execute(
            email,
            password
        )

    } catch (err) {
        if (err instanceof InvalidCredintialsError) {
            return reply.status(400).send({ message: err.message })
        }

        throw err

    }


    return reply.status(200).send()

}