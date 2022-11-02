import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';
import { 
    Matches,
    Max,
    Min,
    IsNotEmpty,
    IsString,
    IsNumber,
    MinLength,
    MaxLength,
} from "class-validator";
import { Uniq } from '@shared/validators';

@Entity({ name: 'Users' })
export default class User {
    @PrimaryGeneratedColumn({ name: 'UserId' })
    userId: number;

    @Column({ name: 'Login' })
    @IsNotEmpty()
    @IsString()
    @Uniq({ entity: User, entityName: User.name })
    login: string;

    @Column({ name: 'Password' })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(12)
    @Matches(/^(?=.*[0-9])[a-zA-Z0-9]*$/, {
        message: "password should contain letters and digits"
    })
    password: string;

    @Column({ name: 'Age' })
    @IsNotEmpty()
    @IsNumber()
    @Min(4)
    @Max(130)
    age: number;

    @DeleteDateColumn({ name: 'DeletedOn' })
    deletedOn?: Date | null;
    
    fillInstance(user: User) {       
        this.login = user.login;
        this.password = user.password;
        this.age = user.age;
    }
}
