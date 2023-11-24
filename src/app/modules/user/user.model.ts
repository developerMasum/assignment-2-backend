import { Schema, model } from 'mongoose';
import { TUser, customModel, userMethods } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

// const UserNameSchema = new Schema<UserName>({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
// });

// const AddressSchema = new Schema<Address>({
//   street: { type: String, required: true },
//   city: { type: String, required: true },
//   country: { type: String, required: true },
// });

// const OrdersSchema = new Schema<Orders>({
//   productName: { type: String, required: true },
//   price: { type: Number, required: true },
//   quantity: { type: Number, required: true },
// });

const userSchema = new Schema<TUser, customModel, userMethods>({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  email: { type: String, required: true, unique: true },
  orders: [
    {
      productName: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  isDeleted: { type: Boolean, default: false },
});
// after and before save

userSchema.pre('save', async function (next) {
  // hashing password
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();

  // console.log(this,'pre');
});
userSchema.post('save', function (doc, next) {
  doc.password = '';
  // console.log(this,'pst');
  next();
});

// query middleware -
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
// single
userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// userSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await User.findOne({ id });
//   return existingUser;
// };

// for hide
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.orders;
  return userObject;
};
userSchema.methods.isUserExists = async function (userId: string) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, customModel>('User', userSchema);


