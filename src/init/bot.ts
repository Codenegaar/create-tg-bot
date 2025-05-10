import { randomBytes } from 'node:crypto';
import { Logger } from 'pino';
import { Telegraf } from 'telegraf';
import express from 'express';
import { Config } from '../config/config';
import { initHandlers } from './handlers';

export async function initBot(logger: Logger) {
  const config = Config.getInstance();

  const bot = new Telegraf(config.token!);

  //Init handlers
  initHandlers(bot, logger);

  //Launch bot
  if (config.webhookDomain) {
    const app = express();
    const webhook = await bot.createWebhook({
      domain: config.webhookDomain!,
      path: `/${config.webhookPath!}`,
      secret_token: config.webhookSecret,
    });

    app.post(`/${config.webhookPath}`, webhook);
    app.listen(config.webhookPort, () => {
      logger.info(`Bot launched on webhook, listening on port ${config.webhookPort}`);
    });
  } else {
    bot.launch(() => logger.info(`Bot launched`));
  }
}
