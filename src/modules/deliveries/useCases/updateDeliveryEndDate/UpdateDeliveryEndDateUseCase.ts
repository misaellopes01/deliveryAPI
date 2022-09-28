import { prisma } from "../../../../database/prismaClient"

interface IUpdateEndDate {
    id_delivery: string
    id_deliveryman: string
}

export class UpdateDeliveryEndDateUseCase {

    async execute({ id_delivery, id_deliveryman }: IUpdateEndDate) {

        const result = await prisma.deliveries.update({
            where: {
                link_delivery_deliveryman: {
                    id: id_delivery,
                    id_deliveryman
                }
            },
            data: {
                end_at: new Date()
            }
        })

        return result
    }
}