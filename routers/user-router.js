const userRouter = require('express').Router();

const {checkIDMiddleware} = require('../middlewares/checkID.middleware');
const {createUserMiddleware} = require('../middlewares/createUser.middleware');
const {updateUserMiddleware} = require('../middlewares/updateUser.middleware');

const userController = require('../controllers/user-controller');

userRouter.get('/', userController.getUsers);

userRouter.get('/:user_id', checkIDMiddleware, userController.getUsersById);

userRouter.put('/:user_id', checkIDMiddleware, updateUserMiddleware, userController.updateUser);

userRouter.post('/', createUserMiddleware, userController.createUser);

userRouter.delete('/:user_id', checkIDMiddleware, userController.deleteUser);

module.exports = userRouter;