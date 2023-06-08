import { NextFunction, Request, Response } from 'express';
// import { findBooksByGenre } from './book.services';
import { logger } from '../../../utils/shared/logger';
import { sendApiResponse } from '../../../utils/shared/responseHandler';
import { BookTypes } from './book.interfaces';
import { findBooksByGenre } from './book.services';

export const getAllBooksByGenre = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { genre } = req.params;

    const books = (await findBooksByGenre(genre)) as BookTypes[];
    logger.http(books);

    // throw new Error('Error');
    sendApiResponse<BookTypes[]>(res, 200, true, books);
  } catch (error) {
    next(error);
  }
};
