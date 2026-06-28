import fs from 'node:fs';
import path from 'node:path';
import { createLogger, format, transports } from 'winston';

const logsDirectory = path.resolve(process.cwd(), 'logs');

if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory, { recursive: true });
}

const logger = createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp({
          format: 'HH:mm:ss',
        }),
        format.printf(({ timestamp, level, message, stack }) => {
          return stack
            ? `${timestamp} ${level}: ${message}\n${stack}`
            : `${timestamp} ${level}: ${message}`;
        }),
      ),
    }),

    new transports.File({
      filename: path.join(logsDirectory, 'combined.log'),
    }),

    new transports.File({
      filename: path.join(logsDirectory, 'error.log'),
      level: 'error',
    }),
  ],
});

export default logger;