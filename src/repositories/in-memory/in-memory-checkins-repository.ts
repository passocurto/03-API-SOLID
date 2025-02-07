import { CheckIn, Prisma } from "@prisma/client";
import { CheckInRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";

export class InMemoryChekinsRepository implements CheckInRepository {
    private items: CheckIn[] = [];

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            create_at: new Date(),
            validata_at: data.validata_at ? new Date(data.validata_at) : null,
            user_id: data.user_id,
            gym_id: data.gym_id
        }

        this.items.push(checkIn)
        return checkIn
    }

}
