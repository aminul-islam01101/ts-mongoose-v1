import { Book } from './book.models';

export const findBooksByGenre = async (genre: string) => {
  try {
    const books = await Book.find({ genre });

    return books;
  } catch (error) {
    throw new Error('Failed to fetch books');
  }
};
