import { Repository } from 'typeorm';
import User from './user.entity';
import { dataSource } from '@configs/database';
import { UserId } from './types';

class UserService {
  private repository: Repository<User>;

  constructor () {
    this.repository = dataSource.getRepository(User);
  }

  getAll (): Promise<User[]> {
    return this.repository.find({
      withDeleted: false
    });
  }

  getById (userId: UserId): Promise<User | null> {
    return this.repository.findOne({
      where: { userId }
    });
  }

  create (user: User) {
    const newUser = this.repository.create({ ...user });
    return this.repository.save(newUser);
  }

  update (userId: UserId, newUserData: Partial<User>) {
    try {
      return this.repository.update(userId, newUserData);
    } catch (error) {
      console.log({ error });
    }

    return null;
  }

  async softRemove (userId: UserId) {
    const user = await this.repository.findOne({
      where: { userId }
    });

    if (user) {
      return this.repository.softRemove(user);
    }

    return null;
  }

  async getAutoSuggestByLogin (login: string = '', limit: number = 0) {
    return this.repository
      .createQueryBuilder('user')
      .where('user.login like :login', { login: `%${login}%` })
      .orderBy('user.login', 'ASC')
      .limit(limit)
      .getMany();
  }
}

export default UserService;
