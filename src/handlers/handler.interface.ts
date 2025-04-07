import { CallbackQuery, Message, Update } from 'telegraf/typings/core/types/typegram';
import { State } from '../shared/state.enum';
import { Context, NarrowedContext } from 'telegraf';
import { CallbackData } from '../shared/callback-data';

export interface HandlerInterface {
  handleMessage(
    ctx: NarrowedContext<Context<Update>, Update.MessageUpdate<Message>>,
    message: Message,
  ): State | Promise<State>;
  handleCallbackQuery(
    ctx: NarrowedContext<Context<Update>, Update.CallbackQueryUpdate<CallbackQuery>>,
    cb: CallbackQuery,
    callbackData: CallbackData,
  ): State | Promise<State>;
  handleRestart(ctx: NarrowedContext<Context<Update>, Update.MessageUpdate<Message>>): State | Promise<State>;
}
