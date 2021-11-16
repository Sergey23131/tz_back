const Joi = require('joi');
const userRoles = require('../configs/userRoles');

const {EMAIL_REGEXP, PASSWORD_REGEXP} = require('../configs/constants');

const userValidator = Joi.object({
    username: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    first_name: Joi
        .string()
        .trim()
        .required(),
    last_name: Joi
        .string()
        .trim()
        .required(),
    email: Joi
        .string()
        .regex(EMAIL_REGEXP)
        .trim()
        .required(),
    role: Joi
        .string()
        .allow(...Object.values(userRoles)),
    password: Joi
        .string()
        .min(8)
        .regex(PASSWORD_REGEXP)
        .required()
});

module.exports = {
    userValidator
};
