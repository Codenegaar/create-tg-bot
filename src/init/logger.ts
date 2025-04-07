import pino from 'pino';

export function initLogger() {
  const logger = pino({
    transport: {
      target: 'pino-pretty',
      options: { colorize: true },
    },
  });
  return logger;
}
