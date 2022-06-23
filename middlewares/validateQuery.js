import querySchema from "../schemas/querySchema.js";

export function validateQuery (req, res, next) {
    const date = req.query;
    const {error} = querySchema.validate(date, {abortEarly: false});
    if(error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    };

    next();
};