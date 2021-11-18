const User = require('../database/Users');

const {errors_code} = require('../errors');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const allUser = await User.find().select('-password');

            res.status(errors_code.UPDATE_DATA).json(allUser);
        } catch (e) {
            next(e);
        }
    },

    getUsersById: async (req, res, next) => {
        try {
            const oneUser = await User.findOne(req.user).select('-password');

            res.status(errors_code.UPDATE_DATA).json(oneUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const user = await User.findById(user_id).select('-password');

            res.status(errors_code.UPDATE_DATA).json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            await User.createHashPassword(req.body);

            res.status(errors_code.UPDATE_DATA).json('You create new user!');
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            await User.findByIdAndRemove(user_id);

            res.status(errors_code.UPDATE_DATA).json('User is removed!');
        } catch (e) {
            next(e);
        }
    }
};
