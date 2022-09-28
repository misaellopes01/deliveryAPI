import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { prisma } from "../../../database/prismaClient"

interface IAuthenticateDeliveryman {
    username: string
    password: string
}

export class AuthenticateDeliverymanUseCase {
    // Receive username and password
    async execute({ username, password }: IAuthenticateDeliveryman) {
        // Verify if username exists
        const deliveryman = await prisma.deliveryMan.findFirst({
            where: {
                username
            }
        })

        if (!deliveryman) {
            throw new Error("Username or password incorrect")
        }
        // Verify if password is correct
        const passwordMatch = await compare(password, deliveryman.password)

        if (!passwordMatch) {
            throw new Error("Username or password incorrect")
        }

        // Generate auth token
        const token = sign({ username }, "416ab082b78a87b25ed939c26c3f8488", {
            subject: deliveryman.id,
            expiresIn: "3d"
        })

        return {
            username,
            token
        }
    }
}