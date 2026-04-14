import winston from 'winston';
import morgan from 'morgan';
import { env } from '../config/env';

const { combine, timestamp, colorize, printf, json } = winston.format;

const devFormat = printf(({ level, message, timestamp }) =>
  `${timestamp} [${level}]: ${message}`
);

export const logger = winston.createLogger({
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  format:
    env.NODE_ENV === 'production'
      ? combine(timestamp(), json())
      : combine(timestamp({ format: 'HH:mm:ss' }), colorize(), devFormat),
  transports: [
    new winston.transports.Console(),
    ...(env.NODE_ENV === 'production'
      ? [
          new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
          new winston.transports.File({ filename: 'logs/combined.log' }),
        ]
      : []),
  ],
});

// HTTP request logger using morgan → winston
export const httpLogger = morgan(
  env.NODE_ENV === 'production' ? 'combined' : 'dev',
  {
    stream: {
      write: (message: string) => logger.http(message.trim()),
    },
  }
);
