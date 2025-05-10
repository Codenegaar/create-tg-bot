export class Config {
  private constructor() {}

  public static getInstance(): Config {
    if (!this._instance) {
      this._instance = new Config();
    }
    return this._instance;
  }

  public init() {
    if (!process.env.BOT_TOKEN) {
      throw new Error('Bot token is not set, use BOT_TOKEN environment variable to set it');
    }
    this._token = process.env.BOT_TOKEN;
    this._webhookPort = process.env.BOT_WEBHOOK_PORT ? parseInt(process.env.BOT_WEBHOOK_PORT) : undefined;
    this._webhookDomain = process.env.BOT_WEBHOOK_DOMAIN;
    this._webhookPath = process.env.BOT_WEBHOOK_PATH;
    this._webhookSecret = process.env.BOT_WEBHOOK_SECRET;
  }

  public get token(): string | undefined {
    return this._token;
  }

  public get webhookPort(): number | undefined {
    return this._webhookPort;
  }

  public get webhookDomain(): string | undefined {
    return this._webhookDomain;
  }

  public get webhookPath(): string | undefined {
    return this._webhookPath;
  }

  public get webhookSecret(): string | undefined {
    return this._webhookSecret;
  }

  private static _instance: Config;
  private _token?: string;
  private _webhookPort?: number;
  private _webhookDomain?: string;
  private _webhookPath?: string;
  private _webhookSecret?: string;
}
