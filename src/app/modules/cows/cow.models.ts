import { Schema, model } from 'mongoose';
import { breed, category, label, location } from './cow.constant';
import { CowModel, TCow } from './cow.interfaces';

export const userSchema = new Schema<TCow>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    price: { type: Number, required: true },
    location: { type: String, enum: location, required: true },
    breed: {
      type: String,
      enum: breed,
      required: true,
    },
    weight: { type: Number, required: true },
    label: { type: String, enum: label, default: 'for sale' },
    category: { type: String, enum: category, required: true },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
// userSchema.pre('save', async function preSaveHook(next: CallbackWithoutResultAndOptionalError) {
//   const User = this.constructor as CowModel;
//   const isExist = await User.findOne({
//     phoneNumber: this.phoneNumber,
//   });
//   if (isExist) {
//     throw new HandleApiError(httpStatus.CONFLICT, 'phoneNumber is already exist!');
//   }
//   next();
// });
export const Cow = model<TCow, CowModel>('Cow', userSchema);
