import { CallbackAction } from '../callback-action.enum';
import { CallbackData } from '../callback-data';
import { Dialog } from './dialog';

export function mainMenuDialog(): Dialog {
  return {
    text: 'Welcome to my bot!',
    extra: {
      reply_markup: {
        inline_keyboard: [[
          {
            text: 'Say hi',
            callback_data: new CallbackData(CallbackAction.SAY_HELLO).serialize(),
          }
        ]]
      },
    },
  };
}
