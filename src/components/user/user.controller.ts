import { Request, Response } from 'express';
import { getRouterResponse } from '@utils/get-router-response';
import UserService  from './user.service';
import User from './user.entity';
import { UserId } from './types';

export default class UserController {
  private userService: UserService;

  constructor() {
     this.userService = new UserService();

     this.getAllUsers = this.getAllUsers.bind(this);
     this.getUserById = this.getUserById.bind(this);
     this.createUser = this.createUser.bind(this);
     this.updateUser = this.updateUser.bind(this);
     this.softRemoveUser = this.softRemoveUser.bind(this);
     this.getAutoSuggestUsersByLogin = this.getAutoSuggestUsersByLogin.bind(this);
  }

  async getAllUsers(req: Request, res: Response) {
    const users = await this.userService.getAll();
    
    res.json(getRouterResponse<User[]>({
      isSuccessed: true, data: users
    }));
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this.userService.getById(+id);

    return res.status(user ? 200 : 400).json(
      getRouterResponse<User>({
        isSuccessed: !!user,
        data: user,
        failureMessage: `User with id ${id} was not found`,
      })
    );
  }

  async createUser(req: Request, res: Response) {
    const userDTO = req.body;

    const { userId } = await this.userService.create(userDTO);
  
    return res.status(201).json(
      getRouterResponse<UserId>({
        isSuccessed: true,
        data: userId,
        successMessage: 'User created',
      })
    );
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const userDTO = req.body;

    if (!id) {
      return res.status(400).json(
        getRouterResponse<null>({
          isSuccessed: false,
          failureMessage: 'Param id is required',
        })
      );
    }

    const result = await this.userService.update(+id, userDTO);
   
    if (!result?.affected) {  
      return res.status(400).json(
        getRouterResponse<null>({ isSuccessed: false })
      );
    }
   
    return res.json(
      getRouterResponse<null>({
        isSuccessed: true,
        successMessage: 'User updated',
      })
    );
  }

  async softRemoveUser(req: Request, res: Response) {
    const { id } = req.params;
  
    if (!id) {
      return res.json(
        getRouterResponse<null>({
          isSuccessed: false,
          failureMessage: 'Param ID is required',
        })
      );
    }

    const result = await this.userService.softRemove(+id);

    if (!result) {
      res.status(200).json(
        getRouterResponse<User>({ isSuccessed: false })
      );
    }

    res.status(400).json(
      getRouterResponse<User>({
        isSuccessed: true,
        data: result,
        successMessage: 'User removed',
      })
    );
  }

  async getAutoSuggestUsersByLogin(req: Request, res: Response) {
    const { loginSubstr, limit } = req.query;

    const users = await this.userService.getAutoSuggestByLogin(loginSubstr as string, +limit!);

    res.json(
      getRouterResponse<User[]>({
        isSuccessed: true,
        data: users,
      })
    );
  }
}
