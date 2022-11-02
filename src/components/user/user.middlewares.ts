import { Request, Response, NextFunction } from 'express';
import { getValidationOptions } from '@configs/validationOptions';
import { RouterResponse } from '@shared/types/router-response';
import UserValidator from './user.validator';

async function validateUser (req: Request, res: Response, next: NextFunction) {
  const { isValid, errors } = await UserValidator.validate(req.body, getValidationOptions(req.method));

  if (!isValid) {
    return res.status(400).json({
      ok: false,
      errors
    } as RouterResponse);
  }

  next();
}

export { validateUser };
