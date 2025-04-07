import path from 'node:path';
import { config as configDotenv } from 'dotenv';
import { DataSource } from 'typeorm';

configDotenv();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  ...( process.env.DB_PORT ? { port: parseInt(process.env.DB_PORT) } : {}),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,

  entities: [path.join(__dirname, '..', 'entities', '*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '..', 'migrations', '*{.ts,.js}')],
});

export default AppDataSource;
