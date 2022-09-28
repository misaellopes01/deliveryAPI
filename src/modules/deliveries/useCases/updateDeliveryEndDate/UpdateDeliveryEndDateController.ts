import { Request, Response } from "express";
import { UpdateDeliveryEndDateUseCase } from "./UpdateDeliveryEndDateUseCase";


export class UpdateDeliveryEndDateController {

    async handle(request: Request, response: Response) {
        const { id_deliveryman } = request
        const { id: id_delivery } = request.params

        const updateDeliveryEndDate = new UpdateDeliveryEndDateUseCase()

        const delivery = await updateDeliveryEndDate.execute({
            id_deliveryman,
            id_delivery
        })

        return response.status(201).json(delivery)
    }
}