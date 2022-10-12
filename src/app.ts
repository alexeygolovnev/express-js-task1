import express, { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import userRouter from './components/user/user.route';
import db from './db/init';

dotenv.config();

const { PORT } = process.env;
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.json({ result: 'ok' });
});

app.use('/user', userRouter);

app.listen(PORT, () => {
  db.generateTestsUsers();
  console.log(`Server started on the port ${PORT}`);
});
