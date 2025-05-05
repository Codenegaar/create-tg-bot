import { randomBytes } from 'node:crypto';
import { Logger } from 'pino';
import { Telegraf } from 'telegraf';
import { Config } from '../config/config';
import { initHandlers } from './handlers';

export function initBot(logger: Logger) {
  const config = Config.getInstance();

  const bot = new Telegraf(config.token!);

  //Init handlers
  initHandlers(bot, logger);

  //Launch bot
  if (config.webhookDomain) {
    bot.launch({
      webhook: {
        domain: config.webhookDomain,
        port: config.webhookPort,
        secretToken: randomBytes(64).toString('hex'),
      },
    }, () => logger.info('Bot launched using webhook'));
  } else {
    bot.launch(() => logger.info(`Bot launched`));
  }
}
