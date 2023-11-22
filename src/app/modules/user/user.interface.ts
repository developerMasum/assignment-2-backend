// import { Schema, model, connect } from 'mongoose';

// export type Address = {
//   street: string;
//   city: string;
//   country: string;
// };

// export type UserName = {
//   firstName: string;
//   lastName: string;
// };

export type Orders = {
  productName: string;
  price: number;
  quantity: number;
};

export type User = {
  userId: number;
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
  orders: Orders;
};
