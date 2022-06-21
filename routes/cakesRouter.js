import { Router } from "express";

import { createCake } from "../controllers/createCake.js";

import { validateCake } from "../middlewares/validateCake.js";

const cakesRouter = Router();
cakesRouter.post('/cakes', validateCake, createCake);


export default cakesRouter;