import { config as configDotenv } from 'dotenv';
import { initConfig } from './init/config';
import { initLogger } from './init/logger';
import { initBot } from './init/bot';
import AppDataSource from './config/data-source';

async function main() {
  configDotenv();
  const logger = initLogger();

  try {
    await AppDataSource.initialize();
    logger.info('Data source initialized');
  } catch(error) {
    logger.error(`Error initializing data source: ${error}`);
    process.exit(1);
  }

  try {
    initConfig();
  } catch(error) {
    logger.error(`Error initializing configuration: ${error}`);
    process.exit(1);
  }

  try {
    initBot(logger);
  } catch(error) {
    logger.error(`Error initializing bot: ${error}`);
    process.exit(1);
  }
}

main();
