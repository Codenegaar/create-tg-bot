import path from 'node:path';
import { config as configDotenv } from 'dotenv';
import { DataSource } from 'typeorm';

configDotenv();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  ...( process.env.DB_PORT ? { port: parseInt(process.env.DB_PORT) } : {}),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,

  entities: [path.join(__dirname, '..', 'entities', '*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '..', 'migrations', '*{.ts,.js}')],
});

export default AppDataSource;
