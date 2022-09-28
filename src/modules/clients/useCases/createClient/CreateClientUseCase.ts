import { hash } from "bcrypt"
import { prisma } from "../../../../database/prismaClient"


interface ICreateClient {
    username: string
    password: string
}

export class CreateClientUseCase {

    async execute({ password, username }: ICreateClient) {
        // validate client
        const clientExists = await prisma.clients.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive"
                }
            }
        })
        if (clientExists) {
            throw new Error("Client already exists")
        }
        // encrypt password
        const passwordHashed = await hash(password, 10)
        // save client
        const client = await prisma.clients.create({
            data: {
                username,
                password: passwordHashed
            }
        })

        return client
    }
}