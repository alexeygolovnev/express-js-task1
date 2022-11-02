import express, { Express, Request, Response } from 'express';
import userRouter from '@components/user/user.route';

function loadExpress (app: Express): Express {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/', (req: Request, res: Response) => {
    res.json({ result: 'ok' });
  });

  app.use('/user', userRouter);

  return app;
}

export {
  loadExpress
};
