import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';

export type Dialog = {
  text: string;
  extra?: ExtraReplyMessage,
};
