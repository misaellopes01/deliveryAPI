import { prisma } from "../../../../database/prismaClient";



export class FindAllDeliveriesDeliverymanUseCase {

    async execute(id_deliveryman: string) {

        const deliveries = await prisma.deliveryMan.findMany({
            where: {
                id: id_deliveryman
            },
            select: {
                id: true,
                username: true,
                deliveries: {
                    select: {
                        id: true,
                        id_client: true,
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