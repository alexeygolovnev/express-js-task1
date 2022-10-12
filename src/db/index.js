import { v4 } from 'uuid';

class Db {
  static collections = {
    users: [],
  };

  static getAllUsers() {
    return Db.collections.users.filter((user) => !user.isDeleted);
  }

  static getUserById(id) {
    return Db.collections.users.find((u) => u.id === id);
  }

  static createUser(user) {
    const id = v4();

    const newUser = { ...user, id, isDeleted: false };

    Db.collections.users.push(newUser);

    return newUser;
  }

  static updateUser(id, newUserData) {
    const userIndex = Db.collections.users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return {
        ok: false,
        message: `User with id ${id} was not found`,
      };
    }

    const users = Db.collections.users;

    users[userIndex] = {
      ...users[userIndex],
      ...newUserData,
    };

    return {
      ok: true,
      message: `User was updated`,
    };
  }

  static deleteUser(id) {
    const userIndex = Db.collections.users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return { ok: false, message: `User with id ${id} was not found` };
    }

    Db.collections.users[userIndex].isDeleted = true;

    return { ok: true, message: `User removed` };
  }

  static generateTestsUsers() {
    Db.collections.users = Array(30)
      .fill('')
      .map((_, index) => ({
        id: v4(),
        login: `testLogin${index}`,
        password: `testPassword${index}`,
        age: index ** 2,
        isDeleted: false,
      }));
  }
}

export default Db;
