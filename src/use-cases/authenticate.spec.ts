import { expect, describe, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { InvalidCredintialsError } from './erros/Invalid-credencials-error'



describe('Athenticate Use Case', () => {

    it('should be able to register', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        await usersRepository.create({
            name: 'John Doe',
            email: 'johdow@exemple.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute(
            'johdow@exemple.com',
            '123456'
        )

        expect(user.id).toEqual(expect.any(String))

    })


    it('should not be able to authenticate with wrong email', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        await expect(() =>
            sut.execute(
                'johdow@exemple.com',
                '123456'
            )
        ).rejects.toBeInstanceOf(InvalidCredintialsError)

    })


    it('should be able to authenticate with wrong password', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        await usersRepository.create({
            name: 'John Doe',
            email: 'johdow@exemple.com',
            password_hash: await hash('123', 6)
        })

        expect(() =>
            sut.execute(
                'johdow@exemple.com',
                '123456'
            )
        ).rejects.toBeInstanceOf(InvalidCredintialsError)

    })

})