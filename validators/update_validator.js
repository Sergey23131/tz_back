const Joi = require('joi');

const updateUserValidator = Joi.object({
    first_name: Joi
        .string()
        .trim()
        .required(),
    last_name: Joi
        .string()
        .trim()
        .required(),
});

module.exports = {
    updateUserValidator
};
