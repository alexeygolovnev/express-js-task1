import { Request, Response, NextFunction } from 'express';
import Db from '@db/init';
import { validateUser } from './user.model';

function setDefaultSearchQueryParams(req: Request, res: Response, next: NextFunction) {
  if (!req.query.loginSubstr) {
    req.query.loginSubstr = '';
  }

  if (!req.query.limit) {
    req.query.limit = '0';
  }

  next();
}

function userValidation(req: Request, res: Response, next: NextFunction) {
  const { isValid, errors } = validateUser(req.body);

  if (!isValid) {
    return res.status(400).json({
      ok: false,
      errors,
    });
  }

  next();
}

function loginValidation(req: Request, res: Response, next: NextFunction) {
  const { login } = req.body;

  if (login) {
    const isExist = Db.collections.users.find(
      (user) => user.login.toLowerCase() === login.toLowerCase()
    );

    if (isExist) {
      return res.status(400).json({
        ok: false,
        message: 'A user with login already exists',
      });
    }
  }

  next();
}

export { setDefaultSearchQueryParams, loginValidation, userValidation };
