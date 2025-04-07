import { CallbackQuery, Message, Update } from 'telegraf/typings/core/types/typegram';
import { State } from '../services/users/state.enum';
import { HandlerInterface } from './handler.interface';
import { Context, NarrowedContext, Telegraf } from 'telegraf';

export class LambdaHandler implements HandlerInterface {
  private constructor() {}

  public static getInstance(): LambdaHandler {
    if (!this._instance) {
      this._instance = new LambdaHandler();
    }
    return this._instance;
  }

  public handleMessage(
      ctx: NarrowedContext<Context<Update>, Update.MessageUpdate<Message>>,
      message: Message,
  ): State {
    ctx.sendMessage('Welcome to the main menu');
    return State.MAIN_MENU;
  }

  public handleCallbackQuery(
    ctx: NarrowedContext<Context<Update>, Update.CallbackQueryUpdate<CallbackQuery>>,
    cb: CallbackQuery,
  ): State {
    console.log('Handling callback query');
    return State.LAMBDA;
  }

  public handleRestart(): State {
    console.log('Handling restart');
    return State.LAMBDA;
  }

  private static _instance: LambdaHandler;
}
