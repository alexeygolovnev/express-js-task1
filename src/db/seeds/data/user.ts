import User from '@components/user/user.entity';
import BaseSeed from './base-seed';
import { DataSource } from 'typeorm';

export default class UserSeed extends BaseSeed {
    constructor() {
        super();
    }

    async run(dataSource: DataSource): Promise<void> {
        const repository = dataSource.getRepository(User);

        const mocks: User[] = Array.from('u'.repeat(5), (_, index) => {
            const user = new User();

            user.fillInstance({
                login: `user${index}`,
                password: `password${index}`,
                age: Math.floor(Math.random() * (100 - 10) + 10),
            } as User);
        
            return user;
        });
        
        mocks.forEach(async (mockUser) => {
            const user = repository.create(mockUser);
            await repository.save(user);
        });
    }
}
