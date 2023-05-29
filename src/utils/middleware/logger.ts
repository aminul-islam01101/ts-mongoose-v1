import { NextFunction, Request, Response } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `Req-method:${req.method} - Req-url:${req.url} - Time-of-req: ${
      new Date().toLocaleTimeString().underline
    }`.bgYellow.black
  );
  next();
};

export default logger;
