import { createLogger, format, transports } from 'winston';

import colors from '@colors/colors';
import { NextFunction, Request, Response } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    colors.bgYellow.black(
      `Req-method:${req.method} - Req-url:${req.url} - Time-of-req: ${
        new Date().toLocaleTimeString().underline
      }`
    )
  );
  next();
};

// winston logger
const { combine, timestamp, label, colorize, prettyPrint } = format;

export const logger = createLogger({
  level: 'silly',
  format: combine(
    label({ label: 'winston custom format' }),
    timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss',
    }), // adds a timestamp property
    prettyPrint(),

    colorize({
      all: true,
    })
  ),
  transports: [new transports.Console()],
});
