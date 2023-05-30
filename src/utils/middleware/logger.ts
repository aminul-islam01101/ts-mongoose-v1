import { NextFunction, Request, Response } from 'express';
import colors from 'colors';

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    colors.bgYellow.black(
      `Req-method:${req.method} - Req-url:${req.url} - Time-of-req: ${
        new Date().toLocaleTimeString().underline
      }`
    )
  );
  next();
};

export default logger;
