import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman";
import { AuthenticateClientController } from "./modules/accounts/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/accounts/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { FindAllDeliveriesController } from "./modules/clients/useCases/findAllDeliveries/FindAllDeliveriesController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { FindAllAvailableController } from "./modules/deliveries/useCases/findAllAvailable/FindAllAvailableController";
import { UpdateDeliveryEndDateController } from "./modules/deliveries/useCases/updateDeliveryEndDate/UpdateDeliveryEndDateController";
import { UpdateDeliverymanController } from "./modules/deliveries/useCases/updateDeliveryman/useCases/UpdateDeliverymanController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { FindAllDeliveriesDeliverymanController } from "./modules/deliveryman/useCases/findAllDeliveries/FindAllDeliveriesDeliverymanController";

const routes = Router()

routes.post("/client", new CreateClientController().handle)
routes.post("/auth/client", new AuthenticateClientController().handle)
routes.get("/client/deliveries", ensureAuthenticateClient, new FindAllDeliveriesController().handle)

routes.post("/deliveryman", new CreateDeliverymanController().handle)
routes.post("/auth/deliveryman", new AuthenticateDeliverymanController().handle)
routes.get("/deliveryman/deliveries", ensureAuthenticateDeliveryman, new FindAllDeliveriesDeliverymanController().handle)

routes.post("/delivery", ensureAuthenticateClient, new CreateDeliveryController().handle)
routes.get("/delivery/available", ensureAuthenticateDeliveryman, new FindAllAvailableController().handle)
routes.put("/delivery/updateDeliveryman/:id", ensureAuthenticateDeliveryman, new UpdateDeliverymanController().handle)
routes.put("/delivery/updateDelivery/:id", ensureAuthenticateDeliveryman, new UpdateDeliveryEndDateController().handle)


export { routes }