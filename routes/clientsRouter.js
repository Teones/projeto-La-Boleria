import { Router } from "express";

import { createClients } from "../controllers/createClients.js";

import { validateClients } from "../middlewares/validateClients.js";

const clientsRouter = Router();
clientsRouter.post('/clients', validateClients, createClients);


export default clientsRouter;