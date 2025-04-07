import { Telegraf } from 'telegraf';
import { User as TgUser } from 'telegraf/typings/core/types/typegram';
import { Logger } from 'pino';
import { ServiceContainer } from '../services/service-container';
import { HandlerInterface } from '../handlers/handler.interface';
import { State } from '../services/users/state.enum';
import { LambdaHandler } from '../handlers/lambda.handler';

async function getStateHandler(fromUser: TgUser): Promise<HandlerInterface> {
  const serviceContainer = ServiceContainer.getInstance();
  try {
    const state = await serviceContainer.usersService.getUserState(fromUser.id);

    let handler: HandlerInterface | null = null;
    switch(state) {
      case State.LAMBDA:
        handler = LambdaHandler.getInstance();
    }

    if (!handler) {
      throw new Error(`No handler defined for state ${state.toString()}`);
    }
    return handler;
  } catch(error) {
    throw new Error(`Error getting state for user ${fromUser.id}: ${error}`);
  }
}

async function saveUserState(fromUser: TgUser, state: State) {
  const serviceContainer = ServiceContainer.getInstance();
  serviceContainer.usersService.saveUserState(fromUser.id, state);
}

export function initHandlers(bot: Telegraf, logger: Logger) {
  bot.on('message', async(ctx) => {
    try {
      const handler = await getStateHandler(ctx.update.message.from);
      const newState = await handler.handleMessage(ctx, ctx.update.message);
      await saveUserState(ctx.update.message.from, newState);
    } catch(error) {
      logger.error(error);
    }
  });

  bot.on('callback_query', async(ctx) => {
    try {
      const handler = await getStateHandler(ctx.update.callback_query.from);
      const newState = await handler.handleCallbackQuery(ctx, ctx.update.callback_query);
      await saveUserState(ctx.update.callback_query.from, newState);
    } catch(error) {
      logger.error(error);
    }
  });

  logger.info(`Handlers initialized`);
}
