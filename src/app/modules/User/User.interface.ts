/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface TUserFullName {
    firstName: string;
    lastName: string;
}

export interface TAddress {
    street: string;
    city: string;
    country: string;
}

export interface TOrders {
    productName: string;
    price: number;
    quantity: number;
}

export interface TUser {
    userId: number;
    username: string;
    password: string;
    fullName: TUserFullName;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: TAddress;
    orders?: TOrders[];
}

export interface UserModel extends Model<TUser> {
    isUsernameExist(username: string): Promise<TUser | null>;
    isUserExist(userId: number): Promise<TUser | null>;
}
