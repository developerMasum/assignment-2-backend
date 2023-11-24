import { z } from 'zod';

const orderSchema = z.object({
  productName: z.string({
    required_error: 'productName is required',
  }),
  price: z.number({
    required_error: 'price is required and must be a number',
  }),
  quantity: z.number({
    required_error: 'quantity is required and must be a number',
  }),
});
const userValidationSchema = z.object({
    userId: z.string(),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' }),
    password:z.string(),
  fullName: z.object({
    firstName: z
      .string()
      .max(10, { message: 'First name must be 10 or less characters long' }),
    lastName: z
      .string()
      .max(10, { message: 'Last name must be 10 or less characters long' }),
  }),
  age: z
    .number()
    .int({ message: 'Age must be an integer' })
    .min(0, { message: 'Age must be a non-negative number' }),
  email: z.string().email({ message: 'Invalid email address' }),
  isActive: z.boolean(),
  hobbies: z.array(
    z
      .string()
      .min(3, { message: 'Each hobby must be at least 3 characters long' }),
  ),
  address: z.object({
    street: z
      .string()
      .min(5, { message: 'Street name must be at least 5 characters long' }),
    city: z
      .string()
      .min(3, { message: 'City name must be at least 3 characters long' }),
    country: z
      .string()
      .min(3, { message: 'Country name must be at least 3 characters long' }),
  }),
  orders: z.array(orderSchema).optional(),
  isDeleted: z.boolean().optional()
});

export default userValidationSchema;
