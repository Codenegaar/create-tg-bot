export enum Texts {
  MAIN_MENU_TEXT,
  SAY_HI_BUTTON,
}

type Translation = Record<Texts, Record<string, string>>;
const translations: Translation = {
  [Texts.MAIN_MENU_TEXT]: {
    en: 'Welcome to my shop!',
    fa: 'به فروشگاه من خوش آمدید!',
  },
  [Texts.SAY_HI_BUTTON]: {
    en: 'Say hi',
    fa: 'به من سلام کن',
  },
};

export function t(text: Texts, language: string = 'en'): string {
  return translations[text][language] || translations[text].en;
}
