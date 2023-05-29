import { BookModel } from './book.models';

export const findBooksByGenre = async (genre: string) => {
  try {
    const books = await BookModel.find({ genre });
    return books;
  } catch (error) {
    throw new Error('Failed to fetch books');
  }
};
