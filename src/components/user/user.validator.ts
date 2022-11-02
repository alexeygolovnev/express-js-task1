import { registerDecorator, validate, ValidationArguments, ValidationOptions, ValidatorOptions } from 'class-validator';
import { ValidationResponse } from '@shared/types/validator';
import User from './user.entity';
import { dataSource } from '@configs/database';

export default class UserValidator {
  static async validate (data: User, validationOptions?: ValidatorOptions): Promise<ValidationResponse> {
    const user = new User();

    user.fillInstance(data);

    const validationErrors = await validate(user, validationOptions);

    const errors = validationErrors.reduce((acc, error) => {
      const { constraints } = error;

      return [
        ...acc,
        ...Object.values(constraints as { [type: string]: string })
      ];
    }, []);

    return {
      isValid: !errors.length,
      errors
    };
  }

  static UniqLogin (validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'Uniq',
        target: object.constructor,
        propertyName,
        options: validationOptions,
        validator: {
          async validate (value: any, args: ValidationArguments) {
            const user = await dataSource.getRepository(User).findOne({
              where: { login: value }
            });

            return !user;
          },
          defaultMessage () {
            return 'User with login already exists';
          }
        }
      });
    };
  }
}
