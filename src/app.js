import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const { PORT } = process.env;
const server = express();

server.get('/', (req, res) => {
  res.json({ result: 'ok' });
});

server.listen(PORT, () => {
  console.log(`Server started on the port ${PORT}`);
});
