// export the app
import MongoStore from 'connect-mongo';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import session from 'express-session';

import httpStatus from 'http-status';
import path from 'path';
import routes from './app/routes';
import { mongoDbUrl } from './utils/configs/db';

import globalErrorHandler from './utils/middlewares/globalErrorHandler';
import { requestLogger } from './utils/middlewares/requestLogger';
import { HandleApiError } from './utils/shared/errors/handleApiError';
import { ln, logger } from './utils/shared/logger';

const app: Application = express();

logger.warn('test Log', { f: path.basename(__filename), l: ln() });

// middleware :cors
app.use(
  cors({
    origin: process.env.CLIENT,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type'],
  })
);
app.use([express.json(), express.urlencoded({ extended: true }), requestLogger]);

// configure session
app.use(
  session({
    secret: 'cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: mongoDbUrl,
      dbName: 'fullBack',
      collectionName: 'sessions',
      ttl: 60 * 60, // expire after 1 hour (in seconds)
    }),
  })
);
app.set('trust proxy', 1);

//& route base
// home route
// app.get('/', (_req, res) => {
//   throw new HandleApiError(400, 'test error');
// });





app.get('/', (_req, res) => {
  res.send('test server is running');
});
// business routes
app.use('/api/v1', routes);

// global error handler
app.use(globalErrorHandler);
// wrong path error route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: '404! Url doest not exist',
    errorMessages: [
      {
        path: req.originalUrl,
        message: '404! Url doest not exist',
      },
    ],
  });
  next();
});

// server error route
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  return res.status(500).send('Something broke in server!');
});

export default app;
