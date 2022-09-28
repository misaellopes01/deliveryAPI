import { hash } from "bcrypt"
import { prisma } from "../../../../database/prismaClient"

interface ICreateDeliveryMan {
    username: string
    password: string
}

export class CreateDeliverymanUseCase {

    async execute({ password, username }: ICreateDeliveryMan) {
        // validate client
        const deliverymanExists = await prisma.deliveryMan.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive"
                }
            }
        })
        if (deliverymanExists) {
            throw new Error("Deliveryman already exists")
        }
        // encrypt password
        const passwordHashed = await hash(password, 10)
        // save client
        const deliveryman = await prisma.deliveryMan.create({
            data: {
                username,
                password: passwordHashed
            }
        })

        return deliveryman
    }
}