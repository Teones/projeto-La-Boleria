import { Router } from "express";

import { createOrder } from "../controllers/createOrder.js";

import { validateOrder } from "../middlewares/validateOrder.js";

const ordersRouter = Router();
ordersRouter.post('/order', validateOrder, createOrder)

export default ordersRouter;