import { UsersRespository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./erros/use-already-exists-error"

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
}
//Solid

export class RegisterUseCase {

    constructor(private usersRepository: UsersRespository) { }

    async execute({ name, email, password }: RegisterUseCaseRequest) {

        const password_hash = await hash(password, 6)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        // const primaUsersRepository = new PrimaUsersRepository()

        this.usersRepository.create({
            name,
            email,
            password_hash
        })
    }
}