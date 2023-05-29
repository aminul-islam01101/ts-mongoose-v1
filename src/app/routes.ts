import express from 'express';
import bookRouter from './modules/books/book.routes';

const routes = express.Router();
// home route
routes.get('/', (_req, res) => {
  res.send('test server is running');
});

// business routes

routes.use('/api/v1/books', bookRouter);

export default routes;
