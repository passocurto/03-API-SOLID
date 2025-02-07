import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { CheckInRepository } from '@/repositories/check-ins-repository'
import { UserAlreadyExistsError } from './erros/use-already-exists-error'
import { beforeEach } from 'node:test'
import { InMemoryChekinsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { CheckinUseCase } from './checkin'


// let usersRepository: InMemoryUsersRepository
// let sut: RegisterUseCase

describe('Checkin Use Case', () => {

    // beforeEach(() => {
    //     usersRepository = new InMemoryUsersRepository()
    //     sut = new RegisterUseCase(usersRepository)
    // })

    it('should be able to check in', async () => {

        const checkInRepository = new InMemoryChekinsRepository()
        const sut = new CheckinUseCase(checkInRepository)

        const { checkIn } = await sut.execute(
            'user-id',
            'gym-id'
        )

        expect(checkIn.id).toEqual(expect.any(String))

    })

})