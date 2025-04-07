import { Config } from '../config/config';

export function initConfig(): Config {
  const config = Config.getInstance();
  config.init();
  return config;
}