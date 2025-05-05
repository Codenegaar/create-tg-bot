import { t, Texts } from '../../utils/translator.util';
import { CallbackAction } from '../callback-action.enum';
import { CallbackData } from '../callback-data';
import { Dialog } from './dialog';

export function mainMenuDialog(language?: string): Dialog {
  return {
    text: t(Texts.MAIN_MENU_TEXT, language),
    extra: {
      reply_markup: {
        inline_keyboard: [[
          {
            text: t(Texts.SAY_HI_BUTTON, language),
            callback_data: new CallbackData(CallbackAction.SAY_HELLO).serialize(),
          }
        ]]
      },
    },
  };
}
