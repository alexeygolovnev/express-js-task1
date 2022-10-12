interface User {
    id: UserId;
    login: string;
    password: string;
    age: number;
    isDeleted?: boolean;
}

type UserId = string;

export {
    User,
    UserId,
}
