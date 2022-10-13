import { Request, Response } from 'express';
import db from '@db/init';
import { validateUser } from './user.model';

export default class UserController {
  static getAllUsers(req: Request, res: Response) {
    const users = db.getAllUsers();

    res.json(users);
  }

  static getUserById(req: Request, res: Response) {
    const { id } = req.params;
    const user = db.getUserById(id);

    if (user) {
      return res.status(200).json(user);
    }

    return res
      .status(404)
      .json({ ok: false, message: `User with id ${id} was not found` });
  }

  static createUser(req: Request, res: Response) {
    const { body } = req;
    const { isValid, errors } = validateUser(body);

    if (!isValid) {
      return res.status(400).json({
        ok: false,
        errors,
      });
    }

    const userId = db.createUser(body);

    return res.status(201).json({ ok: true, id: userId });
  }

  static updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

    if (!id) {
      return res.json(`Param id is required`);
    }

    const { isValid, errors } = validateUser(body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const result = db.updateUser(id, body);

    const response = {
      ok: result,
      status: result ? 200 : 400,
      message: result ? "User was updated" : "Something wrong",
    }

    return res.status(response.status).json(response);
  }

  static deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.json(`Param id is required`);
    }

    const result = db.deleteUser(id);

    const response = {
      ok: result,
      status: result ? 200 : 400,
      message: result ? `User removed` : 'Something wrong',
    }

    res.status(response.status).json(response);
  }

  static getAutoSuggestUsers(req: Request, res: Response) {
    const { loginSubstr, limit } = req.query;

    const users = db.getAllUsers();

    const sortedUsers = users.sort((a, b) => b.login.localeCompare(a.login));

    const filteredUsers = sortedUsers.filter(
      (user) => user.login.indexOf(loginSubstr as string) > -1
    );

    const limitedUsers = filteredUsers.slice(0, +(limit as string));

    res.json(limitedUsers);
  }
}
