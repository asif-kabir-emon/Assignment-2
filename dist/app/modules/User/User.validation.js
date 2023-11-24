"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidationSchema = void 0;
const zod_1 = require("zod");
const UserFullNameSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
});
const AddressSchema = zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string(),
    country: zod_1.z.string(),
});
const OrderSchema = zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number().positive(),
    quantity: zod_1.z.number().positive(),
});
const UserSchema = zod_1.z.object({
    userId: zod_1.z.number().positive(),
    username: zod_1.z.string(),
    password: zod_1.z.string().min(8),
    fullName: UserFullNameSchema,
    age: zod_1.z.number().positive(),
    email: zod_1.z.string().email(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: AddressSchema,
    orders: zod_1.z.array(OrderSchema).optional(),
});
exports.UserValidationSchema = {
    UserSchema,
    UserFullNameSchema,
    AddressSchema,
    OrderSchema,
};
