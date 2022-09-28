import { prisma } from "../../../../database/prismaClient";



export class FindAllDeliveriesUseCase {

    async execute(id_client: string) {

        const deliveries = await prisma.clients.findMany({
            where: {
                id: id_client
            },
            select: {
                id: true,
                username: true,
                deliveries: {
                    select: {
                        id: true,
                        id_deliveryman: true,
                        item_name: true,
                        created_at: true,
                        end_at: true
                    }
                }
            }
        })

        return deliveries
    }
}