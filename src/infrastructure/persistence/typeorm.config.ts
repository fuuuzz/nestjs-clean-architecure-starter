import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const {
  NODE_ENV,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_DATABASE_TEST,
} = process.env;

export const typeormConfig: DataSourceOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: +DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: NODE_ENV !== 'test' ? DB_DATABASE : DB_DATABASE_TEST,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/infrastructure/persistence/migrations/**/*{.ts,.js}'],
  synchronize: false,
  migrationsTableName: 'migrations',
};

export default new DataSource(typeormConfig);
