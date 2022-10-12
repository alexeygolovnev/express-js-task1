import express, { Router } from 'express';
import UserController from './user.controller';
import { setDefaultSearchQueryParams, validateLogin } from './user.middlewares';

const userRouter: Router = express.Router();

userRouter.get('/all', UserController.getAllUsers);

userRouter.get(
  '/search',
  setDefaultSearchQueryParams,
  UserController.getAutoSuggestUsers
);

userRouter.post('/', validateLogin, UserController.createUser);

userRouter.get('/:id', UserController.getUserById);

userRouter.put('/:id', validateLogin, UserController.updateUser);

userRouter.delete('/:id', UserController.deleteUser);

export default userRouter;
