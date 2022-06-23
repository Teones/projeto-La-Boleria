import { Router } from "express";

import { createOrder, getOrderByClientId, getOrderById, getOrders } from "../controllers/orderController.js";

import { validateOrder } from "../middlewares/validateOrder.js";
import { validateQuery } from "../middlewares/validateQuery.js";

const ordersRouter = Router();
ordersRouter.post('/order', validateOrder, createOrder);
ordersRouter.get('/orders', validateQuery, getOrders);
ordersRouter.get('/orders/:id', getOrderById);
ordersRouter.get('/clients/:id/orders', getOrderByClientId);

export default ordersRouter;