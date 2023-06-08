import { Model } from 'mongoose';

export type BookTypes = {
  title: string;
  author: string[];
  genre: string;
  publicationYear: number;
  publisher: {
    name: string;
    location: string;
  };
  reviews: {
    user: string;
    comment: string;
  }[];
  rating: number;
  price: string;
};

export type BookModel = Model<BookTypes, Record<string, unknown>>;
