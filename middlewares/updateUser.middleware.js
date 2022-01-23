const User = require('../database/Users');
const updateValidator = require('../validators/update_validator');

const {errors_massage, errors_code, ErrorHandler} = require('../errors');

module.exports = {
    updateUserMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const {error, value} = updateValidator.updateUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
            }

            await User.findByIdAndUpdate(user_id, req.body);

            next();
        } catch (e) {
            next(e);
        }
    },
};