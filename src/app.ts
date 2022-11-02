import "reflect-metadata";
import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import  { initLoaders } from '@loaders/index';
import { dataSource } from '@configs/database';

dotenv.config();

async function startServer() {

  try {
    await dataSource.initialize();
    console.log('Database connected');
  }
  catch(error) {
    console.log('Database connection error', { error });
  }

  const { PORT } = process.env;
  const app: Express = express();
  
  initLoaders(app);

  app.listen(PORT, () => {
    console.log(`Server started on the port ${PORT}`);
  });
}

startServer();
