import { expect, describe, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { InvalidCredintialsError } from './erros/Invalid-credencials-error'
import { beforeEach } from 'node:test'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './erros/resource-not-found-error'


// let usersRepository: InMemoryUsersRepository
// let sut: GetUserProfileUseCase


describe('Get User Profile Use Case', () => {

    // beforeEach(() => {
    //     usersRepository = new InMemoryUsersRepository
    //     sut = new GetUserProfileUseCase(usersRepository)
    // })

    it('should be able to get user profile', async () => {

        const usersRepository = new InMemoryUsersRepository
        const sut = new GetUserProfileUseCase(usersRepository)

        const createdUser = await usersRepository.create({
            name: 'John Doe',
            email: 'johdow@exemple.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            userId: createdUser.id,
        })

        expect(user.name).toEqual('John Doe')

    })


    it('should not be able to authenticate with wrong id', async () => {

        const usersRepository = new InMemoryUsersRepository
        const sut = new GetUserProfileUseCase(usersRepository)

        await expect(() =>
            sut.execute({
                userId: 'wrong-id',
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)

    })

})