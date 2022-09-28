import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { prisma } from "../../../database/prismaClient"

interface IAuthenticateClient {
    username: string
    password: string
}

export class AuthenticateClientUseCase {
    // Receive username and password
    async execute({ username, password }: IAuthenticateClient) {
        // Verify if username exists
        const client = await prisma.clients.findFirst({
            where: {
                username
            }
        })

        if (!client) {
            throw new Error("Username or password incorrect")
        }
        // Verify if password is correct
        const passwordMatch = await compare(password, client.password)

        if (!passwordMatch) {
            throw new Error("Username or password incorrect")
        }

        // Generate auth token
        const token = sign({ username }, "316ab082b78a87b25ed939c26c3f8488", {
            subject: client.id,
            expiresIn: "3d"
        })

        return {
            username,
            token
        }
    }
}