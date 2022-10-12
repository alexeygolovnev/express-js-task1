import { v4 } from 'uuid';
import { User, UserId } from '@shared/types/user';
import { IDb } from './types';

class Db implements IDb {
  collections: { users: User[]; };

  constructor() {
    this.collections = {
        users: [],
    };
  }

  getAllUsers() {
    return this.collections.users.filter((user) => !user.isDeleted);
  }

  getUserById(id: UserId) {
    return this.collections.users.find((u) => u.id === id);
  }

  createUser(user: User) {
    const id = v4();

    const newUser = { ...user, id, isDeleted: false };

    this.collections.users.push(newUser);

    return newUser.id;
  }

  updateUser(id: UserId, newUserData: Partial<User>) {
    const userIndex = this.collections.users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
        return null;
    }

    const users = this.collections.users;

    users[userIndex] = {
      ...users[userIndex],
      ...newUserData,
    };

    return this.collections.users[userIndex].id;
  }

  deleteUser(id: UserId) {
    const userIndex = this.collections.users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
        return false;
    }

    this.collections.users[userIndex].isDeleted = true;

    return true;
  }

  generateTestsUsers() {
    this.collections.users = Array(30)
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
