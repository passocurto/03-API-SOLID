import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './erros/use-already-exists-error'
import { beforeEach } from 'node:test'


// let usersRepository: InMemoryUsersRepository
// let sut: RegisterUseCase

describe('Register Use Case', () => {

    // beforeEach(() => {
    //     usersRepository = new InMemoryUsersRepository()
    //     sut = new RegisterUseCase(usersRepository)
    // })

    it('should be able to register', async () => {

        const usersRepository = new InMemoryUsersRepository()
        const sut = new RegisterUseCase(usersRepository)

        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@exemple.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))

    })

    it('should hash user password upon registration', async () => {

        const usersRepository = new InMemoryUsersRepository()
        const sut = new RegisterUseCase(usersRepository)

        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@exemple.com',
            password: '123456'
        })

        const ifPasswordCorrectlyhashed = await compare(
            '123456',
            user.password_hash ?? ''
        )

        expect(ifPasswordCorrectlyhashed).toBe(true)
    })


    it('should not be able to register with same email twice', async () => {

        const usersRepository = new InMemoryUsersRepository()
        const sut = new RegisterUseCase(usersRepository)

        const email = 'passocurto@gmail.com'

        const { user } = await sut.execute({
            name: 'John Doe',
            email,
            password: '123456'
        })

        await expect(() => sut.execute({
            name: 'John Doe',
            email,
            password: '123456'
        }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)

    })

})