import Db from '../../db';

function setDefaultSearchQueryParams(req, res, next) {
  if (!req.query.loginSubstr) {
    req.query.loginSubstr = '';
  }

  if (req.query.limit) {
    req.query.limit = parseInt(req.query.limit, 10);

    if (!Number.isInteger(req.query.limit)) {
      req.query.limit = 0;
    }
  }

  next();
}

function validateLogin(req, res, next) {
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

export { setDefaultSearchQueryParams, validateLogin };
