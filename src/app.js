import express from 'express';
import * as dotenv from 'dotenv';
import userRouter from './components/user/user.route';
import Db from './db';

dotenv.config();

const { PORT } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_, res) => {
  res.json({ result: 'ok' });
});

app.use('/user', userRouter);

app.listen(PORT, () => {
  Db.generateTestsUsers();
  console.log(`Server started on the port ${PORT}`);
});
