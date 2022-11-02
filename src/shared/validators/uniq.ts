import { EntityTarget, ObjectLiteral } from 'typeorm';
import { 
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';
import { dataSource } from '@configs/database';

export default function Uniq(
  entityConfig: { entity: EntityTarget<ObjectLiteral>, entityName: string },
  validationOptions?: ValidationOptions
) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'Uniq',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
            async validate(value: any, args: ValidationArguments) {
                const user = await dataSource.getRepository(entityConfig.entity).findOne({
                    where: { [propertyName]: value }
                });

                return !user;
          },
          defaultMessage() {
            return `${entityConfig.entityName} with ${propertyName} already exists`;
          }
        },
      });
    };
}
