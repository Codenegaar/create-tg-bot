import { NarrowedContext, Context } from 'telegraf';
import { Update, CallbackQuery, Message } from 'telegraf/typings/core/types/typegram';
import { CallbackData } from '../shared/callback-data';
import { State } from '../shared/state.enum';
import { HandlerInterface } from './handler.interface';
import { CallbackAction } from '../shared/callback-action.enum';

export class MainMenuHandler implements HandlerInterface {
  private constructor() {}

  public static getInstance(): MainMenuHandler {
    if (!this._instance) {
      this._instance = new MainMenuHandler();
    }
    return this._instance;
  }

  public handleCallbackQuery(
    ctx: NarrowedContext<Context<Update>,
    Update.CallbackQueryUpdate<CallbackQuery>>,
    cb: CallbackQuery,
    callbackData: CallbackData,
  ): State | Promise<State> {
    if (callbackData.action == CallbackAction.SAY_HELLO) {
      ctx.sendMessage(`Hello ${ctx.from.first_name}`);
    }
    return State.MAIN_MENU;
  }

  private static _instance: MainMenuHandler;
}
