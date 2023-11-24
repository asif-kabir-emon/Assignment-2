import { z } from 'zod';

const UserFullNameSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
});

const AddressSchema = z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
});

const OrderSchema = z.object({
    productName: z.string(),
    price: z.number().positive(),
    quantity: z.number().positive(),
});

const UserSchema = z.object({
    userId: z.number().positive(),
    username: z.string(),
    password: z.string().min(8),
    fullName: UserFullNameSchema,
    age: z.number().positive(),
    email: z.string().email(),
    isActive: z.boolean(),
    hobbies: z.array(z.string()),
    address: AddressSchema,
    orders: z.array(OrderSchema).optional(),
});

export const UserValidationSchema = {
    UserSchema,
    UserFullNameSchema,
    AddressSchema,
    OrderSchema,
};
