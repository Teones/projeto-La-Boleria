import cakeSchema from "../schemas/cakeSchema.js";

export function validateCake (req, res, next) {
    const cake = req.body;
    const {error} = cakeSchema.validate(cake, {abortEarly: false});
    if(error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    };

    next();
};