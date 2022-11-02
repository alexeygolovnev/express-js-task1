import express, { Router } from 'express';
import UserController from './user.controller';
import { validateUser } from './user.middlewares';

const userRouter: Router = express.Router();

const userController = new UserController();

userRouter.get('/all', userController.getAllUsers);

userRouter.get(
  '/search',
  userController.getAutoSuggestUsersByLogin
);

userRouter.post('/', validateUser, userController.createUser);

userRouter.get('/:id', userController.getUserById);

userRouter.put('/:id', validateUser, userController.updateUser);

userRouter.delete('/:id', userController.softRemoveUser);

export default userRouter;
