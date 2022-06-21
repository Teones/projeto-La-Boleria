import joi from "joi";

const orderSchema = joi.object({
    clientId: joi.number().integer().min(1).required(),
    cakeId: joi.number().integer().min(1).required(),
    quantity: joi.number().integer().min(1).max(5).required(),
    totalPrice: joi.number().greater(0).required()
});

export default orderSchema;