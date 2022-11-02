import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const {
  NODE_ENV,
  DB_TYPE,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_PORT
} = process.env;

const dataSource = new DataSource({
  type: DB_TYPE as 'postgres',
  host: DB_HOST,
  port: +DB_PORT!,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: ['./src/components/*/*.entity.ts'],
  synchronize: NODE_ENV === 'dev',
  logging: NODE_ENV === 'dev'
});

export {
  dataSource
};
