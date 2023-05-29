import { Request, Response } from 'express';
// import { findBooksByGenre } from './book.services';
import { sendApiResponse } from '../../../utils/shared/responseHandler';
import { IBook } from './book.interfaces';
import { findBooksByGenre } from './book.services';

export const getAllBooksByGenre = async (req: Request, res: Response): Promise<void> => {
  try {
    const genre  = req.params.genre;
    const books: IBook[] = await findBooksByGenre(genre);
    sendApiResponse<IBook[]>(res, 200, true, books);
  } catch (error) {
    sendApiResponse<string | null>(res, 500, false, null, 'Failed to fetch books');
  }
};
