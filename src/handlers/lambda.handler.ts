import { CallbackQuery, Message, Update } from 'telegraf/typings/core/types/typegram';
import { State } from '../shared/state.enum';
import { HandlerInterface } from './handler.interface';
import { Context, NarrowedContext, Telegraf } from 'telegraf';
import { mainMenuDialog } from '../shared/dialogs/main-menu.dialog';
import { CallbackData } from '../shared/callback-data';
import { CallbackAction } from '../shared/callback-action.enum';

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
  ): State | Promise<State> {
    const dialog = mainMenuDialog(ctx.update.message.from.language_code);
    ctx.sendMessage(dialog.text, dialog.extra);
    return State.MAIN_MENU;
  }

  private static _instance: LambdaHandler;
}
