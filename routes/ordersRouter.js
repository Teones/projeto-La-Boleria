import { Router } from "express";

import { createOrder, getOrderByClientId, getOrderById } from "../controllers/orderController.js";

import { validateOrder } from "../middlewares/validateOrder.js";

const ordersRouter = Router();
ordersRouter.post('/order', validateOrder, createOrder);
// ordersRouter.get('/orders');
ordersRouter.get('/orders/:id', getOrderById);
ordersRouter.get('/clients/:id/orders', getOrderByClientId)

export default ordersRouter;