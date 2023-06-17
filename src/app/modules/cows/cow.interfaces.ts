import { Model, Types } from 'mongoose';
import { TUser } from '../users/user.interfaces';

export type TLocation =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh';
export type TBreed =
  | 'Brahman'
  | 'Nellore'
  | 'Sahiwal'
  | 'Gir'
  | 'Indigenous'
  | 'Tharparkar'
  | 'Kankrej';
export type TLabel = 'for sale' | 'sold out';
export type TCategory = 'Dairy' | 'Beef' | 'Dual Purpose';

export type TCow = {
  name: string;
  age: number;
  price: number;
  location: TLocation;
  breed: TBreed;
  weight: number;
  label: TLabel;
  category: TCategory;
  seller: Types.ObjectId | TUser;
};
export type CowModel = Model<TCow, Record<string, unknown>>;
export type TCowFilters = {
  searchTerm?: string;
  location?: string;
  maxPrice?: number;
  minPrice?: number;
};
