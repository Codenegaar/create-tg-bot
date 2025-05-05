import { Telegraf } from 'telegraf';
import { callbackQuery } from 'telegraf/filters';
import { User as TgUser } from 'telegraf/typings/core/types/typegram';
import { Logger } from 'pino';
import { ServiceContainer } from '../services/service-container';
import { HandlerInterface } from '../handlers/handler.interface';
import { State } from '../shared/state.enum';
import { LambdaHandler } from '../handlers/lambda.handler';
import { CallbackData } from '../shared/callback-data';
import { MainMenuHandler } from '../handlers/main-menu.handler';

async function getStateHandler(fromUser: TgUser): Promise<HandlerInterface> {
  const serviceContainer = ServiceContainer.getInstance();
  try {
    const state = await serviceContainer.usersService.getUserState(fromUser.id);

    let handler: HandlerInterface | null = null;
    switch(state) {
      case State.LAMBDA:
        handler = LambdaHandler.getInstance();
        break;
      case State.MAIN_MENU:
        handler = MainMenuHandler.getInstance();
        break;
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
  bot.start(async(ctx) => {
    const handler = await getStateHandler(ctx.update.message.from);
    const newState = handler.handleStart ?
      await handler.handleStart(ctx) : 
      await LambdaHandler.getInstance().handleMessage(ctx);
    await saveUserState(ctx.update.message.from, newState);
  });

  bot.on('message', async(ctx) => {
    try {
      const handler = await getStateHandler(ctx.update.message.from);
      if (handler.handleMessage) {
        const newState = await handler.handleMessage(ctx, ctx.update.message);
        await saveUserState(ctx.update.message.from, newState);
      }
    } catch(error) {
      logger.error(error);
    }
  });

  bot.on(callbackQuery('data'), async(ctx) => {
    try {
      const handler = await getStateHandler(ctx.update.callback_query.from);
      const callbackData = CallbackData.fromData(ctx.update.callback_query.data);
      if (handler.handleCallbackQuery) {
        const newState = await handler.handleCallbackQuery(ctx, ctx.update.callback_query, callbackData);
        await saveUserState(ctx.update.callback_query.from, newState);
      }
    } catch(error) {
      logger.error(error);
    }
  });

  logger.info(`Handlers initialized`);
}
