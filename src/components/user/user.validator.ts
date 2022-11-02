import { validate, ValidatorOptions } from 'class-validator';
import { ValidationResponse } from '@shared/types/validator';
import User from './user.entity';

export default class UserValidator {
    static async validate(data: User, validationOptions?: ValidatorOptions): Promise<ValidationResponse> {
        const user = new User();

        user.fillInstance(data);

        const validationErrors = await validate(user, validationOptions);

        const errors = validationErrors.reduce((acc, error) => {
            const { constraints } = error;

            return [
                ...acc,
                ...Object.values(constraints as { [type: string]: string }),
            ];
        }, []);

        return {
            isValid: !errors.length,
            errors,
        };
    }
}
