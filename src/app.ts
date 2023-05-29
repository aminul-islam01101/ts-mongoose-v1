// export the app
import MongoStore from 'connect-mongo';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import session from 'express-session';

import routes from './app/routes';
import { mongoDbUrl } from './utils/configs/db';
import logger from './utils/middleware/logger';

const app: Application = express();

const x = 20;
// middleware :cors
app.use(
  cors({
    origin: process.env.CLIENT,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);
app.use([express.json(), express.urlencoded({ extended: true }), logger]);

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

// route base
app.use(routes);
// wrong path error route
app.use((_req: Request, res: Response) => {
  res.status(404).send('404 error! url does not exist');
});

// server error route
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  return res.status(500).send('Something broke in server!');
});

export default app;
