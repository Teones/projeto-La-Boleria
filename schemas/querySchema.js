import joi from "joi";

const querySchema = joi.object({
    date: joi.string().isoDate()
});

export default querySchema;