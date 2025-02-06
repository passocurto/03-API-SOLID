
import { UsersRepository } from '@/repositories/users-repository';
import { InvalidCredintialsError } from './erros/Invalid-credencials-error';
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';


interface AuthenticateUseCaseRequest {
    email: string;
    password: string;
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
    constructor(private readonly userRepository: UsersRepository) { }

    async execute(email: string, password: string): Promise<AuthenticateUseCaseResponse> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new InvalidCredintialsError();
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password_hash ? user.password_hash : '')
        if (!isPasswordCorrect) {
            throw new InvalidCredintialsError();
        }

        return { user }
    }
}