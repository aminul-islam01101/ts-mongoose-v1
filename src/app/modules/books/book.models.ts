import mongoose, { Schema } from 'mongoose';

import { IBook } from './book.interfaces';

const bookSchema: Schema<IBook> = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: [String], required: true },
  genre: { type: String, required: true },
  publicationYear: { type: Number, required: true },
  publisher: {
    name: { type: String, required: true },
    location: { type: String, required: true },
  },
  reviews: [
    {
      user: { type: String, required: true },
      comment: { type: String, required: true },
    },
  ],
  rating: { type: Number, required: true },
  price: { type: String, required: true },
});

const BookModel = mongoose.model<IBook>('Book', bookSchema);

export { BookModel, bookSchema };
