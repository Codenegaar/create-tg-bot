import { CallbackAction } from './callback-action.enum';

export class CallbackData {
  public constructor(private _action: CallbackAction, private _params?: string[]) {}

  public serialize(): string {
    let result = this._action as string;
    if (this._params) {
      for (const param of this._params) {
        result += `|${param}`;
      }
    }
    return result;
  }

  public static fromData(data: string): CallbackData {
    const [actionString, ...params] = data.split('|');
    let action = actionString as CallbackAction;
    return new CallbackData(action, params);
  }

  public get action(): CallbackAction {
    return this._action;
  }

  public get params(): string[] | undefined {
    return this._params;
  }
}
