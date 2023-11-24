import { Model } from 'mongoose';
// import { UserModel } from './user.model';
// import { Schema, model, connect } from 'mongoose';


export type TUser = {
  userId: string;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  email: string;
  orders?: [
    {
      productName: string;
      price: number;
      quantity: number;
    },
  ];
  isDeleted: boolean;
};

export type userMethods = {
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId: string): Promise<TUser | null>;
};

export type customModel = Model<TUser, Record<string, never>, userMethods>;
