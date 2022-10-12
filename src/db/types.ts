import { User, UserId } from '@shared/types/user';

interface IDb { 
    collections: {
        users: User[],
    },
    getAllUsers: () => User[],
    getUserById: (id: UserId) => User | undefined,
    createUser: (user: User) => UserId,
    updateUser: (id: UserId, data: Partial<User>) => UserId | null,
    deleteUser: (id: UserId) => boolean,
    generateTestsUsers: () => void,
}

export { IDb };
