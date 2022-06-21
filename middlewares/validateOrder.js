import orderSchema from "../schemas/orderSchema.js";

export function validateOrder (req, res, next) {
    const order = req.body;
    const {error} = orderSchema.validate(order, {abortEarly: false});
    if(error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    };

    next();
};