import Db from '../../db/index';
import { validateUser } from './user.model';

export default class UserController {
  static getAllUsers(_, res) {
    const users = Db.getAllUsers();

    res.json(users);
  }

  static getUserById(req, res) {
    const { id } = req.params;
    const user = Db.getUserById(id);

    if (user) {
      return res.status(200).json(user);
    }

    return res
      .status(404)
      .json({ ok: false, message: `User with id ${id} was not found` });
  }

  static createUser(req, res) {
    const { body } = req;
    const { isValid, errors } = validateUser(body);

    if (!isValid) {
      return res.status(400).json({
        ok: false,
        errors,
      });
    }

    const newUser = Db.createUser(body);

    return res.status(201).json({ ok: true, id: newUser.id });
  }

  static updateUser(req, res) {
    const { id } = req.params;
    const { body } = req;

    if (!id) {
      return res.json(`Param id is required`);
    }

    const { isValid, errors } = validateUser(body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const result = Db.updateUser(id, body);

    return res.status(!result.ok ? 400 : 200).json(result);
  }

  static deleteUser(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.json(`Param id is required`);
    }

    const result = Db.deleteUser(id);

    res.status(result.ok ? 200 : 400).json(result);
  }

  static getAutoSuggestUsers(req, res) {
    const { loginSubstr, limit } = req.query;

    const users = Db.getAllUsers();

    const sortedUsers = users.sort((a, b) => b.login.localeCompare(a.login));

    const filteredUsers = sortedUsers.filter(
      (user) => user.login.indexOf(loginSubstr) > -1
    );

    const limitedUsers = filteredUsers.slice(0, limit);

    res.json(limitedUsers);
  }
}
