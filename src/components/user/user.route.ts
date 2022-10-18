import express, { Router } from 'express';
import UserController from './user.controller';
import { setDefaultSearchQueryParams, loginValidation, userValidation } from './user.middlewares';

const userRouter: Router = express.Router();

userRouter.get('/all', UserController.getAllUsers);

userRouter.get(
  '/search',
  setDefaultSearchQueryParams,
  UserController.getAutoSuggestUsers
);

userRouter.post('/', userValidation, loginValidation, UserController.createUser);

userRouter.get('/:id', UserController.getUserById);

userRouter.put('/:id', userValidation, loginValidation, UserController.updateUser);

userRouter.delete('/:id', UserController.deleteUser);

export default userRouter;
