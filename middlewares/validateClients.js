import clientSchema from "../schemas/clientSchema.js";

export function validateClients (req, res, next) {
    const client = req.body;
    const {error} = clientSchema.validate(client, {abortEarly: false});
    if(error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    };

    next();
};