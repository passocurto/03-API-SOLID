import { CheckIn } from '@prisma/client';
import { CheckInRepository } from '@/repositories/check-ins-repository';

interface CheckinUseCaseRequest {
    userId: string;
    gymId: string;
}

interface CheckinUseCaseResponse {
    checkIn: CheckIn
}

export class CheckinUseCase {
    constructor(private checkinRepository: CheckInRepository) { }

    async execute(userId: string, gymId: string): Promise<CheckinUseCaseResponse> {

        const checkIn = await this.checkinRepository.create({
            gym_id: gymId,
            user_id: userId,
        });


        return { checkIn }
    }
}