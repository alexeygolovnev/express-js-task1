import { Request } from 'express';
import { ValidatorOptions } from 'class-validator';

const getValidationOptions = (requestMethod: Request['method']): ValidatorOptions => {
    switch (requestMethod.toLowerCase()) {
        case 'put': {
            return {
                skipMissingProperties: true,
            }
        }
        default: {
            return {};
        }
    }
}

export {
    getValidationOptions
}
